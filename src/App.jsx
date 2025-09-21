import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";

import Home from "./pages/Home";

// Solve pages
import Solve from "./pages/Solve";
import SolveMinizinc from "./pages/solve/minizinc/Minizinc";
import SolvePddl from "./pages/solve/pddl/PDDL";

// Validate pages
import Validate from "./pages/Validate";
import ValidatePlan from "./pages/validate/plan/Plan";
import ValidatePddl from "./pages/validate/pddl/Pddl";
import ValidateMatch from "./pages/validate/match/Match";

// Convert pages
import Convert from "./pages/Convert";
import ConvertMermaid from "./pages/convert/mermaid/Mermaid";
import ConvertNaturalLanguage from "./pages/convert/natural_language/NaturalLanguage";

// Chart pages
import Chart from "./pages/Chart";
import ChartRender from "./pages/chart/render/ChartRender";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "100vh" }}>
          {/* Sidebar */}
          <div className="col-2 p-0">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="col-10">
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Solve routes */}
              <Route path="/solve" element={<Solve />} />
              <Route path="/solve/minizinc" element={<SolveMinizinc />} />
              <Route path="/solve/pddl" element={<SolvePddl />} />

              {/* Validate routes */}
              <Route path="/validate" element={<Validate />} />
              <Route path="/validate/plan" element={<ValidatePlan />} />
              <Route path="/validate/pddl" element={<ValidatePddl />} />
              <Route path="/validate/match" element={<ValidateMatch />} />

              {/* Convert routes */}
              <Route path="/convert" element={<Convert />} />
              <Route path="/convert/mermaid" element={<ConvertMermaid />} />
              <Route path="/convert/natural_language" element={<ConvertNaturalLanguage />} />

              {/* Chart routes */}
              <Route path="/chart" element={<Chart />} />
              <Route path="/chart/render" element={<ChartRender />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
