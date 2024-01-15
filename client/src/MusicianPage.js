import React, { useState, useEffect, useContext } from 'react'
import GigPost from './GigPost'
import { UserContext } from './contexts/UserContext';

function MusicianPage({ gigs }) {

    const {user} = useContext(UserContext);
    const [myApps, setMyApps] = useState([])

    useEffect(() => {
        fetch(`/myapps/${user.role_id}`)
        .then((r) => r.json())
        .then(object => setMyApps(object))
    }, [])

    const handleAddApp = (appObject) => {
        setMyApps([...myApps, appObject])
    }

    const handleDeleteApp = (appId) => {
        const updatedApps = myApps.filter(app => app.id !== appId)
        setMyApps(updatedApps)
    }

    const gigsWithStatusAndAppId = gigs.map(gig => {
        const application = myApps.find(app => app.gig_id === gig.id);
        const applicationStatus = application ? application.status : null;
        const appId = application ? application.id : null;
      
        return { ...gig, application_status: applicationStatus, app_id: appId };
      });

    return (
        <>
        <h1>Musician Page</h1>
        <h2>Gigs</h2>
        {gigsWithStatusAndAppId.map(gig => <GigPost key={gig.id} gig={gig} onAddApp={handleAddApp} onDeleteApp={handleDeleteApp}/>)}
        </>
    )
}

export default MusicianPage