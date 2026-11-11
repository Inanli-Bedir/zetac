// Portfolio / completed-work data — separate from projects-data.js on purpose.
// Add a new client project by adding one object here, one entry to PORTFOLIO_LIST,
// and one <slug>.html detail page under projects/ (copy an existing one as a template).
// Translated text (name, client, tagline, overview, highlight, feature/service bullets)
// lives in portfolio-i18n.js, keyed by slug — e.g. 'portfolio.<slug>.name'.

const PORTFOLIO_CATEGORIES = {
  websites: {
    key: 'websites',
    titleKey: 'portfolio.cat.websites.title',
    descKey: 'portfolio.cat.websites.desc',
  },
  apps: {
    key: 'apps',
    titleKey: 'portfolio.cat.apps.title',
    descKey: 'portfolio.cat.apps.desc',
  },
  marketing: {
    key: 'marketing',
    titleKey: 'portfolio.cat.marketing.title',
    descKey: 'portfolio.cat.marketing.desc',
  },
};

const PORTFOLIO = {
  'meridian-interiors': {
    slug: 'meridian-interiors',
    category: 'websites',
    logo: null, // path to a real logo image later; falls back to initials
    screenshots: [
      '../assets/portfolio/meridian-interiors/shot-1.svg',
      '../assets/portfolio/meridian-interiors/shot-2.svg',
    ],
    tagListKey: 'portfolio.label.tech',
    tags: ['HTML5 / CSS3', 'JavaScript', 'Node.js', 'Responsive Design', 'SEO Basics'],
    highlightLabelKey: 'portfolio.label.value',
    featuresLabelKey: 'portfolio.label.features',
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
    links: [
      { key: 'website', labelKey: 'portfolio.link.visitWebsite', url: '#' },
    ],
  },
  'nordholz-cafe': {
    slug: 'nordholz-cafe',
    category: 'websites',
    logo: null,
    screenshots: [
      '../assets/portfolio/nordholz-cafe/shot-1.svg',
      '../assets/portfolio/nordholz-cafe/shot-2.svg',
    ],
    tagListKey: 'portfolio.label.tech',
    tags: ['HTML5 / CSS3', 'JavaScript', 'Node.js', 'Responsive Design'],
    highlightLabelKey: 'portfolio.label.value',
    featuresLabelKey: 'portfolio.label.features',
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
    links: [
      { key: 'website', labelKey: 'portfolio.link.visitWebsite', url: '#' },
    ],
  },
  'pulseon-coach': {
    slug: 'pulseon-coach',
    category: 'apps',
    logo: null,
    screenshots: [
      '../assets/portfolio/pulseon-coach/shot-1.svg',
      '../assets/portfolio/pulseon-coach/shot-2.svg',
    ],
    tagListKey: 'portfolio.label.platforms',
    tags: ['iOS', 'Android'],
    techListKey: 'portfolio.label.tech',
    tech: ['React Native', 'TypeScript', 'Node.js', 'REST API', 'Push Notifications'],
    highlightLabelKey: 'portfolio.label.value',
    featuresLabelKey: 'portfolio.label.features',
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5'],
    links: [
      { key: 'appstore', labelKey: 'portfolio.link.appStore', url: '#' },
      { key: 'googleplay', labelKey: 'portfolio.link.googlePlay', url: '#' },
    ],
  },
  'pulseon-studio': {
    slug: 'pulseon-studio',
    category: 'apps',
    logo: null,
    screenshots: [
      '../assets/portfolio/pulseon-studio/shot-1.svg',
      '../assets/portfolio/pulseon-studio/shot-2.svg',
    ],
    tagListKey: 'portfolio.label.platforms',
    tags: ['iOS', 'Android'],
    techListKey: 'portfolio.label.tech',
    tech: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL'],
    highlightLabelKey: 'portfolio.label.value',
    featuresLabelKey: 'portfolio.label.features',
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5'],
    links: [
      { key: 'appstore', labelKey: 'portfolio.link.appStore', url: '#' },
      { key: 'googleplay', labelKey: 'portfolio.link.googlePlay', url: '#' },
    ],
  },
  'vantage-realty': {
    slug: 'vantage-realty',
    category: 'marketing',
    logo: null,
    screenshots: [
      '../assets/portfolio/vantage-realty/shot-1.svg',
      '../assets/portfolio/vantage-realty/shot-2.svg',
    ],
    tagListKey: 'portfolio.label.platforms',
    tags: ['Instagram', 'Facebook', 'LinkedIn'],
    highlightLabelKey: 'portfolio.label.results',
    featuresLabelKey: 'portfolio.label.services',
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
    links: [
      { key: 'instagram', labelKey: 'portfolio.link.instagram', url: '#' },
      { key: 'facebook', labelKey: 'portfolio.link.facebook', url: '#' },
    ],
  },
  'loop-bloom': {
    slug: 'loop-bloom',
    category: 'marketing',
    logo: null,
    screenshots: [
      '../assets/portfolio/loop-bloom/shot-1.svg',
      '../assets/portfolio/loop-bloom/shot-2.svg',
    ],
    tagListKey: 'portfolio.label.platforms',
    tags: ['Instagram', 'TikTok', 'Facebook'],
    highlightLabelKey: 'portfolio.label.results',
    featuresLabelKey: 'portfolio.label.services',
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
    links: [
      { key: 'instagram', labelKey: 'portfolio.link.instagram', url: '#' },
      { key: 'tiktok', labelKey: 'portfolio.link.tiktok', url: '#' },
    ],
  },
};

// Order controls how cards appear within each category on the Services page.
const PORTFOLIO_LIST = [
  { slug: 'meridian-interiors', href: 'projects/meridian-interiors.html' },
  { slug: 'nordholz-cafe', href: 'projects/nordholz-cafe.html' },
  { slug: 'pulseon-coach', href: 'projects/pulseon-coach.html' },
  { slug: 'pulseon-studio', href: 'projects/pulseon-studio.html' },
  { slug: 'vantage-realty', href: 'projects/vantage-realty.html' },
  { slug: 'loop-bloom', href: 'projects/loop-bloom.html' },
];
