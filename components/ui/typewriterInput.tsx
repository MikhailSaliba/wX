import axios from "axios";
import * as React from "react"
import { start } from "repl";
import { getBaseDataCities } from 'offline-geocode-city'
import { CityDict } from "@/app/CityInfo";

export interface TypewriterInputProps {
  text: string;
  id: string,
  autoNext: string,
  selected: boolean,
  callBack: (current: string, next: string, lat: number, lon: number) => void;
  onChange: ()=>void;
}

export function TypewriteInput({ text, id, autoNext = "", selected, callBack, onChange }: TypewriterInputProps) {
  const [currentText, setCurrentText] = React.useState<string>("");
  const [goalText, setGoalText] = React.useState<string>(text);
  const [showCursor, setShowCursor] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<number>(0);
  const [lastType, setLastType] = React.useState<number>(0);
  const [valid, setValid] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = React.useState<number>(200);
  let lastValue = "";
  let changed = false;

  

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
      if (goalText === "" && text !== "" && !changed) {
        setGoalText(text);
        
      }
      if (selected) {
        if (currentText.length < goalText.length) {
          setShowCursor(true);
          if (count - lastType > (Math.random() * 4 + 2)) {
            setLastType(count);
            setCurrentText(currentText + goalText[currentText.length]);
            console.log( currentText + goalText[currentText.length])
            for (const [key, value] of Object.entries(CityDict)) {
                if (key.toLowerCase() === (currentText + goalText[currentText.length]).toLowerCase()) {
                   // console.log(`Does ${(currentText + goalText[currentText.length]).toLowerCase()} match ${key.toLowerCase()}`)
                  setValid(true);
                  break;
                }
              }
          }
        } else {
          if (count % 30 === 0) {
            setShowCursor(!showCursor)
          }
        }
      } else {
        setShowCursor(false);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [currentText, count, goalText, selected, showCursor, lastType]);

  const updateInputWidth = () => {
    if (inputRef.current) {
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'pre';
      span.style.font = window.getComputedStyle(inputRef.current).font;
      span.textContent = inputRef.current.value || inputRef.current.placeholder || '';
      document.body.appendChild(span);

      const newWidth = Math.min(Math.max(200, span.offsetWidth + 20), 700);
      setInputWidth(newWidth);

      document.body.removeChild(span);
    }
  };


  React.useEffect(() => {
    updateInputWidth();
  }, [currentText]);


  return (
    <div className="">
      <input 
        ref={inputRef}
        className={`flex flex-col md:flex-row order border-foreground bg-card ${selected?"border-b":""} outline-none ${valid ? "text-ring" : ""}`}
        style={{ width: `${inputWidth}px` }}
        value={currentText} 
        onChange={e => {
          setValid(false);
          if (e.target.value !== lastValue) {
            changed = true;
            onChange();
            setGoalText(e.target.value);
            lastValue = e.target.value;
          }
          for (const [key, value] of Object.entries(CityDict)) {
            if (key.toLowerCase() === e.target.value.toLowerCase()) {
              setValid(true);
              break;
            }
          }
          setCurrentText(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === "Enter" && valid) {
            for (const [key, value] of Object.entries(CityDict)) {
              if (key.toLowerCase() === currentText.toLowerCase()) {
                callBack(id, autoNext, value.lat, value.lon);
                //@ts-ignore
                inputRef.current.blur();
                
                
                break;
              }
            }
          }
        }}
        onClick={e=> {
            changed = true;
            onChange();
        }}
      />
    </div>
  )
}