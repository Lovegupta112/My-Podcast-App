import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header'
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button.jsx';
import Loader from '../components/Loader';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { setPodcasts } from '../slices/podcastSlice';
import PodcastCard from '../components/Podcast/PodcastCard';
import InputComponent from '../components/Input';
import { setUser } from '../slices/userSlice';



const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const podcasts = useSelector((state) => state.podcasts.podcasts);

  // Add a loading state
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check if user data is available
    if (!user) {
      setLoading(false); // Set loading to false if user data is not available
      return;
    }
    setName(user.name);
    setEmail(user.email);

    // Load user data
    const q = query(collection(db, 'podcasts'), where('createdBy', '==', user.uid))
    const unsubscribe = onSnapshot(q,
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastData));
        setLoading(false); // Set loading to false once data is fetched
      },
      (error) => {
        console.log('Error fetching podcasts!', error);
        setLoading(false); // Set loading to false on error
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user, dispatch]);

  function handleLogout() {
    signOut(auth).then(() => {
      toast.success('User Logged Out !');
    })
      .catch((error) => {
        toast.error(error.message);
      })
  }

  async function editProfile() {

    //saving edited user's details in firestore database--
    await updateDoc(doc(db, 'users', user.uid), {
      name,
      email,
      profileImage: user.profileImage,
      uid: user.uid
    })

    //saving data into redux and calling action 
    dispatch(setUser({
      name,
      email,
      profileImage: user.profileImage,
      uid: user.uid,
    }))

    toast.success('User Information has been Updated SuccessFully!');
  }



  return (
    <>
      <Header />
      <div className="input-container">
        <div className="heading-container">
          <h1>Profile Page</h1>
          <Button isDisabled={loading} text="Logout" onClick={handleLogout} />
        </div>
        <div className="profile-container">
          {loading ? (
            <p>Loading...</p>
          ) : user ? ( // Check if user exists
            <>
              <div className='profile-info'>
                <div className="left-section">
                  {/* Display user data */}
                  <div className='profile-section'>
                    <h2>Name: </h2>
                    {/* {user.name} */}
                    <InputComponent type="text" value={name} placeholder="Enter Your Name" setState={setName} />
                  </div>
                  <div className='profile-section'>
                    <h2>Email: </h2>
                    {/* {user.email} */}
                    <InputComponent type="email" value={email} placeholder="Enter Your Email" setState={setEmail} />
                  </div>
                </div>
                <div className="right-section">
                  <div className="profile-image">
                    <img src={user.profileImage} alt={`${user.name}-pic`} />
                  </div>
                </div>
              </div>
              <div className="edit-profile-section">
                <Button text='Edit Profile' onClick={editProfile} />
              </div>
            </>
          ) : (
            <p>User not found</p>
          )}
        </div>
        <div className="podcast-container">
          <h1>My Podcast</h1>
          <div className='podcasts'>
            {podcasts?.length > 0 ? (
              podcasts.map((podcast) => {
                return <PodcastCard key={podcast.id} id={podcast.id} title={podcast.title} displayImage={podcast.displayImage} />
              }
              ))
              : <p>Currently No Podcast Available !</p>}
          </div>
        </div>

      </div>

    </>
  );
};

export default Profile;



