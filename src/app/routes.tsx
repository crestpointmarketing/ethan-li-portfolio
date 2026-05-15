import { createBrowserRouter } from "react-router";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import SpeakWiseDetail from "./pages/projects/SpeakWiseDetail";
import EelocutionistDetail from "./pages/projects/EelocutionistDetail";
import ZeitgeistDetail from "./pages/projects/ZeitgeistDetail";
import OneSoureCloudDetail from "./pages/experience/OneSoureCloudDetail";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "projects/speakwise", Component: SpeakWiseDetail },
      { path: "projects/eelocutionist", Component: EelocutionistDetail },
      { path: "projects/zeitgeist", Component: ZeitgeistDetail },
      { path: "experience/onesource-cloud", Component: OneSoureCloudDetail },
      { path: "*", Component: NotFound },
    ],
  },
]);
