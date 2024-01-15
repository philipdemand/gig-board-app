import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from './contexts/UserContext';
import Gig from './Gig'

function DirectorPage({ onAddGig, onDeleteGig, onEditGig }) {

    const {user} = useContext(UserContext);
    const [myGigs, setMyGigs] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        fetch(`/gigs/${user.role_id}`)
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const gigData = {
            title: title,
            description: description
        }
        fetch(`/gigs/${user.role_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gigData)
        })
        .then((r) => r.json())
        .then(gigObj => {
          onAddGig(gigObj);
          setMyGigs([...myGigs, gigObj]);
        });
    }

    return (
        <>
        <h1>Director Page</h1>
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
                />
                <br></br>
                Description:
                <input 
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
        <h1>{user.username}'s Gigs</h1>
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