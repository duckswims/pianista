import { BrowserRouter, Routes, Route } from "react-router-dom";


import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Solver from "./pages/Solver";


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
              <Route path="/planner" element={<Planner />} />
              <Route path="/solver" element={<Solver />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
