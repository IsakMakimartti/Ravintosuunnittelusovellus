
import { useState, useEffect } from 'react';
import { StyleSheet, View,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
export default function Options(props) {
    const [dairy, setdairy] = useState(false)
    const [gluten, setgluten] = useState(false)
    const [vegan, setvegan] = useState(false)
    const [vegetarian, setvegetarian] = useState(false)
    const [pork, setpork] = useState(false)
    const [wheat, setwheat] = useState(false)
  useEffect(() => {
    var temparray = []
    if(dairy){
        temparray.push("dairy-free")
    }
    if(gluten){
        temparray.push("gluten-free")
    }
    if(vegan){
        temparray.push("vegan")
    }
    if(vegetarian){
        temparray.push("vegetarian")
    }
    if(pork){
        temparray.push("pork-free")
    }
    if(wheat){
        temparray.push("wheat-free")
    }
    console.log(temparray)
    props.setOptions(temparray)
  }, [dairy,gluten,vegan,vegetarian,wheat,pork]);
  return (
 <><OptionsArray/></>
  );
  function OptionsArray () {
    return (
        <View style={{alignSelf:"center", width: "100%" , flexWrap: "wrap", flexDirection: "row",justifyContent:"space-between" }}>
            <CheckBox style={{flex: 1, borderWidth:0.3, flexBasis: "50%"}} onClick={()=> setdairy(!dairy)}  isChecked={dairy} leftText={"dairy free"}></CheckBox>
            <CheckBox style={{flex: 1, borderWidth:0.3, flexBasis: "50%"}} onClick={()=> setgluten(!gluten)} isChecked={gluten} leftText={"gluten free"}></CheckBox>
            <CheckBox style={{flex: 1, borderWidth:0.3, flexBasis: "50%"}} onClick={()=> setvegan(!vegan)} isChecked={vegan} leftText={"vegan"}></CheckBox>
            <CheckBox style={{flex: 1, borderWidth:0.3, flexBasis: "50%"}} onClick={()=> setvegetarian(!vegetarian)} isChecked={vegetarian} leftText={"vegetarian"}></CheckBox>
            <CheckBox style={{flex: 1, borderWidth:0.3, flexBasis: "50%"}} onClick={()=> setpork(!pork)}  isChecked={pork} leftText={"pork free"}></CheckBox>
            <CheckBox style={{flex: 1, borderWidth:0.3, flexBasis: "50%"}} onClick={()=> setwheat(!wheat)} isChecked={wheat} leftText={"wheat free"}></CheckBox>
        </View>
    )
}
function sendupdate(){
    var temparray = []
    if(dairy){
        temparray.push("dairy-free")
    }
    if(gluten){
        temparray.push("gluten-free")
    }
    if(vegan){
        temparray.push("vegan")
    }
    if(vegetarian){
        temparray.push("vegetarian")
    }
    console.log(temparray)
}
}
const styles = StyleSheet.create({
});
