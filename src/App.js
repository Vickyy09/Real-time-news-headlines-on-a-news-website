import React, { useState, useEffect } from 'react';
import './App.css';
import dummyData from './Dummydata';

function App() {
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewsHeadlines();
  }, []);

  const fetchNewsHeadlines = async () => {
    try {                                     //used a try-catch block to handle API request errors
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=0c1200bc2a05409b8caff5d5e40f9957&pageSize=6'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch headlines');
      }
      const data = await response.json();
      setHeadlines(data.articles);
      setError(null); // Resetting error state on successful fetch
    } catch (error) {
      setError('Failed to fetch headlines. Please try again later.');
    }
  };

  const openNewPage = () => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>News</title></head><body><h1>Latest News Headlines</h1>'); //fetched data
    newWindow.document.write('<ul>');
    headlines.forEach((article) => {
      newWindow.document.write(`<li><strong>${article.title}</strong></li>`);
      newWindow.document.write(`<p>Source: ${article.source.name}</p>`);
      newWindow.document.write(`<p>Published: ${new Date(article.publishedAt).toLocaleString()}</p>`);
    });
    newWindow.document.write('</ul></body></html>');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>News Website</h1>
         <button className="fetch-news-btn" onClick={openNewPage}>Latest News</button>    {/*button to show lastest headlines */}
      </header>
      <main>
        {error ? (
          <div className="error-message">{error}</div>          // error message display
        ) : (
          <div className="dummy-news">
            <h3>Today's News</h3>
            <ul>
              {dummyData.map((item, index) => (
                <li key={item.id}>
                  <div className="news-item">
                    <img className="news-image" src={item.imageUrl} alt={item.title} />
                    <div className="news-content">
                      <p><strong>{item.title}</strong></p>
                      <p>{item.description}</p>
                      <p>{item.time}</p>
                    </div>
                  </div>
                  {index !== dummyData.length - 1 && <hr className="separator" />} {/* Adding separator unless it's the last item */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 News Website</p>
      </footer>
    </div>
  );
}

export default App;
