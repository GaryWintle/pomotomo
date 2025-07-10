import { useState, useEffect } from 'react';
import dialogData from './data/dialog.json';

const API_KEY = 'c63466566a94eed443aa24282e402241';
const CITY = 'Osaka, jp';

async function fetchWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error('Failed to fetch weather');
  return await response.json();
}

export default function PomoText() {
  const [pomoText, setPomoText] = useState("Let's get our groove on!");

  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeather();
        const weatherMain = data.weather[0].main;
        const message =
          dialogData.weatherDialogs[weatherMain] ||
          "Can you see outside? Ah well, let's get started!";
        setPomoText(message);
      } catch (error) {
        console.error(error);
        setPomoText('Hmm...');
      }
    }
    getWeather();
  }, []);

  return <p className="pomo-text">{pomoText}</p>;
}
