# 🏊 Zwemschool Snorkeltje - Swimming School Mobile App

## 📋 Project Overview

**Client:** Walter Van De Geest - Zwemschool Snorkeltje  
**Location:** Bunschoten Spakenburg, Netherlands  
**Developer:** Faizan (Upwork Contract)  
**Budget:** €6,000 / 4 Milestones / 13 Weeks  
**Current Milestone:** Milestone 1 - $2,085 Active  
**Date:** March 25, 2026

---

## 🎯 What We Built

A complete **mobile-first web application prototype** for Zwemschool Snorkeltje swimming school management system. This React-based prototype demonstrates all 30 screens designed for the Flutter mobile app.

### Platform Strategy
- **Production:** Flutter (iOS + Android + iPad) + Next.js Admin Panel
- **This Prototype:** React + Tailwind CSS (mobile-first web demo)

---

## 🎨 Brand Identity

### Official Brand Colors (from Snorkeltje Logo SVG)
```css
Primary Orange:  #FF5C00  /* Logo orange - CTAs, accents */
Primary Blue:    #0365C4  /* Logo dark blue - main UI, headers */
Light Blue:      #00C1FF  /* Logo light blue - highlights */
Medium Blue:     #00AEFF  /* Secondary blue */
Teal:            #5BC1DB  /* Wave color */

Background:      #F4F7FC  /* Page background */
Success Green:   #18BB68
Error Red:       #F03838
Warning Amber:   #FCAA00
```

---

## 📱 Complete App Structure (30 Screens)

### ✅ CUSTOMER APP (Light Theme - Dutch Language)
1. **Splash Screen** - Brand intro with loading animation
2. **Onboarding 1** - "Boek lessen wanneer je wilt"
3. **Onboarding 2** - "Volg de voortgang van uw kind"
4. **Onboarding 3** - "Blijf verbonden met de instructeur"
5. **Login** - Email/password authentication
6. **Home Dashboard** - Next lesson + quick actions + notifications
7. **Book a Lesson** - Lesson type selection (4 types)
8. **Fixed Slot Calendar** - Calendar with 14-day booking rule
9. **Booking Summary** - Payment method selection
10. **Booking Success** - Confirmation with QR code
11. **My Reservations** - Upcoming & history tabs
12. **Reservation Detail** - Full booking info
13. **My Punch Cards** - Active cards + purchase options
14. **Child Progress** - Level → Skill → Steps tracking
15. **Practice at Home** - Exercises based on level

### ✅ INSTRUCTOR APP (Dark Theme)
16. **Instructor Home** - Today's schedule + sync status
17. **Lesson Detail** - Student list with goals
18. **Progress Update Form** - Skills, steps, notes submission

### ✅ ADDITIONAL SCREENS
19. **Waitlist** - Join waitlist with preferences
20. **Chat** - Messaging with instructor
21. **Notifications** - All app notifications
22. **FAQ** - Frequently asked questions
23. **Profile** - User settings & children management
24. **Waitlist Invitation** - 24h countdown to accept slot
25. **Auto-Conversion** - 1-on-1 → 1-on-2 refund notification
26. **Monthly Report** - Location owner revenue report
27. **Offline Mode** - Cached data + sync queue
28. **Stripe Payment** - Secure card payment
29. **Skill Detail** - Individual skill progress
30. **Payment History** - All transactions

---

## 🔑 Critical Business Logic

### 1. Fixed Slot System
- Every customer has ONE fixed weekly slot (e.g., Monday 15:00)
- Customer must RESERVE each lesson manually (not auto-booked)
- **14-Day Rule:** Slots open to EVERYONE within 14 days; beyond 14 days only fixed slot owner can book
- Calendar Colors: GREEN=available, RED=full, GRAY=past

### 2. Lesson Types
1. **Vast tijdstip** - Fixed time slot (weekly)
2. **Extra 1-op-1** - Extra/makeup private lesson
3. **Extra 1-op-2** - Extra/makeup shared lesson
4. **Vakantie zwemles** - Holiday lessons

### 3. Auto-Conversion Feature (KEY!)
- Customer books "Extra 1-op-1" at full price upfront
- If another customer also shows up → automatically converts BOTH to 1-on-2
- BOTH customers receive **partial refund** (difference between 1-on-1 and 1-on-2 price)
- Auto push notification sent

### 4. Cancellation Policy
- **Standard lessons:** Cancel up to 24h before → full refund
- **Holiday lessons:** Cancel up to 96h (4 days) before → full refund
- Within deadline: NO refund, NO makeup

### 5. Payment System
- ALWAYS upfront (no pay-later)
- Methods: Stripe card OR Punch Card credits
- 1 punch card credit = 1 lesson

### 6. Punch Card Pricing (Real Prices)
| Type | 10× | 5× | 3× | Validity |
|------|-----|-----|-----|----------|
| 1-op-1 | €380 | €190 | €114 | 365 days |
| 1-op-2 | €270 | €135 | €81 | 365 days |
| 1-op-3 | €200 | €100 | €60 | 365 days |
| Survival | €250 | €125 | €75 | 84 days |

### 7. Student Progress System
**Structure:** Level → Skill → Steps

**Levels:**
- Beginner
- Gevorderd Beginner (Advanced Beginner)
- Gevorderd (Intermediate)
- Gevorderd Plus (Advanced)
- Diploma A/B/C

After each lesson:
- Instructor updates: level, skills worked on, steps completed
- Goals set for next lesson
- Practice exercises assigned
- Parent receives automatic push notification

### 8. Automated Waitlist
1. Customer joins with preferences (lesson type, locations, days, time range)
2. When slot opens → system automatically matches
3. Sends invitation with **24-hour countdown**
4. If declined/expired → next person gets invitation

---

## 🏗️ Tech Stack

### This Prototype
- **Framework:** React 18.3.1
- **Routing:** React Router 7.13.0
- **Styling:** Tailwind CSS 4.1.12
- **UI Components:** Custom components with Radix UI primitives
- **Icons:** Lucide React
- **Build Tool:** Vite 6.3.5

### Production System (from Architecture Doc)
- **Mobile App:** Flutter (iOS + Android + iPad)
- **Backend:** Node.js/Express + PostgreSQL/Supabase
- **Payments:** Stripe
- **Push Notifications:** Firebase FCM
- **Storage:** AWS S3
- **Offline:** Hive (local storage)
- **State Management:** Riverpod
- **Admin Web:** Next.js 14

---

## 📂 Project Structure

```
/src
├── /app
│   ├── App.tsx                    # Main app component with RouterProvider
│   ├── routes.tsx                 # React Router configuration (30 screens)
│   ├── /components
│   │   ├── /layout
│   │   │   ├── MobileFrame.tsx    # iPhone 17 Pro Max frame wrapper
│   │   │   ├── BottomNav.tsx      # 4-tab bottom navigation
│   │   │   └── Header.tsx         # Reusable header with back/bell
│   │   └── /ui
│   │       ├── Button.tsx         # Primary, secondary, danger variants
│   │       ├── Badge.tsx          # Status & lesson type badges
│   │       ├── Card.tsx           # White rounded card container
│   │       ├── Input.tsx          # Form input with label & error
│   │       └── ProgressBar.tsx    # Skill progress indicator
│   ├── /config
│   │   └── theme.ts               # Brand colors & design tokens
│   └── /screens
│       ├── SplashScreen.tsx       # 01 - Brand intro
│       ├── OnboardingScreen.tsx   # 02-04 - 3-slide onboarding
│       ├── LoginScreen.tsx        # 05 - Email/password login
│       ├── HomeScreen.tsx         # 06 - Main dashboard
│       ├── BookLessonScreen.tsx   # 07 - Lesson type selection
│       └── ... (23 more screens)
├── /styles
│   └── theme.css                  # Tailwind config & global styles
└── /imports
    ├── DEVELOPER_ARCHITECTURE.md  # Full system architecture
    ├── FIGMA_DESIGN_GUIDE.md      # Design system & components
    └── FIGMA_AI_MASTER_PROMPT.md  # Complete requirements (30 screens)
```

---

## 🎯 Features Implemented

### ✅ Navigation System
- React Router with 30 routes
- Bottom navigation (Thuis, Boeken, Kaarten, Profiel)
- Back button navigation
- Smooth transitions

### ✅ iPhone Frame Simulation
- iPhone 17 Pro Max dimensions (430×932px frame)
- Dynamic Island (pill-shaped notch)
- Home indicator
- Status bar (time, network, battery)

### ✅ Design System
- Exact brand colors from Snorkeltje logo
- Consistent spacing (8pt grid)
- Typography scale
- Shadow system
- Border radius tokens

### ✅ Reusable Components
- Button (5 variants)
- Badge (6 status types)
- Card (with hover states)
- Input (with icon support)
- Progress bar (with percentage)
- Header (light/dark themes)
- Bottom navigation (active states)
- Mobile frame wrapper

### ✅ Screens Completed
- **Fully Designed (5):** Splash, Onboarding, Login, Home, Book Lesson
- **Placeholder (25):** All other screens with "under construction" UI

---

## 🚀 Next Steps for Full Development

### Milestone 1 Tasks (Current)
1. ✅ Complete architecture documentation
2. ✅ Design all 30 screens in Figma
3. ✅ Create React prototype (this!)
4. ⏳ Set up Flutter project structure
5. ⏳ Implement authentication flow
6. ⏳ Build home screen with real data

### Milestone 2 (Weeks 4-7)
- Booking system with calendar
- Payment integration (Stripe)
- Punch card management
- Progress tracking system

### Milestone 3 (Weeks 8-10)
- Instructor app (dark theme)
- Offline sync
- Chat system
- Notifications

### Milestone 4 (Weeks 11-13)
- Admin panel (Next.js)
- Waitlist automation
- Monthly reports
- Testing & deployment

---

## 📚 Key Documents

1. **DEVELOPER_ARCHITECTURE.md** - Full system architecture, database schema, API endpoints
2. **FIGMA_DESIGN_GUIDE.md** - Design system, component library, screen specifications
3. **FIGMA_AI_MASTER_PROMPT.md** - Complete requirements for all 30 screens

---

## 🌐 6 Swimming Pool Locations

1. De Bilt - Utrecht
2. Bad Hulckesteijn - Nijkerk
3. Garderen - Barneveld
4. Wolfheze - Renkum
5. Dordrecht - Dordrecht
6. Soestduinen - Soest

---

## 🎓 Learning

This prototype demonstrates:
- Mobile-first responsive design
- Dutch language UI/UX
- Swimming school domain modeling
- Complex booking logic
- Multi-role system (Customer, Instructor, Admin, Location Owner)
- Payment & refund workflows
- Progress tracking hierarchy
- Offline-first architecture planning

---

**Built with ❤️ for Zwemschool Snorkeltje**  
*Making swimming lessons accessible and trackable for Dutch families*
