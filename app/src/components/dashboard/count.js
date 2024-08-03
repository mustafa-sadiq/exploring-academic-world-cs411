"use client";

import { useEffect, useState } from "react";

function DashboardCount() {
  const [counts, setCounts] = useState([]);

  const fetchCounts = () => {
    setCounts([]);
    fetch("api/counts")
      .then((response) => response.json())
      .then((data) => setCounts(data));
  };

  const onRefreshCounts = () => {
    fetchCounts();
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">Live counts</h5>
          <div className="card-text">
            <button className="btn btn-primary mb-4" onClick={onRefreshCounts}>
              Refresh
            </button>
            {Object.keys(counts).length === 0 && (
              <div className="text-center">
                <div className="placeholder-glow">
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                </div>
              </div>
            )}

            {Object.entries(counts).map(([key, value]) => (
              <div key={key}>
                {key}: <span className="text-primary">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCount;
