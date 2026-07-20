import useWeather from '@hooks/useWeather';
import useGeoLocation from '@hooks/useGeoLocation';

function WeatherTest() {
  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useGeoLocation();

  const {
    weather,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather(location?.lat, location?.lon);

  if (locationLoading || weatherLoading) return <div>Loading weather...</div>;
  if (locationError || weatherError)
    return <div>Error: {locationError || weatherError}</div>;

  const {
    name,
    main: { temp, feels_like: feelsLike, humidity },
    weather: [{ main: basicWeather, icon }],
  } = weather;

  return (
    <div>
      <h1>{name} Weather</h1>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />

      <p>Temp: {temp}°C</p>
      <p>Feels Like: {feelsLike}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Description: {basicWeather}</p>
    </div>
  );
}

export default WeatherTest;
