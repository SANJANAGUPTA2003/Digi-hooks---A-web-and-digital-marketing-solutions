export const PHONE = '+91 7015218840'
export const PHONE_RAW = '917015218840'
export const EMAIL = 'digiihooks@gmail.com'
export const WHATSAPP_URL = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent('Hi DigiHooks! I want to book a strategy call.')}`
export const STRATEGY_CALL_URL = WHATSAPP_URL
export const INSTAGRAM_URL = 'https://instagram.com/digihooks'
export const FACEBOOK_URL = 'https://facebook.com'

export const BRAND = {
  name: 'DigiHooks',
  tagline: 'Turn Attention Into Customers',
  canvas: '#F5F3EF',
  surface: '#ECE7DF',
  card: '#FFFFFF',
  text: '#1B1B1B',
  secondary: '#666666',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const

export const REVIEWS = [
  {
    name: 'Johny Seth',
    role: 'Owner',
    business: 'Sabrtel',
    rating: 5,
    text: 'Digi Hooks built our website and within two months we started getting enquiries from Google. Clear communication and no fluff, exactly what we needed.',
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing head',
    business: 'Stud and Beam',
    rating: 5,
    text: 'Digi Hooks handled both our website management and SEO strategy. Their work improved our visibility, streamlined our digital presence, and provided ongoing support whenever required. A reliable team for long-term growth.',
  },
  {
    name: 'Sarthak Sharma',
    role: 'Director',
    business: 'Sarthak enterprises',
    rating: 5,
    text: 'Professional team that understands business, not just design. They tied every deliverable to leads and visibility. Highly recommend for any growing business.',
  },
] as const

export const CHALLENGES = [
  {
    id: 'no-website',
    title: 'No Website',
    icon: 'Globe',
    problem: 'Customers search online first. Without a site, you are invisible to high intent buyers.',
    solution:
      'We build conversion focused websites with clear messaging, fast load times, and lead paths that turn visitors into enquiries.',
  },
  {
    id: 'low-leads',
    title: 'Low Leads',
    icon: 'TrendingDown',
    problem: 'Traffic without strategy wastes budget. Random posts and ads rarely compound into pipeline.',
    solution:
      'DigiHooks designs funnel aligned campaigns with landing pages, offers, and tracking so every click has a purpose.',
  },
  {
    id: 'poor-visibility',
    title: 'Poor Google Visibility',
    icon: 'Search',
    problem: 'If you are not on page one for what you sell, competitors capture the demand you earned offline.',
    solution:
      'Technical SEO, local optimization, and content clusters help you rank for terms that actually drive revenue.',
  },
  {
    id: 'outdated',
    title: 'Outdated Online Presence',
    icon: 'Clock',
    problem: 'An old site signals an old business. Trust drops before a prospect ever calls.',
    solution:
      'We modernize UX, mobile performance, and brand consistency so your digital storefront matches your quality.',
  },
  {
    id: 'weak-brand',
    title: 'Weak Brand Identity',
    icon: 'Sparkles',
    problem: 'Inconsistent visuals and voice make you forgettable even when your service is excellent.',
    solution:
      'Cohesive design systems, messaging, and social presence give prospects a reason to remember and choose you.',
  },
] as const

export const PROCESS_STEPS = [
  { step: '01', title: 'Discover', desc: 'Audit goals, audience, and competitors to find growth gaps.' },
  { step: '02', title: 'Plan', desc: 'Roadmap priorities, KPIs, and channel mix aligned to revenue.' },
  { step: '03', title: 'Design', desc: 'Craft brand forward UX that builds trust and drives action.' },
  { step: '04', title: 'Develop', desc: 'Ship fast, secure, mobile first experiences on modern stacks.' },
  { step: '05', title: 'Launch', desc: 'Go live with analytics, SEO foundations, and QA baked in.' },
  { step: '06', title: 'Grow', desc: 'Iterate campaigns, content, and optimization from real data.' },
] as const

export const PROCESS_JOURNEY = [
  { step: 'Discovery', desc: 'Understand your business, audience, and growth gaps.' },
  { step: 'Strategy', desc: 'Define the roadmap, priorities, and measurable outcomes.' },
  { step: 'Execution', desc: 'Build, launch, and optimize with precision.' },
  { step: 'Growth', desc: 'Compound results through data-driven iteration.' },
] as const

export const SERVICES = [
  {
    title: 'Website Development',
    desc: 'Fast, conversion-focused websites built with SEO, performance, and lead capture from day one.',
    icon: 'Code2',
  },
  {
    title: 'SEO',
    desc: 'Technical SEO, local visibility, and content that ranks for terms that drive real enquiries.',
    icon: 'LineChart',
  },
  {
    title: 'Social Media Marketing',
    desc: 'Platform-native content and campaigns that build authority and turn attention into conversations.',
    icon: 'Share2',
  },
  {
    title: 'Google Business Profile Optimization',
    desc: 'Optimized listings, review strategy, and map pack presence for local search dominance.',
    icon: 'MapPin',
  },
  {
    title: 'Paid Ads',
    desc: 'Google and Meta campaigns with landing pages and tracking built for measurable ROI.',
    icon: 'Megaphone',
  },
  {
    title: 'Branding',
    desc: 'Cohesive visual identity and messaging so your business looks as strong as it performs.',
    icon: 'Palette',
  },
  {
    title: 'Content Strategy',
    desc: 'Editorial plans and assets engineered to educate prospects and support search growth.',
    icon: 'FileText',
  },
] as const

export const STORY_SERVICES = [
  {
    id: 'web',
    title: 'Website Development',
    line: 'Your digital foundation. Built to convert, not just look good.',
    detail:
      'Performance budgets, mobile-first UX, semantic structure, and lead paths on every page. Your site becomes a sales asset from launch day.',
  },
  {
    id: 'seo',
    title: 'SEO',
    line: 'Get found when buyers are searching for what you sell.',
    detail:
      'Technical fixes, keyword strategy, local optimization, and content clusters designed to compound visibility month over month.',
  },
  {
    id: 'social',
    title: 'Social Media Marketing',
    line: 'Content that earns attention and starts conversations.',
    detail:
      'Platform-native posts, reels, and campaigns aligned to your offer so social drives DMs, calls, and form fills—not vanity likes.',
  },
  {
    id: 'ads',
    title: 'Paid Ads',
    line: 'Paid traffic with purpose, tracking, and landing pages that convert.',
    detail:
      'Google and Meta campaigns wired to analytics and offers. Every click mapped to an outcome you can measure.',
  },
] as const

export const RESULTS_STORIES = [
  {
    headline: 'From invisible to discoverable',
    body: 'Businesses that had no meaningful online presence started receiving enquiries from Google within weeks of launch — not months of waiting.',
  },
  {
    headline: 'Visibility that compounds',
    body: 'SEO and content work that builds month over month, turning search into a reliable channel rather than a one-time spike.',
  },
  {
    headline: 'Partnership, not handoff',
    body: 'Clients stay because we optimize after launch — growth treated as a system, not a deliverable checklist.',
  },
] as const

export const WHY_CHOOSE = [
  {
    title: 'Fast Turnaround',
    desc: 'Structured sprints and clear milestones — launch weeks, not quarters of drift.',
    icon: 'Zap',
  },
  {
    title: 'Growth Focused Strategy',
    desc: 'Every deliverable ties to leads, rankings, or revenue — not vanity metrics.',
    icon: 'Target',
  },
  {
    title: 'Personalized Support',
    desc: 'Direct access to people who know your business, not ticket queues.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Long Term Partnership',
    desc: 'We optimize after launch because growth is a system, not a one time project.',
    icon: 'Handshake',
  },
] as const

export const INSIGHTS = [
  {
    title: 'Why Your Website Is Not Generating Leads',
    excerpt: 'Five conversion killers hiding on most small business homepages and how to fix them.',
    tag: 'Web Growth',
    date: 'May 2026',
  },
  {
    title: 'Local SEO Playbook for 2026',
    excerpt: 'Google Business Profile, reviews, and geo pages that actually move the map pack.',
    tag: 'SEO',
    date: 'Apr 2026',
  },
  {
    title: 'Social Content That Drives Enquiries',
    excerpt: 'Stop posting for likes. Build a content rhythm engineered for DMs and form fills.',
    tag: 'Social',
    date: 'Mar 2026',
  },
] as const

export const GROWTH_ECOSYSTEM = [
  { id: 'website', label: 'Website', desc: 'Your digital foundation' },
  { id: 'visibility', label: 'Visibility', desc: 'Found when people search' },
  { id: 'leads', label: 'Leads', desc: 'Enquiries that matter' },
  { id: 'customers', label: 'Customers', desc: 'Trusted and chosen' },
] as const

export const HOOK_JOURNEY = [
  { stage: 'Attention', outcome: 'Visitors' },
  { stage: 'Engagement', outcome: 'Conversations' },
  { stage: 'Trust', outcome: 'Customers' },
  { stage: 'Growth', outcome: 'Repeat revenue' },
] as const

export const PROJECTS = [
  {
    id: 'a1-sydney-build',
    name: 'A1 Sydney Build',
    category: 'Construction · Sydney',
    summary:
      'Professional website for a Sydney building company — structured to showcase services, build trust, and make enquiry simple.',
    services: ['Website Development', 'SEO Foundations', 'Mobile UX'],
  },
  {
    id: 'sabrtel',
    name: 'Sabrtel',
    category: 'Business Services',
    summary:
      'Full website build with SEO foundations. The client started receiving enquiries from Google within two months of launch.',
    services: ['Website Development', 'SEO', 'Lead Capture'],
  },
  {
    id: 'stud-and-beam',
    name: 'Stud and Beam',
    category: 'Ongoing Partnership',
    summary:
      'Website management and SEO strategy that improved search visibility and streamlined their digital presence over time.',
    services: ['Website Maintenance', 'SEO Strategy', 'Ongoing Support'],
  },
] as const

export const PHILOSOPHY_POINTS = [
  {
    title: 'Built-in, not bolted-on',
    body: 'Most agencies charge separately for design, SEO, performance, and conversion. DigiHooks believes great websites should already be built with strong SEO, performance, usability, and conversion principles from day one.',
  },
  {
    title: 'Growth without complexity',
    body: 'We help businesses grow without unnecessary layers, bloated retainers, or jargon-heavy processes. Clear systems. Measurable outcomes.',
  },
  {
    title: 'Philosophy over personality',
    body: 'DigiHooks is a philosophy-driven growth studio — not a one-person show. Our approach is the product: hook attention, earn trust, engineer growth.',
  },
] as const
