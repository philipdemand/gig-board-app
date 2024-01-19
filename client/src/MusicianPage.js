import React, { useState, useEffect, useContext } from 'react';
import GigPost from './GigPost';
import { UserContext } from './contexts/UserContext';

function MusicianPage({ gigs }) {
  const { user } = useContext(UserContext);
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/v1/myapps/${user.role_id}`)
//       .then((r) => r.json())
//       .then((object) => {
//         setMyApps(object);
//         setLoading(false)
//       });
//   }, [user.role_id])

useEffect(() => {
    if (user && user.role_id) {
      fetch(`/api/v1/myapps/${user.role_id}`)
        .then((r) => r.json())
        .then((object) => {
          setMyApps(object);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } else {
      setMyApps([]);
      setLoading(false);
    }
  }, [user]);

  const handleAddApp = (appObject) => {
    setMyApps([...myApps, appObject]);
  };

  const handleDeleteApp = (appId) => {
    const updatedApps = myApps.filter((app) => app.id !== appId);
    setMyApps(updatedApps);
  };

  const gigsWithStatusAndAppId = Array.isArray(gigs)
    ? gigs.map((gig) => {
        const application = myApps.find((app) => app.gig_id === gig.id);
        const applicationStatus = application ? application.status : null;
        const appId = application ? application.id : null;

        return { ...gig, application_status: applicationStatus, app_id: appId };
      })
    : [];

  return (
    <>
      <h1>Musician Portal</h1>
      <h2>Gigs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        gigsWithStatusAndAppId.map((gig) => (
          <GigPost
            key={gig.id}
            gig={gig}
            onAddApp={handleAddApp}
            onDeleteApp={handleDeleteApp}
          />
        ))
      )}
    </>
  );
}

export default MusicianPage;

// import React, { useState, useEffect, useContext } from 'react'
// import GigPost from './GigPost'
// import { UserContext } from './contexts/UserContext';

// function MusicianPage({ gigs }) {

//     const {user} = useContext(UserContext);
//     const [myApps, setMyApps] = useState([])

//     useEffect(() => {
//         fetch(`/api/v1/myapps/${user.role_id}`)
//         .then((r) => r.json())
//         .then(object => setMyApps(object))
//     }, [])

//     const handleAddApp = (appObject) => {
//         setMyApps([...myApps, appObject])
//     }

//     const handleDeleteApp = (appId) => {
//         const updatedApps = myApps.filter(app => app.id !== appId)
//         setMyApps(updatedApps)
//     }

//     const gigsWithStatusAndAppId = Array.isArray(gigs)
//     ? gigs.map((gig) => {
//         const application = myApps.find((app) => app.gig_id === gig.id);
//         const applicationStatus = application ? application.status : null;
//         const appId = application ? application.id : null;

//         return { ...gig, application_status: applicationStatus, app_id: appId };
//       })
//     : [];

//     return (
//         <>
//         <h1>Musician Portal</h1>
//         <h2>Gigs</h2>
//         {gigsWithStatusAndAppId.map(gig => <GigPost key={gig.id} gig={gig} onAddApp={handleAddApp} onDeleteApp={handleDeleteApp}/>)}
//         </>
//     )
// }

// export default MusicianPage