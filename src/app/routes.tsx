import { createBrowserRouter } from "react-router";
import { PortalScreen } from "./screens/PortalScreen";
import { SplashScreen } from "./screens/SplashScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { BookLessonScreen } from "./screens/BookLessonScreen";
import { FixedSlotCalendarScreen } from "./screens/FixedSlotCalendarScreen";
import { BookingSummaryScreen } from "./screens/BookingSummaryScreen";
import { BookingSuccessScreen } from "./screens/BookingSuccessScreen";
import { MyReservationsScreen } from "./screens/MyReservationsScreen";
import { ReservationDetailScreen } from "./screens/ReservationDetailScreen";
import { MyPunchCardsScreen } from "./screens/MyPunchCardsScreen";
import { ChildProgressScreen } from "./screens/ChildProgressScreen";
import { PracticeAtHomeScreen } from "./screens/PracticeAtHomeScreen";
import { InstructorHomeScreen } from "./screens/InstructorHomeScreen";
import { LessonDetailScreen } from "./screens/LessonDetailScreen";
import { ProgressUpdateScreen } from "./screens/ProgressUpdateScreen";
import { WaitlistScreen } from "./screens/WaitlistScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { FAQScreen } from "./screens/FAQScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { WaitlistInvitationScreen } from "./screens/WaitlistInvitationScreen";
import { AutoConversionScreen } from "./screens/AutoConversionScreen";
import { MonthlyReportScreen } from "./screens/MonthlyReportScreen";
import { OfflineModeScreen } from "./screens/OfflineModeScreen";
import { StripePaymentScreen } from "./screens/StripePaymentScreen";
import { SkillDetailScreen } from "./screens/SkillDetailScreen";
import { PaymentHistoryScreen } from "./screens/PaymentHistoryScreen";
import { EditProfileScreen } from "./screens/EditProfileScreen";
import { InstructorScheduleScreen } from "./screens/InstructorScheduleScreen";
import { AvailabilityRequestScreen } from "./screens/AvailabilityRequestScreen";
import { ForgotPasswordScreen } from "./screens/ForgotPasswordScreen";
import { LocationSelectionScreen } from "./screens/LocationSelectionScreen";
import { InstructorChatScreen } from "./screens/InstructorChatScreen";
import { HolidayLessonsScreen } from "./screens/HolidayLessonsScreen";
import { PunchCardDetailScreen } from "./screens/PunchCardDetailScreen";
import { ChatListScreen } from "./screens/ChatListScreen";
import { NotificationSettingsScreen } from "./screens/NotificationSettingsScreen";
import { PunchCardOrderScreen } from "./screens/PunchCardOrderScreen";
import { ConfirmOrderScreen } from "./screens/ConfirmOrderScreen";
import { CalendarAvailableScreen } from "./screens/CalendarAvailableScreen";
import { MyPunchCardsWebScreen } from "./screens/MyPunchCardsWebScreen";
import { ReservationsPlannedScreen } from "./screens/ReservationsPlannedScreen";
import { MyProfileWebScreen } from "./screens/MyProfileWebScreen";
import { SpecialPunchCardsScreen } from "./screens/SpecialPunchCardsScreen";
import { AllPunchCardPricesScreen } from "./screens/AllPunchCardPricesScreen";
import { ResetPasswordScreen } from "./screens/ResetPasswordScreen";
import { ExtraLessonCalendarScreen } from "./screens/ExtraLessonCalendarScreen";
import { CancellationConfirmScreen } from "./screens/CancellationConfirmScreen";
import { PaymentMethodScreen } from "./screens/PaymentMethodScreen";
import { WaitlistStatusScreen } from "./screens/WaitlistStatusScreen";
import { FAQDetailScreen } from "./screens/FAQDetailScreen";
import { AddEditChildScreen } from "./screens/AddEditChildScreen";
import { InstructorProfileScreen } from "./screens/InstructorProfileScreen";
import { InstructorStudentsScreen } from "./screens/InstructorStudentsScreen";
import { InstructorChatListScreen } from "./screens/InstructorChatListScreen";
import { RegistrationScreen } from "./screens/RegistrationScreen";
import { TermsConditionsScreen } from "./screens/TermsConditionsScreen";
import { ZwemdiplomScreen } from "./screens/ZwemdiplomScreen";
import { InvoiceReceiptScreen } from "./screens/InvoiceReceiptScreen";
import { EmergencyContactScreen } from "./screens/EmergencyContactScreen";
import { AboutUsScreen } from "./screens/AboutUsScreen";
import { ContactScreen } from "./screens/ContactScreen";
import { ReviewsScreen } from "./screens/ReviewsScreen";
import { WebsiteHomeScreen } from "./screens/website/WebsiteHomeScreen";
import { WebsiteLocationScreen } from "./screens/website/WebsiteLocationScreen";
import { WebsiteLesaanbodScreen } from "./screens/website/WebsiteLesaanbodScreen";
import { WebsiteInschrijvenScreen } from "./screens/website/WebsiteInschrijvenScreen";
import { WebsiteOverOnsScreen } from "./screens/website/WebsiteOverOnsScreen";
import { WebsiteContactScreen } from "./screens/website/WebsiteContactScreen";
import { WebsiteVacaturesScreen } from "./screens/website/WebsiteVacaturesScreen";
import { WebsiteFAQScreen } from "./screens/website/WebsiteFAQScreen";
import { WebsiteReserverenScreen } from "./screens/website/WebsiteReserverenScreen";
import { WebsiteReviewsScreen } from "./screens/website/WebsiteReviewsScreen";
import { WebsiteAlgemeneVoorwaardenScreen } from "./screens/website/WebsiteAlgemeneVoorwaardenScreen";
import { AdminDashboardScreen } from "./screens/admin/AdminDashboardScreen";
import { AdminLoginScreen } from "./screens/AdminLoginScreen";
import { RequireAdmin } from "./components/RequireAdmin";

export const router = createBrowserRouter([
  // Walter web-admin: root URL goes straight to the admin login.
  // Portal/preview is kept reachable at /portal for development only.
  { path: "/", element: <AdminLoginScreen /> },
  { path: "portal", element: <PortalScreen /> },
  { path: "splash", element: <SplashScreen /> },
  { path: "onboarding", element: <OnboardingScreen /> },
  { path: "login", element: <LoginScreen /> },
  { path: "forgot-password", element: <ForgotPasswordScreen /> },
  { path: "home", element: <HomeScreen /> },
  { path: "book-lesson", element: <BookLessonScreen /> },
  { path: "location-selection", element: <LocationSelectionScreen /> },
  { path: "fixed-slot-calendar", element: <FixedSlotCalendarScreen /> },
  { path: "booking-summary", element: <BookingSummaryScreen /> },
  { path: "booking-success", element: <BookingSuccessScreen /> },
  { path: "reservations", element: <MyReservationsScreen /> },
  { path: "reservation/:id", element: <ReservationDetailScreen /> },
  { path: "punch-cards", element: <MyPunchCardsScreen /> },
  { path: "child-progress", element: <ChildProgressScreen /> },
  { path: "practice-home", element: <PracticeAtHomeScreen /> },
  { path: "instructor/home", element: <InstructorHomeScreen /> },
  { path: "instructor/lesson/:id", element: <LessonDetailScreen /> },
  { path: "instructor/progress-update/:studentId", element: <ProgressUpdateScreen /> },
  { path: "waitlist", element: <WaitlistScreen /> },
  { path: "chat", element: <ChatScreen /> },
  { path: "notifications", element: <NotificationsScreen /> },
  { path: "faq", element: <FAQScreen /> },
  { path: "profile", element: <ProfileScreen /> },
  { path: "waitlist-invitation/:id", element: <WaitlistInvitationScreen /> },
  { path: "auto-conversion/:id", element: <AutoConversionScreen /> },
  { path: "monthly-report", element: <MonthlyReportScreen /> },
  { path: "offline", element: <OfflineModeScreen /> },
  { path: "payment/stripe", element: <StripePaymentScreen /> },
  { path: "skill/:id", element: <SkillDetailScreen /> },
  { path: "payment-history", element: <PaymentHistoryScreen /> },
  { path: "edit-profile", element: <EditProfileScreen /> },
  { path: "instructor/schedule", element: <InstructorScheduleScreen /> },
  { path: "instructor/availability", element: <AvailabilityRequestScreen /> },
  { path: "instructor/chat", element: <InstructorChatScreen /> },
  { path: "instructor/chat/:id", element: <InstructorChatScreen /> },
  { path: "holiday-lessons", element: <HolidayLessonsScreen /> },
  { path: "punch-card/:id", element: <PunchCardDetailScreen /> },
  { path: "chat-list", element: <ChatListScreen /> },
  { path: "notification-settings", element: <NotificationSettingsScreen /> },
  { path: "punch-card-order", element: <PunchCardOrderScreen /> },
  { path: "confirm-order", element: <ConfirmOrderScreen /> },
  { path: "calendar-available", element: <CalendarAvailableScreen /> },
  { path: "punch-cards-web", element: <MyPunchCardsWebScreen /> },
  { path: "reservations-planned", element: <ReservationsPlannedScreen /> },
  { path: "profile-web", element: <MyProfileWebScreen /> },
  { path: "special-punch-cards", element: <SpecialPunchCardsScreen /> },
  { path: "all-punch-card-prices", element: <AllPunchCardPricesScreen /> },
  { path: "reset-password", element: <ResetPasswordScreen /> },
  { path: "extra-lesson-calendar", element: <ExtraLessonCalendarScreen /> },
  { path: "cancellation-confirm/:id", element: <CancellationConfirmScreen /> },
  { path: "payment-method", element: <PaymentMethodScreen /> },
  { path: "waitlist-status", element: <WaitlistStatusScreen /> },
  { path: "faq/:id", element: <FAQDetailScreen /> },
  { path: "add-child", element: <AddEditChildScreen /> },
  { path: "instructor/profile", element: <InstructorProfileScreen /> },
  { path: "instructor/students", element: <InstructorStudentsScreen /> },
  { path: "instructor/messages", element: <InstructorChatListScreen /> },
  { path: "register", element: <RegistrationScreen /> },
  { path: "terms-conditions", element: <TermsConditionsScreen /> },
  { path: "zwemdiploma", element: <ZwemdiplomScreen /> },
  { path: "invoices", element: <InvoiceReceiptScreen /> },
  { path: "emergency-contacts", element: <EmergencyContactScreen /> },
  { path: "about", element: <AboutUsScreen /> },
  { path: "contact", element: <ContactScreen /> },
  { path: "reviews", element: <ReviewsScreen /> },
  // Website routes
  { path: "website", element: <WebsiteHomeScreen /> },
  { path: "website/locatie/:slug", element: <WebsiteLocationScreen /> },
  { path: "website/lesaanbod/:slug", element: <WebsiteLesaanbodScreen /> },
  { path: "website/inschrijven", element: <WebsiteInschrijvenScreen /> },
  { path: "website/over-ons", element: <WebsiteOverOnsScreen /> },
  { path: "website/contact", element: <WebsiteContactScreen /> },
  { path: "website/vacatures", element: <WebsiteVacaturesScreen /> },
  { path: "website/faq", element: <WebsiteFAQScreen /> },
  { path: "website/reserveren", element: <WebsiteReserverenScreen /> },
  { path: "website/reviews", element: <WebsiteReviewsScreen /> },
  { path: "website/algemene-voorwaarden", element: <WebsiteAlgemeneVoorwaardenScreen /> },
  { path: "website/privacy", element: <WebsiteAlgemeneVoorwaardenScreen /> },
  // Admin routes
  { path: "admin/login", element: <AdminLoginScreen /> },
  { path: "admin", element: <RequireAdmin><AdminDashboardScreen /></RequireAdmin> },
]);