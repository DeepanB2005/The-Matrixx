import { useEffect, useState } from "react";
import AcademicianPage from "./pages/AcademicianPage";
import IndustryPage from "./pages/IndustryPage";
import InstitutionPage from "./pages/InstitutionPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentPage from "./pages/StudentPage";

const getRoute = () => window.location.hash.replace("#", "") || "top";

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute());
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  const goHome = () => {
    window.location.hash = "top";
    setRoute("top");
  };

  const pages = { student: StudentPage, academician: AcademicianPage, industry: IndustryPage, institution: InstitutionPage };
  const PortalPage = pages[route];

  if (route === "login") return <LoginPage onBack={goHome} />;
  if (PortalPage) return <PortalPage onBack={goHome} />;
  return <LandingPage />;
}
