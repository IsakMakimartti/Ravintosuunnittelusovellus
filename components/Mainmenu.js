import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';



export default function MainMenu() {
    const [Loading, setLoading] = useState(true)
    const [Data, setData] = useState([])

    const cusineType = ["American",
    "Asian",
    "British",
    "Caribbean",
    "Central%Europe",
    "Chinese",
    "Eastern%Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle%Eastern",
    "Nordic",
    "South%American",
    "South%East%Asian"];
    const mealType = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];

      const randomCusine = Math.floor(Math.random() * cusineType.length);
      const randomMeal = Math.floor(Math.random()* mealType.length)
      const cusine = cusineType[randomCusine];
      const meal = mealType[randomMeal];

    useEffect(() => {
      const fetchdata = async () => {
        try {
            var fetchurl = "https://api.edamam.com/api/recipes/v2?type=public&q=&app_id="+process.env.app_id+"&app_key="+process.env.app_key+"&cuisineType="+cusine+"&mealType="+meal
            const response = await fetch(fetchurl);
            console.log(fetchurl)
            const data = await response.json();
            setData(data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        } finally {
          setTimeout(()=>setLoading(false),500)
        }
    };
    fetchdata()

    }, [])
    useEffect(() => {
      setLoading(false);
    }, [])
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          { Loading ?
            <Text>Loading</Text> : <Foods array={Data}/>
          }
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    );
}
function Foods(props){
  const navigation = useNavigation();
  console.log(props.array.hits[2].recipe.image)
  var temparray = []; 
  if(props.array.hits[2].recipe.image !== undefined){
  for(let i = 0; i < 19; i++){
    var imageUrl = props.array.hits[i].recipe.image;
    const handlePress = () => {
      const recipeURI = props.array.hits[i].recipe.uri
      const id = recipeURI.split('_')[1];
      navigation.navigate('Recipe', {id});
    }
    temparray.push(
        <View key={i} style={styles.imageContainer}>
            <TouchableOpacity onPress={handlePress}>
              <Image source={{ uri: imageUrl }} style={styles.image}/>
              <Text style={styles.imageText}>{props.array.hits[i].recipe.label}</Text>
            </TouchableOpacity>
        </View>
    );
  }
} else {
  temparray.push(<View></View>)
}

  return temparray;
}
const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth - 20;
const styles = StyleSheet.create({
  container: {  
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pineappleStyle: {
    fontSize: 30,
  },
  headerStyle: {
    textAlign: 'center',
    fontSize: 30,
    paddingTop: 7,
  },
  bannerStyle: {
    height: 65,
    backgroundColor: '#66bd7c',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
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
    paddingTop: 65,
  },
  imageContainer: {
    position: 'relative',
    margin: 10,
  },
  imageText: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    color: 'white',
    textAlign: 'center',
    padding: 5,
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    maxHeight: 260,
  },
});
