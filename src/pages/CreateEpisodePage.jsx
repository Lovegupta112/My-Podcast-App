import React from 'react'
import Header from '../components/Header'
import CreateEpisode from '../components/Episodes/CreateEpisodeForm'

const CreateEpisodePage = () => {


  return (
   <>
   <Header />
   <div className="input-container">
      <h1>Create Episode</h1>
       <CreateEpisode />
   </div>
   </>
  )
}

export default CreateEpisodePage;