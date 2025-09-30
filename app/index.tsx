import {useRouter} from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { evaluateexp} from "@/utils/calcutils";
import { styles } from "@/utils/calcstyles";
import { Picker } from "@react-native-picker/picker";
import { useCompute } from "@/Hooks/useCompute";

export default function Calculator() {
  const compute= useCompute();
  const router= useRouter();

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
        selectedValue={compute.page}
        onValueChange={(itemValue) => {
            compute.setPage(itemValue)
            if (itemValue === "currency") {
            router.push("/currencyconverter");
          } else if (itemValue === "scientific") {
            router.push("/scientificCalc");
          } 
        }}
        style={styles.menuDrop}
        dropdownIconColor="#ffffff"
        >
            <Picker.Item label="Normal" value="normal" color="#000000" />
            <Picker.Item label="Currency" value="currency" color="#000000" />
            <Picker.Item label="Scientific" value="scientific" color="#000000" />
        
        </Picker>
      
    
    <View style={{flex:1,paddingTop:100,width:"100%"}}>
      
      <View style={styles.display}>
        <Text style={styles.displayText}>
          {compute.display}
        </Text>
      </View>
      </View>
      <View style={styles.grid}>
        {gridButtons.map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => compute.onButtonClick(label)}
            style={[styles.button_normal, /[÷×+\-C]/.test(label) ? styles.opButton : null]}
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


