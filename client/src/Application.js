import React, { useState, useEffect } from 'react';
import './Gig.css';

function Application({ application, onUpdateStatus }) {
  const [appStatus, setAppStatus] = useState(false)
  const [errorData, setErrorData] = useState([])

  useEffect(() => {
    if (application.status === "PENDING") {
        setAppStatus(false)
    } else {
        setAppStatus(true)
    }
  }, [])

  const handleAccept = async () => {
    fetch(`/api/v1/applications/${application.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({status: "ACCEPTED"})
    })
    .then((r) => r.json()
        .then((data) => {
            if (r.ok) {
                setAppStatus(true);
                onUpdateStatus(data)
            } else {
                setErrorData(data.errors)
            }
        })
    ) 
  };

  const handleReject = async () => {
    fetch(`/api/v1/applications/${application.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({status: "REJECTED"})
    })
    .then((r) => r.json()
        .then((data) => {
            if (r.ok) {
                setAppStatus(true);
                onUpdateStatus(data)
            } else {
                setErrorData(data.errors)
            }
        })
    )
  };

  const handleReopenDecision = () => {
    setAppStatus(false);
  };

  return (
    <div className="application-popout">
      <h3>Applicant Information</h3>
      <p><strong>Username:</strong> {application.username}</p>
      <p><strong>Email:</strong> {application.email}</p>
      <p><strong>Message:</strong> {application.message}</p>

      {!appStatus ?
        <div>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      :
        <div>
            <p>Application {application.status === 'ACCEPTED' ? 'Accepted' : 'Rejected'}</p>
            <button onClick={handleReopenDecision}>Reopen Decision</button>
        </div>
      }
      {errorData ? <ul style={{ color: "red" }}>
            {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
    </div>
  );
}

export default Application;