import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Sidebar from "./components/sidebar/Sidebar";


function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "100vh" }}>
          {/* Sidebar */}
          <div className="col-3 p-0">
            <Sidebar />
          </div>

          {/* Content */}
          <div className="col-9">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
