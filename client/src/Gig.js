import React, { useState, useEffect } from 'react'
import Application from './Application'
import './Gig.css';

function Gig({ myGig, onEditMyGig, onDeleteGig, onDeleteMyGig, onEditGig }) {

    const [isEditTitleClicked, setIsEditTitleClicked] = useState(false)
    const [isEditDescriptionClicked, setIsEditDescriptionClicked] = useState(false)
    const [title, setTitle] = useState(myGig.title)
    const [description, setDescription] = useState(myGig.description)
    const [gigApplications, setGigApplications] = useState([])

    useEffect(() => {
        fetch(`/applications/${myGig.id}`)
        .then((r) => r.json ())
        .then(object => setGigApplications(object))
    }, [])

    const toggleEditTitle = () => {
        setIsEditTitleClicked(!isEditTitleClicked)
    }

    const toggleEditDescription = () => {
        setIsEditDescriptionClicked(!isEditDescriptionClicked)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleTitleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`/gigs/${myGig.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title }),
          });
          if (!response.ok) {
            console.error("Failed to update title:", response.statusText);
            return;
          }
          const updatedGig = await response.json();
          onEditMyGig(updatedGig);
          onEditGig(updatedGig);
          
          setIsEditTitleClicked(false);
        } catch (error) {
          console.error("An error occurred during title update:", error);
        }
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
            console.error("Failed to update description:", response.statusText);
            return;
          }
          const updatedGig = await response.json();
          onEditMyGig(updatedGig);
          onEditGig(updatedGig);
          
          setIsEditDescriptionClicked(false);
        } catch (error) {
          console.error("An error occurred during description update:", error);
        }
      };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleDeleteGig = () => {
        fetch(`/gigs/${myGig.id}`, {
            method: "DELETE"
        })
        .then(onDeleteGig(myGig.id))
        .then(onDeleteMyGig(myGig.id))
    }

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
            <button onClick={handleDeleteGig}>Delete Gig</button>
            <div className="gig-container"><h2>Applications:</h2>
              {gigApplications.map(gigApplication => 
                <button key={gigApplication.id}>{gigApplication.username}</button>
              )}
            </div>
        </div>
    )
}

export default Gig