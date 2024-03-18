import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default function MainMenu() {
    const [Loading, setLoading] = useState(true)
    const [Data, setData] = useState([])
    useEffect(() => {
    const fetchdata = async () => {
    await fetch("https://api.edamam.com/api/recipes/v2?app_id=7a7668fb&app_key=5dedd41ca0ac7b45881b37db8ae94423&type=public&q=Chicken")
    .then(res => res.json())
    .then(res => JSON.stringify(res))
    .then(res => JSON.parse(res))
    .then(res => setData(res))
    .then(() => setTimeout(setLoading(false), 200))
    
    }
    fetchdata()

    }, [])
  return (
    <View style={styles.container}>
        { Loading ?
      <Text>This is the mainmenu</Text> : <Foods array={Data}/>
        }
        <Button onPress={()=>console.log(Data.hits[1].recipe.label)} title="Hello">Hello</Button>
      <StatusBar style="auto" />
    </View>
  );
}
function Foods(props){
    var temparray = []; 
    console.log(props.array.hits[1].recipe.label  );
    for(i = 0; i < 19; i++){
        temparray.push(<View><Image></Image><Text>{props.array.hits[i].recipe.label}</Text></View>)
    }
    return temparray
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
