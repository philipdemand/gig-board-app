import React, { useState, useEffect } from 'react'
import Application from './Application'
import './Gig.css';

function Gig({ myGig, onEditMyGig, onDeleteGig, onDeleteMyGig, onEditGig }) {

    const [isEditTitleClicked, setIsEditTitleClicked] = useState(false)
    const [isEditDescriptionClicked, setIsEditDescriptionClicked] = useState(false)
    const [title, setTitle] = useState(myGig.title)
    const [description, setDescription] = useState(myGig.description)
    const [gigApplications, setGigApplications] = useState([])
    const [titleErrorData, setTitleErrorData] = useState([])
    const [descriptionErrorData, setDescriptionErrorData] = useState([])
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        fetch(`/applications/${myGig.id}`)
        .then((r) => r.json ())
        .then(object => setGigApplications(object))
    }, [])

    const handleUpdateAppStatus = (appObject) => {
        const updatedApplications = gigApplications.map(app => {
            if (app.id === appObject.id) {
                return appObject
            } else {
                return app
            }
        })
        setGigApplications(updatedApplications)
    }

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
      };
    
      const handleCloseApplication = () => {
        setSelectedApplication(null);
      };

    const toggleEditTitle = () => {
        setIsEditTitleClicked(!isEditTitleClicked)
    }

    const toggleEditDescription = () => {
        setIsEditDescriptionClicked(!isEditDescriptionClicked)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleTitleSubmit = (e) => {
      e.preventDefault();
  
      const updateTitle = async () => {
          try {
              const response = await fetch(`/gigs/${myGig.id}`, {
                  method: "PATCH",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ title: title }),
              });
  
              if (!response.ok) {
                  const errorData = await response.json();
                  setTitleErrorData(errorData.errors);
                  return;
              }
              const updatedGig = await response.json();
              onEditMyGig(updatedGig);
              onEditGig(updatedGig);
              setIsEditTitleClicked(false);
              setTitleErrorData([]);
          } 
          catch (error) {
              setTitleErrorData(["An error occurred during title update. Please try again."]);
          }
      };
      updateTitle();
  };

  const handleDescriptionSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`/gigs/${myGig.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ description: description }),
          });
        if (!response.ok) {
          const errorData = await response.json();
          setDescriptionErrorData(errorData.errors);
          return;
        }
      const updatedGig = await response.json();
      onEditMyGig(updatedGig);
      onEditGig(updatedGig);    
      setIsEditDescriptionClicked(false);
      setDescriptionErrorData([]);
    } catch (error) {
        setDescriptionErrorData(["An error occurred during description update. Please try again."]);
      }
  };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleDeleteGig = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch(`/gigs/${myGig.id}`, {
              method: "DELETE"
          });
  
          if (!response.ok) {
              const errorData = await response.json();
              console.error("Error deleting gig:", errorData.errors);
              return;
          }
          onDeleteGig(myGig.id);
          onDeleteMyGig(myGig.id);
      } catch (error) {
          console.error("An error occurred during gig deletion:", error);
      }
  };

    return (
        <div className="gig-container">
            <h2>{myGig.title} <button onClick={toggleEditTitle}>Edit</button></h2>
            {isEditTitleClicked
            ? 
            <form onSubmit={handleTitleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <button>Submit</button>
            </form>
            : null
            }
            {titleErrorData.length > 0 ? <ul style={{ color: "red" }}>
              {titleErrorData.map((error, i) => <li key={i}>{error}</li>)}
            </ul> : null}
            Start Date:<h4>{myGig.start_date}</h4>
            <h4>{myGig.description} <button onClick={toggleEditDescription}>Edit</button></h4>
            {isEditDescriptionClicked
            ? 
            <form onSubmit={handleDescriptionSubmit}>
                <input
                    type="text"
                    name="title"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <button>Submit</button>
            </form>
            : null
            }
            {descriptionErrorData.length > 0 ? <ul style={{ color: "red" }}>
              {descriptionErrorData.map((error, i) => <li key={i}>{error}</li>)}
            </ul> : null}
            <button onClick={handleDeleteGig}>Delete Gig</button>
            <div className="gig-container"><h2>Applications:</h2>
              {gigApplications.map(gigApplication => 
                <button
                    key={gigApplication.id}
                    onClick={() => handleApplicationClick(gigApplication)}
                    >
                    {gigApplication.username}
                </button>
              )}
            </div>
            {selectedApplication && (
        <div className="overlay">
          <div className="popout">
            <Application application={selectedApplication} onUpdateStatus={handleUpdateAppStatus}/>
            <button onClick={handleCloseApplication}>Close</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default Gig