import { useState } from 'react';
import './App.css';
import Result from './components/result/Result';
import Socials from './components/socials/Socials';



function App() {

  const [shortUrl, setShortUrl] = useState("");
  const [url, setUrl] = useState("");

  const submit = async () => {
    const data = await fetch('https://urlshortnerdg.herokuapp.com/url/shorten', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ longUrl: url })
    })
    const result = await data.json()
    if (data.status === 400) {
      window.alert(result.message)
    }
    setShortUrl(result)
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
        shortUrl.data && <Result result={shortUrl}/>
      }
      <Socials/>
      
    </div>
  );
}

export default App;
