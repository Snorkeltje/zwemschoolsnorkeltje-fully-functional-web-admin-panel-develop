# 🏊 Zwemschool Snorkeltje — Developer Architecture Document
**Version:** 2.0  
**Date:** March 25, 2026  
**Developer:** Faizan  
**Client:** Walter Van De Geest — Bunschoten Spakenburg, Netherlands  
**Contract:** Upwork — $2,085 (Milestone 1 Active)  
**Total:** €6,000 / 4 Milestones / 13 Weeks  

---

## 📋 TABLE OF CONTENTS
1. [Current System Deep Analysis](#1-current-system-deep-analysis)
2. [New System Architecture](#2-new-system-architecture)
3. [Tech Stack — Full Setup](#3-tech-stack--full-setup)
4. [Folder Structure](#4-folder-structure)
5. [Database Schema — Complete](#5-database-schema--complete)
6. [API Endpoints — Complete](#6-api-endpoints--complete)
7. [App Screens — Complete Flow](#7-app-screens--complete-flow)
8. [Business Logic — Rules Engine](#8-business-logic--rules-engine)
9. [Payment System Logic](#9-payment-system-logic)
10. [Offline Sync Architecture](#10-offline-sync-architecture)
11. [Notification System](#11-notification-system)
12. [Milestone Breakdown](#12-milestone-breakdown)
13. [Development Order](#13-development-order)

---

## 1. CURRENT SYSTEM DEEP ANALYSIS

### System: i-Reserve v5.40 (snorkeltje.i-reserve.net)
Built on PHP 8.4.19 + Bootstrap. Server-rendered. No mobile app.

### Admin Panel Navigation (Full Menu Map)
```
ADMIN NAVBAR:
├── Dashboard
│   ├── Algemeen (General overview)
│   └── Standaard (Standard dashboard — shows reservations + filters)
│
├── Klant (Customer)
│   ├── Huidig filter (Current filter)
│   ├── Zoeken (Search customers)
│   ├── Nieuwe klant (New customer)
│   ├── Laatst getoonde klanten (Recently viewed customers)
│   └── Beheer filters (Manage filters)
│
├── Reservering (Reservation)
│   ├── Huidig filter (Current filter)
│   ├── Zoeken (Search reservations)
│   ├── Nieuwe reservering (New reservation)
│   ├── Nieuw via kalender (New via calendar)
│   ├── Nieuwe dummy reservering (New dummy/test reservation)
│   ├── Rooster (Schedule/roster view)
│   ├── Laatst bekeken reserveringen (Recently viewed)
│   └── Beheer filters (Manage filters)
│
├── Factuur (Invoice)
│   ├── Huidig filter (Current filter)
│   ├── Zoeken (Search invoices)
│   ├── Nieuwe factuur (New invoice)
│   ├── Factuur historie (Invoice history)
│   └── Openstaande posten (Outstanding/unpaid items)
│
└── Modules
    ├── Beheer knipkaarten (Manage punch cards)
    ├── Betalingen (Payments overview)
    └── Gesprekken (Conversations/Chat)
```

### Customer Frontend Navigation (Full Menu Map)
```
CUSTOMER NAVBAR:
├── Homepage (main dashboard)
│   ├── Boek een les (Book a lesson)
│   ├── Mijn reserveringen (My reservations)
│   └── Mijn knipkaarten (My punch cards)
│
├── Boek een les (Book a lesson) — direct nav
│
├── Bestel Knipkaart (Order Punch Card) — DROPDOWN:
│   ├── 1-op-1 zwemles (1-on-1 swimming lesson)
│   ├── 1-op-2 zwemles (1-on-2 swimming lesson)
│   ├── 1-op-3 zwemles (1-on-3 swimming lesson)
│   ├── Survival (Survival swimming)
│   ├── Inschrijfgeld (Registration fee)
│   ├── Wijzigen dag/tijd (Change day/time)
│   └── BSO-zwemles (After-school swimming)
│
├── Mijn account (My Account) — DROPDOWN:
│   ├── Mijn knipkaarten (My punch cards)
│   ├── Mijn reserveringen (gepland) (Upcoming reservations)
│   ├── Mijn reserveringen (geschiedenis) (Reservation history)
│   └── Mijn profiel (My profile)
│
├── Contact
└── Uitloggen (Log out)
```

### Admin Dashboard Data
- **Line chart:** Reservations last 30 days (range: 30–130/day, avg ~70/day)
- **Quick access:** Reservation, Zoeken, Kalender, Rooster
- **Recent reservations table columns:**
  - Reservering ID (Booking ID)
  - Product (lesson type + location + time)
  - Datum (Date)
  - Datum tot (End date — same for single lessons)
  - Tijd vanaf (Start time)
  - Tijd tot (End time)
  - Aantal plaatsen (Number of seats)
  - Achternaam klant (Customer surname)

### Current Reservation IDs (from screenshots)
- 232508 — DE BILT 1-op-2 woensdag 16.00 uur
- 232641 — Bad Hulckesteijn 1-op-2 maandag 16.00 uur
- 232640 — *Bad Hulckesteijn 1-op-1 extra 2e instr. (Extra lesson)
- Note: Asterisk (*) prefix = extra/make-up lesson

### Modules Found
1. **Beheer knipkaarten** — Full punch card management
2. **Betalingen** — Payment overview and tracking
3. **Gesprekken** — Chat/conversations between admin and customers

### Invoice System (Factuur)
- New invoice creation
- Invoice history
- Outstanding/unpaid items tracking
- PDF generation
- Email sending

---

## 2. NEW SYSTEM ARCHITECTURE

### Decision: Build From Scratch ✅
Complete replacement of i-Reserve with a modern cross-platform system.

### Platform Matrix
| Platform | Framework | Primary Users | Secondary |
|----------|-----------|---------------|-----------|
| iOS App | Flutter | Customers (Parents) | — |
| Android App | Flutter | Customers (Parents) | — |
| iPad App | Flutter (tablet layout) | Instructors | Customers |
| Web Admin | Next.js 14 | Admin | Location Owners |

### System Architecture Overview
```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT APPLICATIONS                       │
├──────────┬──────────┬──────────────┬────────────────────────┤
│ iOS App  │Android   │  iPad App    │    Web Admin Panel     │
│(Flutter) │(Flutter) │  (Flutter)   │      (Next.js)         │
└────┬─────┴────┬─────┴──────┬───────┴───────────┬────────────┘
     │          │             │                   │
     └──────────┴─────────────┴───────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   REST API        │
                    │   Node.js/Express │
                    │   Port 3000       │
                    └─────────┬─────────┘
           ┌──────────────────┼──────────────────┐
           │                  │                  │
    ┌──────▼──────┐  ┌────────▼────┐  ┌──────────▼──────┐
    │  Supabase   │  │  Redis      │  │   Bull Queue    │
    │  PostgreSQL │  │  Cache      │  │   Background    │
    │  Auth       │  │             │  │   Jobs          │
    └─────────────┘  └─────────────┘  └─────────────────┘
           │
    ┌──────┼────────────────────────────┐
    │      │                            │
    ▼      ▼                            ▼
  Stripe  Firebase              AWS S3 / Cloudflare
 Payments Notifications          File Storage
```

---

## 3. TECH STACK — FULL SETUP

### Flutter App Dependencies (pubspec.yaml)
```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  flutter_riverpod: ^2.4.0
  riverpod_annotation: ^2.3.0
  
  # Navigation
  go_router: ^13.0.0
  
  # HTTP & API
  dio: ^5.4.0
  retrofit: ^4.0.0
  
  # Local Storage (Offline)
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  
  # Secure Storage
  flutter_secure_storage: ^9.0.0
  
  # Authentication
  supabase_flutter: ^2.3.0
  
  # Payments
  flutter_stripe: ^10.1.1
  
  # Push Notifications
  firebase_core: ^2.24.0
  firebase_messaging: ^14.7.0
  flutter_local_notifications: ^16.3.0
  
  # UI Components
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.1
  shimmer: ^3.0.0
  lottie: ^2.7.0
  
  # Calendar & Date
  table_calendar: ^3.0.9
  intl: ^0.19.0
  
  # Charts
  fl_chart: ^0.66.2
  
  # Camera & Images
  image_picker: ^1.0.7
  
  # PDF
  printing: ^5.12.0
  pdf: ^3.10.7
  
  # Connectivity
  connectivity_plus: ^5.0.2
  
  # Permissions
  permission_handler: ^11.2.0
  
  # QR Code
  qr_flutter: ^4.1.0
  qr_code_scanner: ^1.0.1
  
  # Chat
  dash_chat_2: ^0.0.21
  
  # Misc
  url_launcher: ^6.2.4
  share_plus: ^7.2.1
  package_info_plus: ^5.0.1
  device_info_plus: ^9.1.1
  uuid: ^4.3.3

dev_dependencies:
  flutter_test:
    sdk: flutter
  build_runner: ^2.4.8
  riverpod_generator: ^2.3.9
  retrofit_generator: ^8.0.0
  hive_generator: ^2.0.1
  flutter_lints: ^3.0.0
  mockito: ^5.4.4
```

### Node.js Backend Dependencies (package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "prisma": "^5.8.0",
    "@prisma/client": "^5.8.0",
    "@supabase/supabase-js": "^2.39.0",
    "stripe": "^14.14.0",
    "firebase-admin": "^12.0.0",
    "bull": "^4.12.2",
    "redis": "^4.6.12",
    "nodemailer": "^6.9.8",
    "@sendgrid/mail": "^8.1.0",
    "puppeteer": "^21.7.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.4",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5",
    "sharp": "^0.33.2",
    "date-fns": "^3.3.1",
    "uuid": "^9.0.1",
    "winston": "^3.11.0",
    "@sentry/node": "^7.99.0",
    "express-rate-limit": "^7.2.0",
    "compression": "^1.7.4"
  }
}
```

### Next.js Admin Dependencies (package.json)
```json
{
  "dependencies": {
    "next": "14.1.0",
    "react": "^18",
    "typescript": "^5",
    "@supabase/supabase-js": "^2.39.0",
    "tailwindcss": "^3.4.1",
    "@shadcn/ui": "latest",
    "zustand": "^4.5.0",
    "recharts": "^2.10.3",
    "@tanstack/react-table": "^8.11.7",
    "@tanstack/react-query": "^5.17.15",
    "react-hook-form": "^7.50.1",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4",
    "date-fns": "^3.3.1",
    "react-day-picker": "^8.10.0",
    "sonner": "^1.4.0",
    "lucide-react": "^0.323.0",
    "xlsx": "^0.18.5",
    "jspdf": "^2.5.1",
    "axios": "^1.6.7"
  }
}
```

---

## 4. FOLDER STRUCTURE

### Flutter App Structure
```
lib/
├── main.dart
├── app.dart
├── core/
│   ├── constants/
│   │   ├── api_constants.dart
│   │   ├── app_colors.dart
│   │   ├── app_strings.dart
│   │   └── app_dimensions.dart
│   ├── theme/
│   │   ├── app_theme.dart
│   │   ├── light_theme.dart
│   │   └── dark_theme.dart
│   ├── router/
│   │   ├── app_router.dart
│   │   └── route_names.dart
│   ├── network/
│   │   ├── api_client.dart
│   │   ├── dio_interceptors.dart
│   │   └── network_checker.dart
│   ├── storage/
│   │   ├── secure_storage.dart
│   │   ├── hive_storage.dart
│   │   └── hive_adapters/
│   ├── utils/
│   │   ├── date_utils.dart
│   │   ├── currency_utils.dart
│   │   ├── validators.dart
│   │   └── extensions.dart
│   └── errors/
│       ├── app_exception.dart
│       └── failure.dart
│
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── models/
│   │   │   │   ├── user_model.dart
│   │   │   │   └── auth_response.dart
│   │   │   ├── repositories/
│   │   │   │   └── auth_repository_impl.dart
│   │   │   └── datasources/
│   │   │       ├── auth_remote_datasource.dart
│   │   │       └── auth_local_datasource.dart
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── user_entity.dart
│   │   │   ├── repositories/
│   │   │   │   └── auth_repository.dart
│   │   │   └── usecases/
│   │   │       ├── login_usecase.dart
│   │   │       ├── logout_usecase.dart
│   │   │       └── forgot_password_usecase.dart
│   │   └── presentation/
│   │       ├── providers/
│   │       │   └── auth_provider.dart
│   │       ├── screens/
│   │       │   ├── splash_screen.dart
│   │       │   ├── onboarding_screen.dart
│   │       │   ├── login_screen.dart
│   │       │   ├── forgot_password_screen.dart
│   │       │   └── reset_password_screen.dart
│   │       └── widgets/
│   │           ├── auth_text_field.dart
│   │           └── auth_button.dart
│   │
│   ├── home/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   └── home_screen.dart
│   │       └── widgets/
│   │           ├── upcoming_lesson_card.dart
│   │           └── quick_action_button.dart
│   │
│   ├── booking/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── booking_type_screen.dart
│   │       │   ├── fixed_slot_calendar_screen.dart
│   │       │   ├── extra_lesson_location_screen.dart
│   │       │   ├── extra_lesson_calendar_screen.dart
│   │       │   ├── holiday_lessons_screen.dart
│   │       │   ├── booking_summary_screen.dart
│   │       │   ├── booking_success_screen.dart
│   │       │   └── my_reservations_screen.dart
│   │       └── widgets/
│   │           ├── booking_type_card.dart
│   │           ├── calendar_widget.dart
│   │           ├── time_slot_chip.dart
│   │           └── reservation_card.dart
│   │
│   ├── payment/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── payment_method_screen.dart
│   │       │   ├── stripe_payment_screen.dart
│   │       │   └── payment_history_screen.dart
│   │       └── widgets/
│   │           └── payment_card_widget.dart
│   │
│   ├── punch_card/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── my_punch_cards_screen.dart
│   │       │   ├── punch_card_detail_screen.dart
│   │       │   └── purchase_punch_card_screen.dart
│   │       └── widgets/
│   │           └── punch_card_widget.dart
│   │
│   ├── student_progress/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── progress_screen.dart
│   │       │   ├── skill_detail_screen.dart
│   │       │   └── practice_at_home_screen.dart
│   │       └── widgets/
│   │           ├── progress_bar_widget.dart
│   │           └── skill_card.dart
│   │
│   ├── chat/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── chat_list_screen.dart
│   │       │   └── chat_screen.dart
│   │       └── widgets/
│   │           └── message_bubble.dart
│   │
│   ├── waitlist/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── join_waitlist_screen.dart
│   │       │   ├── waitlist_status_screen.dart
│   │       │   └── waitlist_invitation_screen.dart
│   │       └── widgets/
│   │
│   ├── instructor/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── instructor_home_screen.dart
│   │       │   ├── schedule_screen.dart
│   │       │   ├── lesson_detail_screen.dart
│   │       │   ├── progress_update_screen.dart
│   │       │   └── availability_screen.dart
│   │       └── widgets/
│   │           ├── lesson_block.dart
│   │           ├── student_lesson_card.dart
│   │           └── progress_update_form.dart
│   │
│   ├── notifications/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   └── notifications_screen.dart
│   │       └── widgets/
│   │           └── notification_tile.dart
│   │
│   ├── faq/
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── faq_screen.dart
│   │       │   └── faq_detail_screen.dart
│   │       └── widgets/
│   │
│   └── profile/
│       └── presentation/
│           ├── screens/
│           │   ├── profile_screen.dart
│           │   ├── edit_profile_screen.dart
│           │   └── notification_settings_screen.dart
│           └── widgets/
│
└── shared/
    ├── widgets/
    │   ├── app_button.dart
    │   ├── app_text_field.dart
    │   ├── app_loading.dart
    │   ├── app_error.dart
    │   ├── app_bottom_nav.dart
    │   ├── snorkeltje_logo.dart
    │   └── empty_state.dart
    └── models/
        └── pagination_model.dart
```

### Node.js Backend Structure
```
src/
├── index.ts
├── app.ts
├── config/
│   ├── database.ts
│   ├── redis.ts
│   ├── stripe.ts
│   ├── firebase.ts
│   └── env.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   ├── validate.middleware.ts
│   ├── rate-limit.middleware.ts
│   └── error.middleware.ts
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   └── auth.schema.ts
│   ├── users/
│   ├── children/
│   ├── bookings/
│   │   ├── booking.controller.ts
│   │   ├── booking.service.ts
│   │   ├── booking.routes.ts
│   │   ├── booking.schema.ts
│   │   └── booking-rules.service.ts  ← 14-day rule, cancellation
│   ├── payments/
│   │   ├── payment.controller.ts
│   │   ├── payment.service.ts
│   │   ├── stripe.service.ts
│   │   └── refund.service.ts
│   ├── punch-cards/
│   ├── progress/
│   ├── waitlist/
│   │   ├── waitlist.service.ts
│   │   └── waitlist-matcher.service.ts  ← matching algorithm
│   ├── instructor/
│   ├── messages/
│   ├── notifications/
│   │   ├── notification.service.ts
│   │   └── fcm.service.ts
│   ├── reports/
│   │   ├── report.service.ts
│   │   └── pdf.service.ts
│   ├── invoices/
│   ├── faqs/
│   └── admin/
├── jobs/
│   ├── queue.ts
│   ├── monthly-report.job.ts
│   ├── waitlist-checker.job.ts
│   ├── reminder.job.ts
│   └── punch-card-expiry.job.ts
├── utils/
│   ├── logger.ts
│   ├── date.utils.ts
│   └── response.utils.ts
└── types/
    └── index.ts

prisma/
├── schema.prisma
└── migrations/
```

---

## 5. DATABASE SCHEMA — COMPLETE

### Prisma Schema (prisma/schema.prisma)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ───────────────────────────────────────

enum UserRole {
  CUSTOMER
  INSTRUCTOR
  LOCATION_OWNER
  ADMIN
}

enum DayOfWeek {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}

enum BookingStatus {
  BOOKED
  CANCELLED
  ATTENDED
  NO_SHOW
  PENDING
}

enum BookingType {
  FIXED
  EXTRA
  MAKEUP
  HOLIDAY
  DUMMY
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}

enum PaymentMethod {
  STRIPE
  PUNCH_CARD
}

enum WaitlistStatus {
  WAITING
  INVITED
  ACCEPTED
  DECLINED
  EXPIRED
}

enum NotificationType {
  BOOKING_CONFIRMED
  BOOKING_REMINDER
  BOOKING_CANCELLED
  PAYMENT_SUCCESS
  PAYMENT_REFUND
  PROGRESS_UPDATED
  PRACTICE_EXERCISES
  PUNCH_CARD_LOW
  PUNCH_CARD_EXPIRY
  WAITLIST_INVITED
  WAITLIST_EXPIRED
  NEW_MESSAGE
  MONTHLY_REPORT
  AVAILABILITY_APPROVED
}

// ─── TABLES ──────────────────────────────────────

model User {
  id              String    @id @default(uuid())
  email           String    @unique
  phone           String?
  role            UserRole
  firstName       String
  lastName        String
  avatarUrl       String?
  fcmToken        String?   // Firebase push token
  preferredLang   String    @default("nl") // nl or en
  darkMode        Boolean   @default(false)
  notificationsEnabled Boolean @default(true)
  isActive        Boolean   @default(true)
  isInvited       Boolean   @default(false)
  invitedAt       DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  children              Child[]
  bookingsAsCustomer    Booking[]        @relation("CustomerBookings")
  bookingsAsInstructor  Booking[]        @relation("InstructorBookings")
  sentMessages          Message[]        @relation("SentMessages")
  receivedMessages      Message[]        @relation("ReceivedMessages")
  notifications         Notification[]
  punchCards            PunchCard[]
  payments              Payment[]
  waitlistEntries       Waitlist[]
  progressUpdates       StudentProgress[] @relation("InstructorProgress")
  availability          InstructorAvailability[]
  ownedLocations        Location[]
  timeSlotsAsInstructor TimeSlot[]

  @@map("users")
}

model Child {
  id            String    @id @default(uuid())
  customerId    String
  firstName     String
  lastName      String
  dateOfBirth   DateTime
  currentLevel  String    @default("Beginner")
  notes         String?
  avatarUrl     String?
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  customer          User              @relation(fields: [customerId], references: [id])
  bookings          Booking[]
  progressHistory   StudentProgress[]
  waitlistEntries   Waitlist[]
  fixedAssignments  FixedSlotAssignment[]

  @@map("children")
}

model Location {
  id            String    @id @default(uuid())
  name          String    // "De Bilt", "Bad Hulckesteijn", "Garderen"
  address       String
  city          String
  postalCode    String?
  ownerId       String?
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  owner         User?     @relation(fields: [ownerId], references: [id])
  timeSlots     TimeSlot[]
  bookings      Booking[]
  waitlistEntries Waitlist[]
  monthlyReports MonthlyReport[]

  @@map("locations")
}

model LessonType {
  id            String    @id @default(uuid())
  name          String    // "1-op-1", "1-op-2", "1-op-3", "Survival", "BSO"
  nameEn        String    // English: "1-on-1", "1-on-2"
  maxStudents   Int
  durationMins  Int       @default(30)
  basePrice     Decimal   @db.Decimal(10,2)
  isActive      Boolean   @default(true)
  description   String?
  createdAt     DateTime  @default(now())

  timeSlots     TimeSlot[]
  bookings      Booking[]
  punchCards    PunchCard[]
  waitlistEntries Waitlist[]

  @@map("lesson_types")
}

model TimeSlot {
  id            String      @id @default(uuid())
  locationId    String
  instructorId  String
  lessonTypeId  String
  dayOfWeek     DayOfWeek
  startTime     String      // "15:00"
  endTime       String      // "15:30"
  capacity      Int         @default(1)
  isActive      Boolean     @default(true)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  location      Location    @relation(fields: [locationId], references: [id])
  instructor    User        @relation(fields: [instructorId], references: [id])
  lessonType    LessonType  @relation(fields: [lessonTypeId], references: [id])
  bookings      Booking[]
  fixedAssignments FixedSlotAssignment[]

  @@map("time_slots")
}

model FixedSlotAssignment {
  id            String    @id @default(uuid())
  childId       String
  timeSlotId    String
  assignedDate  DateTime  @default(now())
  isActive      Boolean   @default(true)

  child         Child     @relation(fields: [childId], references: [id])
  timeSlot      TimeSlot  @relation(fields: [timeSlotId], references: [id])

  @@map("fixed_slot_assignments")
}

model Booking {
  id              String        @id @default(uuid())
  childId         String
  customerId      String
  instructorId    String
  locationId      String
  lessonTypeId    String
  timeSlotId      String?
  bookingDate     DateTime
  startTime       String
  endTime         String
  status          BookingStatus @default(BOOKED)
  bookingType     BookingType   @default(FIXED)
  makeupForId     String?       // if this is a makeup for another booking
  isDummy         Boolean       @default(false)
  notes           String?
  cancelledAt     DateTime?
  cancelledBy     String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  child           Child         @relation(fields: [childId], references: [id])
  customer        User          @relation("CustomerBookings", fields: [customerId], references: [id])
  instructor      User          @relation("InstructorBookings", fields: [instructorId], references: [id])
  location        Location      @relation(fields: [locationId], references: [id])
  lessonType      LessonType    @relation(fields: [lessonTypeId], references: [id])
  makeupFor       Booking?      @relation("MakeupBookings", fields: [makeupForId], references: [id])
  makeupLessons   Booking[]     @relation("MakeupBookings")
  payments        Payment[]
  progressUpdates StudentProgress[]
  messages        Message[]

  @@map("bookings")
}

model Payment {
  id                    String        @id @default(uuid())
  customerId            String
  bookingId             String?
  punchCardId           String?
  amount                Decimal       @db.Decimal(10,2)
  currency              String        @default("EUR")
  paymentType           String        // "lesson", "punch_card", "refund"
  paymentMethod         PaymentMethod
  stripePaymentIntentId String?
  stripeRefundId        String?
  status                PaymentStatus @default(PENDING)
  refundAmount          Decimal?      @db.Decimal(10,2)
  refundReason          String?
  metadata              Json?
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  customer      User      @relation(fields: [customerId], references: [id])
  booking       Booking?  @relation(fields: [bookingId], references: [id])
  punchCard     PunchCard? @relation(fields: [punchCardId], references: [id])

  @@map("payments")
}

model PunchCard {
  id                String    @id @default(uuid())
  customerId        String
  lessonTypeId      String
  name              String    // "10x 1-on-1 swimming lessons"
  totalCredits      Int
  remainingCredits  Int
  pricePaid         Decimal   @db.Decimal(10,2)
  stripePaymentId   String?
  validFrom         DateTime
  validUntil        DateTime
  isBlocked         Boolean   @default(false)
  blockedReason     String?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  customer      User        @relation(fields: [customerId], references: [id])
  lessonType    LessonType  @relation(fields: [lessonTypeId], references: [id])
  payments      Payment[]

  @@map("punch_cards")
}

model StudentProgress {
  id                  String    @id @default(uuid())
  childId             String
  bookingId           String
  instructorId        String
  level               String
  skillsWorkedOn      String[]
  stepsCompleted      String[]
  goalsSet            String[]
  goalsAchieved       String[]
  practiceExercises   String[]
  notes               String?
  parentNotifiedAt    DateTime?
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt

  child       Child   @relation(fields: [childId], references: [id])
  booking     Booking @relation(fields: [bookingId], references: [id])
  instructor  User    @relation("InstructorProgress", fields: [instructorId], references: [id])

  @@map("student_progress")
}

model LearningPlan {
  id          String    @id @default(uuid())
  level       String    // "Beginner", "Intermediate", "Advanced"
  skill       String    // "Water Comfort", "Floating", "Kicking"
  steps       String[]
  exercises   String[]  // practice at home
  description String?
  orderIndex  Int
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())

  @@map("learning_plans")
}

model Waitlist {
  id                    String          @id @default(uuid())
  childId               String
  customerId            String
  locationId            String
  lessonTypeId          String
  preferredDays         DayOfWeek[]
  preferredTimeStart    String?         // "15:00"
  preferredTimeEnd      String?         // "17:00"
  status                WaitlistStatus  @default(WAITING)
  invitedBookingDate    DateTime?
  invitedSlotInfo       String?
  invitationSentAt      DateTime?
  invitationExpiresAt   DateTime?
  invitationAttempts    Int             @default(0)
  createdAt             DateTime        @default(now())
  updatedAt             DateTime        @updatedAt

  child       Child       @relation(fields: [childId], references: [id])
  location    Location    @relation(fields: [locationId], references: [id])
  lessonType  LessonType  @relation(fields: [lessonTypeId], references: [id])

  @@map("waitlist")
}

model InstructorAvailability {
  id              String    @id @default(uuid())
  instructorId    String
  date            DateTime
  availableFrom   String
  availableUntil  String
  isAvailable     Boolean   @default(true)
  isApproved      Boolean   @default(false)
  approvedBy      String?
  notes           String?
  createdAt       DateTime  @default(now())

  instructor  User  @relation(fields: [instructorId], references: [id])

  @@map("instructor_availability")
}

model Message {
  id          String    @id @default(uuid())
  senderId    String
  receiverId  String
  bookingId   String?
  content     String
  isRead      Boolean   @default(false)
  readAt      DateTime?
  createdAt   DateTime  @default(now())

  sender    User    @relation("SentMessages", fields: [senderId], references: [id])
  receiver  User    @relation("ReceivedMessages", fields: [receiverId], references: [id])
  booking   Booking? @relation(fields: [bookingId], references: [id])

  @@map("messages")
}

model Notification {
  id        String            @id @default(uuid())
  userId    String
  title     String
  body      String
  type      NotificationType
  isRead    Boolean           @default(false)
  readAt    DateTime?
  data      Json?
  sentAt    DateTime          @default(now())
  createdAt DateTime          @default(now())

  user  User  @relation(fields: [userId], references: [id])

  @@map("notifications")
}

model FAQ {
  id          String    @id @default(uuid())
  question    String
  questionNl  String
  answer      String
  answerNl    String
  category    String
  orderIndex  Int
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("faqs")
}

model Invoice {
  id            String    @id @default(uuid())
  customerId    String
  bookingId     String?
  amount        Decimal   @db.Decimal(10,2)
  description   String
  status        String    @default("draft") // draft, sent, paid, overdue
  pdfUrl        String?
  dueDate       DateTime?
  paidAt        DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@map("invoices")
}

model MonthlyReport {
  id            String    @id @default(uuid())
  locationId    String
  month         Int
  year          Int
  totalLessons  Int
  totalHours    Decimal   @db.Decimal(10,2)
  totalStudents Int
  instructorHours Json
  revenue       Decimal   @db.Decimal(10,2)
  cancellations Int       @default(0)
  noShows       Int       @default(0)
  pdfUrl        String?
  emailSentAt   DateTime?
  generatedAt   DateTime  @default(now())

  location  Location  @relation(fields: [locationId], references: [id])

  @@map("monthly_reports")
}

model HolidayPeriod {
  id          String    @id @default(uuid())
  name        String    // "Summer Holiday 2026"
  startDate   DateTime
  endDate     DateTime
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())

  @@map("holiday_periods")
}

model AppSetting {
  id        String    @id @default(uuid())
  key       String    @unique
  value     String
  updatedAt DateTime  @updatedAt

  @@map("app_settings")
}
```

---

## 6. API ENDPOINTS — COMPLETE

### Base: `/api/v1`

### Auth Routes
```
POST   /auth/login                    → Login with email/password
POST   /auth/register                 → Register (invitation required)
POST   /auth/forgot-password          → Send reset email
POST   /auth/reset-password           → Reset with token
POST   /auth/refresh-token            → Refresh JWT
POST   /auth/logout                   → Logout (invalidate token)
POST   /auth/update-fcm-token         → Update Firebase push token
```

### User Routes
```
GET    /users/me                      → Get current user
PUT    /users/me                      → Update profile
PUT    /users/me/avatar               → Update avatar
PUT    /users/me/preferences          → Update lang/darkmode/notifications
```

### Children Routes
```
GET    /children                      → Get my children
POST   /children                      → Add child
GET    /children/:id                  → Get child detail
PUT    /children/:id                  → Update child
DELETE /children/:id                  → Deactivate child
```

### Booking Routes
```
GET    /bookings                           → My bookings (with filters)
POST   /bookings                           → Create booking
GET    /bookings/:id                       → Booking detail
PUT    /bookings/:id/cancel               → Cancel booking
PUT    /bookings/:id/status              → Update status (admin/instructor)
GET    /bookings/available-slots          → Get available slots
  Query: date, locationId, lessonTypeId, childId
GET    /bookings/fixed-slot              → Get my fixed slot info
GET    /bookings/upcoming               → Get upcoming bookings
GET    /bookings/history                → Get past bookings
```

### Payment Routes
```
POST   /payments/create-intent            → Stripe payment intent
POST   /payments/confirm                  → Confirm payment
POST   /payments/refund                   → Issue refund (admin)
GET    /payments/history                  → Payment history
GET    /payments/:id                      → Payment detail
```

### Punch Card Routes
```
GET    /punch-cards                       → My punch cards
POST   /punch-cards/purchase              → Purchase punch card
GET    /punch-cards/:id                   → Card detail
GET    /punch-cards/types                 → Available punch card types
```

### Progress Routes
```
GET    /progress/child/:childId           → Child progress overview
GET    /progress/child/:childId/history   → Full lesson history
POST   /progress                          → Submit progress (instructor)
GET    /progress/learning-plans           → All learning plan levels
GET    /progress/learning-plans/:level    → Level detail with skills/steps
```

### Waitlist Routes
```
POST   /waitlist                          → Join waitlist
GET    /waitlist/my                       → My waitlist entries
DELETE /waitlist/:id                      → Leave waitlist
POST   /waitlist/:id/accept              → Accept invitation
POST   /waitlist/:id/decline             → Decline invitation
```

### Instructor Routes
```
GET    /instructor/schedule               → My schedule
  Query: week (YYYY-WW), month (YYYY-MM)
GET    /instructor/lessons/:bookingId     → Lesson detail + student list
POST   /instructor/availability           → Submit availability
GET    /instructor/availability           → My availability submissions
GET    /instructor/students               → My students
```

### Message Routes
```
GET    /messages/conversations            → All conversations
GET    /messages/:conversationId          → Conversation messages
POST   /messages                          → Send message
PUT    /messages/:id/read                → Mark as read
GET    /messages/unread-count            → Unread count
```

### Notification Routes
```
GET    /notifications                     → My notifications
PUT    /notifications/read-all           → Mark all read
PUT    /notifications/:id/read           → Mark one read
DELETE /notifications/:id               → Delete notification
```

### FAQ Routes
```
GET    /faqs                              → All FAQs (public)
GET    /faqs/categories                   → FAQ categories
GET    /faqs/:id                          → FAQ detail
```

### Admin Routes
```
// Dashboard
GET    /admin/dashboard                   → Dashboard stats

// Customer Management
GET    /admin/customers                   → All customers (paginated)
POST   /admin/customers                   → Create customer + invite
GET    /admin/customers/:id              → Customer detail
PUT    /admin/customers/:id              → Update customer
DELETE /admin/customers/:id             → Deactivate
POST   /admin/customers/:id/invite      → Send invitation
POST   /admin/customers/:id/assign-slot → Assign fixed time slot

// Children
GET    /admin/children                    → All children
GET    /admin/children/:id              → Child detail

// Instructor Management
GET    /admin/instructors                 → All instructors
POST   /admin/instructors                 → Create instructor
GET    /admin/instructors/:id           → Instructor detail
PUT    /admin/instructors/:id           → Update instructor
PUT    /admin/instructors/:id/approve-availability → Approve availability

// Location Management
GET    /admin/locations                   → All locations
POST   /admin/locations                   → Create location
PUT    /admin/locations/:id             → Update location

// Lesson Types
GET    /admin/lesson-types               → All lesson types
POST   /admin/lesson-types               → Create lesson type
PUT    /admin/lesson-types/:id          → Update lesson type

// Time Slots / Schedule
GET    /admin/time-slots                 → All time slots
POST   /admin/time-slots                 → Create time slot
PUT    /admin/time-slots/:id            → Update time slot
DELETE /admin/time-slots/:id           → Delete time slot
GET    /admin/schedule                   → Full schedule grid

// Booking Management
GET    /admin/bookings                   → All bookings (paginated + filters)
POST   /admin/bookings                   → Create manual booking
POST   /admin/bookings/dummy            → Create dummy booking
PUT    /admin/bookings/:id/status      → Update status
POST   /admin/bookings/:id/cancel-with-refund → Cancel + refund

// Punch Cards
GET    /admin/punch-cards                → All punch cards
POST   /admin/punch-cards/types         → Create punch card type
POST   /admin/punch-cards/issue         → Issue to customer
PUT    /admin/punch-cards/:id/block    → Block/unblock card

// Invoices
GET    /admin/invoices                   → All invoices
POST   /admin/invoices                   → Create invoice
POST   /admin/invoices/:id/send        → Send via email
POST   /admin/invoices/:id/mark-paid  → Mark as paid
GET    /admin/invoices/outstanding     → Outstanding invoices

// Revenue & Reports
GET    /admin/revenue/dashboard          → Revenue overview
GET    /admin/revenue/by-period         → Revenue by date range
GET    /admin/revenue/by-location       → Revenue by location
GET    /admin/revenue/by-instructor     → Revenue by instructor
GET    /admin/revenue/by-lesson-type   → Revenue by lesson type

// Waitlist Admin
GET    /admin/waitlist                   → Full waitlist
POST   /admin/waitlist/:id/invite-manual → Manual invite

// FAQ Admin
GET    /admin/faqs                       → All FAQs
POST   /admin/faqs                       → Create FAQ
PUT    /admin/faqs/:id                  → Update FAQ
DELETE /admin/faqs/:id                 → Delete FAQ
PUT    /admin/faqs/reorder              → Reorder FAQs

// Notifications
POST   /admin/notifications/send         → Send push notification
GET    /admin/notifications/history     → Notification history

// Conversations (from Modules > Gesprekken)
GET    /admin/conversations              → All conversations
GET    /admin/conversations/:id        → Conversation detail

// Export
GET    /admin/export/bookings           → Export CSV
GET    /admin/export/customers          → Export CSV
GET    /admin/export/revenue            → Export CSV
GET    /admin/export/instructor-hours   → Export CSV

// Reports
GET    /admin/reports/monthly           → Monthly reports list
POST   /admin/reports/generate          → Generate report manually

// Holiday Periods
GET    /admin/holiday-periods           → All periods
POST   /admin/holiday-periods           → Create period

// Settings
GET    /admin/settings                   → App settings
PUT    /admin/settings                   → Update settings
```

---

## 7. APP SCREENS — COMPLETE FLOW

### Customer App — Full Screen List

#### Onboarding Flow
```
SplashScreen
  → (if first time) OnboardingScreen [3 slides]
      → LoginScreen
  → (if logged in) HomeScreen (based on role)

OnboardingScreen
  Slide 1: "Book lessons anytime" — calendar illustration
  Slide 2: "Track your child's progress" — progress illustration
  Slide 3: "Stay connected with instructors" — chat illustration

LoginScreen
  Fields: email, password
  Links: ForgotPasswordScreen, (no public register — invitation only)

ForgotPasswordScreen
  Field: email
  → ResetPasswordScreen (via email link)

ResetPasswordScreen
  Fields: new password, confirm password
```

#### Customer Main App
```
HomeScreen (bottom nav: Home | Book | Tickets | Profile)
  ├── Upcoming lesson card
  ├── Quick actions: Book Lesson, My Reservations, My Punch Cards
  ├── Recent notifications (3 items)
  └── Child progress summary card

BookingTypeScreen
  ├── Fixed Time Slot card
  ├── Extra 1-on-1 Lesson card
  ├── Extra 1-on-2 Lesson card
  └── Holiday Lessons card

FixedSlotCalendarScreen
  ├── Current fixed slot info banner
  ├── Calendar (color: green=available, red=full, grey=past)
  ├── 14-day rule info banner
  ├── Select date → BookingSummaryScreen
  └── Time slot displayed (not selectable — it's fixed)

ExtraLessonLocationScreen (1-on-1 or 1-on-2)
  └── Location cards: De Bilt, Garderen, Bad Hulckesteijn...

ExtraLessonCalendarScreen
  ├── Month/week toggle
  ├── Color-coded calendar
  └── Time slot chips (tap to select)

HolidayLessonsListScreen
  ├── Holiday period header
  ├── Available holiday lesson cards
  └── Tap → HolidayLessonCalendarScreen

BookingSummaryScreen
  ├── Lesson details (type, location, date, time, instructor)
  ├── Child selector (if multiple children)
  ├── Payment method: Punch Card | Pay with Card
  ├── Price display
  ├── Terms checkbox
  └── Confirm button → PaymentScreen or direct confirm

PaymentMethodScreen
  ├── My punch cards list (show balance, lesson type match)
  └── Pay with new card → StripePaymentScreen

StripePaymentScreen
  ├── Stripe card input widget
  └── Pay button → BookingSuccessScreen

BookingSuccessScreen
  ├── Success animation (Lottie)
  ├── Booking summary
  ├── QR code / barcode
  └── Buttons: View Reservation, Go Home

MyReservationsScreen
  ├── Tabs: Upcoming (gepland) | History (geschiedenis)
  ├── Reservation cards:
  │   ├── Lesson type badge
  │   ├── Location name
  │   ├── Date and time
  │   ├── Instructor name
  │   ├── Status badge (colored)
  │   └── (if upcoming) Cancel button
  └── Tap → ReservationDetailScreen

ReservationDetailScreen
  ├── Full booking info
  ├── QR/Barcode for entry
  ├── Instructor info
  ├── Cancellation policy info
  └── Cancel button (if within policy)

CancellationConfirmScreen
  ├── Cancellation warning
  ├── Refund info (how they'll get money back)
  └── Confirm / Cancel buttons

MyPunchCardsScreen
  ├── Active cards list
  │   ├── Lesson type
  │   ├── Credits remaining / total
  │   ├── Validity bar
  │   └── Expiry date
  └── Purchase New Card button

PurchasePunchCardScreen
  ├── Available card types (by lesson type)
  ├── Price and credits info
  └── Pay → StripePaymentScreen

PunchCardDetailScreen
  ├── Card info (type, balance, validity)
  ├── Usage history
  └── (if low) Purchase new card CTA

PaymentHistoryScreen
  ├── Transactions list
  ├── Filter: All | Lessons | Punch Cards | Refunds
  └── Tap → receipt detail

ChildProgressScreen
  ├── Child selector (if multiple)
  ├── Current level badge
  ├── Overall progress bar
  ├── Skills breakdown:
  │   ├── Skill name
  │   ├── Steps progress (x/y)
  │   └── Progress bar
  └── Tap skill → SkillDetailScreen

SkillDetailScreen
  ├── Skill name and level
  ├── Steps list (checked/unchecked)
  ├── Instructor notes
  └── Last updated by (instructor name)

PracticeAtHomeScreen
  ├── Assigned exercises list
  ├── Based on current level
  └── Exercise cards with description

ChatListScreen
  ├── Conversation per instructor
  ├── Last message preview
  └── Unread badge

ChatScreen
  ├── dash_chat_2 widget
  ├── Message bubbles
  └── Input with send button

WaitlistJoinScreen
  ├── Select location(s) (multi-select)
  ├── Select lesson type
  ├── Select preferred days (multi-select chips)
  ├── Select preferred time range
  └── Join Waitlist button

WaitlistStatusScreen
  ├── Current position info
  ├── Preferences summary
  └── Leave waitlist button

WaitlistInvitationScreen
  ├── Slot details (date, time, location)
  ├── Countdown timer (24h)
  ├── Accept button
  └── Decline button

NotificationsScreen
  ├── Notification list
  ├── Mark all read
  └── Tap → relevant screen (booking, progress, etc.)

FAQScreen
  ├── Search bar
  ├── Categories (Booking, Payment, Lessons, Account)
  └── FAQ items (accordion)

FAQDetailScreen
  ├── Full question
  └── Full answer (with rich text)

ProfileScreen
  ├── Avatar + name
  ├── Personal details
  ├── Child profiles list
  ├── Notification settings
  ├── Language toggle (NL/EN)
  ├── Dark mode toggle
  ├── Help Center link
  └── Log out button

EditProfileScreen
  ├── Avatar upload
  ├── Name fields
  └── Phone field

AddEditChildScreen
  ├── First/last name
  └── Date of birth
```

### Instructor App — Full Screen List
```
InstructorHomeScreen
  ├── Today summary (lessons today, students)
  ├── Next lesson card
  ├── Quick progress button
  └── Notifications badge

ScheduleScreen (WeeklyView / MonthlyView toggle)
  ├── Week: horizontal scroll, lesson blocks per day
  ├── Month: calendar with lesson count per day
  ├── Filter by location
  └── Tap lesson → LessonDetailScreen

LessonDetailScreen [IPAD: LEFT PANEL]
  ├── Lesson info (time, location, type)
  ├── Student list cards:
  │   ├── Student name + photo
  │   ├── Current level badge
  │   ├── Today's goals
  │   └── Previous notes snippet
  └── Open progress form button

ProgressUpdateScreen [IPAD: RIGHT PANEL]
  Per student:
  ├── Level selector (dropdown)
  ├── Skills worked (checkboxes)
  ├── Steps completed (checkboxes — from learning plan)
  ├── Goals for next lesson (text chips)
  ├── Practice exercises (multi-select from plan)
  └── Notes (text field)
  Submit → auto-notify parent

AvailabilityScreen
  ├── Calendar date picker
  ├── Time range selector
  ├── Notes field
  └── Submit to admin

InstructorChatListScreen + ChatScreen (same as customer)

InstructorProfileScreen
  ├── Personal details
  └── Settings

OfflineBannerWidget (shown when no internet)
SyncStatusWidget (shown when syncing)
```

---

## 8. BUSINESS LOGIC — RULES ENGINE

### booking-rules.service.ts
```typescript
class BookingRulesService {
  
  // Can customer book a fixed slot on this date?
  canBookFixedSlot(
    customerId: string,
    childId: string,
    timeSlotId: string,
    bookingDate: Date
  ): { allowed: boolean; reason?: string } {
    
    const daysUntilLesson = differenceInDays(bookingDate, new Date());
    
    // Rule 1: Cannot book past dates
    if (daysUntilLesson < 0) return { allowed: false, reason: "past_date" };
    
    // Rule 2: Within 14 days — open to all
    if (daysUntilLesson <= 14) return { allowed: true };
    
    // Rule 3: Beyond 14 days — only fixed slot owner
    const hasFixedSlot = await checkFixedSlotAssignment(childId, timeSlotId);
    if (!hasFixedSlot) return { allowed: false, reason: "not_fixed_slot_owner" };
    
    return { allowed: true };
  }

  // Can customer cancel this booking?
  canCancelBooking(booking: Booking): { 
    canCancel: boolean; 
    hasRefund: boolean; 
    reason?: string 
  } {
    const hoursUntilLesson = differenceInHours(
      booking.bookingDate, 
      new Date()
    );

    // Standard lessons: cancel up to 24 hours before
    if (booking.bookingType !== BookingType.HOLIDAY) {
      if (hoursUntilLesson >= 24) {
        return { canCancel: true, hasRefund: true };
      }
      return { canCancel: false, hasRefund: false, reason: "within_24h" };
    }

    // Holiday lessons: cancel up to 4 days (96 hours) before
    if (booking.bookingType === BookingType.HOLIDAY) {
      if (hoursUntilLesson >= 96) {
        return { canCancel: true, hasRefund: true };
      }
      return { canCancel: false, hasRefund: false, reason: "within_4_days" };
    }
  }

  // Check if two students share same extra slot (1-on-1 → 1-on-2)
  async checkAutoConversion(
    locationId: string, 
    date: Date, 
    startTime: string
  ): Promise<{ shouldConvert: boolean; bookingIds: string[] }> {
    const bookingsAtSameSlot = await findBookingsAtSlot(
      locationId, date, startTime, BookingType.EXTRA
    );
    
    if (bookingsAtSameSlot.length === 2) {
      return { shouldConvert: true, bookingIds: bookingsAtSameSlot.map(b => b.id) };
    }
    
    return { shouldConvert: false, bookingIds: [] };
  }
}
```

---

## 9. PAYMENT SYSTEM LOGIC

### stripe.service.ts
```typescript
// Create payment intent for lesson booking
async createLessonPaymentIntent(amount: number, currency = 'eur', metadata: any) {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // cents
    currency,
    metadata,
    automatic_payment_methods: { enabled: true }
  });
}

// Issue partial refund (1-on-1 → 1-on-2 conversion)
async issuePartialRefund(
  paymentIntentId: string,
  refundAmount: number,
  reason: string
) {
  const charge = await getChargeFromIntent(paymentIntentId);
  return stripe.refunds.create({
    charge: charge.id,
    amount: Math.round(refundAmount * 100),
    reason: 'requested_by_customer',
    metadata: { reason }
  });
}

// Purchase punch card
async createPunchCardPaymentIntent(
  punchCardTypeId: string,
  customerId: string,
  amount: number
) {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'eur',
    metadata: { type: 'punch_card', punchCardTypeId, customerId }
  });
}
```

### Auto-conversion job (runs daily at lesson time)
```typescript
// waitlist-checker.job.ts
async function checkAutoConversion() {
  const todayExtraBookings = await getExtraBookingsForToday();
  
  // Group by location + startTime
  const grouped = groupBy(todayExtraBookings, b => `${b.locationId}-${b.startTime}`);
  
  for (const [key, bookings] of Object.entries(grouped)) {
    if (bookings.length === 2) {
      // Calculate refund amount (1-on-1 price - 1-on-2 price per person)
      const refundPerPerson = calculateRefundAmount(bookings[0].lessonType);
      
      for (const booking of bookings) {
        if (booking.paymentMethod === 'STRIPE') {
          await issuePartialRefund(booking.payment.stripePaymentIntentId, refundPerPerson);
        } else {
          // Punch card — restore credits
          await restorePunchCardCredits(booking.punchCardId, refundPerPerson);
        }
        
        // Notify parent
        await sendNotification(booking.customerId, {
          type: 'PAYMENT_REFUND',
          title: 'Lesson converted to 1-on-2',
          body: `Your lesson has been shared. Refund of €${refundPerPerson} issued.`
        });
      }
    }
  }
}
```

---

## 10. OFFLINE SYNC ARCHITECTURE

### Hive Boxes (Local Storage)
```dart
// Hive box names
const String LESSONS_BOX = 'lessons';
const String STUDENTS_BOX = 'students';
const String PROGRESS_BOX = 'progress';
const String SYNC_QUEUE_BOX = 'sync_queue';
const String LEARNING_PLANS_BOX = 'learning_plans';

// SyncQueueItem model
@HiveType(typeId: 5)
class SyncQueueItem {
  @HiveField(0) String id;
  @HiveField(1) String endpoint;
  @HiveField(2) String method; // POST, PUT
  @HiveField(3) Map<String, dynamic> payload;
  @HiveField(4) DateTime createdAt;
  @HiveField(5) int retryCount;
  @HiveField(6) bool isSynced;
}
```

### Sync Service
```dart
class SyncService {
  // Download data when online
  Future<void> downloadForOffline(String instructorId) async {
    final schedule = await api.getSchedule(instructorId, days: 7);
    final studentIds = schedule.flatMap(lesson => lesson.studentIds);
    final students = await api.getStudents(studentIds);
    final learningPlans = await api.getLearningPlans();
    
    await Hive.box(LESSONS_BOX).putAll(schedule.toMap());
    await Hive.box(STUDENTS_BOX).putAll(students.toMap());
    await Hive.box(LEARNING_PLANS_BOX).putAll(learningPlans.toMap());
  }

  // Queue action when offline
  Future<void> queueAction(String endpoint, String method, Map payload) async {
    final item = SyncQueueItem(
      id: uuid.v4(),
      endpoint: endpoint,
      method: method,
      payload: payload,
      createdAt: DateTime.now(),
      retryCount: 0,
      isSynced: false,
    );
    await Hive.box(SYNC_QUEUE_BOX).put(item.id, item);
  }

  // Process queue when back online
  Future<void> processQueue() async {
    final queue = Hive.box(SYNC_QUEUE_BOX).values
      .where((item) => !item.isSynced)
      .sortedBy((item) => item.createdAt);
    
    for (final item in queue) {
      try {
        await api.request(item.method, item.endpoint, item.payload);
        item.isSynced = true;
        await item.save();
      } catch (e) {
        item.retryCount++;
        await item.save();
      }
    }
  }
}
```

---

## 11. NOTIFICATION SYSTEM

### FCM Service
```typescript
async function sendPushNotification(
  userId: string,
  type: NotificationType,
  data?: any
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.fcmToken || !user.notificationsEnabled) return;
  
  const message = buildMessage(type, data);
  
  // Save to DB
  await prisma.notification.create({
    data: { userId, title: message.title, body: message.body, type, data }
  });
  
  // Send FCM
  await admin.messaging().send({
    token: user.fcmToken,
    notification: { title: message.title, body: message.body },
    data: { type, ...data },
  });
}

// Scheduled jobs
// Bull Queue — every day at 08:00
bookingReminderJob.add('daily-reminders', {}, { 
  repeat: { cron: '0 8 * * *' } 
});

// Bull Queue — last day of month at 23:00
monthlyReportJob.add('monthly-reports', {}, { 
  repeat: { cron: '0 23 28-31 * *' } 
});

// Bull Queue — every hour
waitlistCheckerJob.add('check-waitlist', {}, { 
  repeat: { cron: '0 * * * *' } 
});

// Bull Queue — every day at 09:00 (punch card expiry warnings)
punchCardExpiryJob.add('expiry-check', {}, { 
  repeat: { cron: '0 9 * * *' } 
});
```

---

## 12. MILESTONE BREAKDOWN

### Milestone 1 — Weeks 1–4 — €1,800 / $2,085
**Deliverable:** iOS + Android Customer App (Foundation)

Week 1:
- [ ] Flutter project setup + folder structure
- [ ] Supabase + Prisma setup, DB migrations
- [ ] Node.js API setup (auth module)
- [ ] GitHub repo setup (client ownership)
- [ ] Splash + Onboarding + Login + Forgot Password screens
- [ ] JWT auth flow
- [ ] Child profile CRUD

Week 2:
- [ ] Booking module (API + Flutter)
- [ ] Fixed slot calendar screen
- [ ] Extra lesson booking flow (location → calendar → time)
- [ ] Holiday lessons flow
- [ ] 14-day rule logic
- [ ] Booking status management

Week 3:
- [ ] Stripe integration (Flutter + Node)
- [ ] Punch card system (purchase, balance, deduct)
- [ ] Payment history screen
- [ ] Auto 1-on-1 → 1-on-2 conversion logic
- [ ] Partial refund system

Week 4:
- [ ] Student progress tracking (API + Flutter)
- [ ] Learning plans setup
- [ ] Practice at home
- [ ] In-app chat (Supabase Realtime)
- [ ] Push notifications (FCM)
- [ ] FAQ screen
- [ ] My Reservations screens
- [ ] Profile screen
- [ ] Dark mode + language toggle

---

### Milestone 2 — Weeks 5–9 — €2,000 / $2,315
**Deliverable:** Instructor App + Advanced Features

Week 5: Instructor schedule + lesson detail + iPad layout
Week 6: Progress update form + auto-notify parent + chat
Week 7: Offline mode (Hive) + sync queue + iPad split view
Week 8: Waitlist system (matching algorithm + invitations)
Week 9: Location owner features + monthly report generation

---

### Milestone 3 — Weeks 10–11 — €1,200 / $1,390
**Deliverable:** Next.js Admin Web Panel

Week 10: Dashboard + customer/child/instructor CRUD + schedule grid + booking management
Week 11: Invoices + revenue reports + punch card admin + waitlist admin + FAQ admin + export + notifications

---

### Milestone 4 — Weeks 12–13 — €1,000 / $1,155
**Deliverable:** QA + App Store Launch + Web Deploy

Week 12: Full QA, unit tests, integration tests, performance
Week 13: App Store submit, Play Store submit, Vercel deploy, client handover

---

## 13. DEVELOPMENT ORDER

### Build Order (do NOT skip steps)
```
1. DB schema → Prisma migrations
2. Auth API → Flutter auth screens
3. Booking API → Flutter booking flows
4. Payment API (Stripe) → Flutter payment screens
5. Punch Card API → Flutter punch card screens
6. Progress API → Flutter progress screens
7. Chat (Supabase Realtime) → Flutter chat screens
8. Notifications (FCM) → connect to all events
9. FAQ API → Flutter FAQ screen
10. Instructor app screens (use same API)
11. Offline (Hive) layer on top of instructor app
12. Waitlist (complex — do after bookings are solid)
13. Reports (PDF generation — after data is stable)
14. Next.js admin (after API is complete)
15. QA + deploy
```

---

*Document Version: 2.0*  
*Developer: Faizan | Full-Stack Mobile Developer*  
*Client: Walter Van De Geest — Zwemschool Snorkeltje*
