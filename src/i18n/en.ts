export const en = {
  lang: "en",
  meta: {
    title: "hack@latam",
    description:
      "48-hour hackathon for latin american builders. late april 2026. social impact only.",
  },
  header: {
    tagline: "let's code for a better world.",
    subtitle: "late april 2026 · 48 hours · 150 builders",
  },
  nav: {
    who: "who we are",
    trackRecord: "track record",
    event: "the event",
    different: "what makes this different",
    tracks: "tracks",
    judging: "judging",
    whySponsor: "why sponsor",
    idealSponsors: "ideal sponsors",
    ask: "the ask",
    whatYouGet: "what you get",
    contact: "contact us",
    communities: "communities",
  },
  who: {
    title: "who we are",
    content:
      '<span class="text-og">indies.la</span> is a collective of 1.5k+ latin american builders at the intersection of indie hackers, yc-backed founders, and open-source.',
  },
  prevEvents: {
    title: "some events we've hosted:",
    photos: [
      { src: "/prev/dam1.webp", subtitle: "founders, inc and YC-backed founders back in their hometowns", rotate: -3 },
      { src: "/prev/dam3.webp", subtitle: "indie game goes viral worldwide & social entrepreneurship project gets funded by large corporation", rotate: 1 },
      { src: "/prev/dam2.webp", subtitle: "40 builders, 24 hours, unlimited energy drinks.", rotate: 2 },
    ],
  },
  trackRecord: {
    title: "track record",
    items: [
      "1.5k+ members across latam",
      "monthly events with around 75 in-person attendees",
      "companies in the community have shipped real products and raised capital",
      "strong overlap with top-tier ecosystems (y combinator, platanus, chilean startup scene)",
    ],
  },
  event: {
    title: "the event",
    items: [
      "150 hand-picked participants, ages 20–35",
      "software engineers, cs students, founders, high-agency techies",
      "application-based selection to filter for people who actually ship",
    ],
    goal: "goal: turn latent talent into founders building for latin america.",
  },
  different: {
    title: "what makes this different",
    items: [
      "deployed software only",
      "clear tracks tied to real problems",
      "judges with domain expertise",
      "follow-ups with teams that show traction",
    ],
    outro: "most hackathons optimize for photos, not outcomes.",
    outroHighlight: "we seek real change.",
  },
  tracks: {
    title: "tracks",
    intro:
      "four fault lines in latam. each track is about data, coordination, and real-time action.",
    items: [
      {
        name: "1. transparency & corruption",
        desc: "use data to expose, track, and reduce corruption.",
      },
      {
        name: "2. community welfare",
        desc: "software for organizing, helping, and acting together.",
      },
      {
        name: "3. public safety & emergency response",
        desc: "real-time information and coordination for crises.",
      },
      {
        name: "4. environment & climate risk",
        desc: "track, predict, and mitigate environmental damage.",
      },
    ],
  },
  judging: {
    title: "judging",
    items: [
      "real problem, clearly targeted",
      "working product, not just mockups",
      "path to continue post-hackathon",
      "impact potential in latin american context",
    ],
    outro: "each track judged by practitioners in the field.",
  },
  whySponsor: {
    title: "why sponsor",
    intro:
      "you want access to the people who actually build the future of latam.",
    items: [
      { label: "talent access:", desc: "direct line to 150 vetted builders" },
      {
        label: "product usage:",
        desc: "your tools battle-tested by real teams",
      },
      {
        label: "brand positioning:",
        desc: "visible support for execution-focused talent",
      },
      {
        label: "recruiting pipeline:",
        desc: "early relationship with future founders",
      },
      { label: "case studies:", desc: "real projects using your stack" },
    ],
  },
  idealSponsors: {
    title: "ideal sponsors",
    items: [
      "devtools: ai, infra, hosting, apis, data, observability",
      "cloud and infra providers",
      "vcs and funds serious about latam dealflow",
      "companies with strong engineering cultures looking for talent",
    ],
    outro:
      "if your product is better in the hands of sharp builders, this is where to put it.",
  },
  ask: {
    title: "the ask",
    items: [
      {
        highlight: "$5k usd total",
        text: "prize pool target (contributions of any size welcome)",
      },
      {
        highlight: "credits",
        text: "for infrastructure, ai tooling, databases, and related dev tools",
      },
    ],
  },
  whatYouGet: {
    title: "what you get",
    items: [
      {
        label: "branding:",
        desc: "logo on all event materials, website, and streams",
      },
      {
        label: '"powered by" mentions:',
        desc: 'optional track sponsorship (e.g. "best AI use powered by [you]")',
      },
      {
        label: "stage time:",
        desc: "intro session or workshop to showcase your product",
      },
      {
        label: "talent directory:",
        desc: "opt-in contact info from 150 vetted builders",
      },
    ],
    outro: "measurable, not fuzzy.",
  },
  contact: {
    title: "limited sponsor slots.",
    emailLabel: "email me at:",
    linkedinLabel: "or reach out on linkedin",
    linkedinText: "reno on linkedin",
  },
  sponsors: {
    communitiesTitle: "communities",
    cta: "lead a community?<br />be part of hack@latam!",
    communities: [
      {
        logo: "/communities/502.png",
        name: "502",
        desc: "making guatemala a tech hub",
      },
      {
        logo: "/communities/ai-playgrounds.png",
        name: "ai playgrounds",
        desc: "AI for everyone",
      },
      {
        logo: "/communities/nucleo.png",
        name: "nucleo",
        desc: "AI systems for founders",
      },
      {
        logo: "/communities/the-hackathon-company.png",
        name: "the hackathon company",
        desc: "orchestrate world-class hackathons",
        logoSmall: true,
      },
      {
        logo: "/communities/crafterstation.svg",
        name: "crafterstation",
        desc: "open-source first, builders community",
      },
    ],
  },
} as const;

export type Content = typeof en;
