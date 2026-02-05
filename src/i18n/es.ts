import type { Content } from "./en";

export const es = {
  lang: "es",
  meta: {
    title: "hack@latam",
    description:
      "hackathon de 48 horas para builders latinoamericanos. finales de abril 2026. solo impacto social.",
  },
  header: {
    tagline: "programemos un mundo mejor.",
    subtitle: "finales de abril 2026 · 48 horas · 150 builders",
  },
  nav: {
    who: "quiénes somos",
    trackRecord: "trayectoria",
    event: "el evento",
    different: "qué nos hace distintos",
    tracks: "tracks",
    judging: "evaluación",
    whySponsor: "por qué sponsorear",
    idealSponsors: "sponsors ideales",
    ask: "lo que pedimos",
    whatYouGet: "lo que recibes",
    contact: "contacto",
    communities: "comunidades",
  },
  who: {
    title: "quiénes somos",
    content:
      '<span class="text-og">indies.la</span> es un colectivo de 1.5k+ builders latinoamericanos donde convergen indie hackers, founders respaldados por yc y open-source.',
  },
  prevEvents: {
    title: "algunos eventos que hemos organizado:",
    photos: [
      {
        src: "/prev/dam1.webp",
        subtitle:
          "fundadores de YC y founders, inc de visitando sus ciudades natales",
        rotate: -3,
      },
      {
        src: "/prev/dam3.webp",
        subtitle:
          "juego indie se viraliza mundialmente y proyecto social es financiado por gran corporación",
        rotate: 1,
      },
      {
        src: "/prev/dam2.webp",
        subtitle: "40 builders, 24 horas, bebidas energéticas ilimitadas.",
        rotate: 2,
      },
    ],
  },
  trackRecord: {
    title: "trayectoria",
    items: [
      "1.5k+ miembros en toda latam",
      "eventos mensuales con alrededor de 75 asistentes presenciales",
      "empresas de la comunidad han lanzado productos reales y levantado capital",
      "fuerte conexión con ecosistemas top (y combinator, platanus, escena startup chilena)",
    ],
  },
  event: {
    title: "el evento",
    items: [
      "150 participantes seleccionados a mano, entre 20 y 35 años",
      "ingenieros de software, estudiantes de cs, founders, techies de alta agencia",
      "selección por postulación para filtrar gente que realmente shipea",
    ],
    goal: "objetivo: convertir talento latente en founders que construyan para latinoamérica.",
  },
  different: {
    title: "qué nos hace distintos",
    items: [
      "solo software deployeado",
      "tracks claros ligados a problemas reales",
      "jueces con expertise de dominio",
      "seguimiento con equipos que muestren tracción",
    ],
    outro:
      "la mayoría de los hackathons optimizan para fotos, no para resultados.",
    outroHighlight: "nosotros buscamos cambio real.",
  },
  tracks: {
    title: "tracks",
    intro:
      "cuatro fracturas en latam. cada track trata sobre datos, coordinación y acción en tiempo real.",
    items: [
      {
        name: "1. transparencia y corrupción",
        desc: "usar datos para exponer, rastrear y reducir la corrupción.",
      },
      {
        name: "2. bienestar comunitario",
        desc: "software para organizar, ayudar y actuar juntos.",
      },
      {
        name: "3. seguridad pública y emergencias",
        desc: "información en tiempo real y coordinación para crisis.",
      },
      {
        name: "4. medio ambiente y riesgo climático",
        desc: "rastrear, predecir y mitigar el daño ambiental.",
      },
    ],
  },
  judging: {
    title: "evaluación",
    items: [
      "problema real, claramente enfocado",
      "producto funcionando, no solo mockups",
      "camino para continuar post-hackathon",
      "potencial de impacto en contexto latinoamericano",
    ],
    outro: "cada track evaluado por practitioners del área.",
  },
  whySponsor: {
    title: "por qué sponsorear",
    intro:
      "quieres acceso a la gente que realmente construye el futuro de latam.",
    items: [
      {
        label: "acceso a talento:",
        desc: "línea directa a 150 builders verificados",
      },
      {
        label: "uso de producto:",
        desc: "tus herramientas probadas en batalla por equipos reales",
      },
      {
        label: "posicionamiento de marca:",
        desc: "apoyo visible a talento enfocado en ejecución",
      },
      {
        label: "pipeline de recruiting:",
        desc: "relación temprana con futuros founders",
      },
      { label: "casos de estudio:", desc: "proyectos reales usando tu stack" },
    ],
  },
  idealSponsors: {
    title: "sponsors ideales",
    items: [
      "devtools: ai, infra, hosting, apis, datos, observabilidad",
      "proveedores de cloud e infraestructura",
      "vcs y fondos serios sobre dealflow en latam",
      "empresas con culturas de ingeniería fuertes buscando talento",
    ],
    outro:
      "si tu producto es mejor en manos de builders capaces, este es el lugar.",
  },
  ask: {
    title: "lo que pedimos",
    items: [
      {
        highlight: "$5k usd en total",
        text: "meta de prize pool (aportes de cualquier tamaño son bienvenidos)",
      },
      {
        highlight: "créditos",
        text: "para infraestructura, herramientas de ai, bases de datos y dev tools relacionadas",
      },
    ],
  },
  whatYouGet: {
    title: "lo que recibes",
    items: [
      {
        label: "branding:",
        desc: "logo en todos los materiales del evento, sitio web y streams",
      },
      {
        label: 'menciones "powered by":',
        desc: 'sponsorship opcional de track (ej: "mejor uso de AI powered by [tú]")',
      },
      {
        label: "tiempo en escenario:",
        desc: "sesión intro o workshop para mostrar tu producto",
      },
      {
        label: "directorio de talento:",
        desc: "info de contacto opt-in de 150 builders verificados",
      },
    ],
    outro: "medible, no difuso.",
  },
  contact: {
    title: "cupos limitados para sponsors.",
    emailLabel: "escríbeme a:",
    linkedinLabel: "o contáctame en linkedin",
    linkedinText: "reno en linkedin",
  },
  sponsors: {
    communitiesTitle: "comunidades",
    cta: "lideras una comunidad?<br />sé parte de hack@latam!",
    communities: [
      {
        logo: "/communities/502.png",
        name: "502",
        desc: "haciendo de guatemala un hub tech",
      },
      {
        logo: "/communities/ai-playgrounds.png",
        name: "ai playgrounds",
        desc: "AI para todos",
      },
      {
        logo: "/communities/nucleo.png",
        name: "nucleo",
        desc: "sistemas de AI para founders",
      },
      {
        logo: "/communities/the-hackathon-company.png",
        name: "the hackathon company",
        desc: "orquesta hackathons de clase mundial",
        logoSmall: true,
      },
      {
        logo: "/communities/crafterstation.svg",
        name: "crafterstation",
        desc: "comunidad de builders open-source first",
      },
    ],
  },
} as const satisfies Content;
