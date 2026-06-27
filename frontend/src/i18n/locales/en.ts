import type { Dict } from '@/i18n'

/** English dictionary. Universal fallback for any non-Spanish locale. */
export const en: Dict = {
  // ─── Navbar ───────────────────────────────────────────────────────────────
  'nav.home': 'Home',
  'nav.library': 'Library',
  'nav.guide': 'Your Personalized Guide',
  'nav.tryCamera': 'Try the camera',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.aria.primary': 'Main navigation',
  'nav.aria.mobile': 'Mobile menu',
  'nav.aria.brand': 'Munay Map — Home',
  'nav.aria.language': 'Select language',
  'nav.language.search': 'Search language...',
  'nav.language.searchLabel': 'Search language',
  'nav.language.empty': 'No results',
  'nav.language.available': 'Available languages',

  // ─── Footer ─────────────────────────────────────────────────────────────────
  'footer.tagline':
    'Multilingual tourist guide powered by artificial intelligence. Explore Bolivia like never before.',
  'footer.legal': 'Legal information · Contact',
  'footer.navHeading': 'Navigation',
  'footer.poweredBy': 'Powered by',
  'footer.aria.nav': 'Footer navigation',
  'footer.link.home': 'Home',
  'footer.link.library': 'Library',
  'footer.link.quiz': 'Quiz',
  'footer.link.about': 'About us',
  'footer.link.camera': 'Try the camera',
  'footer.copyright': 'Academic project',
  'footer.madeWith': 'Made with care for the 9 departments of Bolivia',

  // ─── Home: problem ──────────────────────────────────────────────────────────
  'home.problem.title': 'The problem we solve',
  'home.problem.body':
    'Bolivia has an immense cultural heritage, but the language barrier and the lack of specialized guides prevent international tourists from accessing the richness of each place. Munay Map removes that barrier: any tourist, in any language, can understand the history right before their eyes.',

  // ─── Home: marquees ─────────────────────────────────────────────────────────
  'home.tech.aria': 'Technologies used',
  'home.tech.vision': 'Image recognition',
  'home.tech.gemini': 'AI-generated explanations',
  'home.tech.tts': 'Audio in your language',
  'home.tech.cloud': 'Cloud infrastructure',
  'home.depts.aria': 'Departments of Bolivia',

  // ─── Home: final CTA ────────────────────────────────────────────────────────
  'home.cta.title': 'Not sure where to start',
  'home.cta.body':
    'Answer a few questions and get a personalized itinerary with the sites, flavors, and experiences that match your travel style.',
  'home.cta.button': 'Start the quiz — 2 minutes',

  // ─── Hero ───────────────────────────────────────────────────────────────────
  'hero.title': 'Bolivia has a thousand stories to tell.',
  'hero.subtitle':
    'Explore its cultural heritage with artificial intelligence. Recognize sites, understand their history in your language, and discover your ideal trip.',
  'hero.cta.discover': 'Discover',
  'hero.cta.quiz': 'Take the quiz',
  'hero.scroll': 'Explore',

  // ─── Cinematic section ──────────────────────────────────────────────────────
  'cinematic.eyebrow': 'A single gesture',
  'cinematic.title': 'Travel without language barriers',
  'cinematic.body':
    'Point your camera at a temple, a dance, or a dish and receive its story narrated in your language. The distance between you and Bolivian culture shrinks to a single photograph.',
  'cinematic.ghost': 'Living heritage',

  // ─── Steps / How it works ───────────────────────────────────────────────────
  'steps.title': 'How it works',
  'steps.subtitle':
    'Four steps to turn any corner of Bolivia into a learning experience.',
  'steps.1.title': 'You take a photo',
  'steps.1.desc':
    'Point your camera at any cultural site, monument, typical dish, or element of a Bolivian festivity.',
  'steps.2.title': 'We identify the place',
  'steps.2.desc':
    'Our AI analyzes the image in seconds and matches it against our Bolivian cultural database.',
  'steps.3.title': 'We explain its history',
  'steps.3.desc':
    'You get a detailed AI-generated explanation: origin, cultural meaning, fun facts, and recommendations.',
  'steps.4.title': 'You hear it in your language',
  'steps.4.desc':
    'The explanation is translated and narrated in your preferred language among 40 available. Powered by Google Cloud Text-to-Speech.',

  // ─── Two columns ────────────────────────────────────────────────────────────
  'twocol.aria': 'Places and flavors of Bolivia',
  'twocol.places.title': 'Places to explore',
  'twocol.places.body':
    'From the millennia-old ruins of Tiwanaku to the endless Salar de Uyuni.',
  'twocol.flavors.title': 'Flavors to discover',
  'twocol.flavors.body':
    'Chuño has fed the highlands for 2,000 years. The salteña, the silpancho, the tucumán.',
  'twocol.explore': 'Explore',

  // ─── Stats ──────────────────────────────────────────────────────────────────
  'stats.aria': 'Project statistics',
  'stats.sites': 'Catalogued sites',
  'stats.depts': 'Departments',
  'stats.langs': 'Available languages',
  'stats.years': 'Years of history',

  // ─── Editorial ──────────────────────────────────────────────────────────────
  'editorial.title': 'Technology in the service of culture',
  'editorial.p1':
    'Munay Map combines Vision AI to recognize cultural sites in real time, Gemini to generate rich and culturally accurate explanations, and Text-to-Speech to narrate them in over 40 languages. All from the tourist’s phone camera.',
  'editorial.p2':
    'Bolivian heritage spans more than 2,000 years of history: from the pre-Columbian ruins of Tiwanaku to the carnivals declared World Heritage by UNESCO. Munay Map makes every one of those places accessible to any traveler in the world.',
  'editorial.quote':
    '"Any tourist, in any language, can understand the history right before their eyes."',

  // ─── Testimonials ───────────────────────────────────────────────────────────
  'testimonials.title': 'What travelers say',
  'testimonials.subtitle': 'Illustrative testimonials of the Munay Map experience',
  'testimonials.aria.region': 'Testimonials carousel',
  'testimonials.aria.prev': 'Previous testimonial',
  'testimonials.aria.next': 'Next testimonial',
  'testimonials.aria.dots': 'Navigate between testimonials',
  'testimonials.aria.item': 'Testimonial {n}',
  'testimonials.t1.text':
    '"I arrived at Tiwanaku knowing nothing about the place. I took a photo with the app and within seconds I had the whole history in Japanese. Incredible."',
  'testimonials.t1.country': 'Japan',
  'testimonials.t2.text':
    '"The quiz recommended the Salar de Uyuni and the Carnival of Oruro. I did both and it was the most memorable trip of my life."',
  'testimonials.t2.country': 'Argentina',
  'testimonials.t3.text':
    '"I traveled with my family and the kids were fascinated listening to the stories in their language. The tool is perfect for tourists with children."',
  'testimonials.t3.country': 'Germany',

  // ─── Quiz: flow ─────────────────────────────────────────────────────────────
  'quiz.flow.loading': 'Loading quiz questions...',
  'quiz.flow.progress': 'Question {current} of {total}',
  'quiz.flow.back': '← Back',
  'quiz.flow.next': 'Next →',
  'quiz.flow.finish': 'See my recommendation',
  'quiz.flow.prevAria': 'Previous question',

  // ─── Quiz: result ───────────────────────────────────────────────────────────
  'quiz.result.eyebrow': 'Your personalized guide',
  'quiz.result.summaryFallback':
    'Based on your answers, this is Bolivia tailored to you.',
  'quiz.result.interestsAria': 'Your interests',
  'quiz.result.print': 'Print / save my guide',
  'quiz.result.summaryAria': 'Trip summary',
  'quiz.result.duration': 'Suggested duration',
  'quiz.result.day': 'day',
  'quiz.result.days': 'days',
  'quiz.result.bestSeason': 'Best season',
  'quiz.result.itinerary.title': 'Your optimized itinerary',
  'quiz.result.itinerary.subtitle':
    'A day-by-day route designed for your profile, ordered to minimize travel between regions.',
  'quiz.result.dayLabel': 'Day',
  'quiz.result.viewInLibrary': 'View {name} in the library',
  'quiz.result.row.eat': 'To eat',
  'quiz.result.row.live': 'To experience',
  'quiz.result.row.tip': 'Tip',
  'quiz.result.places.title': 'Places for you',
  'quiz.result.places.sub': 'Tourist sites that match your travel style',
  'quiz.result.food.title': 'What you have to try',
  'quiz.result.food.sub': 'The Bolivian cuisine you’ll adore',
  'quiz.result.food.badge': 'Cuisine',
  'quiz.result.exp.title': 'What you have to experience',
  'quiz.result.exp.sub': 'Dances, festivals, and traditions that match your spirit',
  'quiz.result.exp.dance': 'Dance',
  'quiz.result.exp.festivity': 'Festivity',
  'quiz.result.tips.title': 'Tips for your trip',
  'quiz.result.tips.sub': 'Practical tips selected especially for your profile',
  'quiz.result.cta.text': 'Want to explore more options or retake the quiz?',
  'quiz.result.cta.library': 'Explore the full Library',
  'quiz.result.cta.repeat': 'Retake the quiz',

  // ─── Common / 404 ───────────────────────────────────────────────────────────
  'common.skipToContent': 'Skip to main content',
  'notfound.title': 'Page not found',
  'notfound.body': 'The page you are looking for does not exist.',
  'notfound.back': 'Back to home',
}
