import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../../Input';
import FileInput from '../../Input/FileInput';
import Button from '../../Button.jsx/index.jsx';
import { toast } from 'react-toastify';
import {auth, db, storage} from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const CreateEpisode = () => {

  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [audioFile, setAudioFile] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function audioFileHandler(file) {
    setAudioFile(file);
  }

  async function handleSubmit() {

    setLoading(true);
    if (!title || !desc || !audioFile) {
      toast.error('Please Fill All the Fields !');
      setLoading(false);
      return;
    }
    if (id) {
      try {
        const audioRef=ref(
          storage,`podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef,audioFile);
        const audioUrl=await getDownloadURL(audioRef);
        const episodeData={
           title,
           desc,
           audioFile:audioUrl
        }

        await addDoc(collection(db,'podcasts',id,'episodes'),episodeData);
        toast.success('Episode Created SuccessFully !');
        setLoading(false);
        navigate(`/podcast/${id}`);
        setTitle('');
        setDesc('');
        setAudioFile('');

      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  }


  return (

    <div className='main'>
      <section>
        <InputComponent type='text' value={title} setState={setTitle} placeholder='Title Here...' />
      </section>
      <section>
        <InputComponent type='text' value={desc} setState={setDesc} placeholder='Description Here...' />
      </section>
      <section>
        <FileInput accept='audio/*' id='audio-file-input' placeholder='Upload Audio File' fileHandler={audioFileHandler} />
      </section>
      <Button text='Create Episode' isDisabled={loading} onClick={handleSubmit} />
    </div>
  )
}

export default CreateEpisode;