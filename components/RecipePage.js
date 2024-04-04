import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

export default function RecipePage({ route }) {
    const { id } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const handleButtonPress = () => {
        console.log('Button pressed');
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                var fetchurl = "https://api.edamam.com/api/recipes/v2/"+id+"?type=public&app_id="+process.env.app_id+"&app_key="+process.env.app_KEY
                const response = await fetch(fetchurl);
                const fetchedData = await response.json();
                setData(fetchedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading || !data || !data.recipe) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.label}>{data.recipe.label}</Text>
                <Image
                    style={styles.image}
                    source={{ uri: data.recipe.image }}
                />
                <View style={styles.ingredientBox}>
                <AddRecipeButton onPress={handleButtonPress} />
                <Text style={styles.subLabel}>Ingredients:</Text>
                    {data.recipe.ingredientLines.map((ingredient, index) => (
                <Text key={index} style={styles.ingredient}>{ingredient}</Text>
                    ))}
                </View>
                <Text style={styles.subLabel}>Nutritional values</Text>
                    <View style={styles.ingredientBox}>
                        {Object.keys(data.recipe.totalNutrients).map((key, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{data.recipe.totalNutrients[key].label}:</Text>
                                <Text>{data.recipe.totalNutrients[key].quantity.toFixed(0)} {data.recipe.totalNutrients[key].unit}</Text>
                            </View>
                        ))}
                        </View>
                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}

const AddRecipeButton = ({ onPress }) => {
    const [saved, setSaved] = useState(false);
    const label = saved ? "Remove recipe" : "Add recipe";

    const handlePress = () => {
        setSaved(!saved); 
        onPress(); 
    };
  
    return (
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={{textAlign: 'center'}}>{label}</Text>
      </TouchableOpacity>
    );
  }

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth - 20;
const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#c5ee7d',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
      },
    subLabel:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    ingredientBox:{
        width: imageWidth,
        marginTop: 15
    },
    ingredient:{
        textAlign: 'left',
        fontSize: 16,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: imageWidth,
        height: 360,
        borderRadius: 30,
        resizeMode: 'cover',
    },
});
