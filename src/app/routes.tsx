import { createBrowserRouter } from "react-router";
import RootLayout from "./components/RootLayout";
import AdminLayout from "./components/AdminLayout";
import HomePage from "./pages/HomePage";
import ProjectDetail from "./pages/projects/ProjectDetail";
import ExperienceDetail from "./pages/experience/ExperienceDetail";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjectForm from "./pages/admin/AdminProjectForm";
import AdminAboutForm from "./pages/admin/AdminAboutForm";
import AdminContactForm from "./pages/admin/AdminContactForm";
import AdminExperienceList from "./pages/admin/AdminExperienceList";
import AdminExperienceForm from "./pages/admin/AdminExperienceForm";
import AdminAchievementsPage from "./pages/admin/AdminAchievementsPage";
import AdminMomentsPage from "./pages/admin/AdminMomentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      // Generic, CMS-driven project route — replaces the old per-project
      // static pages (SpeakWiseDetail.tsx etc., kept in the repo but no
      // longer routed to, pending a final visual-parity check post-seed).
      { path: "projects/:slug", Component: ProjectDetail },
      { path: "experience/:slug", Component: ExperienceDetail },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { path: "login", Component: AdminLogin },
      { index: true, Component: AdminDashboard },
      { path: "projects/new", Component: AdminProjectForm },
      { path: "projects/:id/edit", Component: AdminProjectForm },
      { path: "about", Component: AdminAboutForm },
      { path: "contact", Component: AdminContactForm },
      { path: "experience", Component: AdminExperienceList },
      { path: "experience/new", Component: AdminExperienceForm },
      { path: "experience/:id/edit", Component: AdminExperienceForm },
      { path: "achievements", Component: AdminAchievementsPage },
      { path: "moments", Component: AdminMomentsPage },
    ],
  },
]);
