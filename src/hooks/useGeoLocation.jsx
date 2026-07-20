import { useState, useEffect } from 'react';

function useGeoLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSuccess = ({ coords: { latitude: lat, longitude: lon } }) => {
      setLocation({ lat, lon });
      setLoading(false);
    };
    const handleError = (err) => {
      setError(err.message);
      setLoading(false);
    };
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, loading, error };
}

export default useGeoLocation;
