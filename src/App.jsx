import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";

import Home from "./pages/Home";
import Solve from "./pages/Solve";
import MiniZinc from "./pages/solve/minizinc/Minizinc";
import PDDL from "./pages/solve/pddl/PDDL";
import Validation from "./pages/Validation";
import Convert from "./pages/Convert";
import Chart from "./pages/Chart";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "100vh" }}>
          <div className="col-2 p-0">
            <Sidebar />
          </div>

          <div className="col-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solve" element={<Solve />} />
              <Route path="/solve/minizinc" element={<MiniZinc />} />
              <Route path="/solve/pddl" element={<PDDL />} />
              <Route path="/validate" element={<Validation />} />
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
