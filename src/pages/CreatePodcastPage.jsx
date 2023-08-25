import React from 'react';
import Header from '../components/Header';
import CreatePodcastForm from '../components/Podcast/CreatePodcastForm';



const CreatePodcastPage = () => {
  return (
    <div>
        <Header />
        <div className="input-container">
        <h1>CreatePodcast</h1>
        <CreatePodcastForm />
        </div>
    </div>
  )
}

export default CreatePodcastPage;