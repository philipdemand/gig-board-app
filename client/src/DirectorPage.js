import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from './contexts/UserContext';
import Gig from './Gig'

function DirectorPage({ onAddGig, onDeleteGig, onEditGig }) {

    const {user} = useContext(UserContext);
    const [myGigs, setMyGigs] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errorData, setErrorData] = useState([])

    useEffect(() => {
        fetch(`/api/v1/gigs/${user.role_id}`)
        .then((r) => r.json())
        .then(object => setMyGigs(object))
    }, [])

    const handleEditMyGig = (gigObj) => {
        const updatedGigs = myGigs.map(myGig => (
            myGig.id === gigObj.id ? gigObj : myGig ))
          setMyGigs(updatedGigs)
    }

    const handleDeleteMyGig = (myGigId) => {
        const updatedMyGigs = myGigs.filter(myGig => myGig.id !== myGigId)
        setMyGigs(updatedMyGigs)
    }

    const handleClick = () => {
        setIsClicked(!isClicked)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const gigData = {
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate
        };
    
        fetch(`/api/v1/gigs/${user.role_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gigData)
        })
        .then((r) => r.json()
            .then((data) => {
                if (r.ok) {
                    onAddGig(data);
                    setMyGigs([...myGigs, data]);
                    setIsClicked(false);
                    setErrorData([])
                } else {
                    setErrorData(data.errors);
                }
            })
        )
    };

    return (
        <>
        <h1>Music Director Portal</h1>
        {!isClicked ? <button onClick={handleClick}>Post a New Gig</button> : null}
        {isClicked ?
        <div>
            <form onSubmit={handleSubmit}>
                Title:
                <input 
                type="text"
                name="title"
                value={title}
                onChange={handleTitleChange}
                /><br></br>
                Start Date:
                <input 
                type="date"
                name="startdate"
                value={startDate}
                onChange={handleStartDateChange}
                /><br></br>
                End Date:
                <input 
                type="date"
                name="enddate"
                value={endDate}
                onChange={handleEndDateChange}
                />
                <br></br>
                Description:
                <textarea 
                type="text"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                />
                <br></br>
                <button type="submit">Submit</button>
                </form>
        </div>
        : null
        }
        {errorData.length > 0 ? <ul style={{ color: "red" }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
        <h1>My Gigs</h1>
        {myGigs.map(myGig => 
            <Gig 
                key={myGig.id} 
                myGig={myGig} 
                onDeleteGig={onDeleteGig} 
                onDeleteMyGig={handleDeleteMyGig}
                onEditGig={onEditGig} 
                onEditMyGig={handleEditMyGig}
            />
        )}
        </>
    )
}

export default DirectorPage