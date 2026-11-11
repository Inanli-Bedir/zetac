// Portfolio translations (merged into the global `translations` object at runtime).
// Kept separate from project-i18n.js on purpose — this powers the new
// Websites / Apps / Marketing & Social Media portfolio, not the legacy project pages.
//
// All text here is professional PLACEHOLDER content for fictional example clients.
// Replace the strings per slug (e.g. 'portfolio.meridian-interiors.name') with real
// client details as they become available — the structure does not need to change.
const portfolioTranslations = {
  en: {
    'portfolio.tag': 'Our Work',
    'portfolio.title': 'Selected Projects',
    'portfolio.desc': 'A look at recent work for our clients — websites, apps, and ongoing social media management.',
    'portfolio.note': 'These are a few selected examples of our work. Get in touch if you\'d like to see more case studies from a specific industry.',

    'portfolio.cat.websites.title': 'Websites',
    'portfolio.cat.websites.desc': 'Custom-built marketing websites for local businesses.',
    'portfolio.cat.apps.title': 'Apps',
    'portfolio.cat.apps.desc': 'Mobile apps built around how our client\'s business runs day to day.',
    'portfolio.cat.marketing.title': 'Marketing & Social Media',
    'portfolio.cat.marketing.desc': 'Ongoing content, community, and campaign management for our clients.',

    'portfolio.card.view': 'View Project',
    'portfolio.client': 'Client',
    'portfolio.back': 'Back to Services',
    'portfolio.overview': 'Overview',
    'portfolio.gallery': 'Gallery',
    'portfolio.cta': 'Start a Similar Project',

    'portfolio.label.tech': 'Technologies Used',
    'portfolio.label.platforms': 'Platforms',
    'portfolio.label.value': 'Business Value',
    'portfolio.label.results': 'Performance & Results',
    'portfolio.label.features': 'Key Features',
    'portfolio.label.services': 'What We Manage',

    'portfolio.link.visitWebsite': 'Visit Website',
    'portfolio.link.appStore': 'View on the App Store',
    'portfolio.link.googlePlay': 'View on Google Play',
    'portfolio.link.instagram': 'View on Instagram',
    'portfolio.link.facebook': 'View on Facebook',
    'portfolio.link.tiktok': 'View on TikTok',

    // Meridian Interiors — website
    'portfolio.meridian-interiors.name': 'Meridian Interiors',
    'portfolio.meridian-interiors.kicker': 'Interior Design Studio',
    'portfolio.meridian-interiors.tagline': 'Marketing website for a boutique interior design studio',
    'portfolio.meridian-interiors.overview': 'We designed and built a modern marketing website for Meridian Interiors, an interior design studio specializing in residential and boutique commercial projects. The site presents their portfolio, design philosophy, and services in a clean, editorial layout that reflects the studio\'s aesthetic, and gives potential clients an easy way to get in touch.',
    'portfolio.meridian-interiors.highlight': 'The new website replaced an outdated one-page site with a structured, professional presence that showcases finished projects in detail and makes it easy for visitors to request a consultation — turning more site visits into qualified inquiries.',
    'portfolio.meridian-interiors.f1': 'Portfolio gallery organized by project type',
    'portfolio.meridian-interiors.f2': 'Individual project pages with photo sets and descriptions',
    'portfolio.meridian-interiors.f3': 'Consultation request form with automatic email notification',
    'portfolio.meridian-interiors.f4': 'SEO-friendly page structure for local search visibility',
    'portfolio.meridian-interiors.f5': 'Fast-loading, optimized image galleries',
    'portfolio.meridian-interiors.f6': 'Fully responsive design for mobile and tablet visitors',

    // Nordholz Café — website
    'portfolio.nordholz-cafe.name': 'Nordholz Café',
    'portfolio.nordholz-cafe.kicker': 'Café & Restaurant',
    'portfolio.nordholz-cafe.tagline': 'Website for a neighborhood café',
    'portfolio.nordholz-cafe.overview': 'Nordholz Café needed a warm, welcoming website that matches the feel of the space itself. We built a site with a digital menu, the café\'s story, opening hours, and a simple table reservation request form — everything a visitor needs before walking through the door.',
    'portfolio.nordholz-cafe.highlight': 'The website gives Nordholz Café a professional online presence that answers the most common visitor questions instantly — menu, hours, location — and captures reservation requests directly, reducing phone calls during busy service hours.',
    'portfolio.nordholz-cafe.f1': 'Digital menu with categories and pricing',
    'portfolio.nordholz-cafe.f2': 'Online table reservation request form',
    'portfolio.nordholz-cafe.f3': 'Integrated map and directions',
    'portfolio.nordholz-cafe.f4': 'Opening hours and holiday notices',
    'portfolio.nordholz-cafe.f5': 'Photo gallery of the space, drinks, and dishes',
    'portfolio.nordholz-cafe.f6': 'Mobile-first responsive design',

    // Pulseon Coach — app (member-facing)
    'portfolio.pulseon-coach.name': 'Pulseon Coach',
    'portfolio.pulseon-coach.kicker': 'Fitness — Member App',
    'portfolio.pulseon-coach.client': 'Pulseon Fitness',
    'portfolio.pulseon-coach.tagline': 'Member app for a fitness studio group',
    'portfolio.pulseon-coach.overview': 'Pulseon Coach is the member-facing mobile app we built for Pulseon Fitness, a group of fitness studios. Members use it to book classes, track their workouts, and stay up to date with studio announcements — all from their phone, without needing the front desk.',
    'portfolio.pulseon-coach.highlight': 'The app reduced front-desk booking calls and no-shows by letting members book, reschedule, and get reminders directly on their phone, while giving Pulseon a direct channel to communicate with their member base.',
    'portfolio.pulseon-coach.f1': 'Class booking and scheduling',
    'portfolio.pulseon-coach.f2': 'Push notifications for class reminders and changes',
    'portfolio.pulseon-coach.f3': 'Personal workout and progress tracking',
    'portfolio.pulseon-coach.f4': 'Membership and payment overview',
    'portfolio.pulseon-coach.f5': 'In-app studio announcements and news',

    // Pulseon Studio — app (staff-facing)
    'portfolio.pulseon-studio.name': 'Pulseon Studio',
    'portfolio.pulseon-studio.kicker': 'Fitness — Staff App',
    'portfolio.pulseon-studio.client': 'Pulseon Fitness',
    'portfolio.pulseon-studio.tagline': 'Staff app for managing daily studio operations',
    'portfolio.pulseon-studio.overview': 'Pulseon Studio is the companion app we built for Pulseon Fitness\' staff, used at the front desk and by instructors to manage classes, check in members, and keep track of daily operations across multiple studio locations.',
    'portfolio.pulseon-studio.highlight': 'By giving staff a single tool for scheduling, check-ins, and attendance, Pulseon Studio cut down on manual paperwork and gave managers real-time visibility into how each studio location is running.',
    'portfolio.pulseon-studio.f1': 'Class and instructor scheduling',
    'portfolio.pulseon-studio.f2': 'Fast member check-in at the front desk',
    'portfolio.pulseon-studio.f3': 'Attendance and capacity overview per class',
    'portfolio.pulseon-studio.f4': 'Staff roles and access management',
    'portfolio.pulseon-studio.f5': 'Real-time dashboard across studio locations',

    // Vantage Realty — marketing & social media
    'portfolio.vantage-realty.name': 'Vantage Realty',
    'portfolio.vantage-realty.kicker': 'Real Estate Agency',
    'portfolio.vantage-realty.tagline': 'Ongoing social media management for a growing real estate agency',
    'portfolio.vantage-realty.overview': 'We manage the day-to-day social media presence for Vantage Realty, a real estate agency expanding into new neighborhoods. Our work covers content creation, posting, community management, and paid campaigns across their core platforms.',
    'portfolio.vantage-realty.highlight': 'Since taking over their social media, we\'ve grown Vantage Realty\'s engaged audience and generated a steady stream of qualified listing inquiries through targeted campaigns. [Placeholder — replace with real growth and lead numbers once available.]',
    'portfolio.vantage-realty.f1': 'Property showcase photo and reel content',
    'portfolio.vantage-realty.f2': 'Daily posting and community engagement',
    'portfolio.vantage-realty.f3': 'Targeted listing promotion campaigns',
    'portfolio.vantage-realty.f4': 'Content calendar and brand voice guidelines',
    'portfolio.vantage-realty.f5': 'Branded post templates and visual editing',
    'portfolio.vantage-realty.f6': 'Monthly performance reporting',

    // Loop & Bloom — marketing & social media
    'portfolio.loop-bloom.name': 'Loop & Bloom',
    'portfolio.loop-bloom.kicker': 'Boutique Florist',
    'portfolio.loop-bloom.tagline': 'Social media and marketing for a boutique florist',
    'portfolio.loop-bloom.overview': 'We handle social media management and marketing for Loop & Bloom, a boutique flower studio known for seasonal arrangements. Our focus is visual storytelling — showcasing the studio\'s craft and driving local customer growth through consistent, on-brand content.',
    'portfolio.loop-bloom.highlight': 'Loop & Bloom\'s social channels have grown a loyal local following, with seasonal and holiday campaigns consistently driving in-store and online orders. [Placeholder — replace with real growth and order numbers once available.]',
    'portfolio.loop-bloom.f1': 'Seasonal collection photography and reels',
    'portfolio.loop-bloom.f2': 'Behind-the-scenes and studio process content',
    'portfolio.loop-bloom.f3': 'Holiday and seasonal promotion campaigns',
    'portfolio.loop-bloom.f4': 'Content calendar and aesthetic guidelines',
    'portfolio.loop-bloom.f5': 'Custom templates and product photo editing',
    'portfolio.loop-bloom.f6': 'Local audience ad targeting',
  },
  de: {
    'portfolio.tag': 'Unsere Arbeit',
    'portfolio.title': 'Ausgewählte Projekte',
    'portfolio.desc': 'Ein Einblick in aktuelle Projekte für unsere Kunden — Websites, Apps und laufende Social-Media-Betreuung.',
    'portfolio.note': 'Dies sind einige ausgewählte Beispiele unserer Arbeit. Melden Sie sich gerne, wenn Sie weitere Referenzen aus einer bestimmten Branche sehen möchten.',

    'portfolio.cat.websites.title': 'Websites',
    'portfolio.cat.websites.desc': 'Individuell entwickelte Websites für lokale Unternehmen.',
    'portfolio.cat.apps.title': 'Apps',
    'portfolio.cat.apps.desc': 'Mobile Apps, zugeschnitten auf den Arbeitsalltag unseres Kunden.',
    'portfolio.cat.marketing.title': 'Marketing & Social Media',
    'portfolio.cat.marketing.desc': 'Laufende Betreuung von Content, Community und Kampagnen für unsere Kunden.',

    'portfolio.card.view': 'Projekt ansehen',
    'portfolio.client': 'Kunde',
    'portfolio.back': 'Zurück zu Leistungen',
    'portfolio.overview': 'Überblick',
    'portfolio.gallery': 'Galerie',
    'portfolio.cta': 'Ähnliches Projekt starten',

    'portfolio.label.tech': 'Verwendete Technologien',
    'portfolio.label.platforms': 'Plattformen',
    'portfolio.label.value': 'Geschäftlicher Nutzen',
    'portfolio.label.results': 'Ergebnisse & Performance',
    'portfolio.label.features': 'Hauptfunktionen',
    'portfolio.label.services': 'Was wir übernehmen',

    'portfolio.link.visitWebsite': 'Website besuchen',
    'portfolio.link.appStore': 'Im App Store ansehen',
    'portfolio.link.googlePlay': 'Bei Google Play ansehen',
    'portfolio.link.instagram': 'Auf Instagram ansehen',
    'portfolio.link.facebook': 'Auf Facebook ansehen',
    'portfolio.link.tiktok': 'Auf TikTok ansehen',

    // Meridian Interiors — Website
    'portfolio.meridian-interiors.name': 'Meridian Interiors',
    'portfolio.meridian-interiors.kicker': 'Inneneinrichtungsstudio',
    'portfolio.meridian-interiors.tagline': 'Website für ein Inneneinrichtungsstudio',
    'portfolio.meridian-interiors.overview': 'Wir haben eine moderne Unternehmenswebsite für Meridian Interiors entwickelt, ein Inneneinrichtungsstudio mit Fokus auf Wohn- und Gewerbeprojekte im gehobenen Segment. Die Seite präsentiert Portfolio, Designphilosophie und Leistungen in einem klaren, editorialen Layout, das die Ästhetik des Studios widerspiegelt und Interessenten eine einfache Kontaktaufnahme ermöglicht.',
    'portfolio.meridian-interiors.highlight': 'Die neue Website ersetzt eine veraltete Einzelseiten-Webpräsenz durch einen strukturierten, professionellen Auftritt, der abgeschlossene Projekte im Detail zeigt und Besucher einfach zu einer Beratungsanfrage führt — mit mehr qualifizierten Anfragen als Ergebnis.',
    'portfolio.meridian-interiors.f1': 'Portfolio-Galerie, sortiert nach Projektart',
    'portfolio.meridian-interiors.f2': 'Einzelne Projektseiten mit Fotostrecken und Beschreibungen',
    'portfolio.meridian-interiors.f3': 'Beratungsanfrage-Formular mit automatischer E-Mail-Benachrichtigung',
    'portfolio.meridian-interiors.f4': 'SEO-freundliche Seitenstruktur für lokale Sichtbarkeit',
    'portfolio.meridian-interiors.f5': 'Schnell ladende, optimierte Bildergalerien',
    'portfolio.meridian-interiors.f6': 'Vollständig responsives Design für Mobilgeräte und Tablets',

    // Nordholz Café — Website
    'portfolio.nordholz-cafe.name': 'Nordholz Café',
    'portfolio.nordholz-cafe.kicker': 'Café & Restaurant',
    'portfolio.nordholz-cafe.tagline': 'Website für ein Nachbarschaftscafé',
    'portfolio.nordholz-cafe.overview': 'Nordholz Café brauchte eine warme, einladende Website, die zur Atmosphäre des Cafés passt. Wir haben eine Website mit digitaler Speisekarte, der Geschichte des Cafés, den Öffnungszeiten und einem einfachen Tischreservierungs-Formular umgesetzt — alles, was Gäste vor dem Besuch wissen möchten.',
    'portfolio.nordholz-cafe.highlight': 'Die Website gibt Nordholz Café einen professionellen Online-Auftritt, der die häufigsten Fragen der Gäste sofort beantwortet — Speisekarte, Öffnungszeiten, Lage — und Reservierungsanfragen direkt entgegennimmt, was das Telefon während des Betriebs entlastet.',
    'portfolio.nordholz-cafe.f1': 'Digitale Speisekarte mit Kategorien und Preisen',
    'portfolio.nordholz-cafe.f2': 'Online-Formular für Tischreservierungen',
    'portfolio.nordholz-cafe.f3': 'Integrierte Karte mit Wegbeschreibung',
    'portfolio.nordholz-cafe.f4': 'Öffnungszeiten und Hinweise zu Feiertagen',
    'portfolio.nordholz-cafe.f5': 'Fotogalerie von Räumlichkeiten, Getränken und Speisen',
    'portfolio.nordholz-cafe.f6': 'Mobile-first responsives Design',

    // Pulseon Coach — App (für Mitglieder)
    'portfolio.pulseon-coach.name': 'Pulseon Coach',
    'portfolio.pulseon-coach.kicker': 'Fitness — Mitglieder-App',
    'portfolio.pulseon-coach.client': 'Pulseon Fitness',
    'portfolio.pulseon-coach.tagline': 'Mitglieder-App für eine Fitnessstudio-Gruppe',
    'portfolio.pulseon-coach.overview': 'Pulseon Coach ist die App für Studiomitglieder, die wir für Pulseon Fitness entwickelt haben, eine Gruppe von Fitnessstudios. Mitglieder buchen darüber Kurse, verfolgen ihr Training und bleiben über Neuigkeiten aus dem Studio informiert — direkt vom Smartphone aus, ohne den Empfang kontaktieren zu müssen.',
    'portfolio.pulseon-coach.highlight': 'Die App reduziert Buchungsanrufe am Empfang und No-Shows, da Mitglieder Kurse direkt im Smartphone buchen, umbuchen und Erinnerungen erhalten — gleichzeitig erhält Pulseon einen direkten Kanal zur Kommunikation mit den Mitgliedern.',
    'portfolio.pulseon-coach.f1': 'Kursbuchung und Terminplanung',
    'portfolio.pulseon-coach.f2': 'Push-Benachrichtigungen für Kurserinnerungen und Änderungen',
    'portfolio.pulseon-coach.f3': 'Persönliches Trainings- und Fortschritts-Tracking',
    'portfolio.pulseon-coach.f4': 'Übersicht über Mitgliedschaft und Zahlungen',
    'portfolio.pulseon-coach.f5': 'Ankündigungen und News direkt in der App',

    // Pulseon Studio — App (für Mitarbeitende)
    'portfolio.pulseon-studio.name': 'Pulseon Studio',
    'portfolio.pulseon-studio.kicker': 'Fitness — Mitarbeiter-App',
    'portfolio.pulseon-studio.client': 'Pulseon Fitness',
    'portfolio.pulseon-studio.tagline': 'Mitarbeiter-App für den Studioalltag',
    'portfolio.pulseon-studio.overview': 'Pulseon Studio ist die Begleit-App für das Personal von Pulseon Fitness, die am Empfang und von Trainer:innen genutzt wird, um Kurse zu verwalten, Mitglieder einzuchecken und den Betrieb über mehrere Studiostandorte hinweg im Blick zu behalten.',
    'portfolio.pulseon-studio.highlight': 'Mit einem einzigen Tool für Terminplanung, Check-in und Anwesenheit reduziert Pulseon Studio den manuellen Papieraufwand und gibt Führungskräften Echtzeit-Einblick in jeden Studiostandort.',
    'portfolio.pulseon-studio.f1': 'Kurs- und Trainerplanung',
    'portfolio.pulseon-studio.f2': 'Schneller Mitglieder-Check-in am Empfang',
    'portfolio.pulseon-studio.f3': 'Anwesenheits- und Auslastungsübersicht je Kurs',
    'portfolio.pulseon-studio.f4': 'Verwaltung von Mitarbeiterrollen und Zugriffsrechten',
    'portfolio.pulseon-studio.f5': 'Echtzeit-Dashboard über alle Studiostandorte',

    // Vantage Realty — Marketing & Social Media
    'portfolio.vantage-realty.name': 'Vantage Realty',
    'portfolio.vantage-realty.kicker': 'Immobilienagentur',
    'portfolio.vantage-realty.tagline': 'Laufende Social-Media-Betreuung für eine wachsende Immobilienagentur',
    'portfolio.vantage-realty.overview': 'Wir betreuen die laufende Social-Media-Präsenz von Vantage Realty, einer Immobilienagentur, die in neue Stadtteile expandiert. Unsere Arbeit umfasst Content-Erstellung, Posting, Community-Management und bezahlte Kampagnen auf den wichtigsten Plattformen.',
    'portfolio.vantage-realty.highlight': 'Seit wir die Social-Media-Kanäle betreuen, ist die aktive Reichweite von Vantage Realty gewachsen, und gezielte Kampagnen erzeugen kontinuierlich qualifizierte Anfragen zu Immobilienangeboten. [Platzhalter — durch reale Wachstums- und Lead-Zahlen ersetzen, sobald verfügbar.]',
    'portfolio.vantage-realty.f1': 'Foto- und Reel-Content für Immobilienangebote',
    'portfolio.vantage-realty.f2': 'Tägliches Posting und Community-Management',
    'portfolio.vantage-realty.f3': 'Gezielte Kampagnen zur Angebotsbewerbung',
    'portfolio.vantage-realty.f4': 'Content-Kalender und Markenrichtlinien',
    'portfolio.vantage-realty.f5': 'Gebrandete Post-Vorlagen und Bildbearbeitung',
    'portfolio.vantage-realty.f6': 'Monatliches Performance-Reporting',

    // Loop & Bloom — Marketing & Social Media
    'portfolio.loop-bloom.name': 'Loop & Bloom',
    'portfolio.loop-bloom.kicker': 'Blumenstudio',
    'portfolio.loop-bloom.tagline': 'Social Media und Marketing für ein Blumenstudio',
    'portfolio.loop-bloom.overview': 'Wir übernehmen Social-Media-Management und Marketing für Loop & Bloom, ein Blumenstudio, das für saisonale Arrangements bekannt ist. Der Fokus liegt auf visuellem Storytelling — wir zeigen das Handwerk des Studios und fördern lokales Kundenwachstum durch konsistenten, markengerechten Content.',
    'portfolio.loop-bloom.highlight': 'Die Social-Media-Kanäle von Loop & Bloom haben eine treue lokale Fangemeinde aufgebaut, saisonale Kampagnen und Feiertagsaktionen sorgen regelmäßig für Bestellungen im Laden und online. [Platzhalter — durch reale Wachstums- und Bestellzahlen ersetzen, sobald verfügbar.]',
    'portfolio.loop-bloom.f1': 'Fotos und Reels saisonaler Kollektionen',
    'portfolio.loop-bloom.f2': 'Einblicke hinter die Kulissen und in den Studioalltag',
    'portfolio.loop-bloom.f3': 'Feiertags- und Saisonkampagnen',
    'portfolio.loop-bloom.f4': 'Content-Kalender und Stilrichtlinien',
    'portfolio.loop-bloom.f5': 'Individuelle Vorlagen und Produktfoto-Bearbeitung',
    'portfolio.loop-bloom.f6': 'Lokales Zielgruppen-Targeting für Anzeigen',
  },
};

Object.keys(portfolioTranslations).forEach((lang) => {
  Object.assign(translations[lang], portfolioTranslations[lang]);
});
