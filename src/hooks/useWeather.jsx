import { useState, useEffect } from 'react';

function useWeather(lat, lon) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    async function fetchWeather() {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw new Error('Weather data not found');
        console.log('Got weather!: ', data);
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
}

export default useWeather;
