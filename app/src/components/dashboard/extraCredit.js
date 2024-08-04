"use client";

import { useEffect, useState } from "react";

function DashboardExtraCredit() {

    const [data, setData] = useState(null);
    const [facultyId, setFacultyId] = useState(null);
    const [loadingIndicator, setLoadingIndicator] = useState(false);

    const onClickGetData = async () => {

        if (!facultyId) {
            alert('Please select a faculty first');
            return;
        }

        setLoadingIndicator(true);

        const response = await fetch('/api/openapi?facultyId=' + facultyId);
        const data = await response.json();
        setData(data);

        setLoadingIndicator(false);
    }



  

  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">External sourced information about faculty <span className="text-danger">Extra credit</span></h5>
          <div className="card-text">
            <div className="mb-3">
              <label htmlFor="facultyId" className="form-label">Faculty ID</label>
              <input type="text" className="form-control" id="facultyId" onChange={(e) => setFacultyId(e.target.value)} />
            </div>

            <button className="btn btn-primary" onClick={onClickGetData}>Get data</button>

            {loadingIndicator && <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}

            <div className="m-5" dangerouslySetInnerHTML={{ __html: data }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardExtraCredit;
