# 🏊 FIGMA AI MASTER PROMPT — Zwemschool Snorkeltje Mobile App
## Complete Design Brief for Figma AI — Read Everything Before Starting

---

## 🎯 PROJECT OVERVIEW

**Project:** Zwemschool Snorkeltje — Complete Swimming School Platform
**Client:** Walter Van De Geest — Bunschoten Spakenburg, Netherlands
**Developer:** Faizan (Upwork contract — $2,085 Milestone 1 active)
**Total Budget:** €6,000 / 4 Milestones / 13 Weeks
**Date:** March 25, 2026

**What we are building:** A complete cross-platform swimming school management app to REPLACE the current i-Reserve v5.40 PHP system at snorkeltje.i-reserve.net

---

## 🎨 BRAND IDENTITY — EXACT COLORS FROM LOGO SVG

```
PRIMARY ORANGE:   #FF5C00  (logo orange — use for accents, CTAs, instructor app)
PRIMARY BLUE:     #0365C4  (logo dark blue — use for main UI, headers, primary buttons)
LIGHT BLUE:       #00C1FF  (logo light blue — wave decorations, highlights)
MEDIUM BLUE:      #00AEFF  (secondary blue)
TEAL:             #5BC1DB  (wave color)
DARK BLUE:        #034DA9  (deep blue — dark cards)

UI TOKENS:
Background:       #F4F7FC  (very light blue-gray page bg)
Card White:       #FFFFFF  
Card Alt:         #EFF5FC  (light blue-tinted cards — matches current site)
Text Heading:     #131827  (almost black)
Text Body:        #444D6B
Text Secondary:   #818EA6
Border:           #DCE4F0
Success Green:    #18BB68
Success Bg:       #E0F9EC
Error Red:        #F03838
Error Bg:         #FEE5E5
Warning Amber:    #FCAA00
Warning Bg:       #FFF4DA
Purple:           #7F4BE0
Purple Bg:        #F1E8FF

INSTRUCTOR DARK THEME:
Dark BG:          #0F1117
Dark Card:        #1C1F28
Dark Border:      #2E3347
```

---

## 🖼️ LOGO DESCRIPTION (for Figma AI to recreate)

The Snorkeltje logo has two parts:
1. **Left character:** A cute kid with orange/brown hair, blue goggles on forehead, holding a yellow snorkel, wearing blue swim shorts and yellow arm floaties. This is the "Snorkeltje" mascot.
2. **Right text:**
   - Line 1: "ZWEMSCHOOL" — orange color (#FF5C00), bold
   - Line 2: "SNORKELTJE" — dark blue (#0365C4), bold, slightly larger
   - Under text: Two wave lines (light blue then teal)

**Logo usage in app:** Always show in top-left of header. White version on dark/blue backgrounds. Colored version on white backgrounds.

**Alternate app icon:** Round icon with blue background, white snorkel mask emoji 🤿, for splash screen and app icon.

---

## 📱 DEVICE FRAME

**Target device:** iPhone 17 Pro Max
**Screen dimensions:** 390 × 844 px (content area)
**Frame:** Silver/Titanium iPhone body around each screen
**Notch:** Dynamic Island (pill-shaped, top center)
**Home indicator:** Small bar at bottom
**Corner radius:** 44px for screen, 56px for outer frame

---

## 👥 4 USER ROLES

### 1. CUSTOMER (Parent/Ouder)
- Books and cancels lessons
- Pays upfront via Stripe or punch card
- Views child's progress (level → skill → steps)
- Chats with instructor
- Manages punch cards
- Joins waitlist
- Receives exercise tips for home practice
- Views FAQs and notifications

### 2. INSTRUCTOR (Instructeur)
- Views weekly/monthly schedule
- Sees student list per lesson with level and goals
- Updates student progress after each lesson (auto-notifies parent)
- Submits availability requests
- Chats with parents
- **Works on iPad with split-view** (student list LEFT, progress form RIGHT)
- **Works OFFLINE** — data cached with Hive, syncs when back online
- Uses DARK THEME UI

### 3. LOCATION OWNER (Locatie Eigenaar)
- Sees lesson hours per location
- Receives automatic monthly PDF reports (revenue, hours, instructors)
- Read-only access to their location's data

### 4. ADMIN
- Full dashboard: revenue, costs, profit, scheduling
- Manages all customers, instructors, locations
- Creates time slots and assigns instructors
- Manages punch cards (block/unblock)
- Handles invoices and outstanding payments
- Sends push notifications
- Exports data (CSV/Excel)
- Manages waitlist manually

---

## 📋 COMPLETE BOOKING RULES (Critical Business Logic)

### Fixed Slot System
- Every customer has ONE fixed weekly slot (e.g., Monday 15:00 at De Bilt)
- Customer must still RESERVE each individual lesson — it's not auto-booked
- **14-day rule:** Slots open to EVERYONE within 14 days. Beyond 14 days, only fixed slot owner can book.
- Calendar shows: GREEN = available, RED = full/booked, GRAY = past

### Lesson Types
1. **Vast tijdstip** (Fixed time slot) — customer's regular weekly lesson
2. **Extra 1-op-1** — extra or make-up private lesson (any available slot)
3. **Extra 1-op-2** — extra or make-up shared lesson (any available slot)
4. **Vakantie zwemles** — holiday lessons (special period, cancel 4 days before)

### Auto-Conversion (KEY FEATURE!)
- Customer books "Extra 1-op-1" and pays 1-op-1 rate upfront
- On lesson day, if ANOTHER customer also shows up
- System auto-converts BOTH to "1-op-2"
- BOTH customers receive PARTIAL REFUND (difference between 1-op-1 and 1-op-2 price)
- No extra action required from anyone
- Parents get push notification: "Uw les is omgezet naar 1-op-2. Terugbetaling: €X"

### Cancellation Policy
- Standard lessons: cancel up to 24 hours before → full refund
- Holiday lessons: cancel up to 4 days (96 hours) before → full refund
- Within deadline: NO refund, NO make-up
- Make-up lessons: earned when cancelled on time

### Payment
- ALWAYS upfront — no pay-later
- Methods: Stripe card OR punch card credits
- Stripe: handled via Stripe SDK (Flutter)
- Punch card: 1 credit deducted per lesson

---

## 💳 PUNCH CARD PRICING (Real prices from system!)

| Type | 10× | 5× | 3× | Validity |
|------|-----|-----|-----|----------|
| 1-op-1 | €380 | €190 | €114 | 365 days |
| 1-op-2 | €270 | €135 | €81 | 365 days |
| 1-op-3 | €200 | €100 | €60 | 365 days |
| Survival | €250 | €125 | €75 | **84 days** |
| Inschrijfgeld (registration) | €25 | — | — | 1 day |
| Wijzigen dag/tijd (change slot) | €60 | — | — | 1 day |
| BSO-zwemles | varies | — | — | — |

---

## 📍 LOCATIONS

1. **De Bilt** — Utrecht
2. **Bad Hulckesteijn** — Nijkerk
3. **Garderen** — Barneveld
4. **Wolfheze** — Renkum
5. **Dordrecht** — Dordrecht
6. **Soestduinen** — Soest
7. *(More may exist)*

---

## 📊 STUDENT PROGRESS SYSTEM (Walter's key requirement!)

### Structure: Level → Skill → Steps

**Levels:**
- Beginner (Beginner)
- Gevorderd Beginner (Advanced Beginner)
- Gevorderd (Intermediate)
- Gevorderd Plus (Advanced)
- Diploma A/B/C

**Example Skills per level:**
- Drijven (Floating)
- Ademhaling (Breathing)
- Vrije slag armen (Freestyle arms)
- Rugslag basis (Backstroke basics)
- Keerbocht (Flip turn)
- Beiderzijdse ademhaling (Bilateral breathing)

**Example Steps per skill (Vrije slag armen):**
1. Vangfase met hoge elleboog (Catch phase high elbow)
2. Trekfase met volledige extensie (Pull phase full extension)
3. Herstel over water gestrekte arm (Recovery straight arm)
4. Beiderzijdse armcoördinatie 25m (Bilateral coordination 25m)

**After each lesson:**
- Instructor updates: level, skills worked, steps completed, goals for next lesson, practice exercises
- Parent auto-notified via push notification
- "Practice at home" exercises auto-sent based on child's current level

---

## 🔔 AUTOMATED WAITLIST SYSTEM

1. Customer joins waitlist by selecting:
   - Lesson type (1-op-1, 1-op-2, etc.)
   - Preferred locations (multi-select)
   - Preferred days (multi-select: Ma/Di/Wo/Do/Vr/Za/Zo)
   - Preferred time range (e.g., 14:00–18:00)

2. When slot opens (cancellation or new slot):
   - System automatically matches waitlist entries
   - Sends invitation: "Er is een plek vrij!"
   - Customer has **24 hours** to accept
   - Countdown timer shown in app
   - If declined/expired → invitation goes to next person

---

## 📱 COMPLETE SCREEN LIST (All 30 Screens)

### CUSTOMER APP (Dutch language — screens 01-15)

**01 · Splash Screen**
- Full blue (#0365C4) background
- Snorkeltje logo centered (white version)
- "Jouw zwemlessen, altijd bij je." tagline
- 3 loading dots at bottom
- i-Reserve Mobile v2.0 footer

**02 · Onboarding 1 — Boeken**
- Light blue top illustration area
- Calendar + swimming icons
- Title: "Boek lessen wanneer je wilt."
- Sub: "Vaste tijdslots, extra lessen en vakantiezwemlessen — alles op één plek."
- 3 progress dots (first active, blue)
- "Volgende →" blue button
- "Skip" top right

**03 · Onboarding 2 — Voortgang**
- Orange/warm top illustration area
- Progress charts + medal icons
- Title: "Volg de voortgang van uw kind."
- Sub: "Zie vaardigheden, doelen en feedback na elke les van de instructeur."
- Dot 2 active (orange)
- "Volgende →" orange button

**04 · Onboarding 3 — Verbonden**
- Green top illustration area
- Chat bubbles + instructor icons
- Title: "Blijf verbonden met de instructeur."
- Sub: "Chat, ontvang oefeningen voor thuis en volg elke stap van de ontwikkeling."
- Dot 3 active (green)
- "Aan de slag!" green button

**05 · Inloggen (Login)**
- White background
- Light blue wave behind logo area
- Snorkeltje logo (colored version)
- "Welkom terug 👋" heading
- "Log in om uw zwemlessen te beheren." subtext
- Email field (label: "E-mailadres")
- Password field with eye icon (label: "Wachtwoord")
- "Wachtwoord vergeten?" link right-aligned, blue
- "Inloggen" primary blue button
- "Toegang via uitnodiging van Snorkeltje" bottom text
- Wave decoration at bottom

**06 · Thuis (Home Dashboard)**
- Status bar + top bar: avatar + "Goedemorgen, Ahmed Khilji" + notification bell (badge count)
- **NEXT LESSON CARD** (blue gradient): "Volgende les" / "Maandag 28 april" / "15:00 – 15:30 | De Bilt" / "1-op-1" badge / "Bekijken →"
- **QUICK ACTIONS** 2×2 grid: 📅 Boek les | 🎫 Kaarten | 📊 Voortgang | 💬 Chat
- "Meldingen" section with 3 notification previews + "Alles →" link
- Bottom navigation: ⌂ Thuis | 📅 Boeken | 🎫 Kaarten | 👤 Profiel

**07 · Boek een les (Book a Lesson)**
- Header with back arrow + "Boek een les"
- "Welk type les wilt u boeken?" subtext
- 4 option cards (stacked, full width):
  - ⏰ **Vast tijdstip** — "Uw vaste wekelijkse zwemles." (blue bg)
  - 🏊 **Extra zwemles 1-op-1** — "Extra of inhaalles — privé." (orange bg)
  - 👥 **Extra zwemles 1-op-2** — "Extra of inhaalles — gedeeld." (light blue bg)
  - 🌤️ **Vakantie zwemles** — "Zwemlessen tijdens schoolvakantie." (green bg)
- Arrow → on each card
- Bottom navigation

**08 · Kalender — Vast Tijdstip**
- Header: "Vast Tijdstip" + back arrow
- Blue info banner: "Uw vast tijdstip: Maandag 15:00" + "📍 De Bilt Zwembad"
- Month selector: "← april 2026 →"
- Day headers: Ma Di Wo Do Vr Za Zo
- Calendar grid with:
  - GREEN cells = beschikbaar (available)
  - BLUE cell = geselecteerd (selected — today's pick)
  - RED cells = vol (full/booked)
  - GRAY = past dates
- LEGENDA box: Green=Beschikbaar | Blue=Geselecteerd | Red=Vol
- Selected slot detail card below: date, time, location, instructor
- "Deze les boeken" primary blue button

**09 · Boeking Bevestigen (Booking Summary)**
- Header: "Overzicht" + back
- Lesson detail card (white, blue left border): lesson type badge, location, date, time, instructor
- Child selector dropdown: "Sami Khilji (7 jaar)"
- Payment method selection (2 options):
  - 💳 Knipkaart — SELECTED (blue border): "8/10 resterend — geldig t/m mrt 2027"
  - 💰 Betalen via kaart — "€ 38,00 per les"
- Price summary box: Les: €0 (knipkaart) | Totaal: 1 credit inhouden
- "Bevestigen & Boeken" primary blue button
- "Betaling altijd vooraf vereist." disclaimer

**10 · Boeking Bevestigd (Booking Success)**
- White background
- Large green checkmark circle animation area
- "Les geboekt!" heading
- "Uw les is bevestigd." subtitle
- Booking details card (light blue bg): lesson name, date/time, location, instructor, punch card credits remaining
- QR code / barcode widget: "Scan bij de ingang"
- "Mijn reserveringen" primary button
- "Terug naar Thuis" secondary button

**11 · Mijn Reserveringen (My Reservations)**
- Header: "Mijn Reserveringen"
- Tab toggle: **Gepland** (active, blue) | Geschiedenis
- Filter chips: Alle | Vast | Extra | Vakantie
- List of reservation cards:
  - Date (bold) | Time | Location | Instructor name | Type badge | Status badge | "Annuleren" link (red)
  - Columns: Reservering ID | Product | Vanaf | Tot tijd | Status
- History tab: same but with Aanwezig/Geannuleerd/Niet verschenen status
- Button: "Mijn Reserveringen - Geschiedenis"
- Bottom navigation

**12 · Reservering Detail (Reservation Detail)**
- Header + back
- Lesson type badge
- Details: 📅 Datum | ⏰ Tijd | 📍 Locatie | 👨‍🏫 Instructeur | 💳 Betaald via
- QR code widget: "Scan bij de ingang"
- Cancellation policy warning (amber): "Annuleer tot 24 uur voor de les voor terugbetaling."
- "Reservering annuleren" red button

**13 · Mijn Knipkaarten (My Punch Cards)**
- Header: "Mijn Knipkaarten"
- Active cards (visual punch card style):
  - Blue gradient card: "💳 1-op-1 Zwemlessen" | "8 lessen resterend" (large) | progress bar | validity | card number
  - Green card: "💳 1-op-2 Zwemlessen" | "5 resterend"
- "Nieuwe knipkaart bestellen" section header
- Purchase type list with prices:
  - 1-op-1: 10x €380 | 5x €190 | 3x €114
  - 1-op-2: 10x €270 | 5x €135 | 3x €81
  - 1-op-3: 10x €200 | 5x €100 | 3x €60
  - Survival: 10x €250 | 5x €125 | 3x €75 (84 dgn)
- "Kopen" button per type
- Table: Knipkaartnummer | Knipkaart | Geldig vanaf | Geldig tot en met

**14 · Voortgang Kind (Child Progress)**
- Header: "Sami's Voortgang" + back
- Level hero card (blue gradient): "Huidig niveau: Gevorderd Beginner 🏊" | overall progress bar 65% | "Totale voortgang: 65%"
- "Actieve Vaardigheden" section
- Skills list (4 items):
  - Skill name | level badge | percentage
  - Progress bar (colored per skill)
  - Vrije slag armen 75% (blue) | Ademhaling 50% (orange) | Rugslag basis 25% (green) | Keerbocht 10% (purple)
- Tap skill → Skill Detail screen
- "📚 Oefeningen voor thuis →" green button
- "Laatste les: 22 maart · Jan de Vries" footer text

**15 · Oefeningen voor Thuis (Practice at Home)**
- Header: "Oefeningen voor Thuis"
- Banner: "Op basis van Sami's niveau: Gevorderd Beginner"
- 3 exercise cards:
  - 🛁 **Ademhaling in bad** (light blue) — "Doe je gezicht in het water, adem uit met bellen, til dan je hoofd op. Herhaal 10x." | ⏱ 5 min
  - 🪑 **Scharrelschop op stoel** (orange) — "Zit op de rand, maak een flutter-schopbeweging 30 seconden aan elk been." | ⏱ 3 min
  - 🏠 **Arm zwaaioefening** (green) — "Oefen de windmolenarmbeweging 20x per kant bij de spiegel." | ⏱ 3 min
- "✓ Toegewezen door Jan de Vries · 22 maart"

### INSTRUCTOR APP — DARK THEME (screens 16-18)

**16 · Instructeur Thuis (Instructor Home) — DARK**
- Dark background #0F1117
- Top bar (dark card): orange avatar "J" | "Goedemorgen, Jan de Vries" | 🔔 notification bell
- **TODAY SUMMARY card** (orange gradient): "Vandaag — Maandag 28 april" | "8 lessen" | "12 leerlingen" | "Volgende over 45 min →"
- **NEXT LESSON section**: time | location | student avatars (colored circles) | "Details →"
- **VANDAAG'S SCHEDULE**: list of lessons with time, location, count — each with left orange border
- Sync status bar: "📶 Online — Alle data gesynchroniseerd" (green)
- Bottom nav (dark): 📅 Rooster | 👥 Leerlingen | 💬 Berichten | 👤 Profiel

**17 · Les Detail — Instructeur (Lesson Detail)**
- Dark theme
- Header: location + time
- Orange lesson info banner: date/time, lesson type, location, student count
- "Leerlingen vandaag" section
- Student cards (2 students):
  - Colored avatar circle | Name + age | Level badge | Today's goal text
  - "Voortgang bijwerken →" orange button per student
- Shows BOTH students for 1-op-2 lesson

**18 · Voortgang Bijwerken (Progress Update Form)**
- Dark theme
- Header: "Voortgang Bijwerken" + student name orange banner
- Form sections:
  - **Niveauupdate**: dropdown — current level + ▼
  - **Gewerkte vaardigheden**: checkboxes (blue bg when checked):
    - ☑ Vrije slag armen | ☑ Ademhaling | ☐ Rugslag
  - **Stappen afgerond**: green circle checkboxes:
    - ☑ Beiderzijds ademen (links) | ☐ 10m vrije slag zonder stop
  - **Notities**: optional text area
- "✓ Opslaan & Ouder Melden" GREEN button (full width)
- "Ouder krijgt automatisch melding" disclaimer

### ADDITIONAL KEY SCREENS (19-30)

**19 · Wachtlijst (Waitlist Join)**
- Header: "Wachtlijst"
- "Wij melden u automatisch als er een plek vrijkomt."
- Form:
  - Lestype dropdown
  - Voorkeursloc. (multi-select cards: De Bilt ✓ | Bad Hulckesteijn ✓ | Garderen | Wolfheze)
  - Voorkeursdagen (day pills: Ma Di Wo Do Vr Za Zo — tap to select, blue when selected)
  - Tijdvoorkeur: Van: 14:00 | Tot: 18:00
- Amber info box: "ℹ️ Bij een vrije plek krijgt u direct bericht"
- "Aanmelden voor wachtlijst" blue button

**20 · Berichten (Chat)**
- Header: instructor avatar + "Jan de Vries" + "Online" green dot
- Chat bubbles: white left (received), blue right (sent)
- Dutch sample messages about Sami's progress
- Message input bar + send button (blue circle with →)

**21 · Meldingen (Notifications)**
- Header: "Meldingen" + "Alles gelezen" link
- "Vandaag" section label then "Eerder" section label
- Notification items with: colored icon circle | title | subtitle | time | unread blue dot
- Types: 📅 Lesherinnering | 📊 Voortgang bijgewerkt | 💳 Knipkaart | ✅ Geboekt | 💰 Terugbetaling | 💬 Bericht

**22 · FAQ**
- Search bar: "Zoek vragen..."
- Category chips: Alle | Boeken | Betaling | Lessen | Account
- Accordion FAQ items (first one expanded):
  - "Hoe boek ik een vast tijdstip?" + answer
  - "Kan ik een les annuleren?"
  - "Hoe werken knipkaarten?"
  - "Wat is een inhaalles?"
  - "Hoe bekijk ik de voortgang?"
  - "14-dagenregel: hoe werkt dit?"

**23 · Profiel**
- Header: "Profiel"
- Avatar circle with initials + edit camera icon
- Name: "Ahmed Khilji" | email below
- "Mijn kinderen" section: Sami Khilji card (level badge)
- Settings list with toggles:
  - ✏️ Profiel bewerken →
  - 🔔 Meldingen (AAN toggle)
  - 🌙 Donkere modus (UIT toggle)
  - 🌐 Taal (NL)
  - ❓ Helpcentrum →
  - 📋 FAQ →
  - 🔒 Privacybeleid →
- "Uitloggen" red button at bottom
- ⬇️ Downloaden profiel button (matches current site!)

**24 · Wachtlijst Uitnodiging (Waitlist Invitation)**
- Light blue hero area: "🎉 Er is een plek vrij!" + "Accepteer binnen 24 uur"
- Slot detail card (blue border): date, time, location, instructor, "💳 1 knipkaartkrediet"
- Countdown timer (amber box): "⏳ 23:45:12 resterende tijd"
- "✓ Plek Accepteren" GREEN button
- "Afwijzen" RED button
- "Bij afwijzen gaat de uitnodiging naar de volgende persoon op de wachtlijst."

**25 · Auto-conversie Melding (1-op-1 → 1-op-2 Notification)**
- Green hero area: "🔄 Les omgezet naar 1-op-2!" + refund info
- Lesson detail (green left border)
- "2 deelnemers aanwezig → 1-op-2" in green
- REFUND DETAILS card:
  - Oorspronkelijk betaald: €38,00 (1-op-1)
  - Terugbetaald: €11,00 (verschil 1-op-2)
- Explanation: "Beide deelnemers betaalden het 1-op-1 tarief. Omdat 2 leerlingen kwamen, wordt automatisch het verschil terugbetaald."
- "Bekijk mijn transacties" blue button

**26 · Maandrapport Eigenaar (Location Owner Monthly Report)**
- Header: "Maandrapport" + "maart 2026"
- 4 stat boxes: 📚 247 Lessen | ⏱️ 123,5 Uren | 👶 89 Leerlingen | ⚠️ 12 Verzuim
- Omzetoverzicht table:
  - Voltooide lessen: 247 | €4.712,00
  - Openstaand: 8 | €156,00
  - Geannuleerd: 15 | €0,00
  - Totaal netto: — | €4.556,00 (green, bold)
- Instructeursuren per instructor: Jan de Vries 52,5u 112 les | Maria Jansen 44u 94 les
- "Exporteren PDF / Excel" blue button

**27 · Offline Modus (Offline Mode) — DARK**
- Red offline banner at top: "📵 Offline — Gecachede gegevens gebruiken"
- Dark instructor screen showing cached schedule
- Each lesson card: "Gecached" badge
- Sync queue info card: "⏳ 3 voortgangsupdates wachten" + progress bar
- "📶 Verbinding proberen" button

**28 · Stripe Betaling (Stripe Payment)**
- White background
- Lesson summary card (light blue)
- Card number field (focused — blue border): "4242 4242 4242 4242"
- MM/JJ field | CVV field (side by side)
- Name on card field
- "🔒 Beveiligd door Stripe — PCI-conform" green info bar
- "Betaal €38,00" blue button
- Cancel policy note
- "Betalen met knipkaart →" secondary option

**29 · Vaardigheid Detail (Skill Detail)**
- Header: "Vrije slag armen"
- Level badge: "Gevorderd Beginner"
- "3 van 4 stappen afgerond"
- Steps list (4 items):
  - ✓ Vangfase met hoge elleboog (green checked)
  - ✓ Trekfase met volledige extensie (green checked)
  - ✓ Herstel over water (green checked)
  - ○ Beiderzijdse armcoördinatie 25m (unchecked, gray)
- Instructor note box: Jan de Vries · 22 maart note
- Goal: "🎯 Beiderzijdse armcoördinatie 25m halen" (amber)
- "📚 Oefeningen voor thuis →" green button

**30 · Betalingsgeschiedenis (Payment History)**
- Header: "Betalingen"
- Filter tabs: Alle | Lessen | Kaarten | Terugbet.
- "Maart – April 2026" section label
- Transaction list:
  - 💳 Knipkaart gebruikt — 1-op-1 De Bilt 28 apr — "-1 credit" (blue)
  - 💰 Knipkaartaankoop — 10× 1-op-1 24 mrt — "-€380,00"
  - 💚 Terugbetaling — 1-op-1→1-op-2 — "+€11,00" (green)
  - etc.

---

## 🏗️ TECH STACK (for context)

**Mobile App:** Flutter (iOS + Android + iPad)
**Backend:** Node.js/Express + PostgreSQL/Supabase
**Payments:** Stripe
**Push Notifications:** Firebase FCM
**Storage:** AWS S3
**Offline:** Hive (local storage)
**State Management:** Riverpod
**Admin Web:** Next.js 14

---

## 🎨 UI DESIGN PRINCIPLES (for Figma AI)

1. **Latest 2025/2026 UI style** — clean, modern, minimal
2. **Dutch language** — all text in Dutch (Netherlands)
3. **Blue wave** at bottom of pages (matches current Snorkeltje website)
4. **Cards** — white rounded cards with subtle shadows (8px radius min)
5. **Bottom navigation** — 4 tabs: ⌂ Thuis | 📅 Boeken | 🎫 Kaarten | 👤 Profiel
6. **Instructor app** — DARK theme (#0F1117 background)
7. **Customer app** — LIGHT theme (#F4F7FC background)
8. **Status badges** — pill-shaped, colored backgrounds
9. **Input fields** — rounded, border highlight on focus (blue)
10. **Primary button** — blue (#0365C4), rounded 14px, 52px height
11. **Wave footer** — blue/teal wave decoration at page bottom (like current snorkeltje.i-reserve.net site)
12. **Real content** — use real Dutch swimming school content, not lorem ipsum

---

## 📐 COMPONENT LIBRARY (Build These First!)

### Atoms
- Primary Button (blue, 52h, 14rad)
- Secondary Button (outlined)
- Danger Button (red)
- Ghost Button (text only)
- Input Field (label + field + states: default/focused/error)
- Status Badge (pill: booked/cancelled/attended/no-show)
- Lesson Type Badge (1-op-1/1-op-2/Vast/Extra/Vakantie)
- Progress Bar (8px height, blue fill)
- Avatar (circle, initials fallback)
- Toggle Switch (on/off)

### Molecules
- Lesson Card (type badge + location + time + instructor + status)
- Punch Card Widget (gradient blue, credits bar)
- Student Progress Card (level + progress bar)
- Notification Item (icon + title + subtitle + time)
- FAQ Accordion Item
- Chat Bubble (left=white, right=blue)

### Organisms
- App Header (logo + avatar + bell)
- Bottom Navigation Bar (4 tabs, active indicator)
- Calendar Widget (month view, colored dates)
- Instructor Lesson Card (dark theme)

---

## 🔗 REFERENCE

**Current website:** https://snorkeltje.i-reserve.net
**Figma file:** https://www.figma.com/design/X5RyRRkwO8B45MPKKbUxje
**Logo colors:** Orange #FF5C00 + Blue #0365C4 (from SVG)
**Snorkeltje mascot:** Kids with snorkel goggles and swim gear (orange/brown hair boy + red-haired girl)

---

## 📝 FIGMA AI INSTRUCTIONS

**Start with:**
1. Create Design System page (colors, typography, components)
2. Then Customer App screens (01-15) — light theme, Dutch
3. Then Instructor App screens (16-18) — dark theme, Dutch
4. Then Additional screens (19-30)
5. All screens inside iPhone 17 Pro Max silver frame (430×932 screen area inside 510×1068 frame)
6. Use Snorkeltje mascot character (snorkel kid) in onboarding illustrations
7. Blue wave decoration at bottom of every screen (like website)
8. Real Dutch content throughout — no placeholder text

**Style reference:** Look at https://snorkeltje.i-reserve.net for current brand feeling. Our new app should feel: same brand colors + much more modern/premium/mobile-first.

