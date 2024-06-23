"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { formQuerry, getWeatherForecast } from "./ai"


export default function Home() {

  const [city, setCity] = useState<string>("Nowhere")
  const [descCurrent, setDescCurrent] = useState<string>("")
  const [descGoal, setDescGoal] = useState<string>("")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`)
        .then(res => {
          console.log(res.data)
          setCity(res.data.address.village);
        })
        getWeatherForecast(position.coords.latitude, position.coords.longitude).then(text => {
          console.log(text);
          setDescGoal(text);
          setDescCurrent("");
        })
    })

  }, [])
  

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
        if (descCurrent.length < descGoal.length) {
            setDescCurrent(descCurrent + descGoal[descCurrent.length]);
        }
        
    }, 75);

    //Clearing the interval
    return () => clearInterval(interval);
}, [descCurrent, descGoal]);
  

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Weather App</h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for a city"
              className="pr-10 rounded-md border-transparent focus:border-primary focus:ring-primary"
            />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-12 px-6">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="text-4xl font-bold">{city}</div>
          <div className="text-lg">Sunny</div>
          <p className="mt-4">
             {descCurrent}
          </p>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">
              <ShareIcon className="h-5 w-5 mr-2" />
              Share my weather
            </Button>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-4 px-6 text-center">
        <p>&copy; 2024 Weather App. All rights reserved.</p>
      </footer>
    </div>
  )
}
//@ts-ignore
function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

//@ts-ignore
function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}
