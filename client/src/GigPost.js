import React, { useState, useContext } from 'react'
import { UserContext } from './contexts/UserContext';
import './Gig.css';

function GigPost({ gig, onAddApp, onDeleteApp }) {

    const {user} = useContext(UserContext);
    const [isClicked, setIsClicked] = useState(false)
    const [message, setMessage] = useState('')

    const handleClick = () => {
        setIsClicked(!isClicked)
    }

    const handleChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = {
            gig_id: gig.id,
            message: message,
            status: "PENDING"
        }
        fetch(`/applications/${user.role_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then((r) => r.json())
        .then(object => onAddApp(object))
        .then(setIsClicked(false))
    }

    const handleCancelClick = () => {
        fetch(`/applications/${gig.app_id}`, {
            method: "DELETE"
        })
        .then(() => onDeleteApp(gig.app_id))
    }

    return (
        <div className="gig-container">
        <h3>{gig.title}</h3>
        <h3>{gig.description}</h3>
        {gig.application_status 
            ? <><h4>Application: {gig.application_status}</h4> <button onClick={handleCancelClick}>Cancel Application</button></>
            : <button onClick={handleClick}>Apply</button>}
        {isClicked ?
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="message"
                value={message}
                onChange={handleChangeMessage}
                />
                <button type="submit">Submit</button>
            </form>
        : null
        }
        </div>
    )
}

export default GigPost