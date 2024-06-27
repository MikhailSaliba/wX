import * as React from "react"
import { start } from "repl";


export interface TypewriterBoxProps {
  text: string;
  id: string,
  autoNext: string,
  selected: boolean,
  callBack: (current : string, next: string)=>void;
}



export function TypewriterBox({ text, id, autoNext = "", selected, callBack }: TypewriterBoxProps) {
    const [currentText, setCurrentText] = React.useState<string>("");
    //const [goalText, setGoalText] = React.useState<string>(text);
    const [showCursor, setShowCursor] = React.useState<boolean>(false);
    const [count, setCount] = React.useState<number>(0);
    const [lastType, setLastType] = React.useState<number>(0);
    React.useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {

            setCount(count + 1);
            
            if (selected) {
                
                if (currentText.length < text.length) {
                    setShowCursor(true);
                    if (count-lastType > (Math.random()*3+1)) {
                        setLastType(count);
                        setCurrentText(currentText + text[currentText.length]);
                    }
                } else {
                    
                   
                    callBack(id, autoNext);
                    if (count % 30 === 0) {
                        setShowCursor(!showCursor)
                        
                    }
                }
            } else {
                if (currentText.length > text.length){
                    if (count-lastType > (Math.random()*2+1)) {
                        setLastType(count);
                        setCurrentText(currentText.substring(0, currentText.length-2));
                    }
                }
                setShowCursor(false);
            }
        }, 10);
    
        //Clearing the interval
        return () => clearInterval(interval);
    }, [currentText, count, selected, showCursor, lastType]);
      


  return (
    <div className="flex flex-row items-center">
    <p>
       
    </p>
{currentText}
    </div>
    
  )
}
// {currentText + (showCursor?"|":"")}