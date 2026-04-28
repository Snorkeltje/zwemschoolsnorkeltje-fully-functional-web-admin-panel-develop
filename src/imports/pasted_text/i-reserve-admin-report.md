📋 i-RESERVE ADMIN PANEL - COMPLETE DEEP ANALYSIS REPORT
Website: https://snorkeltje.i-reserve.net/admin
Platform: i-Reserve webreservering (Web Reservation System)
Version: 5.41 (Build: 22694.48)
Language: Dutch (nl_NL)
Logged in as: Appbuilder
IP Address: 206.135.162.71

🌐 SYSTEM OVERVIEW
The i-Reserve admin panel is a comprehensive reservation management system (primarily used for swimming lessons - "zwemles"). It manages customers (children/students), bookings/reservations, invoices, punch cards (knipkaarten), payments, and tasks. The admin panel is designed in Dutch.

📑 TOTAL PAGES FOUND: 20+ Unique Pages

PAGE 1: DASHBOARD / HOME (Start Page)
URL: admin?mod=welcome or admin?mod=welcome&home=1
Features on this page:

Line chart showing "Reserveringen laatste 30 dagen" (Reservations in the last 30 days) - displays date range with total reservation count (0-140 scale)
Chart legend toggle button "Hide chart Totaal"
"Ga direct naar" (Go directly to) Quick Access section with 4 shortcut buttons: RESERVATION, ZOEKEN (Search), KALENDER (Calendar), ROOSTER (Roster)
"Meest recente reserveringen" (Most recent reservations) table with columns: Reservering ID (clickable links), Product, Datum, Datum tot, Tijd vanaf, Tijd tot, Aantal plaatsen, Achternaam klant
Star/Favorite button (☆) - "Toevoegen favoriet"
The Reservation IDs are clickable and link to individual booking dashboard pages


PAGE 2: CUSTOMER SEARCH/FILTER
URL: admin?mod=filter&context=customer&reset=true
Features:

Title: "Filter/Zoek Resultaat Klant"
Filter dropdown fields: klantid, achternaam, Status, email, aangemaakt
"Zoek!" (Search) button
"Dit is een niet opgeslagen filter" dropdown (unsaved filter)
"Zoekvelden" (Search fields) dropdown
"Weergaves" (Views) dropdown
"Excel" export button with dropdown
"+ Toevoegen nieuwe klant" (Add new customer) blue button
Share button (arrow icon)
Star/Favorite button
Results table with columns: Laatst ingelogd, Klant ID (clickable), Status (colored badges), Profiel, Type zwemles, Voornaam, Achternaam kind, Voor+achternaam ouder
Pagination: showing rows per page, page numbers (e.g., 1/611), first/prev/next/last navigation
"15 Rijen per pagina" (rows per page) dropdown
Total record count: 5,491 customers


PAGE 3: NEW CUSTOMER FORM
URL: admin?mod=newcustomer
Features:

Title: "Toevoegen nieuwe klant"
Form fields: Voornaam kind (First name child), Achternaam kind (Last name child), Geboortedatum kind (Date of birth - with date picker), Voor+achternaam ouder (Parent full name), Mobiel (1e contactpersoon) (Mobile phone), E-mail, Extra tel. nr (2e contactpersoon) (Extra phone), Woonplaats (City), Locatie (Location dropdown - "Kies een locatie"), Type zwemles (Swim lesson type dropdown - "Kies een type les"), Dag (Day dropdown - "Kies een dag"), Tijdstip zwemles (Time of swim lesson), Waar kiezen jullie voor bij uitval collega? (Choice when colleague absent dropdown), Indien 1-op-2/3/4 les (If group lesson dropdown - "Selecteer..."), Opmerking (andere kind(eren) niet aanwezig) (Comment textarea), VOORTGANG (Progress text field), VOORTGANG (uitgebreid) (Extended progress - Rich text editor with Bold, Italic, Text color, Background color, Bullet list, Numbered list, Link)
"Opslaan" (Save) blue button
Star/Favorite button


PAGE 4: CUSTOMER DASHBOARD (Individual)
URL: admin?mod=dashboard&context=customer&id={ID}
Features:

Title: "[ID] - Customer Name"
"Weergaves" (Views) dropdown
"+ Toevoegen nieuwe klant" button

KLANTGEGEVENS (Customer Data) Block (Red header):

All customer fields displayed (Voornaam, Achternaam, Geboortedatum, Parent name, Email, Mobile, Extra phone, Woonplaats, Locatie, Type zwemles, Dag, Tijdstip, Uitval preference, Group lesson choice, Opmerkingen, Voortgang)
Settings gear icon (⚙) for editing
Meta info: Taal van de klant, Aanmaak datum, Laatst bijgewerkt, Type, Status# (with colored badge)

GEBRUIKER GEGEVENS (User Data) Block (Orange header):

Gebruikersnaam, Inactief, E-mail, Laatst ingelogd
Profiel list (multiple profiles available)
"Profiel toevoegen" button
"Bekijk de klantpagina als deze gebruiker" button (View customer page as this user)
Settings gear icon

KLANT ACTIE BLOK (Customer Action Block - Green header):

AANMAKEN TAAK (Create Task)
VOEG KNIPKAART TOE (Add Punch Card)
MAAK RESERVERING (Make Reservation)
MAAK FACTUUR (Make Invoice)
WIJZIG KLANTSTATUS (Change Customer Status)
VERSTUUR EMAIL (Send Email)
SAMENVOEGEN KLANTEN (Merge Customers)
EXPORTEER (Export)

KNIPKAART FILTER (Punch Card Filter - Pink header):

Table with columns: Knipkaart ID (clickable), Knipkaart type, Omschrijving

FILTER RESERVERINGEN: ALLE RESERVERINGEN (Red header):

Table: Reservering ID (clickable), Vanaf, Vanaf tijd, Tot tijd, Klant verkort, Product

FILTER RESERVERINGEN: LAST MINUTE ANNULERINGEN (Pink header):

Shows last-minute cancellations

Bottom Tabs:

Opmerkingen (Comments) - with "Toevoegen opmerking" button
Geschiedenis (History)
Emails
Taken (Tasks)


PAGE 5: RESERVATION SEARCH/FILTER
URL: admin?mod=filter&context=booking&reset=true
Features:

Title: "Filter/Zoek Resultaat Reservering"
Filter fields: startdatum, Producten, Arrangementen, Status, email, achternaam
"Zoek!" button, "Dit is een niet opgeslagen filter" dropdown, "Zoekvelden" dropdown
"Weergaves" dropdown, "Excel" export, "+ Nieuw via kalender" button (with dropdown)
Share & Star buttons
Results table: Reservering ID (clickable), Aangemaakt, Product, Betaalmethode, Betaalbedrag, Klantnaam
Pagination: 2,292 total reservations, 255 pages


PAGE 6: NEW RESERVATION
URL: admin?mod=newbooking
Features:

Title: "Nieuwe reservering"
"BASIS" section header
Product dropdown: "-- Selecteer product --" (form loads dynamically based on product selection)
Star/Favorite button


PAGE 7: NEW DUMMY RESERVATION
URL: admin?mod=newbooking&dummy=true
Features:

Same as New Reservation page but creates a test/dummy booking
Title: "Nieuwe reservering"
Product dropdown selector


PAGE 8: CALENDAR
URL: admin?mod=calendar
Features:

Title: "Kalender"
Product dropdown: "Selecteer een product"
Calendar view loads after product selection
Star/Favorite button


PAGE 9: ROSTER/SCHEDULE
URL: admin?mod=roster&context=booking
Features:

Title: Shows location name (e.g., "Bad Hulckesteijn")
"Vandaag" (Today) button, Date picker icon, Refresh button, Previous/Next navigation arrows
Date range display (e.g., "Donderdag 26-03-2026 – Maandag 30-03-2026")
Weekly grid view showing days across top and time slots (07:00, 08:00, 09:00, 10:00...) down the side
Color-coded reservation blocks (green, purple, red) showing customer name, time, and details
Print button (🖨)
"Weergaves" dropdown
"+ Nieuw via kalender" button with dropdown
Star/Favorite button


PAGE 10: RESERVATION DASHBOARD (Individual)
URL: admin?mod=dashboard&context=booking&id={ID}
Features:

Title: "Reservering [ID]"
"Weergaves" dropdown, "+ Nieuw via kalender" button, Star button

RESERVERING Block:

Details: Product, Datum, Tijd vanaf, Tijd tot, Aantal plaatsen, Opmerkingen, Interne opmerkingen
Meta: Status#, Aanmaak datum, Laatst bijgewerkt
Settings gear icon

ACTIE RESERVERING Block (Blue header):

AANMAKEN TAAK (Create Task)
WIJZIGEN DATUM & TIJD (Change Date & Time)
ZET RESERVERING BETAALD (Set Reservation Paid)
WIJZIG STATUS (Change Status)
VERSTUUR EMAIL (Send Email)
MAAK PDF (Create PDF)
TOON RESOURCES (Show Resources)
VERWIJDEREN (Delete)

EXTRA VRAGEN VOOR Block:

Shows extra questions/answers for this reservation

KLANTGEGEVENS Block:

Customer details linked to this reservation
Settings gear icon


PAGE 11: INVOICE SEARCH/FILTER
URL: admin?mod=filter&context=invoice&reset=true
Features:

Title: "Filter/Zoek Resultaat Factuur"
Filter fields: Status, factuurdatum, factuurnummer, achternaam
"Zoek!" button, filter management, "Zoekvelden"
"Weergaves", "Excel" export, "+ Toevoegen nieuwe factuur" button
Share & Star buttons
Results table: Factuur id (clickable), Reservering id (clickable), Klantnummer (clickable), Factuurnummer, Klantnaam, Status, Factuurdatum
Pagination: 31,738 total invoices, 3,527 pages


PAGE 12: INVOICE HISTORY
URL: admin?mod=filter&context=invoice&reset=true&search=INV_STATUS=20&orderfields=CREATED&ordertype=DESC
Features:

Pre-filtered view showing only "Definitief" (Finalized) invoices
Same table structure as invoice filter
Filter shows "definitief" status pre-selected


PAGE 13: OPEN ITEMS (Openstaande posten)
URL: admin?mod=filter&context=invoice&reset=true&search=INV_TO_PAY>0+AND+INV_STATUS=20&orderfields=INV_DATE&ordertype=ASC
Features:

Pre-filtered view showing invoices with outstanding balances
Filter shows "bedrag_tebetalen > 0" pre-selected
Same table structure as invoice filter


PAGE 14: NEW INVOICE
URL: admin?mod=newinvoice
Features:

Title: "Toevoegen nieuwe factuur"
Form fields: Factuurdatum (Invoice date with date picker, pre-filled with current date), Selecteer klant (Select customer with "Zoek klant" search button)
"Opslaan" (Save) blue button
Star/Favorite button


PAGE 15: INVOICE DASHBOARD (Individual)
URL: admin?mod=dashboard&context=invoice&id={ID}
Features:

Title: "Factuur [ID]"
"Weergaves" dropdown, "+ Toevoegen nieuwe factuur" button, Star button

DETAILS VAN FACTUUR Block (Blue header):

Factuur nummer, Factuur datum, Concept datum, Datum definitief, Status#, Documenten (PDF link), Factuur bedrag, Openstaand bedrag, Factuur voor, Verzendmethode
Meta: Aanmaak datum, Laatst bijgewerkt
Settings gear icon

FACTUUR ACTIE Block (Green header):

AANMAKEN TAAK (Create Task)
MAAK CREDIT FACTUUR (Create Credit Invoice)
MAAK PDF (Create PDF)
VERSTUUR EMAIL (Send Email)

KLANTGEGEVENS Block:

Customer details: Voornaam kind, Achternaam kind, E-mail, Woonplaats, Mobiel
"ga naar dashboard klant" link (go to customer dashboard)
Settings gear icon

FACTUUR DETAIL Block:

Table: Type, Beschrijving, Bedrag, Valuta, Subtotaal


PAGE 16: PUNCH CARD MANAGEMENT (Knipkaarten)
URL: admin?mod=filter&context=knipkaart&reset=true
Features:

Title: "Filter/Zoek Resultaat Knipkaart"
Filter field: Knipkaart id
"Zoek!" button, filter management, "Zoekvelden"
"Weergaves", "Excel" export, "+ Nieuwe knipkaart" button
Share & Star buttons
Results table: Knipkaart ID, Knipkaart type, Omschrijving, Geldig vanaf, Geldig tot en met, Knippen, Geblokkeerd, Saldo columns
Pagination: 2,780 pages total


PAGE 17: PAYMENTS
URL: admin?mod=filter&context=payment
Features:

Title: "Filter/Zoek Resultaat payment"
Filter fields: Betaalmethode, status, Betaaldatum, Betaling opmerkingen
"Zoek!" button, filter management, "Zoekvelden"
"Weergaves", "Excel" export
Share & Star buttons
Results table: Betaal ID, Betaalmethode (with Mollie icon), Status# (BETAALD/AFGEWEZEN colored badges), Betaalbedrag, Transactie #, Betaling opmerkingen
Total amount displayed at bottom (€5,133,607.00)
Pagination: 81,269 total payments, 10,159 pages


PAGE 18: CONVERSATIONS (Gesprekken)
URL: admin?mod=filter&context=call
Features:

Title: "Filter/Zoek Resultaat Gesprek"
Error message: "De gesprekken module is niet actief in deze licentie" (Conversations module not active in this license)
"+ Nieuwe gesprek" button (non-functional due to license)
"Weergaves", "Excel" export buttons


PAGE 19: TASK MANAGEMENT (Taken/Todo)
URL: admin?mod=filter&context=todo
Features:

Title: "Filter Taak : (Nieuw filter)"
Filter fields: Open/Gestart (status), omschrijving, zichtbaar <= "0d", toegewezen_aan
"Zoek!" button, filter management, "Zoekvelden"
"Weergaves", "Excel" export, "+ Nieuwe taak" (New task) button
Share & Star buttons
Results table columns: Taak #, P (Priority), Status#, Actie, Beschrijving, Categorie, Deadline, Koppelingen


PAGE 20: FILTER MANAGEMENT (Beheer filters)
URLs: admin?mod=filter&context={customer|booking|invoice}&show=filterlist
Features:

Shows saved filters in a table with: Naam (clickable), Beschrijving, Eigenaar, Gedeeld met, Planning (with "Plannen" link), Weergave, Actie buttons
Action buttons per filter: Copy (📋), Edit (✏️), Delete (🗑)
"← Verberg filter lijst" (Hide filter list) button


PAGE 21: LICENSE MANAGEMENT
URL: admin?mod=license
Features:

Title: "Licentiebeheer"
Shows error: "Geen toegang tot licentiebeheer" (No access to license management - restricted to admin)
Star/Favorite button


PAGE 22: DEVICES
URL: admin?mod=devices
Features:

Title: "devices"
Description: Shows devices in use with sessions
Device card showing: Device type icon (Apple), Type (browser icon), Laatste (last active), IP adres, Acties (Delete button 🗑)
Star/Favorite button


PAGE 23: LOGIN PAGE
URL: admin?mod=login
Features:

i-Reserve logo
Message: "U bent ingelogd met gebruiker Appbuilder"
"Uitloggen" (Logout) button
Help button (top right)


🔧 GLOBAL NAVIGATION & TOOLBAR (Present on ALL pages)
Top Navigation Bar:

i-Reserve Logo → Links to Dashboard home (admin?mod=welcome&home=1)
Dashboard dropdown → Algemeen (General), Standaard (Standard)
Klant (Customer) dropdown → Huidig filter, Zoeken, Nieuwe klant, Laatst getoonde klanten (recently viewed), Laatste gebruikte filters, Beheer filters
Reservering dropdown → Huidig filter, Zoeken, Nieuwe reservering, Nieuw via kalender, Nieuwe dummy reservering, Rooster, Laatst bekeken reserveringen, Laatste gebruikte filters, Beheer filters
Factuur (Invoice) dropdown → Huidig filter, Zoeken, Nieuwe factuur, Factuur historie, Openstaande posten, Laatst bekeken facturen, Laatste gebruikte filters, Beheer filters
Modules dropdown → Beheer knipkaarten, Betalingen, Gesprekken
Search Bar (🔍 Zoeken...) → Global search functionality
Todo/Task Button (📋) → Dropdown with: Aanmaken taak, Actueel, Dichtbij deadline, Verlopen, Totaal, Niet toegewezen, Instellingen
Notification Bell (🔔) → Shows badge count (100), opens panel with: Heading "Notificaties", Close button, "Alles als gelezen markeren" button, Scrollable list of notifications with images and text
User Menu (Appbuilder with avatar) → Profiel, Help (→ external: http://support.i-reserve.net/en/), Wijzigen layout van het beheer paneel, Uitloggen (→ admin?mod=login&logout=true)

Footer (Present on ALL pages):

Font size buttons: A+ (increase) and A- (decrease)
"Appbuilder [206.135.162.71]" link → goes to Devices page
"i-Reserve versie 5.41 (Build: 22694.48)" → links to https://www.i-reserve.io


🔗 COMPLETE BUTTON & LINK MAP
Dashboard Buttons:
Button/LinkDestinationRESERVATION shortcutadmin?mod=newbookingZOEKEN shortcutadmin?mod=filter&context=booking&reset=trueKALENDER shortcutadmin?mod=calendarROOSTER shortcutadmin?mod=roster&context=bookingReservation ID links (232942 etc.)admin?mod=dashboard&context=booking&id={ID}
Klant Menu Links:
LinkDestinationHuidig filteradmin?mod=filter&context=customerZoekenadmin?mod=filter&context=customer&reset=trueNieuwe klantadmin?mod=newcustomerRecent customer linksadmin?mod=dashboard&context=customer&id={ID}Beheer filtersadmin?mod=filter&context=customer&show=filterlist
Reservering Menu Links:
LinkDestinationHuidig filteradmin?mod=filter&context=bookingZoekenadmin?mod=filter&context=booking&reset=trueNieuwe reserveringadmin?mod=newbookingNieuw via kalenderadmin?mod=calendarNieuwe dummy reserveringadmin?mod=newbooking&dummy=trueRoosteradmin?mod=roster&context=bookingRecent booking linksadmin?mod=dashboard&context=booking&id={ID}Beheer filtersadmin?mod=filter&context=booking&show=filterlist
Factuur Menu Links:
LinkDestinationHuidig filteradmin?mod=filter&context=invoiceZoekenadmin?mod=filter&context=invoice&reset=trueNieuwe factuuradmin?mod=newinvoiceFactuur historieadmin?mod=filter&context=invoice&reset=true&search=INV_STATUS=20...Openstaande postenadmin?mod=filter&context=invoice&reset=true&search=INV_TO_PAY>0...Recent invoice linksadmin?mod=dashboard&context=invoice&id={ID}Beheer filtersadmin?mod=filter&context=invoice&show=filterlist
Modules Menu Links:
LinkDestinationBeheer knipkaartenadmin?mod=filter&context=knipkaart&reset=trueBetalingenadmin?mod=filter&context=paymentGesprekkenadmin?mod=filter&context=call
Todo Dropdown Links:
LinkDestinationAanmaken taakOpens task creation dialogActueeladmin?mod=filter&context=todo (visible ≤ 0d, status open/started)Dichtbij deadlineadmin?mod=filter&context=todo (due between -1d and 2d)Verlopenadmin?mod=filter&context=todo (due < -1d)Totaaladmin?mod=filter&context=todo (all statuses)Niet toegewezenadmin?mod=filter&context=todo (ASSIGNED_TO = 0)InstellingenOpens settings dialog
User Menu Links:
LinkDestinationProfielOpens profile dialog (#)HelpExternal: http://support.i-reserve.net/en/Wijzigen layoutOpens layout dialog (#)Uitloggenadmin?mod=login&logout=true
Footer Links:
LinkDestinationAppbuilder [IP]admin?mod=devicesi-ReserveExternal: https://www.i-reserve.io

🎯 EXTERNAL LINKS (Going to other websites):

Help → http://support.i-reserve.net/en/ (Support/documentation site)
i-Reserve footer → https://www.i-reserve.io (Company website)


📊 DATA STATISTICS:

Total Customers: 5,491
Total Reservations: 2,292
Total Invoices: 31,738
Total Payments: 81,269 (Total value: €5,133,607.00)
Total Punch Cards: ~2,780 pages of records
Notifications: 100 unread


🧩 EMBEDDED FEATURES (Meeting AI Assistant Widget):
The page includes a floating "Meeting AI Assistant" chat widget with:

Client selector dropdown (currently "Senyakab")
Chat History sidebar
Live Transcription area
AI Suggested Response area
Suggested Document section with "Open Document" button
Text input: "Type what client said..."
Buttons: Send, Start/Stop Listening (Space bar), Auto-send toggle, End Meeting & Show Summary, Settings
Chat History panel (closeable sidebar)
Meeting Summary panel (closeable)


🔑 COMMON UI PATTERNS ACROSS ALL PAGES:

Filter/Search Pages always have: search fields dropdowns, "Zoek!" button, filter save/management, Weergaves, Excel export, action button (+ New), share button, star/favorite
Dashboard Pages always have: colored header blocks, settings gear (⚙) icons for editing, action blocks with links
All pages have: consistent top navigation, footer with version info, favorite star button
Color Coding: Red = Customer data, Orange = User data, Green = Action blocks, Blue = Reservation/Invoice, Pink = Punch cards/Cancellations

This is the complete analysis of every page, button, link, feature, and functionality in your i-Reserve admin panel. Every page has been visited and documented.