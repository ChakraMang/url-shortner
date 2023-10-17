import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urlCode, setUrlCode] = useState('');
  const [flag, setFlag] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);


  useEffect(() => {
    const circle = document.querySelector('.circle');

    const followMouse = (e) => {
      circle.style.left = e.clientX + 'px';
      circle.style.top = e.clientY + 'px';

      // Check if the mouse is over an input field
      const inputFields = document.querySelectorAll('.url-input');
      const isOverInputField = Array.from(inputFields).some((input) =>
        input.contains(e.target)
      );

      setIsOverInput(isOverInputField);
    };

    window.addEventListener('mousemove', followMouse);

    return () => {
      window.removeEventListener('mousemove', followMouse);
    };
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);

    try {
      const response = await axios.post('http://localhost:5000/create', { longUrl, urlCode });
      if (response.data && response.data.status === true) {
        setShortUrl(response.data.data.shortUrl);
      }
    } catch (error) {
      console.error('API request failed', error);
    }
  };

  const handleUrlCode = async (e) => {
    e.preventDefault();
    setUrlCode(e.target.value)
    try {
      const urlCode = e.target.value;
      const response = await axios.post('http://localhost:5000/checkUrlCode', {urlCode})
      if(response.data.status === false && response.status === 200){
        setFlag(true);
      }else if (response.data.status === true){
        setFlag(false);
      }
    } catch (error) {
      console.error('API request failed', error)
    }
  }
  const openShortUrl = () => {
    setLongUrl('');
    setUrlCode('')
    window.open(shortUrl, '_blank');
  };

  return (
    <div className="home-container">
      <div className="circle-container">
        <div className="circle"></div>
      </div>

    <div className="box-container">
      <h1 className="title">URL Shortener</h1>
      <form className="url-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a URL"
          className="url-input"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter a Url code for your URL"
          className="url-input"
          value={urlCode}
          onChange={(e) => handleUrlCode(e)}
        />
        { flag && <span className="error-text">
          ! Url code is already in USE.
        </span>}
        <button type="submit" className="shorten-button">
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div className="short-url-container">
          <p className="short-url-label">Short URL:</p>
          <p className="short-url" onClick={openShortUrl}>
            {shortUrl}
          </p>
        </div>
      )}
    </div>
    </div>
  );
}

export default Home;