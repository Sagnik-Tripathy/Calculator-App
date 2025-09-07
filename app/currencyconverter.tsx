import { styles } from "@/utils/calcstyles";
import { convertCurr, loadDisp, saveDisp } from "@/utils/calcutils";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";

export default function Calculator() {
  const currencies=["USD","INR","EUR","JPY","AED","LKR","MXN","NGN","RUB","SAR","KPW","ZAR","VND","AUD","BRL"];
  const [display, setDisplay] = useState("0");
  const [from,setFrom] = useState("INR"); //initial currency
  const [to,setTo] = useState("USD"); //final currency
  const [result,setResult] = useState("0"); //result
  const [rate,setRate] = useState<string|null>(null); //by default null
  const [page,setPage]= useState("currency");
  const [lheight,setHeight]= useState(0);
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

function onButtonClick(inp: string){
    if(/[0-9]/.test(inp)||inp==="."){
        setDisplay((prev) => (((prev === "0"||prev ==="Error") ? inp : prev + inp)));

    }
    else if (inp === "C") {
      setDisplay("0");
    } else if (inp === "⌫") {
        if(display.length===1){
          setDisplay((prev)=>("0"));
        }
        else{
      setDisplay((prev) => (prev.slice(0,prev.length-1)))
        }
    }
}
const gridbuttons=[
     
  "7", "8", "9",
  "4", "5", "6", 
  "1", "2", "3", 
  "0", ".", "⌫",
]
useEffect(() =>{
async function Conv(){
    try{
    const {resu, rat} = await convertCurr(display,from, to);
    setRate(rat);
    setResult(resu);
    
    }
    catch(error:unknown){
        console.log("some error occured");
    }
    
}
Conv();
},[display,from,to]);

return(
    <View style={styles.page}>

        <Picker 
        selectedValue={page}
        onValueChange={(itemValue) => {
            setPage(itemValue)
            if (itemValue === "normal") {
            router.push("/");
          } else if (itemValue === "scientific") {
            router.push("/scientificCalc");
          } 
        }}
        style={styles.menuDrop}
        dropdownIconColor="#ffffff"
        >
            <Picker.Item label="Currency" value="currency" color="#000000" />
            <Picker.Item label="Normal" value="normal" color="#000000" />
            <Picker.Item label="Scientific" value="scientific" color="#000000" />
        
        </Picker>
            
        <View style={{ flexDirection: "row", alignItems: "stretch", flex: 1,paddingTop: 80 }}>

            {/*displays*/}
            <View style={{ flexDirection: "column", flex: 1, }}
            onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
                
                <View style={currstyles.currdisplay}>
                    <View style={{flex:1}}>
                    <Text  style={styles.displayText}>{display}</Text>
                    </View>
                    <Picker 
                    selectedValue={from}
                    onValueChange={async (itemValue)=>{
                        setFrom(itemValue);
                        try {
                             const { resu, rat } = await convertCurr(display, itemValue, to);
                            setRate(rat);
                            setResult(resu);
                        } catch (err) {
                            console.log("Conversion failed:", err);
    }
                        setFrom(itemValue)}}
                    style={currstyles.dropdown}
                    dropdownIconColor="#ffffff">
                        {currencies.map((currency)=>(
                            <Picker.Item
                            key={currency}
                            label={currency}
                            value={currency}
                            color="#000000"
                            />
                        ))}
                    </Picker>
                </View>
            <View style={currstyles.currdisplay}>
                <View style={{flex: 1}}>
                    <Text numberOfLines={1} style={styles.displayText}>{result}</Text>
                    </View>
                    <Picker 
                    selectedValue={to}
                    onValueChange={async (itemValue)=>{
                        setTo(itemValue)
                        try {
                            const { resu, rat } = await convertCurr(display, itemValue, to);
                            setRate(rat);
                            setResult(resu);
                        } catch (err) {
                            console.log("Conversion failed:", err);
                        }
                    
                    }}
                    style={currstyles.dropdown}
                    dropdownIconColor="#ffffff">
                        {currencies.map((currency)=>(
                            <Picker.Item
                            key={currency}
                            label={currency}
                            value={currency}
                            color="#000000"
                            />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={[currstyles.rateBox, {height: lheight-40,marginTop: 20}]}>
                <Text style={{ color: "#ffffff" }}>Rate:{"\n"}{rate ?? "--"}</Text>
            </View>
        </View>
              <View style={styles.grid}>
                {gridbuttons.map((label) => (
                  <TouchableOpacity
                    key={label}
                    onPress={() => onButtonClick(label)}
                    style={[styles.button_normal,currstyles.currbuttons]}
                  >
                    <Text style={styles.buttonText}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
        

    </View>

);



}
const currstyles=StyleSheet.create({
rateBox: {
  width: 68,
  backgroundColor: "#373838",
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  padding: 8,
  marginLeft: 0,
 
}, 
  
  currdisplay: {
    width: "90%",
    flex:1,
    backgroundColor: "#373838",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 20,
    alignItems: "flex-start"
  },
  dropdown: {
     width:100,
    color: "white", 
    backgroundColor: "#373838", 
    borderRadius: 8
  },
  currbuttons:{
    width:"30%",
  },
  



});