// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/layout/sidebar/Sidebar";
import Header from "./components/layout/header/Header";

import SectionPage from "./pages/SectionPage";
import Dev from "./pages/dev/Dev";
import Client from "./pages/client/Client";

// Solve subpages
import SolveMinizinc from "./pages/solve/minizinc/Minizinc";
import SolvePddl from "./pages/solve/pddl/PDDL";

// Validate subpages
import ValidatePlan from "./pages/validate/plan/Plan";
import ValidatePddl from "./pages/validate/pddl/Pddl";
import ValidateMatch from "./pages/validate/match/Match";

// Convert subpages
import ConvertMermaid from "./pages/convert/mermaid/Mermaid";
import ConvertNaturalLanguage from "./pages/convert/natural_language/NaturalLanguage";

// Chart subpages
import ChartRender from "./pages/chart/render/ChartRender";

import "./App.css";
import "./darkmode.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          devMode={devMode}
          setDevMode={setDevMode}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Main content */}
        <main className={`${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
          {/* Header stays fixed */}
          <Header />

          {/* Scrollable area */}
          <div className="main-content">
            <Routes>
              {/* Home / Client */}
              <Route path="/" element={devMode ? <Dev /> : <Client />} />

              {/* Main Section pages */}
              <Route path="/:sectionKey" element={<SectionPage />} />

              {/* Solve pages */}
              <Route path="/solve/minizinc" element={<SolveMinizinc />} />
              <Route path="/solve/pddl" element={<SolvePddl />} />

              {/* Validate pages */}
              <Route path="/validate/plan" element={<ValidatePlan />} />
              <Route path="/validate/pddl" element={<ValidatePddl />} />
              <Route path="/validate/match" element={<ValidateMatch />} />

              {/* Convert pages */}
              <Route path="/convert/mermaid" element={<ConvertMermaid />} />
              <Route path="/convert/natural_language" element={<ConvertNaturalLanguage />} />

              {/* Chart pages */}
              <Route path="/chart/render" element={<ChartRender />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
