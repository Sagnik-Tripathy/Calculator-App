import { useState,useEffect } from "react";
import {Link,router,useRouter} from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { evaluateexp,isOp , loadDisp, saveDisp} from "@/utils/calcutils";
import { styles } from "@/utils/calcstyles";
import { Picker } from "@react-native-picker/picker";

export default function Calculator() {
  
  const [display, setDisplay] = useState("0");
  const [page,setPage]= useState("Currency");
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
    if (/[0-9]/.test(label)||["."].includes(label)) {
      setDisplay((prev) => ((prev === "0"||prev ==="Error") ? label : prev + label));
    } else if (isOp(label)&&!isOp(display[display.length-1])) {
      setDisplay((prev) => (prev + label));
      
    } else if (label === "C") {
      setDisplay("0");
    } else if (label === "⌫") {
      if(!(display==="0")){
        if(display.length===1){
          setDisplay((prev)=>("0"));
        }
        else{
      setDisplay((prev) => (prev==="Error"||prev==="Infinity"||prev==="-Infinity" ? "0" : prev.slice(0,prev.length-1)));
        }
      }
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
    <Picker 
        selectedValue={page}
        onValueChange={(itemValue) => {
            setPage(itemValue)
            if (itemValue === "currency") {
            router.push("/currencyconverter");
          } else if (itemValue === "scientific") {
            router.push("/scientificCalc");
          } 
        }}
        style={styles.menuDrop}
        dropdownIconColor="#ffffff"
        >
            <Picker.Item label="Currency" value="currency" color="#000000" />
            <Picker.Item label="Scientific" value="scientific" color="#000000" />
        
        </Picker>
      
    
    <View style={{flex:1,paddingTop:100,width:"100%"}}>
      
      <View style={styles.display}>
        <Text style={styles.displayText}>
          {display}
        </Text>
      </View>
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
);

}


