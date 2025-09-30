import { useState,useEffect } from "react";
import { evaluateexp,isOp , loadDisp, saveDisp} from "@/utils/calcutils";


export function useCompute(){

 const [display,setdisp]=useState("0");
 const [page,setPage]= useState("scientific");
 useEffect(()=>{
     async () => {
       const ld = await loadDisp();
       setdisp(ld);
     }
   },[]);
 
   useEffect(()=> {
     saveDisp(display);
 
   },[display]);
 function onButtonClick(label: string) {
     if (/[0-9]/.test(label)||["e","π","(",")","log","ln","√","."].includes(label)) {
       setdisp((prev) => ((prev === "0"||prev==="Error") ? label : prev + label));
     } else if (isOp(label)&&!isOp(display[display.length-1])) {
       setdisp((prev) => (prev + label));
       
     } else if (label === "C") {
       setdisp("0");
     } else if (label === "⌫") {
        if(!(display==="0")){
          if(display.length===1){
          setdisp((prev)=>("0"));
        }


        else{
       setdisp((prev) => (
  prev.endsWith("log") ? prev.slice(0, -3) :
  prev.endsWith("ln") ? prev.slice(0, -2) :
  prev==="Error"||prev==="Infinity"||prev==="-Infinity"? "0":
  prev.slice(0, -1)
));
        }
     }}
   };

   return{display,setdisp,setPage,page,onButtonClick};

}