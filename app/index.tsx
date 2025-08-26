import { useState,useEffect } from "react";
import {Link} from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { evaluateexp,isOp , loadDisp, saveDisp} from "@/utils/calcutils";
import { styles } from "@/utils/calcstyles";


export default function Calculator() {
  
  const [display, setDisplay] = useState("0");
  useEffect(()=>{
    const fetchData = async () => {
    const ld = await loadDisp();
    setDisplay(ld);
  };
  fetchData();
  },[]);

  useEffect(()=> {
    saveDisp(display);

  },[display]);

  // function to handle button presses
  function onButtonClick(label: string) {
    if (/[0-9]/.test(label)||["e","π","."].includes(label)) {
      setDisplay((prev) => ((prev === "0"||prev ==="Error") ? label : prev + label));
    } else if (isOp(label)&&!isOp(display[display.length-1])) {
      setDisplay((prev) => (prev + label));
      
    } else if (label === "C") {
      setDisplay("0");
    } else if (label === "⌫") {
      setDisplay((prev) => (prev.slice(0,prev.length-1)))
    }
  };

  const gridButtons = [
  "⌫",
  "7", "8", "9", "÷",
  "4", "5", "6", "×",
  "1", "2", "3", "-",
  "0", ".", "C", "+"
];

  return (
  <View style={styles.page}>
    <Link href="/scientificCalc" asChild>
      <TouchableOpacity style={styles.scientific}>
        <Text style={styles.buttonText}>
        sci 
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
        {gridButtons.map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => onButtonClick(label)}
            style={[styles.button_normal, /[÷×+\-C]/.test(label) ? styles.opButton : null]}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={[styles.eqbutton, styles.equals]} onPress={() => {setDisplay(evaluateexp(display))}}>
        <Text style={styles.equalsText}>=</Text>
      </TouchableOpacity>
    </View>
  </View>
);

}


