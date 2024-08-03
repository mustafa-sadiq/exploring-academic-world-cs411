"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { FaExternalLinkAlt } from "react-icons/fa";

function DashboardFacultyCrud() {
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
  };

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
  };

  const facultySelect = (selectedOption) => {
    setSelectedFaculty(selectedOption);

    fetch(`api/faculty/${selectedOption.value}/`)
      .then((response) => response.json())
      .then((data) => setSelectedFacultyInfo(data));
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

  useEffect(() => {
    fetch("api/faculty")
      .then((response) => response.json())
      .then((data) => setFaculty(data));
  }, []);

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <div className="d-flex justify-content-between">
              <h5>CRUD operations on Faculty</h5>
              <button className="btn btn-primary" onClick={addNewFaculty}>
                +
              </button>
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
                  <label htmlFor="researchInterest" className="form-label">
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
                      <button
                        className="btn btn-danger"
                        onClick={onDeleteFacultyCrud}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {!selectedFaculty && (
                    <button
                      className="btn btn-success"
                      onClick={onCreateFacultyCrud}
                    >
                      Create
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardFacultyCrud;
