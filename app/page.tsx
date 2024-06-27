"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { formQuerry, getWeatherForecast } from "./ai"
import { TypewriterBox } from "@/components/ui/typewriterBox"
import { TypewriteInput } from "@/components/ui/typewriterInput"
import { ModeToggle } from "@/components/ui/modetoggle"
import { CityDict } from "@/app/CityInfo";


export default function Home() {

  const [city, setCity] = useState<string>("")
  const [date, setDate] = useState<string>( new Date().toLocaleDateString('en-US'))
  const [forecast, setForecast] = useState<string>("")
  const [writerSelection, setWriterSelection] = useState({
    intro: true,
    place: false,
    date: false,
    report: false,
    share: false,
    copyright: false
  });

  const updateSelection = useCallback((current: string, next : string) => {
    setTimeout(()=>{
      if (next !== "") {
        let newValues = structuredClone(writerSelection);
  
        newValues[current] = false;
        newValues[next] = true;
       setWriterSelection(newValues)
      }
    }, Math.random()*500 + 500)
    
  }, [writerSelection]);


  
  const updateSelectionInput = useCallback(async (current: string, next : string, lat: number, lon: number) => {
    const text = await getWeatherForecast(lat, lon);
      console.log(text);
      setForecast(text)
      console.log(forecast)
      if (next !== "") {
        let newValues = structuredClone(writerSelection);
  
        newValues[current] = false;
        newValues[next] = true;
       setWriterSelection(newValues)
      }
    }, [forecast, writerSelection]);


    const  inputChange = () => {
      if (forecast !== "") {
        setForecast("");
        setWriterSelection({
          intro: false,
          place: true,
          date: false,
          report: false,
          share: false,
          copyright: false
        });
      }
      
      console.log("test")
    }

  


  useEffect(() => {
    console.log("Asking for position")
  navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      axios.get(`https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&api_key=${process.env.NEXT_PUBLIC_MAPS_API}`)
        .then(res => {
          console.log(res.data.address.city)
          //CityDict.push({(res.data.address.city): {lat: (position.coords.latitude), lon: (position.coords.longitude)}})
          //CityDict[ res.data.address.city] = {lat: (position.coords.latitude), lon: (position.coords.longitude)}};
          //console.log(CityDict.push(newEntry))
          setCity(res.data.address.city);
        })
       
    })

    },[city]);

  

  
  //   navigator.geolocation.getCurrentPosition(position => {
  //     console.log(position)
  //     axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`)
  //       .then(res => {
  //         console.log(res.data)
  //         setCity(res.data.address.village);
  //       })
  //       getWeatherForecast(position.coords.latitude, position.coords.longitude).then(text => {
  //         console.log(text);
  //         setForecast(text)
  //       })
  //   })

  // }, [forecast])




  

  return (
    
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Weather App</h1>
          <ModeToggle />
          
        </div>
      </header>
      <main className="flex-1 container mx-auto py-12 px-6">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row text-4xl font-bold order-1">
          <TypewriterBox text={"It looks like you're in\xa0"} selected={writerSelection["intro"]} id="intro" autoNext="place" callBack={updateSelection} />
          <TypewriteInput text={city} selected={writerSelection["place"]} id="place" autoNext="date" callBack={updateSelectionInput} onChange={inputChange} />
          </div>
            
          <div className="text-lg"><TypewriterBox text={date} selected={writerSelection["date"]} id="date" autoNext="report" callBack={updateSelection} /></div>
          <div className="mt-4">
          <TypewriterBox text={forecast} selected={writerSelection["report"]} id="report" autoNext="share" callBack={updateSelection} />
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="dynamicIcon"
            initialIcon={ShareIcon}
            alternateIcon={EnterIcon}
            onCallback={updateSelection}>
              <TypewriterBox text="Share My Weather" selected={writerSelection["share"]} id="share" autoNext="copyright" callBack={updateSelection}  />
            </Button>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-4 px-6 text-center">
        <TypewriterBox text="2024 Weather App. All rights reserved." selected={writerSelection["copyright"]} id="copyright" autoNext="" callBack={updateSelection}  />
      </footer>
    </div>
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

function EnterIcon(props) {
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
      <path d="M11 19l-7-7 7-7M4 12h16" />
    </svg>
  )
}
