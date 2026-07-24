import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessage = () => {
    setLoading(true);
    fetch('/api/message')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>React + Node Linkup</h1>
      
      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', display: 'inline-block' }}>
        {loading && <p>Fetching data from backend...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {data && (
          <div>
            <h3>Backend Response:</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007acc' }}>"{data.text}"</p>
            <small>Fetched at: {data.timestamp}</small>
          </div>
        )}
      </div>

      <div>
        <button onClick={fetchMessage} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default App;
