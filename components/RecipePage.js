import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

export default function RecipePage({ route }) {
    const { id } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchurl = "https://api.edamam.com/api/recipes/v2/"+id+"?type=public&app_id="+process.env.app_id+"&app_key="+process.env.app_KEY
                console.log(fetchurl)
                const response = await fetch(fetchurl);
                const fetchedData = await response.json();
                setData(fetchedData);
                console.log()
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
                <Text style={styles.subLabel}>Ingredients:</Text>
                    {data.recipe.ingredientLines.map((ingredient, index) => (
                <Text key={index} style={styles.ingredient}>{ingredient}</Text>
                    ))}
                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth - 20;
const styles = StyleSheet.create({
    ingredient:{
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#a5c4ad',
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
