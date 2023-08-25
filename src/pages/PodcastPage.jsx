import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcasts } from '../slices/podcastSlice';
import { db } from '../firebase';
import PodcastCard from '../components/Podcast/PodcastCard';
import InputComponent from '../components/Input';


const PodcastPage = () => {

  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcasts.podcasts);


  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'podcasts')),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastData));
      },
      (error) => {
        console.log('Error fetching podcasts : ', error);
      }
    );

    return () => {
      unsubscribe();
    }
  }, [dispatch])

  var filterPodcasts = podcasts?.filter((podcast) =>
    podcast.title.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (
    <>
      <Header />
      <div className="input-container">
        <h1>Discover Podcasts</h1>
        <InputComponent type='text' value={search} placeholder='Search Your Favorite Podcasts By Title...' setState={setSearch} />

        <div className="podcast-container">
          {filterPodcasts?.length > 0
            ? (filterPodcasts.map((podcast) => {
              return <PodcastCard key={podcast.id} id={podcast.id} title={podcast.title} displayImage={podcast.displayImage} />
            }))
            : <p>{search ? 'Podcast Not Found !' : ' Currently No Podcast Available !'}</p>}
        </div>
      </div>
    </>
  )
}

export default PodcastPage;