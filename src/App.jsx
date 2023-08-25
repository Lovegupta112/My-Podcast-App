import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import { setUser } from './slices/userSlice';
import PrivateRoutes from './components/PrivateRoutes';
import CreatePodcastPage from './pages/CreatePodcastPage';
import PodcastPage from './pages/PodcastPage';
import PodcastDetailsPage from './pages/PodcastDetailsPage';
import CreateEpisodePage from './pages/CreateEpisodePage';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubSnapShot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(setUser(
                {
                  name: userData.name,
                  email: userData.email,
                  profileImage: userData.profileImage,
                  uid: user.uid
                }
              ))
            }
          },
          (error) => {
            console.log('Error fetching user data : ', error);
          }
        );
        return () => {
          unsubSnapShot();
        }
      }
    })

    return () => {
      unsubscribeAuth();
    }
  }, [])

  return (
    <>
      <ToastContainer />
      <Routes >
        <Route path='/' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-a-podcast' element={<CreatePodcastPage />} />
          <Route path='/podcasts' element={<PodcastPage />} />
          <Route path='/podcast/:id' element={<PodcastDetailsPage />} />
          <Route path='podcast/:id/create-episode' element={<CreateEpisodePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
