import { useState, useEffect } from 'react'
import GoogleMap from './components/Map/GoogleMap'
import Header from './components/Header/Header'
import LeftPanel from './components/LeftPanel/LeftPanel'
import './App.css'

function App() {
  const [selectedAOI, setSelectedAOI] = useState("ISLD");
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const onAOIChange = (aoi) => {
    setSelectedAOI(aoi);
  }
  
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/aois/${selectedAOI}/statistics`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch statistics (${response.status})`
          );
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Failed to fetch statistics"
          );
        }

        setStatistics(result.data);
      } catch (error) {
        console.error("Statistics error:", error);
        setStatistics(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [API_URL, selectedAOI]);

  return (
    <>
      <div className='main-container'>
        <div className='header-app'>
          <Header />
        </div>

        <div className='parent-map-leftpanel'>
          <div className='left-panel-container'>
            <LeftPanel
            selectedAOI={selectedAOI}
            onAOIChange={onAOIChange}
            statistics={statistics}
            loading={loading}
            error={error}
            />
          </div>
          <div className='map-container'>
            <GoogleMap selectedAOI={selectedAOI} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
