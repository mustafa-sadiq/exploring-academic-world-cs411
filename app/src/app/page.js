"use client";

import { useEffect, useState } from "react";
import Select from 'react-select'

export default function Home() {
  const yearOptions = [
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' },
    { value: '2013', label: '2013' },
    { value: '2012', label: '2012' },
    { value: '2011', label: '2011' },
    { value: '2010', label: '2010' },
    { value: '2009', label: '2009' },
    { value: '2008', label: '2008' },
    { value: '2007', label: '2007' },
    { value: '2006', label: '2006' },
    { value: '2005', label: '2005' },
    { value: '2004', label: '2004' },
  ];

  
  const [counts, setCounts] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);
  const [topKeywordsYear, setTopKeywordsYear] = useState(yearOptions[0]);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [topKeywordsByInstitute, setTopKeywordsByInstitute] = useState([]);

  const topKeywordYearSelect = (selectedOption) => {
    setTopKeywordsYear(selectedOption);
  }

  const instituteSelect = (selectedOption) => {
    setSelectedInstitute(selectedOption);
  }

  const fetchCounts = () => {
    setCounts([]);
    fetch("api/counts")
    .then((response) => response.json())
    .then((data) => setCounts(data));
  }

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 50000);
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {    
    fetch("api/institute")
      .then((response) => response.json())
      .then((data) => setInstitutes(data));      
  }, []);

  useEffect(() => {
    if (!selectedInstitute) {
      return;
    }

    fetch(`api/institute/${selectedInstitute.value}/`)
      .then((response) => response.json())
      .then((data) => setTopKeywordsByInstitute(data));

  }, [selectedInstitute]);

  useEffect(() => {
    setTopKeywords([]);
    fetch(`api/keywords/top?year=${topKeywordsYear.value}`)
      .then((response) => response.json())
      .then((data) => setTopKeywords(data));
  }, [topKeywordsYear]);

  return (
    <main>
      <div className="container mt-4">
        <h1 className="text-center">
          Mustafa Sadiq CS411 - Exploring academic world
        </h1>

        <div className="row row-cols-1 row-cols-md-2 mt-4 g-4">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Live counts</h5>
                <div className="card-text">

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
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Top 10 Keywords by Publication Count by Year</h5>
                <div className="card-text">               
                <Select className="m-4" options={yearOptions} defaultValue={yearOptions[0]} selectedOption={topKeywordsYear} onChange={topKeywordYearSelect}/>

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
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Most common keywords among publications authored by faculty members affiliated with a specific institute</h5>
                <div className="card-text">               
                <Select className="m-4" options={institutes} selectedOption={selectedInstitute} onChange={instituteSelect}/>

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
                      <span className="text-primary">
                        {keyword.Occurrences}
                      </span>
                    </div>
                  ))}

                  
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Create, Read, Update, Delete Faculty</h5>
                <div className="card-text"> 
                  <Select className="m-4" options={[{'label':"Faculty", 'value':"faculty"}]}/>              
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
