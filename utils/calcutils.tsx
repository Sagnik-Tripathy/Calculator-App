// Factorial function
import AsyncStorage from "@react-native-async-storage/async-storage";
function factorial(n: number): number {
  if (n < 0) throw new Error("Factorial of negative number not defined");
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// Make factorial visible inside eval
(globalThis as any).factorial = factorial;

export function evaluateexp(exp: string): string {
  try {
    let jsready = exp
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/√(\d+(\.\d+)?|π|e)/g, (_, num) => {
        if (num === 'π') return 'Math.sqrt(Math.PI)';
    if (num === 'e') return 'Math.sqrt(Math.E)';
  return `Math.sqrt(${num})`})
  .replace(/√\(([^)]+)\)/g, (_, expr) => {
  return `Math.sqrt(${expr})`})    
      .replace(/log\(([^)]+)\)/g, "Math.log10($1)")     
      .replace(/ln\(([^)]+)\)/g, "Math.log($1)")        
      .replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)")      
      .replace(/π/g, "Math.PI")                         
      .replace(/\be\b/g, "Math.E")                      
      // NEW: factorial support for numbers or parenthesis
      .replace(/(\([^()]+\)|\d+)!/g, (match) => {
        const inner = match.slice(0, -1);
        return `factorial(${inner})`;
      });

    return eval(jsready).toString();
  } catch {
    return "Error";
  }
}

export function isOp(ex: string){
    return (["+", "-", "×", "÷","√","log","ln","!","^"].includes(ex));
}
const DISPLAY_KEY = "calc-display";
export async function saveDisp(val: string){
  try{
    await AsyncStorage.setItem(DISPLAY_KEY,val);
  } catch(e){
    console.error("Error in saving: ",e)
  }
}
export async function loadDisp(): Promise<string> {
  try{
    const val= await AsyncStorage.getItem(DISPLAY_KEY);
    return val??"0";
  }catch(e){
    console.error("Error in loading display: ",e);
    return "0";
  }
}
export type convres = {
  resu: string;
  rat: string;
};
export async function convertCurr(
  amount: string,
  base: string,
  finalcur: string
 ): Promise<convres>{
  
  const link=`https://v6.exchangerate-api.com/v6/124e7391a126ba78b3e85c8f/pair/${encodeURIComponent(base)}/${encodeURIComponent(finalcur)}/${encodeURIComponent(amount)}`;
  
  const reso=await fetch(link);

  const data=await reso.json();
  

  if(data.result==="error"){
    throw new Error("Some error occured: "+data["error-type"]);
  }
  else{
    return{resu: data.conversion_result,rat: data.conversion_rate};
  }

}


