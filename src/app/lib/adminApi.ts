import type { Project, ProjectInput } from '@shared/projectSchema';
import type {
  AboutContent,
  ContactContent,
  Experience,
  ExperienceInput,
  AchievementCategory,
  AchievementCategoryInput,
  AchievementsMeta,
  Moment,
  MomentInput,
} from '@shared/siteContentSchema';

export class AdminApiError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new AdminApiError(typeof data?.error === 'string' ? data.error : 'Request failed', res.status, data);
  }
  return data as T;
}

export function login(password: string) {
  return request<{ ok: true }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

export function logout() {
  return request<{ ok: true }>('/api/admin/logout', { method: 'POST' });
}

export function listProjects() {
  return request<{ projects: Project[] }>('/api/admin/projects');
}

export function getProject(id: string) {
  return request<{ project: Project }>(`/api/admin/projects/${id}`);
}

export function createProject(input: ProjectInput) {
  return request<{ project: Project }>('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateProject(id: string, input: ProjectInput) {
  return request<{ project: Project }>(`/api/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

/** Partial update — only for fields that don't touch `sections` (e.g. the publish toggle). */
export function patchProject(id: string, patch: { published?: boolean }) {
  return request<{ project: Project }>(`/api/admin/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}

export function deleteProject(id: string) {
  return request<{ ok: true }>(`/api/admin/projects/${id}`, { method: 'DELETE' });
}

export function reorderProjects(ids: string[]) {
  return request<{ ok: true }>('/api/admin/projects/reorder', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
}

/**
 * Uploads a poster image or paper PDF and returns its public URL. The file
 * itself goes straight from the browser to Supabase Storage via a signed
 * URL — it never passes through our own API, and the service role key
 * never reaches the client.
 */
export async function uploadFile(kind: 'poster' | 'paper' | 'moment', file: File): Promise<string> {
  const prep = await request<{ signedUrl: string; token: string; path: string; publicUrl: string }>(
    '/api/admin/uploads',
    {
      method: 'POST',
      body: JSON.stringify({ kind, fileName: file.name, contentType: file.type }),
    },
  );

  const uploadRes = await fetch(prep.signedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!uploadRes.ok) {
    throw new AdminApiError('Upload failed', uploadRes.status);
  }

  return prep.publicUrl;
}

// ---- About ----

export function getAbout() {
  return request<{ about: AboutContent | null }>('/api/admin/about');
}

export function updateAbout(input: AboutContent) {
  return request<{ about: AboutContent }>('/api/admin/about', { method: 'PUT', body: JSON.stringify(input) });
}

// ---- Contact ----

export function getContact() {
  return request<{ contact: ContactContent | null }>('/api/admin/contact');
}

export function updateContact(input: ContactContent) {
  return request<{ contact: ContactContent }>('/api/admin/contact', { method: 'PUT', body: JSON.stringify(input) });
}

// ---- Experiences ----

export function listExperiences() {
  return request<{ experiences: Experience[] }>('/api/admin/experiences');
}

export function getExperience(id: string) {
  return request<{ experience: Experience }>(`/api/admin/experiences/${id}`);
}

export function createExperience(input: ExperienceInput) {
  return request<{ experience: Experience }>('/api/admin/experiences', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateExperience(id: string, input: ExperienceInput) {
  return request<{ experience: Experience }>(`/api/admin/experiences/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function patchExperience(id: string, patch: { published?: boolean }) {
  return request<{ experience: Experience }>(`/api/admin/experiences/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}

export function deleteExperience(id: string) {
  return request<{ ok: true }>(`/api/admin/experiences/${id}`, { method: 'DELETE' });
}

export function reorderExperiences(ids: string[]) {
  return request<{ ok: true }>('/api/admin/experiences/reorder', { method: 'POST', body: JSON.stringify({ ids }) });
}

// ---- Achievements ----

export function listAchievementCategories() {
  return request<{ categories: AchievementCategory[] }>('/api/admin/achievements');
}

export function getAchievementCategory(id: string) {
  return request<{ category: AchievementCategory }>(`/api/admin/achievements/${id}`);
}

export function createAchievementCategory(input: AchievementCategoryInput) {
  return request<{ category: AchievementCategory }>('/api/admin/achievements', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateAchievementCategory(id: string, input: AchievementCategoryInput) {
  return request<{ category: AchievementCategory }>(`/api/admin/achievements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function deleteAchievementCategory(id: string) {
  return request<{ ok: true }>(`/api/admin/achievements/${id}`, { method: 'DELETE' });
}

export function reorderAchievementCategories(ids: string[]) {
  return request<{ ok: true }>('/api/admin/achievements/reorder', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
}

export function getAchievementsMeta() {
  return request<{ meta: AchievementsMeta | null }>('/api/admin/achievements-meta');
}

export function updateAchievementsMeta(input: AchievementsMeta) {
  return request<{ meta: AchievementsMeta }>('/api/admin/achievements-meta', {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

// ---- Moments ----

export function listMoments() {
  return request<{ moments: Moment[] }>('/api/admin/moments');
}

export function createMoment(input: MomentInput) {
  return request<{ moment: Moment }>('/api/admin/moments', { method: 'POST', body: JSON.stringify(input) });
}

export function updateMoment(id: string, input: MomentInput) {
  return request<{ moment: Moment }>(`/api/admin/moments/${id}`, { method: 'PUT', body: JSON.stringify(input) });
}

export function deleteMoment(id: string) {
  return request<{ ok: true }>(`/api/admin/moments/${id}`, { method: 'DELETE' });
}

export function reorderMoments(ids: string[]) {
  return request<{ ok: true }>('/api/admin/moments/reorder', { method: 'POST', body: JSON.stringify({ ids }) });
}
