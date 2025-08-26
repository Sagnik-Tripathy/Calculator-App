// Factorial function
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
      .replace(/√(\d+(\.\d+)?)/g, (match, num) => {
  return `Math.sqrt(${num})`})
  .replace(/√\(([^)]+)\)/g, (match, expr) => {
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