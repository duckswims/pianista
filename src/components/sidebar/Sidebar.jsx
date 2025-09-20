import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchApi } from "../../scripts/api";

import './online-indicator.css'


function Sidebar() {
    const [apiStatus, setApiStatus] = useState(null);

    useEffect(() => {
        async function checkApi() {
            const result = await fetchApi();
            setApiStatus(!result?.error); // true if API is online
        }
        checkApi();
    }, []);


    return (
        <div className="d-flex flex-column p-3 bg-light" style={{ minHeight: "100%" }}>
            <h5 className="d-flex align-items-center">
                Pianista API
                <div className={`online-indicator ${apiStatus ? "online" : "offline"} ms-2`}>
                    <span className="blink"></span>
                </div>
            </h5>

            <nav className="nav flex-column">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/planner" className="nav-link">Planner</Link>
                <Link to="/solver" className="nav-link">Solver</Link>
                <Link to="/validate" className="nav-link">Validation</Link>
            </nav>

        </div>
    );
}

export default Sidebar;
