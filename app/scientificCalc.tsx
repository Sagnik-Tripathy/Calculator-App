import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { evaluateexp,isOp, loadDisp, saveDisp } from "@/utils/calcutils";
import { styles } from "@/utils/calcstyles";
import { Picker } from "@react-native-picker/picker";
import { useCompute } from "@/Hooks/useCompute";

export default function ScientCalc(){
  const compute= useCompute();
  const router= useRouter();
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
        selectedValue={compute.page}
        onValueChange={(itemValue) => {
            compute.setPage(itemValue)
            if (itemValue === "normal") {
            router.push("/");
          } else if (itemValue === "currency") {
            router.push("/currencyconverter");
          } 
        }}
        style={styles.menuDrop}
        dropdownIconColor="#ffffff"
        >
            <Picker.Item label="Scientific" value="scientific" color="#000000" />
            <Picker.Item label="Normal" value="normal" color="#000000" />
            <Picker.Item label="Currency" value="currency" color="#000000" />
        
        </Picker>


    <View style={{flex:1,paddingTop:100,width:"100%"}}>
      
      <View style={styles.display}>
        <Text style={styles.displayText}>
          {compute.display}
        </Text>
      </View>
      </View>
      <View style={styles.grid}>
        {scientGridButtons.map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => compute.onButtonClick(label)}
            style={[styles.button_normal,spclStyles.scientificButtons, /[÷×+\-C]/.test(label) ? styles.opButton : null]}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={[styles.eqbutton, styles.equals]} onPress={() => {compute.setdisp(evaluateexp(compute.display))}}>
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

