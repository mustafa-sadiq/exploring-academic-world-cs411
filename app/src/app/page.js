"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Home() {
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

  const [counts, setCounts] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);
  const [topKeywordsYear, setTopKeywordsYear] = useState(yearOptions[0]);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [topKeywordsByInstitute, setTopKeywordsByInstitute] = useState([]);

  const [faculty, setFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedFacultyInfo, setSelectedFacultyInfo] = useState(null);

  // faculty CRUD state
  const [facultyNameCrud, setFacultyName] = useState("");
  const [facultyPositionCrud, setFacultyPosition] = useState("");
  const [facultyResearchInterestCrud, setFacultyResearchInterest] =
    useState("");
  const [facultyEmailCrud, setFacultyEmail] = useState("");
  const [facultyPhoneCrud, setFacultyPhone] = useState("");
  const [facultyPhotoUrlCrud, setFacultyPhotoUrl] = useState("");
  const [facultyUniversityIdCrud, setFacultyUniversityId] = useState("");

  const onChangeFacultyNameCrud = (e) => {
    setFacultyName(e.target.value);
  };

  const onChangeFacultyPositionCrud = (e) => {
    setFacultyPosition(e.target.value);
  };

  const onChangeFacultyResearchInterestCrud = (e) => {
    setFacultyResearchInterest(e.target.value);
  };

  const onChangeFacultyEmailCrud = (e) => {
    setFacultyEmail(e.target.value);
  };

  const onChangeFacultyPhoneCrud = (e) => {
    setFacultyPhone(e.target.value);
  };

  const onChangeFacultyPhotoUrlCrud = (e) => {
    setFacultyPhotoUrl(e.target.value);
  };

  const onChangeFacultyUniversityIdCrud = (e) => {
    setFacultyUniversityId(e.target.value);
  };

  useEffect(() => {
    setFacultyName(selectedFacultyInfo?.name ?? "");
    setFacultyPosition(selectedFacultyInfo?.position ?? "");
    setFacultyResearchInterest(selectedFacultyInfo?.research_interest ?? "");
    setFacultyEmail(selectedFacultyInfo?.email ?? "");
    setFacultyPhone(selectedFacultyInfo?.phone ?? "");
    setFacultyPhotoUrl(selectedFacultyInfo?.photo_url ?? "");
    setFacultyUniversityId(selectedFacultyInfo?.university_id ?? "");
  }, [selectedFacultyInfo]);

  const onUpdateFacultyCrud = () => {
    if (!selectedFaculty) {
      return;
    }

    fetch(`api/faculty/${selectedFaculty.value}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: facultyNameCrud,
        position: facultyPositionCrud,
        research_interest: facultyResearchInterestCrud,
        email: facultyEmailCrud,
        phone: facultyPhoneCrud,
        photo_url: facultyPhotoUrlCrud,
        university_id: facultyUniversityIdCrud,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            alert(`Error: ${data.message}`);
            throw new Error(data.message);
          });
        }
        return response.json();
      })
      .then(() => {
        fetch("api/faculty")
          .then((response) => response.json())
          .then((data) => {
            setFaculty(data);
            setSelectedFaculty({
              value: selectedFaculty.value,
              label: facultyNameCrud,
            });
          });
      })
      .catch((error) => {
        console.error("Error updating faculty:", error);
      });
  };

  const onCreateFacultyCrud = () => {
    let id = 0;

    fetch(`api/faculty/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: facultyNameCrud,
        position: facultyPositionCrud,
        research_interest: facultyResearchInterestCrud,
        email: facultyEmailCrud,
        phone: facultyPhoneCrud,
        photo_url: facultyPhotoUrlCrud,
        university_id: facultyUniversityIdCrud,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            alert(`Error: ${data.message}`);
            throw new Error(data.message);
          });
        }

        return response.json().then((data) => {
          id = data.id;
          return data;
        });
        
        
      })
      .then(() => {
        fetch("api/faculty")
          .then((response) => response.json())
          .then((data) => {
            setFaculty(data);
          });

          setSelectedFaculty({
            value: id,
            label: facultyNameCrud,
          });

          fetch(`api/faculty/${id}/`)
            .then((response) => response.json())
            .then((data) => setSelectedFacultyInfo(data));
      })
      .catch((error) => {
        console.error("Error creating faculty:", error);
      });
  }

  const onDeleteFacultyCrud = () => {
    if (!selectedFaculty) {
      return;
    }

    fetch(`api/faculty/${selectedFaculty.value}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            alert(`Error: ${data.message}`);
            throw new Error(data.message);
          });
        }
        return response.json();
      })
      .then(() => {
        fetch("api/faculty")
          .then((response) => response.json())
          .then((data) => {
            setFaculty(data);
          });
        
        setSelectedFaculty(null);
        setSelectedFacultyInfo(null);
      })
      .catch((error) => {
        console.error("Error deleting faculty:", error);
      });
  }

  const topKeywordYearSelect = (selectedOption) => {
    setTopKeywordsYear(selectedOption);
  };

  const instituteSelect = (selectedOption) => {
    setSelectedInstitute(selectedOption);
  };

  const facultySelect = (selectedOption) => {
    setSelectedFaculty(selectedOption);   
    
    fetch(`api/faculty/${selectedOption.value}/`)
      .then((response) => response.json())
      .then((data) => setSelectedFacultyInfo(data));
  };

  const fetchCounts = () => {
    setCounts([]);
    fetch("api/counts")
      .then((response) => response.json())
      .then((data) => setCounts(data));
  };

  const onRefreshCounts = () => {
    fetchCounts();
  };

  const addNewFaculty = () => {
    setSelectedFaculty(null);    
    setSelectedFacultyInfo(null);
    setFacultyName("");
    setFacultyPosition("");
    setFacultyResearchInterest("");
    setFacultyEmail("");
    setFacultyPhone("");
    setFacultyPhotoUrl("");
    setFacultyUniversityId("");
    
  }

  useEffect(() => {
    fetch("api/institute")
      .then((response) => response.json())
      .then((data) => setInstitutes(data));

    fetch("api/faculty")
      .then((response) => response.json())
      .then((data) => setFaculty(data));

    fetchCounts();
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
      <div className="container mt-4 mb-5">
        <h1 className="text-center">
          Mustafa Sadiq CS411 - Exploring academic world
        </h1>

        <div className="row row-cols-1 row-cols-md-2 mt-4 g-4">
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Live counts</h5>
                <div className="card-text">
                  <button
                    className="btn btn-primary mb-4"
                    onClick={onRefreshCounts}
                  >
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
          <div className="col">
            <div className="card h-75">
              <div className="card-body">
                <div className="card-title">
                  <h4>What are institutes publishing?</h4>
                  <h5>Most common keywords among publications authored by faculty
                  members affiliated with a specific institute</h5>
                  
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
                <div className="card-title">
                  <div className="d-flex justify-content-between">
                    <h5>CRUD operations on Faculty</h5>
                    <button className="btn btn-primary" onClick={addNewFaculty}>+</button>
                  </div>
                </div>

                <div className="card-text">
                  <Select
                    className="m-4"
                    options={faculty}
                    value={selectedFaculty}
                    onChange={facultySelect}
                  />

                  <div id="faculty-info">
                    <div>
                      <div className="mb-3">id: {selectedFacultyInfo?.id}</div>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={facultyNameCrud}
                          onChange={onChangeFacultyNameCrud}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="position" className="form-label">
                          Position
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="position"
                          value={facultyPositionCrud}
                          onChange={onChangeFacultyPositionCrud}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="researchInterest"
                          className="form-label"
                        >
                          Research Interest
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="researchInterest"
                          value={facultyResearchInterestCrud}
                          onChange={onChangeFacultyResearchInterestCrud}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={facultyEmailCrud}
                          onChange={onChangeFacultyEmailCrud}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          value={facultyPhoneCrud}
                          onChange={onChangeFacultyPhoneCrud}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="photoUrl" className="form-label">
                          Photo URL
                        </label>
                        <div className="d-flex align-items-center">
                          <input
                            type="text"
                            className="form-control"
                            id="photoUrl"
                            value={facultyPhotoUrlCrud}
                            onChange={onChangeFacultyPhotoUrlCrud}
                          />
                          {facultyPhotoUrlCrud && (
                            <a
                              href={facultyPhotoUrlCrud}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaExternalLinkAlt className="ms-2" />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="universityId" className="form-label">
                          University ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="universityId"
                          value={facultyUniversityIdCrud}
                          onChange={onChangeFacultyUniversityIdCrud}
                        />
                      </div>
                      <div className="btn-group">
                        {selectedFaculty && (
                          <>
                            <button
                              className="btn btn-primary"
                              onClick={onUpdateFacultyCrud}
                            >
                              Update
                            </button>
                            <button className="btn btn-danger" onClick={onDeleteFacultyCrud}>Delete</button>
                          </>
                        )}
                        {!selectedFaculty && (
                          <button className="btn btn-success" onClick={onCreateFacultyCrud}>Create</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
