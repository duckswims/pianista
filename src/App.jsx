import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home";
import Planners from "./pages/Planners";
import Solvers from "./pages/Solvers";
import Solve from "./pages/Solve";
import Validation from "./pages/Validation";
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

          {/* Content */}
          <div className="col-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/planners" element={<Planners />} />
              <Route path="/solvers" element={<Solvers />} />
              <Route path="/solve" element={<Solve />} />
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
