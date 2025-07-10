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

function getOpeningMessage(weatherMain) {
  const messages = [];
  // weather based
  const weatherMessage = dialogData.weatherDialogs[weatherMain];
  if (weatherMessage) messages.push(weatherMessage);
  // time based
  const currentHour = new Date().getHours();
  if (currentHour < 12) messages.push(dialogData.timeDialogs.Morning);
  else if (currentHour < 18) messages.push(dialogData.timeDialogs.Afternoon);
  else messages.push(dialogData.timeDialogs.Evening);
  // randoms
  const randomArray = dialogData.randomDialogs;
  const randomPick =
    randomArray[Math.floor(Math.random() * randomArray.length)];
  messages.push(randomPick);
  //Pick one Opening
  const finalMessage = messages[Math.floor(Math.random() * messages.length)];
  return finalMessage || "Let's give it a go.";
}

export default function PomoText() {
  const [pomoText, setPomoText] = useState("Let's get our groove on!");

  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeather();
        const weatherMain = data.weather[0].main;
        const openingMessage = getOpeningMessage(weatherMain);
        setPomoText(openingMessage);
      } catch (error) {
        console.error(error);
        setPomoText('Hmm...');
      }
    }
    getWeather();
  }, []);

  return <p className="pomo-text">{pomoText}</p>;
}
