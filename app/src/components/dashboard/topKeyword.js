"use client";

import { useEffect, useState } from "react";
import Select from "react-select";

function DashboardTopKeywords() {
  const yearOptions = [
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" },
    { value: "2014", label: "2014" },
    { value: "2013", label: "2013" },
    { value: "2012", label: "2012" },
    { value: "2011", label: "2011" },
    { value: "2010", label: "2010" },
    { value: "2009", label: "2009" },
    { value: "2008", label: "2008" },
    { value: "2007", label: "2007" },
    { value: "2006", label: "2006" },
    { value: "2005", label: "2005" },
    { value: "2004", label: "2004" },
  ];

  const [topKeywords, setTopKeywords] = useState([]);
  const [topKeywordsYear, setTopKeywordsYear] = useState(yearOptions[0]);

  const topKeywordYearSelect = (selectedOption) => {
    setTopKeywordsYear(selectedOption);
  };

  useEffect(() => {
    setTopKeywords([]);
    fetch(`api/keywords/top?year=${topKeywordsYear.value}`)
      .then((response) => response.json())
      .then((data) => setTopKeywords(data));
  }, [topKeywordsYear]);

  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">
            Top 10 Keywords by Publication Count by Year
          </h5>
          <div className="card-text">
            <Select
              id="top-keywords-year"
              className="m-4"
              options={yearOptions}
              defaultValue={yearOptions[0]}
              value={topKeywordsYear}
              onChange={topKeywordYearSelect}
            />

            {topKeywords.length === 0 && (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {topKeywords.map((keyword) => (
              <div key={keyword.name}>
                {keyword.name}:{" "}
                <span className="text-primary">
                  {keyword.publication_count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTopKeywords;
