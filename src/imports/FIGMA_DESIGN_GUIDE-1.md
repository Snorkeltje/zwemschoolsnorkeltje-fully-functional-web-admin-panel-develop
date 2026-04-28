# 🎨 Zwemschool Snorkeltje — Figma Design Guide
**For:** Faizan (Developer designing Figma)  
**Client:** Walter Van De Geest  
**Date:** March 25, 2026  

---

## 📋 TABLE OF CONTENTS
1. [Design System](#1-design-system)
2. [Component Library](#2-component-library)
3. [Figma File Structure](#3-figma-file-structure)
4. [Screen Designs — Customer App](#4-screen-designs--customer-app)
5. [Screen Designs — Instructor App](#5-screen-designs--instructor-app)
6. [Screen Designs — Admin Web Panel](#6-screen-designs--admin-web-panel)
7. [Design Notes for Each Screen](#7-design-notes-for-each-screen)

---

## 1. DESIGN SYSTEM

### Color Palette
```
PRIMARY:
  Blue Main:      #1A6FBF   ← Main buttons, headers, active states
  Blue Dark:      #0D4F8C   ← Hover states, pressed
  Blue Light:     #E8F4FD   ← Background tints, cards

SECONDARY:
  Orange:         #F5A623   ← Accent, badges, highlights
  Orange Light:   #FEF3DC   ← Orange tint backgrounds

STATUS COLORS:
  Success Green:  #27AE60   ← Available, attended, success
  Error Red:      #E74C3C   ← Booked/full, cancelled, error
  Warning Yellow: #F39C12   ← Few spots left, pending, warning
  Gray:           #BDC3C7   ← Past dates, disabled, unavailable
  Info Blue:      #2980B9   ← Information states

NEUTRAL:
  Text Dark:      #1A1A2E   ← Primary text
  Text Medium:    #4A4A6A   ← Secondary text
  Text Light:     #8E8EA0   ← Placeholder, disabled text
  Border:         #E5E7EB   ← Input borders, dividers
  Background:     #F8F9FA   ← Page background
  White:          #FFFFFF   ← Cards, modals

DARK MODE:
  BG Dark:        #0F1117
  Card Dark:      #1A1D27
  Text Dark Mode: #E2E8F0
  Border Dark:    #2D3748
```

### Typography
```
FONT FAMILY: Inter (Google Font — free)

SIZES:
  Display:    32px / Bold    ← Page titles
  H1:         24px / Bold    ← Section headers
  H2:         20px / SemiBold ← Card titles
  H3:         16px / SemiBold ← Sub-sections
  Body:       14px / Regular  ← Normal text
  Small:      12px / Regular  ← Labels, captions
  Tiny:       10px / Medium   ← Badges, timestamps

LINE HEIGHT: 1.5x font size
LETTER SPACING: -0.2px for headings
```

### Spacing System (8pt grid)
```
4px   → xs (tiny gaps)
8px   → sm (icon padding)
12px  → sm+ (input padding vertical)
16px  → md (card padding, standard gap)
20px  → md+ (section gap)
24px  → lg (large spacing)
32px  → xl (section padding)
40px  → xxl (big sections)
48px  → xxxl (hero sections)
```

### Border Radius
```
4px  → buttons, inputs (small)
8px  → cards (default)
12px → large cards
16px → modals, bottom sheets
24px → pill buttons, chips
50%  → avatars, icons circular
```

### Shadows
```
Card shadow:   0px 2px 8px rgba(0,0,0,0.08)
Modal shadow:  0px 8px 24px rgba(0,0,0,0.12)
Button shadow: 0px 2px 4px rgba(26,111,191,0.3)
```

---

## 2. COMPONENT LIBRARY

### Create these components in Figma first:

#### Buttons
```
Primary Button:
  BG: #1A6FBF | Text: White | Height: 52px | Radius: 12px
  States: Default, Hover, Pressed, Disabled, Loading

Secondary Button:
  BG: Transparent | Border: #1A6FBF | Text: #1A6FBF
  Same sizes as Primary

Danger Button:
  BG: #E74C3C | Text: White

Ghost Button:
  BG: Transparent | Text: #1A6FBF | No border

Small Button:
  Height: 36px | Padding: 12px 16px
```

#### Input Fields
```
Text Input:
  Height: 52px | Border: 1px #E5E7EB | Radius: 12px
  Padding: 16px | Font: 14px
  States: Default, Focused (#1A6FBF border), Error (#E74C3C), Disabled

Search Input:
  Same as text input + search icon left side
  BG: #F8F9FA (lighter background)
```

#### Cards
```
Lesson Card:
  Width: full | BG: White | Radius: 12px
  Shadow: card shadow | Padding: 16px
  Contents: lesson type badge, location, date+time, instructor, status

Punch Card:
  Width: full | Gradient BG: #1A6FBF → #0D4F8C | Radius: 12px
  White text | Credits bar at bottom

Booking Type Card:
  Width: (screen-32)/2 → 2 columns | Radius: 12px
  Icon (large) + title + subtitle
```

#### Badges / Pills
```
Status Badge:
  Radius: 100px | Padding: 4px 10px | Font: 12px Bold
  BOOKED:     BG #E8F4FD Text #1A6FBF
  ATTENDED:   BG #E8F8F0 Text #27AE60
  CANCELLED:  BG #FDE8E8 Text #E74C3C
  NO_SHOW:    BG #FEF3DC Text #F39C12
  PENDING:    BG #F0F0F0 Text #8E8EA0

Lesson Type Badge:
  BOOKED:    BG #E8F4FD Text #1A6FBF (same family)
  1-on-1:   BG #1A6FBF Text White
  1-on-2:   BG #F5A623 Text White
  Holiday:  BG #27AE60 Text White
```

#### Calendar Widget
```
Month header: Month Year + prev/next arrows
Week header: Mo Tu We Th Fr Sa Su
Date cells (40px × 40px):
  Available:    BG #27AE60 Text White
  Booked/Full:  BG #E74C3C Text White
  Today:        Border 2px #1A6FBF
  Selected:     BG #1A6FBF Text White
  Past:         Text #BDC3C7 (greyed)
  Few left:     BG #F39C12 Text White

Legend: Green=Available, Red=Full, Orange=Few left
```

#### Bottom Navigation Bar
```
Height: 72px (+ safe area)
Items: Home | Book | Tickets | Profile
Active: Icon + label colored #1A6FBF + indicator dot
Inactive: Icon + label #8E8EA0
BG: White | Top border: 1px #E5E7EB
Safe area padding bottom
```

#### Progress Bar
```
Track: #E5E7EB | Fill: #1A6FBF | Height: 8px | Radius: 4px
With percentage label above right
```

#### Avatar
```
Sizes: 32px, 40px, 48px, 64px, 80px
Shape: Circle
Fallback: Initials on #1A6FBF background
```

---

## 3. FIGMA FILE STRUCTURE

### Pages in Figma File
```
📄 0_Design_System
   - Colors
   - Typography
   - Spacing
   - Components

📱 1_Customer_App_Light
   - All customer screens (light mode)

📱 2_Customer_App_Dark  
   - Key screens in dark mode

📱 3_Instructor_App
   - Instructor + iPad screens

🖥️ 4_Admin_Web_Panel
   - All admin web screens

📐 5_Prototype_Flows
   - Clickable prototype connections
```

### Artboard Sizes
```
Mobile (iPhone 14 Pro):  393 × 852 px
iPad (iPad Pro 11"):     834 × 1194 px
Web Admin (Desktop):     1440 × 900 px
Web Admin (Tablet):      1024 × 768 px
```

---

## 4. SCREEN DESIGNS — CUSTOMER APP

### SCREEN 01 — Splash Screen
```
Layout: Full screen centered
BG: #1A6FBF (solid brand blue)

Elements:
├── Snorkeltje logo (white version) — center screen
├── App name "Snorkeltje" below logo — white, 28px bold
└── Loading indicator (white dots) — bottom center

Notes:
- Simple, clean, branded
- Logo should be the fish mascot from current site
```

### SCREEN 02 — Onboarding Slide 1
```
BG: White
Top half: Illustration (calendar with swimming pool)
Bottom half:
├── Title: "Book lessons anytime" — 28px bold
├── Subtitle: "Fixed slots, extra lessons, and holiday classes — all in one place" — 16px, gray
├── Progress dots (3 dots, first active)
└── Next button (full width, blue)
Skip link top right
```

### SCREEN 03 — Onboarding Slide 2
```
Same layout, different illustration (child swimming, progress bars)
Title: "Track your child's progress"
Subtitle: "See skills, goals and feedback after every lesson"
```

### SCREEN 04 — Onboarding Slide 3
```
Same layout, different illustration (chat bubbles + instructor)
Title: "Stay connected"
Subtitle: "Chat with your instructor and get practice tips at home"
Last dot active
Button: "Get Started" (instead of Next)
```

### SCREEN 05 — Login
```
BG: White
Top: Snorkeltje logo (blue) — centered, with subtle wave decoration

Form section (padding 24px sides):
├── Title: "Welcome back" — 24px bold
├── Subtitle: "Login to your account" — 14px gray
├── Email input field
├── Password input field (with eye icon)
├── "Forgot password?" link — right aligned, blue
└── Login button (full width)

Bottom:
└── "Need help? Contact Zwemschool Snorkeltje" — small gray text

Notes:
- No register button — invitation only
- Clean, professional, minimal
```

### SCREEN 06 — Forgot Password
```
BG: White
Back arrow top left

Content (centered, 24px padding):
├── Lock icon illustration (blue)
├── Title: "Forgot password?"
├── Subtitle: "Enter your email and we'll send a reset link"
├── Email input
└── Send Reset Link button

Back to login link at bottom
```

### SCREEN 07 — Home Screen
```
BG: #F8F9FA (light gray)

TOP BAR:
├── Left: Avatar (small) + "Good morning, [Name]"
├── Right: Notification bell (with badge if unread)

CONTENT (scrollable):
├── UPCOMING LESSON CARD (if any):
│   Blue gradient card:
│   ├── "Next lesson" label
│   ├── Day + Date (large)
│   ├── Time | Location
│   ├── Instructor name
│   └── Lesson type badge
│
├── QUICK ACTIONS (2x2 grid):
│   ├── Book Lesson (calendar icon)
│   ├── My Reservations (ticket icon)
│   ├── My Punch Cards (card icon)
│   └── Child Progress (chart icon)
│
├── "Recent notifications" header + See all link
├── Notification items (max 3):
│   Each: icon + title + time
│
└── (if multiple children) Child selector tabs

BOTTOM NAV: Home | Book | Tickets | Profile
```

### SCREEN 08 — Book a Lesson (Type Selection)
```
BG: #F8F9FA

TOP BAR:
├── "Book a Lesson" title (centered)
└── Back arrow left

CONTENT:
├── "What type of lesson?" subtitle — gray
│
└── 4 CARDS (full width, stacked):
    │
    ├── FIXED TIME SLOT card:
    │   Icon: clock + calendar
    │   Title: "Fixed Time Slot"
    │   Subtitle: "Book your scheduled weekly lesson"
    │   Right arrow →
    │
    ├── EXTRA 1-ON-1 LESSON card:
    │   Icon: person + star
    │   Title: "Extra 1-on-1 Lesson"
    │   Subtitle: "Book an extra or make-up private lesson"
    │
    ├── EXTRA 1-ON-2 LESSON card:
    │   Icon: 2 persons
    │   Title: "Extra 1-on-2 Lesson"
    │   Subtitle: "Shared extra or make-up lesson"
    │
    └── HOLIDAY LESSONS card:
        Icon: sun + swimmer
        Title: "Holiday Lessons"
        Subtitle: "Special lessons during school holidays"
        Badge: "NEW" (orange)
```

### SCREEN 09 — Fixed Slot Calendar
```
TOP BAR: "My Fixed Slot" + back arrow

BANNER (blue, rounded):
├── "Your fixed slot:"
├── [Day] at [Time]
└── [Location name]

BOOKING WINDOW INFO:
(if > 14 days ahead): "Bookings open 2+ weeks in advance"
(if ≤ 14 days): "Open booking window — book now!"

CALENDAR WIDGET (full width):
├── Month selector
├── 7-col calendar grid
└── Legend: Green=Available, Red=Full, Gray=Past

SELECTED DATE DETAIL (appears below when date tapped):
├── Date selected label
├── Time: [time] - [end time]
├── Location: [name]
├── Instructor: [name]
└── Book this lesson → button (blue)
```

### SCREEN 10 — Extra Lesson Location Selection
```
TOP BAR: "Choose Location" + back

Search bar (search locations)

Location list (cards):
Each location card:
├── Location photo (if available) or map icon
├── Location name (bold)
├── City
└── Available slots count badge (green)

Notes:
- Filter by lesson type automatically
- Show only locations with available slots
```

### SCREEN 11 — Extra Lesson Calendar
```
TOP BAR: "[Location name]" + back

LESSON TYPE HEADER: "Extra 1-on-1 Lesson" badge

CALENDAR: same as fixed slot calendar

TIME SLOTS (shown below calendar after date selected):
Row of chips:
├── [Time] chip — green if available
├── [Time] chip — red if full
└── [Time] chip — orange if 1 spot left

SELECTED SLOT INFO:
├── Date + Time
├── Duration: 30 min
├── Price: €XX.XX
└── Book Now → button
```

### SCREEN 12 — Booking Summary
```
TOP BAR: "Booking Summary" + back

LESSON DETAIL CARD:
├── Type badge
├── Location name
├── Date (day, date month year)
├── Time (start - end)
└── Instructor name

CHILD SELECTOR (if multiple children):
Horizontal scroll of child avatars + names
Selected: blue border

PAYMENT METHOD:
Tab: "Punch Card" | "Pay by Card"

PUNCH CARD TAB:
├── My card: "10x 1-on-1" — balance: 8/10
└── Use 1 credit

PAY BY CARD TAB:
├── Amount: €XX.XX
└── Enter card details →

PRICE SUMMARY:
├── Lesson: €XX.XX
├── Discount: -€0
└── Total: €XX.XX

Confirm & Book button (full width, blue)

Note: small text "Payment required upfront"
```

### SCREEN 13 — Booking Success
```
Full screen, white BG

CENTER:
├── Lottie animation: checkmark circle (green)
├── "Lesson Booked!" — 24px bold
├── Date + Time — 16px gray
├── Location — 14px gray
└── QR code / barcode widget

BUTTONS:
├── View My Reservations (secondary button)
└── Go to Home (primary button)
```

### SCREEN 14 — My Reservations
```
TOP BAR: "My Reservations" + back

TABS: Upcoming (gepland) | History (geschiedenis)

UPCOMING TAB:
Filter chips: All | Fixed | Extra | Holiday

Reservation cards (list):
Each card:
├── LEFT: colored status strip
├── Lesson type badge (top)
├── Location name (bold)
├── Date + time (gray)
├── Instructor name (small, gray)
├── Status badge (right side)
└── (if upcoming) Cancel link (bottom right, red text)

HISTORY TAB:
Same cards but with attended/no-show/cancelled status
No cancel option
```

### SCREEN 15 — My Punch Cards
```
TOP BAR: "My Punch Cards"

Active cards (if any):
Punch card widget:
├── BG: blue gradient
├── Card name: "10 × 1-on-1 Swimming Lessons"
├── Balance: "8 remaining" (large white text)
├── Credits bar (white filled/empty)
├── Valid until: [date]
└── Card number (small bottom)

Purchase New Punch Card button

PUNCH CARD TYPES (scroll horizontal):
Cards showing available types to purchase

PURCHASE POPUP/SHEET:
├── Type selected
├── Credits: 10 lessons
├── Price: €XXX
└── Pay with Stripe button
```

### SCREEN 16 — Child Progress
```
TOP BAR: "Progress" + child name

CHILD SELECTOR (if multiple):
Horizontal avatar tabs

CURRENT LEVEL CARD:
├── Level: "Intermediate" (large badge)
├── Overall progress: 65% (progress bar)
└── Last lesson: [date] with [instructor]

SKILLS SECTION:
"Active Skills" header

Skill cards (list):
Each skill card:
├── Skill name
├── Steps: 3/5 completed
├── Progress bar (blue fill)
└── Tap → SkillDetailScreen

RECENT LESSONS:
"Last 3 lessons" mini cards:
├── Date
├── Instructor
└── Quick summary
```

### SCREEN 17 — Practice at Home
```
TOP BAR: "Practice at Home" + back

BANNER:
"Based on [child name]'s current level: Intermediate"

EXERCISES (list):
Each exercise card:
├── Exercise icon (relevant illustration)
├── Exercise title
├── Description (2-3 lines)
└── Estimated time: X mins

SECTION: "This Week's Focus"
Highlighted exercise card (blue border)
```

### SCREEN 18 — Chat Screen
```
TOP BAR:
├── Back arrow
├── Instructor avatar + name
└── Info icon

Chat messages (dash_chat_2):
├── Received: white bubble, left-aligned
├── Sent: blue bubble, right-aligned
├── Timestamps
└── Read receipts (checkmarks)

INPUT BAR (bottom):
├── Attachment icon
├── Text input
└── Send button (blue)
```

### SCREEN 19 — Notifications
```
TOP BAR: "Notifications" + "Mark all read" link

Sections: Today | Yesterday | Earlier

Notification items:
├── Icon (colored by type)
├── Title (bold if unread)
├── Body text (gray)
├── Time (right)
└── Unread dot (blue, left)

Icons by type:
📅 Booking notifications → blue
💳 Payment notifications → green  
📊 Progress notifications → orange
⏰ Reminder notifications → yellow
💬 Message notifications → purple
```

### SCREEN 20 — FAQ
```
TOP BAR: "FAQ" + back

Search bar (top, prominent)

CATEGORIES (horizontal scroll chips):
All | Booking | Payment | Lessons | Account

FAQ ITEMS (accordion):
Each item:
├── Question (bold) + expand arrow
└── (when expanded) Answer text (gray)

Empty state if search no results:
"No results found for '[query]'"
```

### SCREEN 21 — Profile
```
TOP BAR: "Profile"

PROFILE HEADER:
├── Avatar (large, 80px) + camera edit icon
├── Full name (bold)
└── Email (gray)

MY CHILDREN section:
Child cards (horizontal scroll):
├── Child avatar (initials)
├── Name
└── Level badge

SETTINGS LIST:
├── Edit Profile →
├── Notification Settings (toggle)
├── Language (NL / EN toggle)
├── Dark Mode (toggle)
├── Help Center →
├── FAQ →
├── Privacy Policy →
└── Log Out (red text, bottom)
```

---

## 5. SCREEN DESIGNS — INSTRUCTOR APP

### SCREEN I-01 — Instructor Home
```
BG: #F8F9FA

TOP: "Good morning, [Name]" + avatar right

TODAY SUMMARY CARD (blue gradient):
├── "Today's lessons: 8"
├── "Students: 12"
└── Next lesson in: 2 hours

UPCOMING LESSON CARD:
├── Time + Location
├── Students (avatars row)
└── View Details button

QUICK ACTIONS:
├── Today's Schedule
└── Submit Progress

OFFLINE BANNER (if no internet):
Red bar: "Offline — Using cached data"

SYNC STATUS (when syncing):
Blue bar: "Syncing... 3 items remaining"
```

### SCREEN I-02 — Schedule
```
TOP BAR: "Schedule" + week/month toggle

FILTER:
Location dropdown (if instructor at multiple locations)

WEEK VIEW:
Horizontal days (scroll left/right for weeks)
├── Day header: Mon 25 Mar
└── Lesson blocks:
    ├── Time range
    ├── Location
    ├── Student count
    └── Color coded by location

TAP lesson block → Lesson Detail Screen

MONTH VIEW:
Calendar grid with lesson count badges per day
```

### SCREEN I-03 — Lesson Detail (Phone Layout)
```
TOP BAR: "[Location] — [Time]" + back

LESSON INFO BANNER:
├── Lesson type badge
├── Date + time
└── Location

"Students today" header

STUDENT LIST (cards):
Each student card:
├── Avatar + initials
├── Name (bold)
├── Level badge (colored)
├── Today's goals (italicized gray)
└── "Update Progress" button →
```

### SCREEN I-04 — Lesson Detail (iPad Layout — Split View)
```
LEFT PANEL (1/3 width):
Student list (simplified):
├── Avatar + name
├── Level badge
└── Tap to select → updates right panel

RIGHT PANEL (2/3 width):
Selected student detail:
├── Full name + avatar (larger)
├── Current level
├── Today's goals
├── Previous session notes
└── "Update Progress" form (same screen)
```

### SCREEN I-05 — Progress Update Form
```
TOP: Student name + avatar + lesson date

FORM (scrollable):
│
├── LEVEL (dropdown):
│   Current: Intermediate
│   Options: Beginner / Intermediate / Advanced
│
├── SKILLS WORKED ON (checkboxes):
│   □ Freestyle Arms
│   ☑ Breathing Coordination  ← checked
│   □ Backstroke
│
├── STEPS COMPLETED (checkboxes):
│   ☑ Breathing every 3 strokes
│   □ Bilateral breathing
│
├── GOALS FOR NEXT LESSON:
│   Chip input: [+ Add goal]
│   Existing: "Practice left-side breathing" ×
│
├── PRACTICE EXERCISES TO SEND:
│   Multi-select chips from learning plan
│   ☑ Face-down floating in bathtub
│   □ Breathing rhythm (3 counts)
│
└── NOTES (text area, optional):
    "Student showed great improvement today..."

SUBMIT BUTTON (full width):
"Submit & Notify Parent"

Success toast after submit:
"Progress saved! Parent notified ✓"
```

### SCREEN I-06 — Availability Request
```
TOP BAR: "My Availability" + back

CALENDAR (multi-date select):
Tap dates to toggle available/unavailable

TIME RANGE per day:
Available from: [time picker]
Available until: [time picker]

Notes field (optional)

SUBMIT button

MY SUBMITTED REQUESTS (below):
List of past submissions:
├── Date range
├── Status: Pending / Approved
└── Admin notes (if any)
```

---

## 6. SCREEN DESIGNS — ADMIN WEB PANEL

### LAYOUT — All Admin Pages
```
LEFT SIDEBAR (280px, dark):
├── Snorkeltje logo (top)
├── Navigation links:
│   ├── Dashboard
│   ├── Customers
│   ├── Children
│   ├── Instructors
│   ├── Locations
│   ├── Lesson Types
│   ├── Schedule
│   ├── Bookings
│   ├── Punch Cards
│   ├── Invoices
│   ├── Payments
│   ├── Waitlist
│   ├── Reports
│   ├── FAQ
│   ├── Notifications
│   └── Settings
│
└── Bottom: admin avatar + name + logout

TOP BAR (full width):
├── Page title (left)
├── Search (center)
└── Notifications bell + avatar (right)

MAIN CONTENT: 1160px max-width, padding 32px
```

### ADMIN SCREEN A-01 — Dashboard
```
STATS ROW (4 cards):
├── Total Bookings Today: 47
├── Revenue Today: €235.00
├── Active Students: 312
└── Open Waitlist: 8

MAIN CONTENT (2 columns):
LEFT (60%):
├── Revenue Chart (line, last 30 days)
│   Toggle: Week | Month | Year
│
└── Recent Bookings Table:
    Columns: ID | Student | Type | Location | Date | Status
    (last 10 rows)

RIGHT (40%):
├── Upcoming Today (list of next 5 lessons)
├── Outstanding Invoices count + link
└── Expiring Punch Cards (this week)

QUICK ACTIONS (bottom row):
├── New Booking
├── New Customer
└── Generate Report
```

### ADMIN SCREEN A-02 — Bookings
```
TOP ROW:
├── "All Bookings" title
├── Filters: Date range | Location | Instructor | Type | Status
└── New Booking button (blue)

TABLE:
Columns:
│ ID │ Student │ Lesson Type │ Location │ Date │ Time │ Instructor │ Status │ Actions │

Row actions (hover): View | Cancel | Mark Attended | Mark No-show

DETAIL PANEL (slide in from right on row click):
├── Full booking details
├── Customer info
├── Payment info
└── Action buttons
```

### ADMIN SCREEN A-03 — Revenue Dashboard
```
DATE RANGE picker (top)

METRIC CARDS:
Total Revenue | Avg per Day | Lesson Count | Refunds Issued

MAIN CHART: Line chart (revenue over time)
Toggle: Day | Week | Month

BREAKDOWN TABLES (3 tabs):
├── By Location: Location name | Lessons | Revenue
├── By Instructor: Name | Hours | Lessons | Revenue
└── By Lesson Type: Type | Count | Revenue

EXPORT button: CSV | Excel
```

### ADMIN SCREEN A-04 — Schedule Grid
```
WEEK VIEW (default):
Left column: Time (06:00 → 22:00)
Top row: Mon | Tue | Wed | Thu | Fri | Sat | Sun
Cells: lesson blocks (colored by location)

Lesson block:
├── Time
├── Instructor name
├── Student count
└── Location color indicator

CONTROLS:
├── Week navigator (prev/next)
├── Filter by location
├── Filter by instructor
└── View: Week | Day | List

Click cell: lesson detail popup
"+ New" button on empty cell: new time slot
```

---

## 7. DESIGN NOTES FOR EACH SCREEN

### Branding Notes
```
- Use Snorkeltje fish mascot in onboarding illustrations
- Blue (#1A6FBF) is the primary brand color — seen on current site
- Orange (#F5A623) for accents — matches current site orange
- Keep design clean, family-friendly, professional
- Dutch parents are the primary users — clean, functional preferred
```

### Mobile Design Notes
```
- iOS: Follow iOS HIG guidelines (safe areas, fonts)
- Android: Material Design influences (but keep custom brand feel)
- Minimum touch target: 44×44px
- All scrollable content: momentum scrolling
- Pull to refresh on all list screens
- Skeleton loading (not spinners) for content
- Empty states: illustration + helpful message + action button
```

### iPad Notes
```
- LessonDetailScreen: True split view (side by side panels)
- All other screens: centered with max-width OR sidebar nav
- Larger touch targets (48×48px minimum)
- Progress update form optimized for one-hand use while holding iPad
- Landscape mode MUST work for instructor screens
```

### Accessibility
```
- Contrast ratio: minimum 4.5:1 for normal text, 3:1 for large
- All interactive elements: labeled for screen readers
- Color NOT only indicator (add icons/patterns alongside color)
- Text size: support iOS/Android dynamic type scaling
- Focus states clearly visible on web admin
```

### Prototype Flows to Create in Figma
```
Flow 1: Login → Home → Book Fixed Slot → Success
Flow 2: Home → Extra 1-on-1 → Location → Calendar → Payment → Success
Flow 3: Home → My Punch Cards → Purchase → Stripe → Confirmation
Flow 4: Home → Child Progress → Skill Detail
Flow 5: Instructor → Schedule → Lesson Detail → Progress Update → Submit
Flow 6: Admin → Dashboard → Bookings → Cancel Booking
```

---

*Design Guide Version: 1.0*  
*For Developer Use — Figma Design Reference*  
*Client: Walter Van De Geest — Zwemschool Snorkeltje*
