import { useState } from 'react';
import './App.css';
import Result from './components/result/Result';
import Socials from './components/socials/Socials';
import { axiosInstance } from './config';



function App() {

  const [shortUrl, setShortUrl] = useState("");
  const [url, setUrl] = useState("");

  const submit = async () => {
    const result = await axiosInstance.post('/shorten', { longUrl: url })
      .catch(err => {
        if (err.response.status === 400) {
          window.alert(err.response.data.message);
        }
      });

    setShortUrl(result.data.data)
    setUrl("")
  }

  return (
    <div className='container'>
      <h1>URL Shortner</h1>
      <div className='input_container'>
        <input type='text' placeholder='longUrl' value={url} onChange={e => setUrl(e.target.value)} />
        <button type='submit' onClick={submit}>Submit</button>
      </div>
      {
        shortUrl && <Result result={shortUrl} />
      }
      <Socials />

    </div>
  );
}

export default App;
