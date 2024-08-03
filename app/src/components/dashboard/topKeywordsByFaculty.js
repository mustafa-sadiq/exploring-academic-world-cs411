"use client";

import { useEffect, useState } from "react";
import Select from "react-select";

function DashboardTopKeywordsByFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedFacultyTopKeywords, setSelectedFacultyTopKeywords] = useState(null);

  useEffect(() => {
    fetch("/api/faculty/mongodb")
      .then((response) => response.json())
      .then((data) => setFaculty(data));
  }, []);

  const onSelectFaculty = (selectedOption) => {
    setSelectedFaculty(selectedOption);

    fetch(`/api/faculty/mongodb/${selectedOption.value}`)
      .then((response) => response.json())
      .then((data) => setSelectedFacultyTopKeywords(data));

  };





  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">
            Top 10 Keywords by Score aggregate by Faculty{" "}
            <span className="text-danger">MongoDB</span>
          </h5>
          <div className="card-text">
            <Select
              id="top-keywords-faculty"
              className="m-4"
              options={faculty}
              value={selectedFaculty}
              onChange={onSelectFaculty}
            />
          </div>

            {!selectedFacultyTopKeywords && (
                <div className="text-center">
                    <h5>Please select a faculty to view top keywords</h5>
                </div>
                )}

            {selectedFacultyTopKeywords && selectedFacultyTopKeywords.length > 0 && (
                <div>
                    <ul>
                        {selectedFacultyTopKeywords.map((keyword, index) => (
                            <li key={index}>
                                {keyword._id} - <span className="text-primary">{keyword.totalScore}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
      </div>
    </div>
  );
}

export default DashboardTopKeywordsByFaculty;
