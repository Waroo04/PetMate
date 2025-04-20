import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AddPetPage from "./pages/AddPetPage";
import PetProfilePage from "./pages/PetProfilePage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AIPage from "./pages/AIPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Update the document title based on the current route
    const pageName = location.pathname.split("/").pop() || "home";
    const formattedPageName =
      pageName.charAt(0).toUpperCase() + pageName.slice(1);
    document.title = `PetMate - ${
      formattedPageName === "Home" ? "Pet Management" : formattedPageName
    }`;
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Layout /> : <LandingPage />}>
        {user && (
          <>
            <Route index element={<HomePage />} />
            <Route path="add-pet" element={<AddPetPage />} />
            <Route path="pets/:id" element={<PetProfilePage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="ai" element={<AIPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </>
        )}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default App;