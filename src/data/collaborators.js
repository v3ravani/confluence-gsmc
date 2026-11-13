// ── Collaborating organisations ───────────────────────────────────────────────
import medicrewLight from '../assets/colaborator_logos/medicrew_light.png';
import medicrewDark from '../assets/colaborator_logos/medicrew_dark.png';
import smrLogo from '../assets/colaborator_logos/smr_logo.png';
import girlUpLogo from '../assets/colaborator_logos/girlup_med.png';
import medicoMarvelsLogo from '../assets/colaborator_logos/medico_marvels.jpg';

export const collaboratorsData = [
  {
    id:        'medicrew',
    name:      'Rotaract Club of Medicrew',
    category:  'Partner Body',
    location:  'Mumbai',
    logoLight: medicrewLight,
    logoDark:  medicrewDark,
    isWide:    true,
  },
  {
    id:        'smr',
    name:      'Squad Medicine and Research (SMR)',
    category:  'Research & Academic Partner',
    location:  'India',
    logo:      smrLogo,
    isWide:    true,
  },
  {
    id:        'girlup-med',
    name:      'Girl Up Med',
    category:  'Youth & Health Partner',
    location:  'India',
    logo:      girlUpLogo,
    isSquare:  true,
  },
  {
    id:        'medico-marvels',
    name:      'Rotaract Club of Mumbai Medico Marvels',
    category:  'Partner Body',
    location:  'Mumbai',
    logo:      medicoMarvelsLogo,
    isSquare:  true,
  },
];

// ── Instagram configuration ───────────────────────────────────────────────────
export const instagramConfig = {
  handle:        '@confluencegsmc',
  url:           'https://www.instagram.com/confluencegsmc?srtk=MTZmZjA2azczaWVqeA==',
  heading:       'Follow CONFLUENCE 2026 on Instagram',
  subtext:       'Stay updated with live announcements, speaker reveals, workshop glimpses, and behind-the-scenes moments from the GSMC campus.',
  placeholderPosts: [
    { id: 1, label: 'Keynote Speaker Reveal' },
    { id: 2, label: 'Workshop Highlights' },
    { id: 3, label: 'Campus Buzz' },
    { id: 4, label: 'Registration Open' },
    { id: 5, label: 'Delegate Moments' },
    { id: 6, label: 'CME Spotlight' },
  ],
};
