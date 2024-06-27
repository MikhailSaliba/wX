"use server";

import { getWeatherData, wmoWeatherCodes } from "./weather";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';



export async function getWeatherForecast(lat: number, long: number) {
    const prompt = await formQuerry(lat, long);
    const { text } = await generateText({
        model: google('models/gemini-1.5-flash'),
        prompt: prompt,
      });
      return text;
      
}


export async function formQuerry(lat: number, long: number) {
    let weatherDescrptions = "";
    let last = -1;
    await getWeatherData(lat, long).then(weather => {
        console.log(weather)

        weather.hourly.time.forEach((time, index) => {
            if (weather.hourly.weatherCode[index] !== last) {
                //@ts-ignore
                const desc = wmoWeatherCodes[weather.hourly.weatherCode[index]];
            const temp = weather.hourly.temperature2m[index];
            weatherDescrptions += `At the time ${time.getHours()}:00 the weather will be ${desc} with a tempeture of ${Math.round(temp)} degrees Celsius.\n`;
                last = weather.hourly.weatherCode[index];
            }
            
        })
        
      });
      const prompt = `Give a description of the weather without using any weather terms such as or related to: "hot", "cold", "windy", "rainy", "specific tempature", "sky", "warm", "clouds", etc.. Make this description concise and comedic. It should be no more than 4 sentences. Use the below weather data to inform your description.\n\n${weatherDescrptions}`;
      return prompt
      

    

}