import { useState } from "react";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { evaluateexp,isOp } from "@/utils/calcutils";
import { styles } from "@/utils/calcstyles";

export default function ScientCalc(){
 const [display,setdisp]=useState("0");
 function onButtonClick(label: string) {
     if (/[0-9]/.test(label)||["e","π","(",")","log","ln","√"].includes(label)) {
       setdisp((prev) => ((prev === "0"||prev==="Error") ? label : prev + label));
     } else if (isOp(label)&&!isOp(display[display.length-1])) {
       setdisp((prev) => (prev + label));
       
     } else if (label === "C") {
       setdisp("0");
     } else if (label === "⌫") {
        
       setdisp((prev) => (
  prev.endsWith("log") ? prev.slice(0, -3) :
  prev.endsWith("ln") ? prev.slice(0, -2) :
  prev.slice(0, -1)
));
     }
   };
   const scientGridButtons = [
  "log","ln","(",")","⌫",
  "!","7", "8", "9", "÷",
  "^","4", "5", "6", "×",
  "√","1", "2", "3", "-",
  "π","0", ".", "C", "+",
  "e"
];

return (
  <View style={styles.page}>
    <Link href="/" asChild>
      <TouchableOpacity style={styles.scientific}>
        <Text style={styles.buttonText}>
        norm 
        </Text>
      </TouchableOpacity>
      </Link>
    <View style={styles.calculator}>
      
      <View style={styles.display}>
        <Text style={styles.displayText}>
          {display}
        </Text>
      </View>
      <View style={styles.grid}>
        {scientGridButtons.map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => onButtonClick(label)}
            style={[styles.button_normal,spclStyles.scientificButtons, /[÷×+\-C]/.test(label) ? styles.opButton : null]}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={[styles.eqbutton, styles.equals]} onPress={() => {setdisp(evaluateexp(display))}}>
        <Text style={styles.equalsText}>=</Text>
      </TouchableOpacity>
    </View>
  </View>
);



}






const spclStyles=StyleSheet.create({
    scientificButtons: {
        width:"18%",

    }




})

