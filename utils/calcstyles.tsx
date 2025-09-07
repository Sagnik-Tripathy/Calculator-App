import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 24,
  },
  calculator: {
    flex:1,
    width:"100%",
    paddingTop:100

  },
  display: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#000000",
    alignItems: "flex-end",
  },
  displayText: {
    fontSize: 32,
    color: "#ffffff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  scientific: {
  position: "absolute",
  top: 40,
  left: 20,
  backgroundColor: "#373838",
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 8,
  zIndex: 999,          
  elevation: 5,         
},

  button_normal: {
    width: "22%", 
    marginBottom: 10,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: "#373838",
    alignItems: "center",
  },
  eqbutton: {
    width: "100%", 
    marginBottom: 10,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: "#373838",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#e1e2e5",
  },
  opButton: {
    backgroundColor: "#767778",
  },
  equals: {
    marginTop: 8,
    backgroundColor: "#d4d4d4",
  },
  equalsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#89898c",
  },
  menuDrop: {
    position: "absolute",
    backgroundColor: "#373838",
    top: 40,
    left: 10,
    width: 160, 
    color: "#ffffff", // text color
    borderRadius: 8,
    elevation:10,
    zIndex:10
  },
});
