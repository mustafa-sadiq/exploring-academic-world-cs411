"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    fetch("api/counts")
      .then((response) => response.json())
      .then((data) => setCounts(data));
  }, []);

  return (
    <main>
      <div className="container mt-4">
        <h1 className="text-center">
          Mustafa Sadiq CS411 - Exploring academic world
        </h1>

        <div className="row row-cols-1 row-cols-md-2 mt-4 g-4">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Live counts</h5>
                <p class="card-text">
                  {Object.entries(counts).map(([key, value]) => (
                    <div key={key}>
                      {key}: {value}
                    </div>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
