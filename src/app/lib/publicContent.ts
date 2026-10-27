/** Retry temporary GET failures without leaving a content section stuck. */
export async function loadPublicContent<T>(url: string, signal: AbortSignal): Promise<T> {
  const delays = [400, 1000];
  for (let attempt = 0; ; attempt++) {
    signal.throwIfAborted();
    const request = new AbortController();
    const cancel = () => request.abort(signal.reason);
    signal.addEventListener('abort', cancel, { once: true });
    const timeout = setTimeout(() => request.abort(), 8000);
    let retry = false;
    try {
      const response = await fetch(url, { signal: request.signal, cache: 'no-store' });
      if (response.ok) return await response.json();
      retry = response.status === 408 || response.status === 429 || response.status >= 500;
      if (!retry || attempt === delays.length) {
        throw new Error(`Public content request failed (${response.status})`);
      }
    } catch (error) {
      signal.throwIfAborted();
      // Network errors and our per-request timeout can recover on a new request.
      retry = error instanceof TypeError || request.signal.aborted;
      if (!retry || attempt === delays.length) throw error;
    } finally {
      clearTimeout(timeout);
      signal.removeEventListener('abort', cancel);
    }
    await new Promise<void>((resolve, reject) => {
      const abort = () => {
        clearTimeout(timer);
        reject(signal.reason);
      };
      const timer = setTimeout(() => {
        signal.removeEventListener('abort', abort);
        resolve();
      }, delays[attempt]);
      signal.addEventListener('abort', abort, { once: true });
      if (signal.aborted) {
        signal.removeEventListener('abort', abort);
        abort();
      }
    });
  }
}
