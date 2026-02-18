import { TeamMember } from './types';

export const GRYFFINOPS_BANNER_URL =
  'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/gryffinops.png';

// Fixed colors per person (as requested)
const COLORS = {
  yifat: '#2E7D32',   // Green
  noa: '#E0A800',     // Yellow
  bar: '#C62828',     // Red
  nate: '#EF6C00',    // Orange
  dani: '#6A1B9A',    // Purple
  yuval: '#800020',   // Burgundy
  marina: '#D81B60',  // Pink
  debora: '#D4AF37',  // Gold
  tal: '#4FC3F7',     // Light Blue
} as const;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'yifat',
    name: 'Yifat',
    role: 'Supreme Team Leader',
    subRole: 'Headmistress of Marketing Sorcery',
    description:
      "Yifat leads the magical forces of Marketing Ops & Tech with wisdom and precision. She ensures every strategic enchantment aligns perfectly with the guild's long-term visions.",
    imageUrl:
      'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/yifat.png',
    colorHex: COLORS.yifat,
    specialties: ['STRATEGY', 'SCALE', 'LEADERSHIP'],
    projects: [
      { id: 'p1', name: 'Strategic Enchantments', description: 'Aligning business spells with marketing goals.' },
      { id: 'p2', name: 'Alchemical Roadmap', description: 'Formulating the 2024-2025 growth potion.' }
    ]
  },
  {
    id: 'noa',
    name: 'Noa',
    role: 'Global Marketing Ops',
    subRole: 'Weaver of Universal Spells',
    description:
      'Noa orchestrates the global flows of marketing magic, ensuring that automated rituals run smoothly across all dimensions.',
    imageUrl:
      'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/noa.png',
    colorHex: COLORS.noa,
    specialties: ['FUNNEL', 'STRATEGY', 'ENRICHMENT', 'ABM'],
    projects: [
      { id: 'p10', name: 'Global Flux Ritual', description: 'Standardizing operations across all regions.' }
    ]
  },
  {
    id: 'bar',
    name: 'Bar',
    role: 'Global Marketing Ops',
    subRole: 'Architect of Automated Magic',
    description:
      'Bar specializes in the deep tech side of marketing ops, building the pipes through which our data-magic flows.',
    imageUrl:
      'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/bar.png',
    colorHex: COLORS.bar,
    specialties: ['AI', 'AUTOMATIONS', 'INTEGRATIONS'],
    projects: [
      { id: 'p11', name: 'The Data Lake Mirror', description: 'Real-time reporting dashboards for the high council.' }
    ]
  },
  {
    id: 'tal',
    name: 'Tal',
    role: 'Global Marketing Ops',
    subRole: 'Conjuror of Worldwide Efficiency',
    description:
      'Tal orchestrates global marketing operations with a focus on streamlining magical workflows across every continent.',
    imageUrl:
      'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/tal.png',
    colorHex: COLORS.tal,
    specialties: ['OPERATIONS', 'PROGRAMS'],
    projects: [
      { id: 'p12', name: 'Efficiency Enchantment', description: 'Optimizing international throughput.' }
    ]
  },
  {
    id: 'nate',
    name: 'Nate',
    role: 'Regional Marketing Ops',
    subRole: 'Warden of EMEA & LATAM',
    description:
      'Nate handles the enchantments specifically tailored for the EMEA and LATAM regions.',
    imageUrl:
      'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/nate.png',
    colorHex: COLORS.nate,
    specialties: ['REGIONAL OPS', 'SPLASH', 'AI SDR'],
    projects: [
      { id: 'p8', name: 'LATAM Growth Charm', description: 'Market entry operations for Brazil and Mexico.' }
    ]
  },
  {
    id: 'dani',
    name: 'Dani',
    role: 'Regional Marketing Ops',
    subRole: 'Guardian of APAC & NA',
    description:
      'Dani manages the magical threads connecting the APAC and NA regions.',
    imageUrl:
      'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/dani.png',
    colorHex: COLORS.dani,
    specialties: ['REGIONAL OPS', 'ANALYTICS', 'HIGH BAR'],
    projects: [
      { id: 'p9', name: 'APAC Automation Runes', description: 'Implementing lifecycle magic in Japan and Korea.' }
    ]
  },
  {
    id: 'debora',
    name: 'Debora',
    role: 'Head of Localization',
    subRole: 'Translator of Ancient Tongues',
    description:
      'Debora oversees the translation of our magical messages across 8 realms, managing a legion of localization experts.',
    imageUrl:
      'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/debora.png',
    colorHex: COLORS.debora,
    specialties: ['LOCALIZATION', 'PROCESSES', 'TEAM LEAD'],
    projects: [
      { id: 'p5', name: 'The Babel Spell', description: 'Automating translation workflows across platforms.' }
    ]
  },
  {
    id: 'marina',
    name: 'Marina',
    role: 'Localization Manager',
    subRole: 'Apprentice of Global Echoes',
    description:
      'Working under the guidance of Debora, Marina ensures that no nuance is lost in translation during our international expansions.',
    imageUrl:
      'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/marina.png',
    colorHex: COLORS.marina,
    specialties: ['LOCALIZATION', 'OPERATIONS', 'AI'],
    projects: [
      { id: 'p7', name: 'EMEA Script Refining', description: 'Optimizing regional content for local markets.' }
    ]
  },
  {
    id: 'yuval',
    name: 'Yuval',
    role: 'Website Operations & Strategy',
    subRole: 'Keeper of the Digital Scrolls',
    description:
      'Yuval orchestrates the vast digital architecture of our web presence, ensuring every scroll and click is a smooth magical experience.',
    imageUrl:
      'https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/yuval.png',
    colorHex: COLORS.yuval,
    specialties: ['WEB OPS', 'WEB STRATEGY', 'UX'],
    projects: [
      { id: 'p3', name: "The Marauder’s Map Redesign", description: 'Complete site navigation overhaul.' }
    ]
  }
];
