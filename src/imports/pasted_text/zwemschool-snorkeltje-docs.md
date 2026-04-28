📋 COMPLETE DETAILED DOCUMENTATION — Zwemschool Snorkeltje Reservation System
Website: snorkeltje.i-reserve.net
Platform: i-Reserve! versie 5.41 (Build: 22694.48)
Language: Dutch (nl_NL)

🔷 WEBSITE STRUCTURE — NAVIGATION MENU
The top navigation bar contains the following items:

Homepage → /home
Boek een les → /boek-een-les
Bestel Knipkaart (Dropdown) →

1-op-1 zwemles → /knipkaarten-1-op-1
1-op-2 zwemles → /knipkaarten-1-op-2
1-op-3 zwemles → /knipkaarten-1-op-3
Survival → /knipkaarten-survival
Inschrijfgeld → /knipkaarten-Inschrijfgeld
Wijzigen dag/tijd → /knipkaarten-Wijzigendagtijd
BSO-zwemles → /knipkaarten-bso


Mijn account (Dropdown) →

Mijn knipkaarten → /front?mod=myknipkaarten
Mijn reserveringen (gepland) → /mijn-reserveringen
Mijn reserveringen (geschiedenis) → /mijn-reserveringen-geschiedenis
Mijn profiel → /front?mod=myprofile


Contact → https://www.zwemschoolsnorkeltje.nl/contact/ (external link to main website)
Uitloggen → /front?mod=login&logout=1


📄 PAGE 1: HOMEPAGE (Reserveringspagina)
Page Name: Reserveringspagina Zwemschool Snorkeltje
URL: /home or /
Breadcrumb: Home > Zwemschool Snorkeltje - Reserveren
Page Description/Header Text:
"Boek makkelijk en snel een zwemles, bekijk uw reserveringen, annuleer een reservering, bestel een knipkaart en/of controleer het saldo en de geldigheid van uw knipkaarten, Klik op deze link voor de handleiding van het reserveringssysteem. Klik op deze"
Handleiding Link: Links to a PDF file: /user/media/zwemschool-snorkeltje/files/Handleiding reserveringssysteem.pdf
3 Main Action Cards:
CardTitleDescriptionButton1Boek een lesPlan een standaard zwemles op een vast tijdstip of plan een extra- of een inhaalzwemles op een dag en tijdstip naar keuze."Boek een les" → /boek-een-les2Mijn reserveringenBekijk uw reserveringen, zowel de geplande zwemlessen als de zwemlessen die reeds hebben plaatsgevonden."Mijn reserveringen" → /mijn-reserveringen3Mijn knipkaartenControleer het saldo en de geldigheid van uw knipkaarten."Mijn knipkaarten" → /front?mod=myknipkaarten
Footer: "i-Reserve! versie 5.41 (Build: 22694.48)" with link to https://www.i-reserve.io

📄 PAGE 2: BOEK EEN LES (Book a Lesson)
Page Name: Boek een les
URL: /boek-een-les
Breadcrumb: Home > Zwemschool Snorkeltje - Boek een les
Header Text: "Plan makkelijk en snel een zwemles op een vast tijdstip of plan een extra- of een inhaalzwemles op een dag en tijdstip naar keuze."
4 Booking Option Cards:
CardTitleDescriptionButton1Vast tijdstipPlan een standaard zwemles op een vast tijdstip."Boeken"2Extra zwemles 1-op-1Plan een extra- of een inhaalzwemles 1-op-1 op een dag en tijdstip naar keuze."Boeken"3Extra zwemles 1-op-2Plan een extra- of een inhaalzwemles 1-op-2 op een dag en tijdstip naar keuze."Boeken"4Vakantie zwemlesPlan hier zwemles in tijdens de vakantie."Boeken"

📄 PAGE 2A: VAST TIJDSTIP — Product Selection
Page Name: Index
URL: /front?mod=index&configid=30147
Breadcrumb: Home > Index
Available Products (Fixed Time Slots):
ProductDescriptionButtonNijkerk 1-op-1 dinsdag 12.00 uurVaste lestijd dinsdag 12.00"Reserveren!"Nijkerk 1-op-2 dinsdag 12.30 uurVaste lestijd dinsdag 12.30 1-op-2"Reserveren!"
Each product card shows an image with "BASIS ZWEMLES 1-op-1" or "1-op-2" branding.

📄 PAGE 2A-1: CALENDAR (Kalender) — Date Selection
Page Name: Kalender
URL: /front?mod=calendar&rc=0&product=1
Breadcrumb: Home > Index > Kalender
Header: "KALENDER NIJKERK 1-OP-1 DINSDAG 12.00 UUR"
Functionality:

Shows monthly calendars (current and next month)
Navigation arrows (← →) for previous/next months
"Vandaag" (Today) button to go to current date
Calendar shows week numbers (Wk), and days: ma (Mon), di (Tue), wo (Wed), do (Thu), vr (Fri), za (Sat), zo (Sun)
Green dates = Beschikbaar (Available)
Legenda: Green square = Beschikbaar

Booking Flow: When you click a green date, a side panel appears:
BEVESTIGEN RESERVERING DETAILS Panel:

Product: [product name]
Datum: [selected date]
Time slot button showing "12:00 - 12:30 Vrije plaatsen: 1"
After selecting time: "→ Reserveer" button appears


📄 PAGE 2A-2: CHECKOUT/CONFIRMATION (Gegevens)
Page Name: Gegevens
URL: /front?mod=checkout&rc=0&client=3
Breadcrumb: Home > Index > Kalender > Gegevens
Header: "BEVESTIG"
Section 1 — PRIJSOVERZICHT (Price Overview) Table:
ColumnDescriptionOMSCHRIJVINGProduct descriptionAANTALQuantityVANAF DATUMFrom dateVANAF TIJDFrom timeTOT TIJDUntil timeSUBTOTAALSubtotal (e.g. €39,00)
Shows line items including: the lesson product, knipkaart deduction (negative amount e.g. €-39,00), and a final line with €0,00 total.
Section 2 — DETAILS:

Product: [name]
Vanaf: [date]
Vanaf tijd: [start time]
Tot tijd: [end time]

Section 3 — Personal Information Form (pre-filled from profile):
FieldDescriptionVoornaam kindChild's first nameAchternaam kindChild's last nameGeboortedatum kindChild's date of birth (date picker)Voor+achternaam ouderParent's full nameMobiel (1e contactpersoon)Mobile (1st contact person)E-mailEmail addressExtra tel. nr (2e contactpersoon)Extra phone (2nd contact person)WoonplaatsCity/town of residenceLocatieLocation (dropdown)Type zwemlesSwimming lesson type (dropdown)DagDay (dropdown)Tijdstip zwemlesLesson timeWaar kiezen jullie voor bij uitval collega?What do you choose when colleague is absent? (dropdown)
Section 4 — KEUZE ALS ANDERE KIND(EREN) NIET AANWEZIG ZIJN?

Indien 1-op-2, 1-op-3 of 1-op-4 les (dropdown selection)

Checkbox: "Ik accepteer: algemene voorwaarden" (link to terms)
Action Buttons:

"← Terug" (Back)
"✓ Bevestig" (Confirm)


📄 PAGE 2B: EXTRA ZWEMLES 1-OP-1 — Product Selection
Page Name: Index
URL: /front?mod=index&configid=30171
Breadcrumb: Home > Index
Available Products:
ProductDescriptionButton*Ampt van Nijkerk 1-op-1 extraInhaal- of extra zwemles"Reserveren!"*Bad Hulckesteijn 1-op-1 extraInhaal- of extra zwemles"Reserveren!"*Bad Hulckesteijn 1-op-1 extra 2e instr.Inhaal- of extra zwemles"Reserveren!"
Each product card includes an "EXTRA ZWEMLES 1-op-1" branded image.

📄 PAGE 2C: EXTRA ZWEMLES 1-OP-2 — Product Selection
Page Name: Index
URL: /front?mod=index&configid=30172
Breadcrumb: Home > Index
Available Products:
ProductDescriptionButton*Ampt van Nijkerk 1-op-2 extraInhaal- of extra zwemles"Reserveren!"*Bad Hulckesteijn 1-op-2 extraInhaal- of extra zwemles"Reserveren!"*Bad Hulckesteijn 1-op-2 extra 2e instr.Inhaal- of extra zwemles"Reserveren!"

📄 PAGE 2D: VAKANTIE ZWEMLES (Holiday Swimming Lesson)
Page Name: Pagina
URL: /front?mod=content&configid=30183
Breadcrumb: Home > Pagina
Header Text: Same as Boek een les page.
7 Location Cards:
CardTitleDescriptionButton1Vakantie zwemles Ampt van NijkerkPlan in Ampt van Nijkerk een vakantie zwemles in."Boeken"2Vakantie zwemles Bad HulckesteijnPlan in Bad Hulckesteijn een vakantie zwemles in."Boeken"3Vakantie zwemles De BiltPlan in de Bilt een vakantie zwemles in."Boeken"4Vakantie zwemles DordrechtPlan in Dordrecht een vakantie zwemles in."Boeken"5Vakantie zwemles WolfhezePlan in Wolfheze een vakantie zwemles in."Boeken"6Vakantie zwemles MierloPlan in Mierlo een vakantie zwemles in."Boeken"7Vakantie zwemles GarderenPlan in Garderen een vakantie zwemles in."Boeken"

📄 PAGE 3: KNIPKAARTEN 1-OP-1
Page Name: Knipkaarten 1-op-1
URL: /knipkaarten-1-op-1
Breadcrumb: Home > Knipkaarten 1-op-1
ProductDescriptionPriceValidityButtonKnipkaart voor 10x 1-op-1 zwemlesKnipkaart voor 10x 1-op-1 zwemles380 EUR365 dagen"Bestellen!"Knipkaart voor 5x 1-op-1 zwemlesKnipkaart voor 5x 1-op-1 zwemles190 EUR365 dagen"Bestellen!"Knipkaart voor 3x 1-op-1 zwemlesKnipkaart voor 3x 1-op-1 zwemles114 EUR365 dagen"Bestellen!"
Each card has a branded image (e.g. "10x 1-op-1" with Snorkeltje mascot).

📄 PAGE 4: KNIPKAARTEN 1-OP-2
Page Name: Knipkaarten 1-op-2
URL: /knipkaarten-1-op-2
Breadcrumb: Home > Knipkaarten 1-op-2
ProductPriceValidityButtonKnipkaart voor 10x 1-op-2 zwemles270 EUR365 dagen"Bestellen!"Knipkaart voor 5x 1-op-2 zwemles135 EUR365 dagen"Bestellen!"Knipkaart voor 3x 1-op-2 zwemles81 EUR365 dagen"Bestellen!"

📄 PAGE 5: KNIPKAARTEN 1-OP-3
Page Name: Knipkaarten 1-op-3
URL: /knipkaarten-1-op-3
Breadcrumb: Home > Knipkaarten 1-op-3
ProductPriceValidityButtonKnipkaart voor 10x 1-op-3 zwemles200 EUR365 dagen"Bestellen!"Knipkaart voor 5x 1-op-3 zwemles100 EUR365 dagen"Bestellen!"Knipkaart voor 3x 1-op-3 zwemles60 EUR365 dagen"Bestellen!"

📄 PAGE 6: KNIPKAARTEN SURVIVAL
Page Name: Knipkaarten survival
URL: /knipkaarten-survival
Breadcrumb: Home > Knipkaarten survival
ProductDescriptionPriceValidityButtonPakket van 10 lessenWaardebon voor 10x 1-op-2 zwemles250 EUR84 dagen"Bestellen!"Pakket van 5 lessenWaardebon voor 5x 1-op-2 zwemles125 EUR84 dagen"Bestellen!"Pakket van 3 lessenWaardebon voor 3x 1-op-2 zwemles75 EUR84 dagen"Bestellen!"

📄 PAGE 7: KNIPKAARTEN INSCHRIJFGELD (Registration Fee)
Page Name: Knipkaarten Inschrijfgeld
URL: /knipkaarten-Inschrijfgeld
Breadcrumb: Home > Knipkaarten Inschrijfgeld
ProductPriceValidityButtonKnipkaart voor Inschrijfgeld25 EUR1 dagen"Bestellen!"

📄 PAGE 8: KNIPKAARTEN WIJZIGEN DAG/TIJD (Change Day/Time)
Page Name: Knipkaarten Wijzigendag/tijd
URL: /knipkaarten-Wijzigendagtijd
Breadcrumb: Home > Knipkaarten Wijzigendag/tijd
ProductPriceValidityButtonKnipkaart voor Wijzigen dag of tijd60 EUR1 dagen"Bestellen!"

📄 PAGE 9: KNIPKAARTEN BSO-ZWEMLES
Page Name: Knipkaarten BSO-zwemles
URL: /knipkaarten-bso
Breadcrumb: Home > Knipkaarten BSO-zwemles
ProductPriceValidityButtonKnipkaart voor 12x BSO300 EUR0 dagen"Bestellen!"

📄 PAGE 10: KNIPKAART CHECKOUT (Order Confirmation)
Page Name: Gegevens
URL: /front?mod=checkout&knip_id=[id]
Breadcrumb: Home > Gegevens
Header: "BEVESTIG"
Same form as lesson checkout with:

All personal information fields (pre-filled from profile)
Knipkaart name and price displayed
"← Terug" (Back) and "✓ Bevestig" (Confirm) buttons


📄 PAGE 11: MIJN RESERVERINGEN - GEPLAND (My Reservations - Planned)
Page Name: Mijn Reserveringen
URL: /mijn-reserveringen
Breadcrumb: Home > Mijn Reserveringen
Title: "Mijn Reserveringen - Gepland"
Description: "Bekijk hier uw reserveringen voor de geplande zwemlessen."
Cancellation Policy Text: "Wilt u een zwemles annuleren? Dit kan kosteloos tot 24 uur voor de zwemles, binnen 24 uur kan de les helaas niet meer geannuleerd worden. Annuleren kan door op de reserveringscode te klikken. Heeft u gereserveerd via mollie? Stuur dan de annuleringsbevestiging door naar info@zwemschoolsnorkeltje.nl zodat wij het saldo kunnen terugstorten. Heeft u betaald via een knipkaart dan wordt het saldo automatisch teruggestort."
Tab: "Gepland" (active)
Table Columns: Reservering ID | Product | Vanaf | Vanaf tijd | Tot tijd | Status (naam)
Link at bottom: "Wilt u de zwemlessen die reeds hebben plaatsgevonden, bekijken? Klik op onderstaande button." → "Mijn Reserveringen - Geschiedenis" button

📄 PAGE 12: MIJN RESERVERINGEN - GESCHIEDENIS (My Reservations - History)
Page Name: Mijn Reserveringen - Geschiedenis
URL: /mijn-reserveringen-geschiedenis
Breadcrumb: Home > Mijn Reserveringen - Geschiedenis
Title: "Mijn Reserveringen (Geschiedenis)"
Description: "Bekijk hier uw reserveringen, voor de zwemlessen die reeds hebben plaatsgevonden."
Tab: "Geschiedenis" (active)
Table Columns: Reservering ID | Product | Vanaf | Vanaf tijd | Tot tijd
Link at bottom: "Wilt u de geplande zwemlessen bekijken? Klik op onderstaande button." → "Mijn Reserveringen - Gepland" button

📄 PAGE 13: MIJN KNIPKAARTEN (My Punch Cards)
Page Name: Knipkaarten overzicht
URL: /front?mod=myknipkaarten
Breadcrumb: Home > Knipkaarten overzicht
Title: "Mijn Knipkaarten"
Table Columns: Knipkaart ID (clickable link) | Knip (balance/credits) | Knipkaart (type) | Geldig vanaf (valid from) | Geldig tot en met (valid until)
Functionality: Clicking on Knipkaart ID opens knipkaart details (admin panel).

📄 PAGE 14: MIJN PROFIEL (My Profile)
Page Name: Gebruikersnaam opvragen
URL: /front?mod=myprofile
Breadcrumb: Home > Gebruikersnaam opvragen
Two Sections:
Section 1: Mijn gegevens (My Data)
FieldDescriptionVoornaam kindChild's first nameAchternaam kindChild's last nameGeboortedatum kindChild's date of birthVoor+achternaam ouderParent's full nameMobiel (1e contactpersoon)Mobile (1st contact)E-mailEmail addressExtra tel. nr (2e contactpersoon)Extra phone (2nd contact)WoonplaatsCity/townLocatieLocation (dropdown)Type zwemlesLesson typeDagDayTijdstip zwemlesLesson timeWaar kiezen jullie voor bij uitval collega?Preference when colleague absentKeuze als andere kind(eren) niet aanwezig zijn?Choice when other children absentIndien 1-op-2, 1-op-3 of 1-op-4 lesPreference for group lessons
Buttons:

"✏ Wijzigen" — Opens edit mode with all fields editable + "✕ Annuleer" (Cancel) and "✓ Opslaan" (Save) buttons
"⬇ Downloaden profiel" — Download profile data

Section 2: Mijn gebruikersgegevens (My User Credentials)
FieldDescriptionGravatar afbeeldingProfile image (Gravatar)GebruikersnaamUsernameE-mailEmail address
Buttons:

"✏ Profiel wijzigen" — Edit user profile
"🔒 Wachtwoord wijzigen" — Opens password change modal


📄 PAGE 15: WACHTWOORD WIJZIGEN (Change Password) — Modal Dialog
Triggered from: Mijn Profiel page
Fields:

Huidig wachtwoord (Current password)
Nieuw wachtwoord (New password)
Bevestig wachtwoord (Confirm password)

Buttons:

"✕ Annuleer" (Cancel)
"✓ Bijwerken wachtwoord" (Update password)


📄 PAGE 16: LOGIN / UITLOGGEN PAGE
Page Name: Zwemschool Snorkeltje inloggen
URL: /front?mod=login
When logged in: Shows message "U bent ingelogd met gebruiker [username]" and "🔒 Uitloggen" button.
When logged out: Shows login form (from the admin panel view):

Gebruikersnaam (Username) field
Wachtwoord (Password) field
"Inloggen >>" button
"Geen toegang?" (No access?) link


📄 PAGE 17: CONTACT PAGE (External)
URL: https://www.zwemschoolsnorkeltje.nl/contact/
This is on the main website, not the reservation system.
Header: "Contact"
Breadcrumb: Home | Contact
Section: "Neem contact met ons op!"
Contact Form Fields:

Bel mij terug (Call me back) — checkbox
Mail mij terug (Email me back) — checkbox
Naam ouders (Parent's name)
Voor- en achternaam kind (Child's full name)
E-mailadres (Email address)
Telefoonnummer (Phone number)
Locatie (Location)
Bereikbaarheid (Availability)
Onderwerp (Subject)
Bericht (Message)
"Verzenden" (Send) button

Side Text: "Toch nog een vraag? Geen probleem. Stuur ons een berichtje. Want als we in het water liggen, kunnen we de telefoon natuurlijk niet opnemen."
Footer Info:

Zwemschool Snorkeltje
KvK: 63317419
Locations listed: De Bilt - Utrecht, Garderen, Mierlo, Nijkerk, Wolfheze, Dordrecht, Soest


🔷 COMPLETE FUNCTIONALITY SUMMARY
Core Functionalities:

Lesson Booking (Boek een les) — 4 types: Fixed time, Extra 1-on-1, Extra 1-on-2, Holiday
Punch Card Purchase (Bestel Knipkaart) — 7 categories with various packages
Reservation Management — View planned & past reservations, cancel reservations
Punch Card Management — View balance, validity, and details
Profile Management — Edit personal info, change password, download profile
Authentication — Login/logout system
Contact — Contact form on main website
Calendar Booking System — Interactive calendar with available dates, time slot selection, and confirmation

Booking Flow:
Homepage → Boek een les → Choose type → Select product → Calendar (select date) → Select time slot → Reserveer → Checkout form with price overview → Bevestig (Confirm)
Knipkaart Purchase Flow:
Bestel Knipkaart → Choose category → Select package → Bestellen! → Checkout form → Bevestig (Confirm)
All Locations Served:
Ampt van Nijkerk, Bad Hulckesteijn, De Bilt, Dordrecht, Wolfheze, Mierlo, Garderen, Soest

Yeh complete documentation hai Zwemschool Snorkeltje ke reservation system ki — har page, har functionality, har field, har button, sab kuch detail mein cover ho gaya hai! Kuch bhi miss nahi kiya. Agar kisi specific page ya feature ke baare mein aur detail chahiye toh bata dijiye.