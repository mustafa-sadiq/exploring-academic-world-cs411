"use client";

import { useEffect, useState } from "react";
import Select from "react-select";

function DashboardCommonKeywords() {
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [topKeywordsByInstitute, setTopKeywordsByInstitute] = useState([]);

  const instituteSelect = (selectedOption) => {
    setSelectedInstitute(selectedOption);
  };

  useEffect(() => {
    if (!selectedInstitute) {
      return;
    }

    fetch(`api/institute/neo4j/${selectedInstitute.value}/`)
      .then((response) => response.json())
      .then((data) => setTopKeywordsByInstitute(data));
  }, [selectedInstitute]);

  useEffect(() => {
    fetch("api/institute/neo4j/")
      .then((response) => response.json())
      .then((data) => setInstitutes(data));
  }, []);

  return (
    <div className="col">
      <div className="card h-75">
        <div className="card-body">
          <div className="card-title">
            <h4>What are institutes publishing? <span className="text-danger">Neo4j</span></h4>
            <h5>
              Most common keywords among publications authored by faculty
              members affiliated with a specific institute
            </h5>
          </div>
          <div className="card-text">
            <Select
              id="institute-select"
              className="m-4"
              options={institutes}
              value={selectedInstitute}
              onChange={instituteSelect}
            />

            {selectedInstitute && topKeywordsByInstitute.length === 0 && (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {!selectedInstitute && (
              <div>
                <h6>Please select a institute</h6>
              </div>
            )}

            {topKeywordsByInstitute.map((keyword) => (
              <div key={keyword.Keyword}>
                {keyword.Keyword}:{" "}
                <span className="text-primary">{keyword.Occurrences}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCommonKeywords;
