// Campus Photos
import hostCampus1 from '../assets/about/host/host_campus_1.jpg';
import hostCampus2 from '../assets/about/host/host_campus_2.jpg';
import hostCampus3 from '../assets/about/host/host_campus_3.jpg';

// Memories Photos (Previous Edition '25 Recap from Brochure)
import memory1 from '../assets/about/memories/memory_1.jpg';
import memory2 from '../assets/about/memories/memory_2.jpg';
import memory3 from '../assets/about/memories/memory_3.jpg';
import memory4 from '../assets/about/memories/memory_4.jpg';
import memory5 from '../assets/about/memories/memory_5.jpg';
import memory6 from '../assets/about/memories/memory_6.jpg';
import memory7 from '../assets/about/memories/memory_7.jpg';
import memory8 from '../assets/about/memories/memory_8.jpg';
import memory9 from '../assets/about/memories/memory_9.jpg';
import memory10 from '../assets/about/memories/memory_10.jpg';
import memory11 from '../assets/about/memories/memory_11.jpg';
import memory12 from '../assets/about/memories/memory_12.jpg';
import memory13 from '../assets/about/memories/memory_13.jpg';
import memory14 from '../assets/about/memories/memory_14.jpg';

/* ── Host Institution Information (Seth GSMC & KEMH) ───────────── */
export const hostInfo = {
  eyebrow: 'The Host',
  title: 'About Seth GSMC & KEMH',
  collegeName: 'Seth Gordhandas Sunderdas Medical College & King Edward VII Memorial Hospital',
  location: 'Parel, Mumbai, Maharashtra, India',
  foundedYear: '1926',
  paragraphs: [
    'Founded in 1926, the Seth Gordhandas Sunderdas Medical College (GSMC) and the King Edward (VII) Memorial (KEM) Hospital are amongst the foremost teaching and medical care providing institutions in India.',
    'The medical college (school) provides training to about 2000 students in undergraduate, postgraduate and in super-speciality medical courses; undergraduate and postgraduate physical and occupational therapy; Masters and PhD courses in various allied specialities.',
    'A nursing school is also maintained by this institute.',
  ],
  stats: [
    { value: '1926', label: 'Founded', detail: 'A century of pioneering excellence' },
    { value: '2,000+', label: 'Trainees & Scholars', detail: 'UG, PG & Super-Speciality courses' },
    { value: 'Allied & Nursing', label: 'Holistic Healthcare', detail: 'Occupational/PT, Masters & PhD' },
    { value: 'KEM Hospital', label: 'Premier Care', detail: 'Historic Mumbai teaching hospital' },
  ],
  campusPhotos: [
    {
      src: hostCampus1,
      title: 'Seth GSMC Heritage Entrance',
      subtitle: 'The historic collegiate archway and main entrance, founded in 1926.',
      alt: 'Seth GS Medical College main heritage building entrance from courtyard',
    },
    {
      src: hostCampus2,
      title: 'Courtyard Fountain & Heritage Facade',
      subtitle: 'Iconic tiered fountain and palatial colonial architecture.',
      alt: 'Seth GSMC central courtyard fountain with heritage facade and palm trees',
    },
    {
      src: hostCampus3,
      title: 'KEM Hospital Healthcare Campus',
      subtitle: 'Multispeciality referral hospital serving Mumbai and delegates nationwide.',
      alt: 'King Edward VII Memorial Hospital modern healthcare high-rise building',
    },
  ],
};

/* ── Memories Gallery (Photos from Previous Editions) ──────────── */
export const memoriesGallery = [
  {
    id: 14,
    src: memory14,
    title: 'CONFLUENCE Grand Stage Installation',
    tag: 'Stage & Atmosphere',
    caption: 'The signature illuminated CONFLUENCE stage featuring custom geometric heart, countdown hourglass and milestone backdrops.',
    featured: true,
  },
  {
    id: 12,
    src: memory12,
    title: 'Valedictory ’25 Ceremony',
    tag: 'Valedictory',
    caption: 'Delegates, prize winners and organizing committee celebrating the triumphant close of the conference.',
    featured: true,
  },
  {
    id: 9,
    src: memory9,
    title: 'Core Organizing Committee',
    tag: 'Leadership',
    caption: 'The student organizing team behind CONFLUENCE in formal suits at the stage backdrop.',
  },
  {
    id: 11,
    src: memory11,
    title: 'Audience Passion & Cheering',
    tag: 'Delegates',
    caption: 'High-spirited delegates and peer supporters holding placards during academic quizzes and finals.',
  },
  {
    id: 5,
    src: memory5,
    title: 'Airway Management & BLS Simulation',
    tag: 'Workshop',
    caption: 'Hands-on bag-valve-mask ventilation, emergency airway securing, and chest compression training.',
  },
  {
    id: 4,
    src: memory4,
    title: 'Pediatric Life Support & CPR Masterclass',
    tag: 'Workshop',
    caption: 'Simulation training on neonatal and pediatric life-saving maneuvers led by expert mentors.',
  },
  {
    id: 6,
    src: memory6,
    title: 'Surgical Suturing & Instrument Technique',
    tag: 'Workshop',
    caption: 'Practicing delicate suturing patterns, needle driver control, and deep surgical knot-tying.',
  },
  {
    id: 8,
    src: memory8,
    title: 'Wet-Lab Specimen & Pathology Exploration',
    tag: 'Hands-on Lab',
    caption: 'Exploring clinical pathology specimens and morphological findings under faculty guidance.',
  },
  {
    id: 3,
    src: memory3,
    title: 'Scientific Research Paper Presentation',
    tag: 'Academic Track',
    caption: 'Student delegates presenting clinical research and defended case reports at the Medical Education podium.',
  },
  {
    id: 10,
    src: memory10,
    title: 'Poster Showcase & Academic Stations',
    tag: 'Competitions',
    caption: 'Engaged delegates discussing novel research findings and case studies with conference evaluators.',
  },
  {
    id: 1,
    src: memory1,
    title: 'Auditorium Keynote & Scientific Discourse',
    tag: 'Keynote & CME',
    caption: 'Renowned medical clinicians and professors delivering talks to a packed hall of future doctors.',
  },
  {
    id: 13,
    src: memory13,
    title: 'Diagnostic Case Rounds & Discussion',
    tag: 'Clinical Track',
    caption: 'Small-group interactive case analysis reviewing complex clinical presentations.',
  },
  {
    id: 7,
    src: memory7,
    title: 'Delegate Welcome & Registration Desk',
    tag: 'Campus Life',
    caption: 'Welcoming delegates from across India with conference bags, badges, and workshop materials.',
  },
  {
    id: 2,
    src: memory2,
    title: 'Literati Events & Evening Engagement',
    tag: 'Literati',
    caption: 'Interactive stalls, literary debates, recreational activities and networking after academic sessions.',
  },
];

