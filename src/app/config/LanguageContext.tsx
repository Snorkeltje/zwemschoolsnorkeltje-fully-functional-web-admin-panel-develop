import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Lang = 'nl' | 'en';

// Comprehensive translations for the entire app
const translations: Record<string, Record<Lang, string>> = {
  // ─── Bottom Nav ───
  'nav.home': { nl: 'Thuis', en: 'Home' },
  'nav.book': { nl: 'Boeken', en: 'Book' },
  'nav.cards': { nl: 'Kaarten', en: 'Cards' },
  'nav.profile': { nl: 'Profiel', en: 'Profile' },

  // ─── Common ───
  'common.back': { nl: 'Terug', en: 'Back' },
  'common.save': { nl: 'Opslaan', en: 'Save' },
  'common.cancel': { nl: 'Annuleren', en: 'Cancel' },
  'common.confirm': { nl: 'Bevestigen', en: 'Confirm' },
  'common.delete': { nl: 'Verwijderen', en: 'Delete' },
  'common.edit': { nl: 'Bewerken', en: 'Edit' },
  'common.search': { nl: 'Zoeken', en: 'Search' },
  'common.loading': { nl: 'Laden...', en: 'Loading...' },
  'common.all': { nl: 'Alle', en: 'All' },
  'common.details': { nl: 'Details', en: 'Details' },
  'common.or': { nl: 'of', en: 'or' },
  'common.yes': { nl: 'Ja', en: 'Yes' },
  'common.no': { nl: 'Nee', en: 'No' },
  'common.close': { nl: 'Sluiten', en: 'Close' },
  'common.next': { nl: 'Volgende', en: 'Next' },
  'common.previous': { nl: 'Vorige', en: 'Previous' },
  'common.send': { nl: 'Versturen', en: 'Send' },
  'common.active': { nl: 'Actief', en: 'Active' },
  'common.total': { nl: 'Totaal', en: 'Total' },
  'common.add': { nl: 'Toevoegen', en: 'Add' },
  'common.view': { nl: 'Bekijken', en: 'View' },

  // ─── Greetings ───
  'greeting.morning': { nl: 'Goedemorgen', en: 'Good morning' },
  'greeting.afternoon': { nl: 'Goedemiddag', en: 'Good afternoon' },
  'greeting.evening': { nl: 'Goedenavond', en: 'Good evening' },

  // ─── Login Screen ───
  'login.welcome': { nl: 'Welkom terug 👋', en: 'Welcome back 👋' },
  'login.subtitle': { nl: 'Log in om uw zwemlessen te beheren.', en: 'Log in to manage your swimming lessons.' },
  'login.email': { nl: 'E-mailadres', en: 'Email address' },
  'login.email.placeholder': { nl: 'uw@email.nl', en: 'your@email.com' },
  'login.password': { nl: 'Wachtwoord', en: 'Password' },
  'login.forgot': { nl: 'Wachtwoord vergeten?', en: 'Forgot password?' },
  'login.button': { nl: 'Inloggen', en: 'Log in' },
  'login.instructor': { nl: '🏊‍♂️ Inloggen als instructeur', en: '🏊‍♂️ Log in as instructor' },
  'login.no_account': { nl: 'Nog geen account?', en: "Don't have an account?" },
  'login.register': { nl: 'Registreren', en: 'Register' },

  // ─── Home Screen ───
  'home.children': { nl: 'kinderen', en: 'children' },
  'home.next_lesson': { nl: 'Volgende les', en: 'Next lesson' },
  'home.quick_actions': { nl: 'Snelle acties', en: 'Quick actions' },
  'home.book_lesson': { nl: 'Les boeken', en: 'Book lesson' },
  'home.reservations': { nl: 'Reserveringen', en: 'Reservations' },
  'home.punch_cards': { nl: 'Knipkaarten', en: 'Punch cards' },
  'home.progress': { nl: 'Voortgang', en: 'Progress' },
  'home.progress_of': { nl: 'Voortgang', en: 'Progress' },
  'home.recent': { nl: 'Recent', en: 'Recent' },
  'home.all': { nl: 'Alles', en: 'All' },
  'home.lesson_reminder': { nl: 'Lesherinnering', en: 'Lesson reminder' },
  'home.progress_updated': { nl: 'Voortgang bijgewerkt', en: 'Progress updated' },
  'home.punch_card': { nl: 'Knipkaart', en: 'Punch card' },
  'home.lessons_remaining': { nl: 'lessen resterend', en: 'lessons remaining' },
  'home.order_card': { nl: 'Knipkaart bestellen', en: 'Order punch card' },
  'home.from_price': { nl: 'Vanaf €114 — direct starten', en: 'From €114 — start now' },
  'home.learn_swim': { nl: 'Leren zwemmen', en: 'Learn to swim' },
  'home.with_fun': { nl: 'met plezier! 🏊', en: 'with fun! 🏊' },
  'home.satisfied_parents': { nl: 'tevreden ouders · Bekijk reviews', en: 'satisfied parents · View reviews' },
  'home.level': { nl: 'Niveau', en: 'Level' },
  'home.breathing': { nl: 'Ademhaling', en: 'Breathing' },
  'home.floating': { nl: 'Drijven', en: 'Floating' },
  'home.frontcrawl': { nl: 'Borstcrawl', en: 'Front crawl' },
  'home.completed': { nl: 'afgerond', en: 'completed' },
  'home.tomorrow': { nl: 'Morgen', en: 'Tomorrow' },
  'home.now': { nl: 'Nu', en: 'Now' },
  'home.still': { nl: 'Nog', en: 'Still' },

  // ─── Profile Screen ───
  'profile.title': { nl: 'Profiel', en: 'Profile' },
  'profile.lessons': { nl: 'Lessen', en: 'Lessons' },
  'profile.credits': { nl: 'Credits', en: 'Credits' },
  'profile.my_children': { nl: 'Mijn kinderen', en: 'My children' },
  'profile.edit_profile': { nl: 'Profiel bewerken', en: 'Edit profile' },
  'profile.notifications': { nl: 'Meldingen', en: 'Notifications' },
  'profile.dark_mode': { nl: 'Donkere modus', en: 'Dark mode' },
  'profile.language': { nl: 'Taal', en: 'Language' },
  'profile.diplomas': { nl: "Zwemdiploma's", en: 'Swimming diplomas' },
  'profile.invoices': { nl: 'Facturen & Bonnen', en: 'Invoices & Receipts' },
  'profile.emergency': { nl: 'Noodcontacten', en: 'Emergency contacts' },
  'profile.about': { nl: 'Over Snorkeltje', en: 'About Snorkeltje' },
  'profile.contact': { nl: 'Contact', en: 'Contact' },
  'profile.reviews': { nl: 'Reviews & Beoordelingen', en: 'Reviews & Ratings' },
  'profile.follow_us': { nl: 'Volg ons', en: 'Follow us' },
  'profile.help': { nl: 'Helpcentrum & FAQ', en: 'Help center & FAQ' },
  'profile.terms': { nl: 'Algemene Voorwaarden', en: 'Terms & Conditions' },
  'profile.logout': { nl: 'Uitloggen', en: 'Log out' },
  'profile.on': { nl: 'AAN', en: 'ON' },
  'profile.off': { nl: 'UIT', en: 'OFF' },

  // ─── Book Lesson ───
  'book.title': { nl: 'Boek een les', en: 'Book a lesson' },
  'book.subtitle': { nl: 'Kies het type les dat u wilt boeken.', en: 'Choose the type of lesson you want to book.' },
  'book.fixed_slot': { nl: 'Vast tijdstip', en: 'Fixed slot' },
  'book.fixed_slot_desc': { nl: 'Uw vaste wekelijkse zwemles op het gereserveerde tijdslot.', en: 'Your weekly swimming lesson at the reserved time slot.' },
  'book.extra_1on1': { nl: 'Extra 1-op-1', en: 'Extra 1-on-1' },
  'book.extra_1on1_desc': { nl: 'Boek een extra of inhaalles — privé met één instructeur.', en: 'Book an extra or catch-up lesson — private with one instructor.' },
  'book.extra_1on2': { nl: 'Extra 1-op-2', en: 'Extra 1-on-2' },
  'book.extra_1on2_desc': { nl: 'Extra of inhaalles gedeeld met één ander kind.', en: 'Extra or catch-up lesson shared with one other child.' },
  'book.holiday': { nl: 'Vakantielessen', en: 'Holiday lessons' },
  'book.holiday_desc': { nl: 'Intensieve lessen tijdens schoolvakanties — snel resultaat!', en: 'Intensive lessons during school holidays — fast results!' },
  'book.rule_14days': { nl: '14-dagenregel', en: '14-day rule' },
  'book.rule_14days_desc': { nl: 'Beschikbare plekken worden binnen 14 dagen opengesteld.', en: 'Available spots open up within 14 days.' },

  // ─── Reservations ───
  'reservations.title': { nl: 'Mijn Reserveringen', en: 'My Reservations' },
  'reservations.upcoming': { nl: 'Gepland', en: 'Upcoming' },
  'reservations.history': { nl: 'Geschiedenis', en: 'History' },
  'reservations.fixed': { nl: 'Vast', en: 'Fixed' },
  'reservations.extra': { nl: 'Extra', en: 'Extra' },
  'reservations.holiday': { nl: 'Vakantie', en: 'Holiday' },
  'reservations.no_lessons': { nl: 'Geen lessen gevonden', en: 'No lessons found' },
  'reservations.book_now': { nl: 'Nu boeken', en: 'Book now' },

  // ─── Punch Cards ───
  'cards.title': { nl: 'Mijn Knipkaarten', en: 'My Punch Cards' },
  'cards.active_card': { nl: 'Actieve knipkaart', en: 'Active punch card' },
  'cards.remaining': { nl: 'Resterend', en: 'Remaining' },
  'cards.used': { nl: 'Gebruikt', en: 'Used' },
  'cards.buy_new': { nl: 'Nieuwe kaart kopen', en: 'Buy new card' },
  'cards.order': { nl: 'Bestellen', en: 'Order' },

  // ─── Child Progress ───
  'progress.title': { nl: 'Voortgang', en: 'Progress' },
  'progress.level': { nl: 'Niveau', en: 'Level' },
  'progress.skills': { nl: 'Vaardigheden', en: 'Skills' },
  'progress.steps': { nl: 'Stappen', en: 'Steps' },
  'progress.completed': { nl: 'Voltooid', en: 'Completed' },
  'progress.in_progress': { nl: 'Bezig', en: 'In progress' },
  'progress.not_started': { nl: 'Nog niet gestart', en: 'Not started' },

  // ─── Notifications ───
  'notif.title': { nl: 'Meldingen', en: 'Notifications' },
  'notif.today': { nl: 'Vandaag', en: 'Today' },
  'notif.earlier': { nl: 'Eerder', en: 'Earlier' },
  'notif.mark_read': { nl: 'Alles gelezen', en: 'Mark all read' },

  // ─── Chat ───
  'chat.title': { nl: 'Berichten', en: 'Messages' },
  'chat.type_message': { nl: 'Typ een bericht...', en: 'Type a message...' },
  'chat.online': { nl: 'Online', en: 'Online' },

  // ─── FAQ ───
  'faq.title': { nl: 'Veelgestelde vragen', en: 'FAQ' },
  'faq.search': { nl: 'Zoek een vraag...', en: 'Search a question...' },
  'faq.booking': { nl: 'Boeken', en: 'Booking' },
  'faq.payment': { nl: 'Betaling', en: 'Payment' },
  'faq.lessons': { nl: 'Lessen', en: 'Lessons' },
  'faq.account': { nl: 'Account', en: 'Account' },

  // ─── About ───
  'about.title': { nl: 'Over Zwemschool Snorkeltje', en: 'About Swimming School Snorkeltje' },
  'about.tagline': { nl: 'Nu en later, vol vertrouwen in het water!', en: 'Now and later, full of confidence in the water!' },
  'about.reviews': { nl: 'reviews', en: 'reviews' },
  'about.attention': { nl: 'Aandacht', en: 'Attention' },
  'about.speed': { nl: 'Snelheid', en: 'Speed' },
  'about.clarity': { nl: 'Duidelijkheid', en: 'Clarity' },
  'about.who_walter': { nl: 'Wie is Walter?', en: 'Who is Walter?' },
  'about.walter_role': { nl: 'Oprichter & Hoofd Instructeur', en: 'Founder & Head Instructor' },
  'about.walter_bio': { nl: 'Walter startte Zwemschool Snorkeltje vanuit een duidelijke visie: elk kind verdient persoonlijke aandacht in een veilige omgeving om te leren zwemmen. Met jarenlange ervaring als zweminstructeur zag hij dat de standaard groepslessen niet altijd het gewenste resultaat opleveren. Daarom biedt Snorkeltje exclusief 1-op-1 en 1-op-2 zwemlessen aan.', en: 'Walter started Swimming School Snorkeltje with a clear vision: every child deserves personal attention in a safe environment to learn to swim. With years of experience as a swimming instructor, he saw that standard group lessons don\'t always achieve the desired results. That\'s why Snorkeltje exclusively offers 1-on-1 and 1-on-2 swimming lessons.' },
  'about.mission_vision': { nl: 'Missie & Visie', en: 'Mission & Vision' },
  'about.our_mission': { nl: 'Onze Missie', en: 'Our Mission' },
  'about.mission_text': { nl: 'Elk kind in Nederland leert zwemmen op een manier die bij hem of haar past. Met persoonlijke aandacht, kleine groepen en enthousiaste instructeurs zorgen wij dat kinderen snel én veilig leren zwemmen.', en: 'Every child in the Netherlands learns to swim in a way that suits them. With personal attention, small groups and enthusiastic instructors, we ensure children learn to swim quickly and safely.' },
  'about.our_vision': { nl: 'Onze Visie', en: 'Our Vision' },
  'about.vision_text': { nl: 'Een wereld waarin elk kind vol vertrouwen het water in gaat. Wij geloven dat zwemmen een levensvaardigheid is die met plezier en op het tempo van het kind geleerd moet worden.', en: 'A world where every child enters the water with full confidence. We believe swimming is a life skill that should be learned with fun and at the child\'s own pace.' },
  'about.why_snorkeltje': { nl: 'Waarom Snorkeltje?', en: 'Why Snorkeltje?' },
  'about.personal_lessons': { nl: 'Persoonlijke 1-op-1 lessen', en: 'Personal 1-on-1 lessons' },
  'about.personal_desc': { nl: 'Maximaal 2 leerlingen per les voor de beste resultaten', en: 'Maximum 2 students per lesson for the best results' },
  'about.certified': { nl: 'Gecertificeerde instructeurs', en: 'Certified instructors' },
  'about.certified_desc': { nl: 'Al onze instructeurs zijn gediplomeerd en ervaren', en: 'All our instructors are certified and experienced' },
  'about.fast_results': { nl: 'Snel resultaat', en: 'Fast results' },
  'about.fast_desc': { nl: 'Gemiddeld 40% sneller dan traditionele zwemlessen', en: 'On average 40% faster than traditional swimming lessons' },
  'about.locations': { nl: '7+ locaties in Nederland', en: '7+ locations in the Netherlands' },
  'about.locations_desc': { nl: 'De Bilt, Garderen, Mierlo, Nijkerk, Wolfheze, Dordrecht, Soest', en: 'De Bilt, Garderen, Mierlo, Nijkerk, Wolfheze, Dordrecht, Soest' },
  'about.fun_first': { nl: 'Plezier staat voorop', en: 'Fun comes first' },
  'about.fun_desc': { nl: 'Kinderen leren zwemmen door spel en positieve ervaring', en: 'Children learn to swim through play and positive experience' },
  'about.in_numbers': { nl: 'Snorkeltje in cijfers', en: 'Snorkeltje in numbers' },
  'about.diplomas_issued': { nl: "Zwemdiploma's uitgereikt", en: 'Swimming diplomas issued' },
  'about.locations_nl': { nl: 'Locaties in NL', en: 'Locations in NL' },
  'about.avg_rating': { nl: 'Gemiddelde beoordeling', en: 'Average rating' },
  'about.experience': { nl: 'Jaar ervaring', en: 'Years of experience' },
  'about.company_info': { nl: 'Bedrijfsgegevens', en: 'Company information' },
  'about.kvk': { nl: 'KvK-nummer', en: 'Chamber of Commerce' },
  'about.vat': { nl: 'BTW-nummer', en: 'VAT number' },
  'about.founded': { nl: 'Opgericht', en: 'Founded' },
  'about.owner': { nl: 'Eigenaar', en: 'Owner' },

  // ─── Contact ───
  'contact.title': { nl: 'Contact', en: 'Contact' },
  'contact.subtitle': { nl: 'Neem gerust contact met ons op', en: 'Feel free to contact us' },
  'contact.call': { nl: 'Bellen', en: 'Call' },
  'contact.email': { nl: 'E-mail', en: 'Email' },
  'contact.whatsapp': { nl: 'WhatsApp', en: 'WhatsApp' },
  'contact.hours': { nl: 'Bereikbaarheid', en: 'Availability' },
  'contact.mon_fri': { nl: 'Maandag – Vrijdag', en: 'Monday – Friday' },
  'contact.saturday': { nl: 'Zaterdag', en: 'Saturday' },
  'contact.sunday': { nl: 'Zondag', en: 'Sunday' },
  'contact.closed': { nl: 'Gesloten', en: 'Closed' },
  'contact.our_locations': { nl: 'Onze locaties', en: 'Our locations' },
  'contact.send_message': { nl: 'Stuur een bericht', en: 'Send a message' },
  'contact.name': { nl: 'Naam', en: 'Name' },
  'contact.name_placeholder': { nl: 'Uw volledige naam', en: 'Your full name' },
  'contact.email_placeholder': { nl: 'uw@email.nl', en: 'your@email.com' },
  'contact.subject': { nl: 'Onderwerp', en: 'Subject' },
  'contact.subject_placeholder': { nl: 'Waar gaat het over?', en: 'What is it about?' },
  'contact.message': { nl: 'Bericht', en: 'Message' },
  'contact.message_placeholder': { nl: 'Typ hier uw bericht...', en: 'Type your message here...' },
  'contact.sent': { nl: 'Verstuurd!', en: 'Sent!' },
  'contact.sent_desc': { nl: 'We nemen zo snel mogelijk contact met u op.', en: 'We will contact you as soon as possible.' },

  // ─── Reviews ───
  'reviews.title': { nl: 'Reviews & Beoordelingen', en: 'Reviews & Ratings' },
  'reviews.subtitle': { nl: 'Wat ouders over ons zeggen', en: 'What parents say about us' },
  'reviews.helpful': { nl: 'vonden dit nuttig', en: 'found this helpful' },

  // ─── Waitlist ───
  'waitlist.title': { nl: 'Wachtlijst', en: 'Waitlist' },
  'waitlist.join': { nl: 'Aanmelden', en: 'Join' },
  'waitlist.position': { nl: 'Positie', en: 'Position' },

  // ─── Settings ───
  'settings.title': { nl: 'Instellingen', en: 'Settings' },
  'settings.language_changed': { nl: 'Taal gewijzigd', en: 'Language changed' },

  // ─── Cancellation ───
  'cancel.standard': { nl: '24 uur van tevoren', en: '24 hours in advance' },
  'cancel.holiday': { nl: '96 uur van tevoren', en: '96 hours in advance' },
  'cancel.policy': { nl: 'Annuleringsbeleid', en: 'Cancellation policy' },

  // ─── Onboarding ───
  'onboarding.skip': { nl: 'Overslaan', en: 'Skip' },
  'onboarding.get_started': { nl: 'Aan de slag', en: 'Get started' },
  'onboarding.title1': { nl: 'Welkom bij Snorkeltje', en: 'Welcome to Snorkeltje' },
  'onboarding.desc1': { nl: 'De beste zwemschool van Nederland met persoonlijke aandacht.', en: 'The best swimming school in the Netherlands with personal attention.' },
  'onboarding.title2': { nl: 'Boek makkelijk', en: 'Book easily' },
  'onboarding.desc2': { nl: 'Plan lessen, bekijk beschikbaarheid en beheer alles op één plek.', en: 'Plan lessons, check availability and manage everything in one place.' },
  'onboarding.title3': { nl: 'Volg de voortgang', en: 'Track progress' },
  'onboarding.desc3': { nl: 'Zie precies hoe uw kind groeit van beginner tot diplomazwemmer.', en: 'See exactly how your child grows from beginner to diploma swimmer.' },

  // ─── Splash ───
  'splash.loading': { nl: 'Laden...', en: 'Loading...' },

  // ─── Registration ───
  'register.title': { nl: 'Registreren', en: 'Register' },
  'register.first_name': { nl: 'Voornaam', en: 'First name' },
  'register.last_name': { nl: 'Achternaam', en: 'Last name' },
  'register.phone': { nl: 'Telefoonnummer', en: 'Phone number' },
  'register.create': { nl: 'Account aanmaken', en: 'Create account' },
  'register.have_account': { nl: 'Heeft u al een account?', en: 'Already have an account?' },

  // ─── Forgot Password ───
  'forgot.title': { nl: 'Wachtwoord vergeten', en: 'Forgot password' },
  'forgot.desc': { nl: 'Voer uw e-mailadres in en we sturen u een herstellink.', en: 'Enter your email and we\'ll send you a reset link.' },
  'forgot.send_link': { nl: 'Herstellink versturen', en: 'Send reset link' },
  'forgot.back_login': { nl: 'Terug naar inloggen', en: 'Back to login' },

  // ─── Instructor ───
  'instructor.home': { nl: 'Instructeur Dashboard', en: 'Instructor Dashboard' },
  'instructor.today': { nl: 'Vandaag', en: 'Today' },
  'instructor.lessons_today': { nl: 'Lessen vandaag', en: 'Lessons today' },
  'instructor.schedule': { nl: 'Rooster', en: 'Schedule' },
  'instructor.students': { nl: 'Leerlingen', en: 'Students' },
  'instructor.availability': { nl: 'Beschikbaarheid', en: 'Availability' },

  // ─── Months/Days ───
  'month.jan': { nl: 'januari', en: 'January' },
  'month.feb': { nl: 'februari', en: 'February' },
  'month.mar': { nl: 'maart', en: 'March' },
  'month.apr': { nl: 'april', en: 'April' },
  'month.may': { nl: 'mei', en: 'May' },
  'month.jun': { nl: 'juni', en: 'June' },
  'month.jul': { nl: 'juli', en: 'July' },
  'month.aug': { nl: 'augustus', en: 'August' },
  'month.sep': { nl: 'september', en: 'September' },
  'month.oct': { nl: 'oktober', en: 'October' },
  'month.nov': { nl: 'november', en: 'November' },
  'month.dec': { nl: 'december', en: 'December' },
  'day.mon': { nl: 'Maandag', en: 'Monday' },
  'day.tue': { nl: 'Dinsdag', en: 'Tuesday' },
  'day.wed': { nl: 'Woensdag', en: 'Wednesday' },
  'day.thu': { nl: 'Donderdag', en: 'Thursday' },
  'day.fri': { nl: 'Vrijdag', en: 'Friday' },
  'day.sat': { nl: 'Zaterdag', en: 'Saturday' },
  'day.sun': { nl: 'Zondag', en: 'Sunday' },

  // ─── Language selector ───
  'lang.title': { nl: 'Kies uw taal', en: 'Choose your language' },
  'lang.dutch': { nl: 'Nederlands', en: 'Dutch' },
  'lang.english': { nl: 'Engels', en: 'English' },
  'lang.changed': { nl: 'Taal gewijzigd naar Engels', en: 'Language changed to English' },

  // ─── Booking Summary ───
  'summary.title': { nl: 'Boekingsoverzicht', en: 'Booking summary' },
  'summary.date': { nl: 'Datum', en: 'Date' },
  'summary.time': { nl: 'Tijd', en: 'Time' },
  'summary.location': { nl: 'Locatie', en: 'Location' },
  'summary.instructor': { nl: 'Instructeur', en: 'Instructor' },
  'summary.type': { nl: 'Type', en: 'Type' },
  'summary.price': { nl: 'Prijs', en: 'Price' },
  'summary.per_lesson': { nl: 'per les', en: 'per lesson' },
  'summary.confirm_booking': { nl: 'Boeking bevestigen', en: 'Confirm booking' },

  // ─── Booking Success ───
  'success.title': { nl: 'Geboekt!', en: 'Booked!' },
  'success.desc': { nl: 'Uw les is succesvol geboekt.', en: 'Your lesson has been successfully booked.' },
  'success.go_home': { nl: 'Naar startscherm', en: 'Go to home' },
  'success.view_reservation': { nl: 'Reservering bekijken', en: 'View reservation' },

  // ─── Holiday ───
  'holiday.title': { nl: 'Vakantielessen', en: 'Holiday lessons' },
  'holiday.cancel_96h': { nl: 'Let op: 96 uur annuleringsbeleid', en: 'Note: 96-hour cancellation policy' },

  // ─── Auto-conversion ───
  'auto.title': { nl: 'Automatische omzetting', en: 'Auto-conversion' },
  'auto.desc': { nl: '1-op-1 wordt omgezet naar 1-op-2 met restitutie.', en: '1-on-1 converts to 1-on-2 with refund.' },

  // ─── Practice at Home ───
  'practice.title': { nl: 'Oefenen thuis', en: 'Practice at home' },
  'practice.subtitle': { nl: 'Tips en oefeningen voor thuis', en: 'Tips and exercises for home' },

  // ─── Edit Profile ───
  'edit.title': { nl: 'Profiel bewerken', en: 'Edit profile' },
  'edit.first_name': { nl: 'Voornaam', en: 'First name' },
  'edit.last_name': { nl: 'Achternaam', en: 'Last name' },
  'edit.email': { nl: 'E-mailadres', en: 'Email address' },
  'edit.phone': { nl: 'Telefoonnummer', en: 'Phone number' },

  // ─── Payment ───
  'payment.title': { nl: 'Betaalgeschiedenis', en: 'Payment history' },
  'payment.method': { nl: 'Betaalmethode', en: 'Payment method' },
  'payment.paid': { nl: 'Betaald', en: 'Paid' },
  'payment.pending': { nl: 'In afwachting', en: 'Pending' },

  // ─── Terms ───
  'terms.title': { nl: 'Algemene Voorwaarden', en: 'Terms & Conditions' },

  // ─── Zwemdiploma ───
  'diploma.title': { nl: "Zwemdiploma's", en: 'Swimming Diplomas' },

  // ─── Invoice ───
  'invoice.title': { nl: 'Facturen & Bonnen', en: 'Invoices & Receipts' },

  // ─── Emergency ───
  'emergency.title': { nl: 'Noodcontacten', en: 'Emergency Contacts' },

  // ─── Waitlist Status ───
  'waitlist_status.title': { nl: 'Wachtlijst status', en: 'Waitlist status' },

  // ─── Add Child ───
  'child.add_title': { nl: 'Kind toevoegen', en: 'Add child' },
  'child.name': { nl: 'Naam kind', en: "Child's name" },
  'child.age': { nl: 'Leeftijd', en: 'Age' },
  'child.year': { nl: 'jaar', en: 'years' },

  // ─── Offline ───
  'offline.title': { nl: 'Offline modus', en: 'Offline mode' },
  'offline.desc': { nl: 'U bent momenteel offline.', en: 'You are currently offline.' },

  // ─── Monthly Report ───
  'report.title': { nl: 'Maandrapport', en: 'Monthly report' },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'nl',
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('snorkeltje_lang');
      return (saved === 'en' ? 'en' : 'nl') as Lang;
    } catch {
      return 'nl';
    }
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('snorkeltje_lang', newLang);
    } catch {}
  }, []);

  const t = useCallback((key: string): string => {
    const entry = translations[key];
    if (!entry) return key; // Fallback to key if not found
    return entry[lang] || entry['nl'] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
