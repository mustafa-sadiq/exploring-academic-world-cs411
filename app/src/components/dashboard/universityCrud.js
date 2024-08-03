"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { FaExternalLinkAlt } from "react-icons/fa";

function DashboardUniversityCrud() {
  const [university, setUniversity] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedUniversityInfo, setSelectedUniversityInfo] = useState(null);

  const [universityNameCrud, setUniversityName] = useState("");
  const [universityPhotoUrlCrud, setUniversityPhotoUrl] = useState("");

  const onUniversityNameCrudChange = (event) => {
    setUniversityName(event.target.value);
  };

  const onUniversityPhotoUrlCrudChange = (event) => {
    setUniversityPhotoUrl(event.target.value);
  };

  const addNewUniversity = () => {
    setSelectedUniversity(null);
    setSelectedUniversityInfo(null);
  };


  const onUniversitySelect = (selectedOption) => {
    setSelectedUniversity(selectedOption);
    fetch(`api/institute/${selectedOption.value}`)
      .then((response) => response.json())
      .then((data) => setSelectedUniversityInfo(data));
  };

  const onCreateUniversityCrud = () => {
    let id = 0;
    let name = universityNameCrud;

    fetch(`api/institute/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: universityNameCrud,
        photo_url: universityPhotoUrlCrud,
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
          name = data.name;
          return data;
        });
      })
      .then(() => {
        fetch("api/institute")
          .then((response) => response.json())
          .then((data) => {
            setUniversity(data);
          });

        setSelectedUniversity({
          value: id,
          label: name,
        });

        fetch(`api/institute/${id}/`)
          .then((response) => response.json())
          .then((data) => setSelectedUniversityInfo(data));
      })
      .catch((error) => {
        console.error("Error creating university:", error);
      });
  };

  const onDeleteUniversityCrud = () => {
    if (!selectedUniversity) {
      return;
    }

    fetch(`api/institute/${selectedUniversity.value}/`, {
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
        fetch("api/institute")
          .then((response) => response.json())
          .then((data) => {
            setUniversity(data);
          });

        setSelectedUniversity(null);
        setSelectedUniversityInfo(null);
      })
      .catch((error) => {
        console.error("Error deleting university:", error);
      });
  };

  const onUpdateUniversityCrud = () => {
    if (!selectedUniversity) {
      return;
    }

    fetch(`api/institute/${selectedUniversity.value}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: universityNameCrud,
        photo_url: universityPhotoUrlCrud,
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
        fetch("api/institute")
          .then((response) => response.json())
          .then((data) => {
            setUniversity(data);
            setSelectedUniversity({
              value: selectedUniversity.value,
              label: universityNameCrud,
            });
          });
      })
      .catch((error) => {
        console.error("Error updating university:", error);
      });
  };

  useEffect(() => {
    fetch("api/institute")
      .then((response) => response.json())
      .then((data) => setUniversity(data));
  }, []);

  useEffect(() => {
    setUniversityName(selectedUniversityInfo?.name ?? "");
    setUniversityPhotoUrl(selectedUniversityInfo?.photo_url ?? "");
  }, [selectedUniversityInfo]);

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <div className="d-flex justify-content-between">
              <h5>CRUD operations on University</h5>
              <button className="btn btn-primary" onClick={addNewUniversity}>
                +
              </button>
            </div>
          </div>

          <div className="card-text">
            <Select
              className="m-4"
              options={university}
              value={selectedUniversity}
              onChange={onUniversitySelect}
            />

            <div id="faculty-info">
              <div>
                <div className="mb-3">id: {selectedUniversityInfo?.id}</div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={universityNameCrud}
                    onChange={onUniversityNameCrudChange}
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
                      value={universityPhotoUrlCrud}
                      onChange={onUniversityPhotoUrlCrudChange}
                    />
                    {universityPhotoUrlCrud && (
                      <a
                        href={universityPhotoUrlCrud}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt className="ms-2" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="btn-group">
                  {selectedUniversity && (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={onUpdateUniversityCrud}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={onDeleteUniversityCrud}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {!selectedUniversity && (
                    <button
                      className="btn btn-success"
                      onClick={onCreateUniversityCrud}
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

export default DashboardUniversityCrud;
