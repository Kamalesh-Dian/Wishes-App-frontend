import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const HomePage = lazy(() => import("../pages/HomePage"));
const CreateWishPage = lazy(() => import("../pages/CreateWishPage"));
const PreviewPage = lazy(() => import("../pages/PreviewPage"));
const HistoryPage = lazy(() => import("../pages/HistoryPage"));
const ResultPage = lazy(() => import("../pages/ResultPage"));
const EventDashboardPage = lazy(() => import("../pages/EventDashboardPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ExcelImportPage = lazy(() => import("../pages/ExcelImportPage"));
const OneDrivePage = lazy(() => import("../pages/OneDrivePage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const PageLoader = () => (
  <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#F5B24A] animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Landing Page (Self-contained Cinematic Landing Experience) */}
        <Route path="/" element={<HomePage />} />

        {/* Public Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes with Dashboard (Sidebar) Layout */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateWishPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/preview"
            element={
              <ProtectedRoute>
                <PreviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Dashboard Hub */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Cloud Sync & Excel Import */}
          <Route
            path="/onedrive"
            element={
              <ProtectedRoute>
                <OneDrivePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/import"
            element={
              <ProtectedRoute>
                <ExcelImportPage />
              </ProtectedRoute>
            }
          />

          {/* Profile & Settings */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
