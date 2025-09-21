import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";

import Home from "./pages/Home";
import SectionPage from "./pages/SectionPage";

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

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "100vh" }}>
          {/* Sidebar */}
          <div className="col-2 ps-0 pe-0 pt-2">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="col-10 ps-5 pe-5 pt-2">
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Dynamic Section route */}
              <Route path="/:sectionKey" element={<SectionPage />} />

              {/* Solve subpages */}
              <Route path="/solve/minizinc" element={<SolveMinizinc />} />
              <Route path="/solve/pddl" element={<SolvePddl />} />

              {/* Validate subpages */}
              <Route path="/validate/plan" element={<ValidatePlan />} />
              <Route path="/validate/pddl" element={<ValidatePddl />} />
              <Route path="/validate/match" element={<ValidateMatch />} />

              {/* Convert subpages */}
              <Route path="/convert/mermaid" element={<ConvertMermaid />} />
              <Route path="/convert/natural_language" element={<ConvertNaturalLanguage />} />

              {/* Chart subpages */}
              <Route path="/chart/render" element={<ChartRender />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
