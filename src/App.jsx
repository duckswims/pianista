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

// Other pages
import Convert from "./pages/Convert";
import Chart from "./pages/Chart";

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

              {/* Other pages */}
              <Route path="/convert" element={<Convert />} />
              <Route path="/chart" element={<Chart />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
