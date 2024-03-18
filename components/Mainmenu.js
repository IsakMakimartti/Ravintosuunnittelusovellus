import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';

export default function MainMenu() {
    const [Loading, setLoading] = useState(true)
    const [Data, setData] = useState([])
    useEffect(() => {
      const fetchdata = async () => {
        try {
            const response = await fetch("https://api.edamam.com/api/recipes/v2?app_id=7a7668fb&app_key=5dedd41ca0ac7b45881b37db8ae94423&type=public&q=Chicken");
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };
    fetchdata()

    }, [])
    return (
      <SafeAreaView style={styles.container}>
        <Banner/>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          { Loading ?
            <Text></Text> : <Foods array={Data}/>
          }
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    );
}
function Foods(props){
  var temparray = []; 
  for(let i = 0; i < 19; i++){
    var imageUrl = props.array.hits[i].recipe.image;
    console.log(imageUrl);
    temparray.push(
        <View key={i} style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.imageText}>{props.array.hits[i].recipe.label}</Text>
        </View>
    );
}

  return temparray;
}

function Banner(){

  return(
    <View style={styles.bannerStyle}>
      <Text style={styles.headerStyle}>RSS</Text>
    </View>
  )
}
const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth - 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5c4ad',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    textAlign: 'center',
    fontSize: 30,
  },
  bannerStyle: {
    height: 55,
    backgroundColor: '#66bd7c',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  image: {
    width: imageWidth,
    height: 360, 
    borderRadius: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 55,
  },
  imageContainer: {
    position: 'relative',
    margin: 10,
  },
  imageText: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    color: 'white',
    textAlign: 'center',
    padding: 5,
    fontSize: 40,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
  },
});
