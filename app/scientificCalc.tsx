import { useState, useEffect } from "react";
import { Link, router, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { evaluateexp,isOp, loadDisp, saveDisp } from "@/utils/calcutils";
import { styles } from "@/utils/calcstyles";
import { Picker } from "@react-native-picker/picker";

export default function ScientCalc(){
 const [display,setdisp]=useState("0");
 const [page,setPage]= useState("Normal");
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
    <Picker 
        selectedValue={page}
        onValueChange={(itemValue) => {
            setPage(itemValue)
            if (itemValue === "normal") {
            router.push("/");
          } else if (itemValue === "currency") {
            router.push("/currencyconverter");
          } 
        }}
        style={styles.menuDrop}
        dropdownIconColor="#ffffff"
        >
            <Picker.Item label="Normal" value="normal" color="#000000" />
            <Picker.Item label="Currency" value="currency" color="#000000" />
        
        </Picker>


    <View style={{flex:1,paddingTop:100,width:"100%"}}>
      
      <View style={styles.display}>
        <Text style={styles.displayText}>
          {display}
        </Text>
      </View>
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
);



}






const spclStyles=StyleSheet.create({
    scientificButtons: {
        width:"18%",

    }




})

