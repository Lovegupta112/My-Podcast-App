import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Header from '../components/Header'
import Button from '../components/Button.jsx';
import EpisodeDetails from '../components/Episodes/EpisodeDetails';
import AudioPlayer from '../components/AudioPlayer';

const PodcastDetailsPage = () => {


  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState('');

  const navigate = useNavigate();

  console.log('Id: ', id);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id])

  async function getData() {

    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case
        toast.error("No such document!");
        navigate('/podcasts');
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(() => {

    const unsubscribe = onSnapshot(
      query(collection(db, 'podcasts', id, 'episodes')),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      }
    )

    return () => {
      unsubscribe();
    }
  }, [id])



  function playAudio(file) {
    console.log('playing : ' + file);
    setPlayingFile(file);
  }

  return (
    <>
      <Header />
      <div className="input-container">
        {podcast.id &&
          <div className='podcastDetails'>
            <div className="heading-section">
              <h1 className='podcast-heading'>{podcast.title}</h1>
              {
                podcast.createdBy == auth.currentUser.uid &&
                <Button text='Create Episodes'
                  onClick={() => navigate(`/podcast/${id}/create-episode`)}
                  style={{ width: '200px' }}
                />
              }
            </div>
            <div className="image">
              <img src={podcast.bannerImage} alt={podcast.title} />
            </div>
            <p className='podcast-description'>

              {podcast.desc}
            </p>
            <h2 className='podcast-heading'>Episodes</h2>
            <div className='episodes-container'>
              {
                episodes.length > 0
                  ? (<>
                    {episodes.map((episode, index) => {
                      return <EpisodeDetails key={episode.title} index={index + 1} title={episode.title} desc={episode.desc}
                        audioFile={episode.audioFile} onClick={(file) => playAudio(file)}
                      />
                    })}</>)
                  : 'No Episodes !'
              }
            </div>
          </div>
        }
        {playingFile && <AudioPlayer audioSrc={playingFile}
          image={podcast.displayImage}
        />}
      </div>
    </>
  )
}

export default PodcastDetailsPage;