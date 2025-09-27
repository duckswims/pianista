import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";

import Home from "./pages/Home";
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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [devMode, setDevMode] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          devMode={devMode}
          setDevMode={setDevMode}
        />

        {/* Main content */}
        <main className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
          <Header />

          <Routes>
            {/* Home */}
            <Route path="/" element={devMode ? <Dev /> : <Client />} />

            {/* For main Solve, Validate, Convert, Chart pages */}
            <Route path="/:sectionKey" element={<SectionPage />} />

            {/* Solve */}
            <Route path="/solve/minizinc" element={<SolveMinizinc />} />
            <Route path="/solve/pddl" element={<SolvePddl />} />

            {/* Validate */}
            <Route path="/validate/plan" element={<ValidatePlan />} />
            <Route path="/validate/pddl" element={<ValidatePddl />} />
            <Route path="/validate/match" element={<ValidateMatch />} />

            {/* Convert */}
            <Route path="/convert/mermaid" element={<ConvertMermaid />} />
            <Route path="/convert/natural_language" element={<ConvertNaturalLanguage />} />

            {/* Chart */}
            <Route path="/chart/render" element={<ChartRender />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
