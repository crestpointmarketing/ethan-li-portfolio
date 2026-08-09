// One-off (safely re-runnable) script to add the UT Austin Power Electronics
// & Energy Systems Laboratory experience entry.
// Run via: node scripts/add-utaustin-power-electronics.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '..', '.env');

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvFile(envPath);

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}
const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

const experience = {
  slug: 'ut-austin-power-electronics',
  company: 'UT Austin Power Electronics & Energy Systems Lab',
  companyTagline:
    'Hands-on power electronics, embedded communication hardware, and renewable-energy systems lab at The University of Texas at Austin',
  role: 'Power Electronics Lab Researcher',
  badgeText: 'Research Lab',
  period: 'July 2026',
  location: 'Austin, TX',
  orderIndex: 2,
  published: true,
  summaryHighlights: [
    'Assembled and tested an H-bridge inverter — soldering PCB components and using an oscilloscope to observe PWM-based sine-wave generation and diagnose faults.',
    'Built and troubleshot an Ethernet-to-fiber media converter for EtherCAT industrial communication, working from a schematic against a completed reference board.',
    'Measured photovoltaic current and voltage under variable resistance, plotted I–V and power curves, and located the system’s maximum power point under real sunlight.',
    'Learned firsthand that a system only becomes reliable once its physical behavior is measured, debugged, and validated under real-world conditions — not when it simply looks like it works.',
  ],
  heroStats: [
    { value: '3', label: 'Hardware Systems Built' },
    { value: 'PWM', label: 'Inverter Sine-Wave Gen' },
    { value: 'EtherCAT', label: 'Industrial Comms' },
    { value: 'MPP', label: 'Solar Power Tracking' },
  ],
  overviewParagraphs: [
    'This laboratory experience at UT Austin spanned three connected areas of modern energy and hardware systems: power electronics, embedded industrial communication, and photovoltaic energy conversion. Rather than working from theory alone, each task started from a physical board or schematic and ended at measured, verified behavior on the bench.',
    'The through-line across every station was engineering execution on real hardware — taking a design from soldered components and wiring to an oscilloscope trace, a working data link, or a plotted power curve, and using measurement and debugging to confirm the system actually behaved the way it was supposed to.',
  ],
  responsibilities: [
    {
      title: 'H-Bridge Inverter Assembly & Test',
      body: 'Soldered and assembled the PCB for an H-bridge inverter, then tested it on the bench — observing how PWM switching is filtered into a clean sine-wave output.',
    },
    {
      title: 'Oscilloscope-Guided Fault Diagnosis',
      body: 'Used an oscilloscope to inspect waveforms, identify where the circuit deviated from expected behavior, and trace faults back to their physical cause.',
    },
    {
      title: 'EtherCAT Ethernet-to-Fiber Converter',
      body: 'Built and troubleshot an Ethernet-to-fiber media converter used in EtherCAT industrial control networks, working from a schematic and comparing against a completed reference board.',
    },
    {
      title: 'Photovoltaic I–V Characterization',
      body: 'Measured solar-panel current and voltage across a variable resistive load under real sunlight, generated I–V and power curves, and identified the array’s maximum power point.',
    },
  ],
  techColumns: [
    {
      heading: 'Power Electronics & Hardware',
      items: [
        'PCB soldering & assembly',
        'H-bridge inverter construction',
        'PWM-based sine-wave generation',
        'Oscilloscope fault diagnosis',
      ],
    },
    {
      heading: 'Systems & Measurement',
      items: [
        'EtherCAT Ethernet-to-fiber conversion',
        'Schematic-to-board troubleshooting',
        'Photovoltaic I–V & power curves',
        'Maximum power point identification',
      ],
    },
  ],
  highlights: [
    {
      title: 'From PWM to a Clean Sine Wave',
      body: 'Watching a switched PWM signal become a smooth sine wave on the oscilloscope made the theory behind inverters concrete — and showed how much of that result depends on the physical build being correct.',
    },
    {
      title: 'Schematic to Working Data Link',
      body: 'Bringing up the Ethernet-to-fiber EtherCAT converter meant reading a schematic, building against a known-good reference board, and debugging the gap between the two until the link worked.',
    },
    {
      title: 'Finding the Maximum Power Point',
      body: 'Sweeping a photovoltaic panel across a variable load under real sunlight turned an abstract I–V curve into a measured power peak — the point where a solar system actually delivers its most energy.',
    },
  ],
  takeawayParagraphs: [
    'The lasting lesson from this lab was that hardware and software have to be understood together. A control signal or a display can look completely correct while the underlying physical system is not — and it is measurement, debugging, and testing under real conditions that reveal the difference. Robots, energy systems, and connected products all ultimately depend on power, control, communication, and reliable hardware working as one.',
    'Working close to the physical layer this way gave me a foundation for engineering execution: reading schematics, building and repairing boards, reasoning about signals on an oscilloscope, and validating that a system truly behaves as intended. It’s the kind of ground-level understanding I want to carry into higher-level work in software, AI, and product — knowing what it takes for the technology underneath to actually be trustworthy.',
  ],
};

async function main() {
  const { data: existing, error: findError } = await supabase
    .from('experiences')
    .select('id')
    .eq('slug', experience.slug)
    .maybeSingle();
  if (findError) throw findError;

  const row = {
    slug: experience.slug,
    company: experience.company,
    company_tagline: experience.companyTagline,
    role: experience.role,
    badge_text: experience.badgeText,
    period: experience.period,
    location: experience.location,
    order_index: experience.orderIndex,
    published: experience.published,
    summary_highlights: experience.summaryHighlights,
    hero_stats: experience.heroStats,
    overview_paragraphs: experience.overviewParagraphs,
    responsibilities: experience.responsibilities,
    tech_columns: experience.techColumns,
    highlights: experience.highlights,
    takeaway_paragraphs: experience.takeawayParagraphs,
  };

  if (existing) {
    const { error } = await supabase.from('experiences').update(row).eq('id', existing.id);
    if (error) throw error;
    console.log(`Updated experience "${experience.slug}".`);
  } else {
    const { error } = await supabase.from('experiences').insert(row);
    if (error) throw error;
    console.log(`Created experience "${experience.slug}".`);
  }
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
