import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Short reads & curated bookmarks',
  },
  footer: {
    tagline: 'Social bookmarking for fast readers',
  },
  hero: {
    badge: 'bharatamayu.com bookmarks',
    title: ['Quick links,', 'clear blurbs.'],
    description:
      'Discover hand-picked stories and resources on bharatamayu.com—built for people who skim, save, and come back without wading through image-heavy feeds.',
    primaryCta: {
      label: 'Open bookmarks',
      href: '/sbm',
    },
    secondaryCta: {
      label: 'Browse profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search bookmarks, profiles, and more',
    focusLabel: 'Focus',
    featureCardBadge: 'Short-read shelf',
    featureCardTitle: 'Headlines and excerpts stay readable at a glance.',
    featureCardDescription:
      'The homepage keeps Social Bookmarking in the spotlight while other tasks stay available from navigation.',
  },
  home: {
    metadata: {
      title: 'bharatamayu.com — social bookmarking for short reads',
      description:
        'Save and scan curated links on bharatamayu.com: tight headlines, short blurbs, and a fast vertical rhythm inspired by short-form video—without the noise.',
      openGraphTitle: 'bharatamayu.com — social bookmarking',
      openGraphDescription:
        'A bookmarking shelf for short content readers. Browse curated links and profiles on bharatamayu.com.',
      keywords: ['bharatamayu', 'social bookmarking', 'short reads', 'curated links', 'bookmark feed'],
    },
    introBadge: 'About bharatamayu.com',
    introTitle: 'Bookmarking that respects your attention.',
    introParagraphs: [
      'bharatamayu.com is a social bookmarking surface where each item leads with a headline and a short excerpt—ideal for readers who want signal without filler.',
      'The layout borrows the pacing of short-form feeds: a vertical stack you can scroll quickly, with lime accents that mark where to look next.',
      'Profiles stay available as a secondary lane so people and publishers remain discoverable without crowding the bookmark-first story.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'SBM-first homepage with a shorts-style reading rail.',
      'Teal and lime system tuned for contrast and scan speed.',
      'Text-forward cards—no thumbnail requirement for the core experience.',
      'Light motion: soft fades and hover lifts, no heavy scripts.',
    ],
    primaryLink: {
      label: 'Browse bookmarks',
      href: '/sbm',
    },
    secondaryLink: {
      label: 'See profiles',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Start on bharatamayu.com',
    title: 'Save links, scan blurbs, and follow curators in one place.',
    description:
      'Join bharatamayu.com to bookmark what matters and browse a calmer feed that still moves at the speed you expect from short content.',
    primaryCta: {
      label: 'Create an account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Image sharing and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, curators, and identity-focused pages on bharatamayu.com.',
  },
  sbm: {
    title: 'Social bookmarking — short reads',
    description: 'Browse curated bookmarks, headlines, and excerpts saved by the bharatamayu.com community.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open image sharing', href: '/image-sharing' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Image sharing highlights visual posts, galleries, and story-led content where imagery plays the lead role.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles on bharatamayu.com highlight the people and brands behind saved links—trust anchors for a bookmark-first community.',
      'Use them to follow curators, see what they collect, and jump into their public bookmark shelf when you want more context.',
      'This lane stays secondary to Social Bookmarking on the homepage but remains one click away in navigation.',
    ],
    links: [
      { label: 'Open bookmarks', href: '/sbm' },
      { label: 'Home', href: '/' },
    ],
  },
  sbm: {
    title: 'Social bookmarking — the bharatamayu.com shelf',
    paragraphs: [
      'This is the primary lane: curated links with short excerpts so you can scan a lot in little time—similar energy to short-form video, but text-first.',
      'Entries are organized for research and revisit: categories, clear typography, and lime accents that guide the eye down the stack.',
      'Save what matters, share the URL, and keep your reading list on bharatamayu.com without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
