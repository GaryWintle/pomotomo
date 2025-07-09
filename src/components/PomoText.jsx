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

function replaceText(text, replacements) {
  let result = text;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(key, value);
  }
  const outputText = result.charAt(0).toUpperCase() + result.slice(1);
  return outputText;
}

export default function PomoText() {
  const [weather, setWeather] = useState(null);
  const [pomoText, setPomoText] = useState({
    text: 'Hmm...',
    mood: '',
  });

  useEffect(() => {
    async function getWeatherAndDialog() {
      try {
        const data = await fetchWeather();
        setWeather(data);
        console.log('Osaka weather', data);

        const weatherMain = data.weather[0].description;

        const city = data.name;
        const temp = Math.round(data.main.temp);
        const tempFeelsLike = Math.round(data.main.feels_like);
        const dialogRule = dialogData.onWeatherUpdate.find(
          (d) => d.condition.weather
        );

        let text = dialogRule.text;

        const replacements = {
          '{{city}}': city,
          '{{temp}}': temp,
          '{{tempFeel}}': tempFeelsLike,
          '{{weather}}': weatherMain,
        };

        text = replaceText(text, replacements);

        setPomoText({ text });
      } catch (e) {
        console.error(e);
        setPomoText({
          text: "Let's getting going, add your first task!",
          mood: 'neutral',
        });
      }
    }

    getWeatherAndDialog();
  }, []);

  return <p className="pomo-text">{pomoText.text}</p>;
}
