import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DateDetails = ({ route, navigation }) => {
    let parsedDate;

    try {
        const { date } = route.params || {};
        parsedDate = date ? new Date(date) : new Date();
    } catch (error) {
        console.error('Error parsing date:', error);
        parsedDate = new Date();
    }

    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const savedRecipesJSON = await AsyncStorage.getItem('savedRecipes');
                if (savedRecipesJSON) {
                    const savedRecipes = JSON.parse(savedRecipesJSON);
                    const recipesForDate = savedRecipes.filter(recipe => recipe.recipeDate === parsedDate.toDateString());
                    setSavedRecipes(recipesForDate);
                }
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
            }
        };

        fetchSavedRecipes();
    }, []);

    const navigateToRecipe = (id) => {
        navigation.navigate('Recipe', { id });
    };

    const removeRecipe = async (recipeId, recipeDate) => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to remove this recipe?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            const savedRecipesJSON = await AsyncStorage.getItem('savedRecipes');
                            if (savedRecipesJSON) {
                                let savedRecipes = JSON.parse(savedRecipesJSON);
                                savedRecipes = savedRecipes.filter(recipe => !(recipe.recipeId === recipeId && recipe.recipeDate === recipeDate));
                                await AsyncStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
                                setSavedRecipes(savedRecipes);
                                navigation.navigate('Calendar');
                            }
                        } catch (error) {
                            console.error('Error removing recipe:', error);
                            Alert.alert('Error', 'Failed to remove recipe');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        navigation.setOptions({ title: parsedDate.toDateString(), headerTitleStyle: { fontSize: 30 } });
    }, [parsedDate, navigation]);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                {savedRecipes.length > 0 ? (
                    <>
                        <Text style={styles.sectionTitle}>Your saved recipes for {parsedDate.toLocaleDateString('en-US', { weekday: 'long' })} {parsedDate.getDate()}:</Text>
                        {savedRecipes.map((recipe, index) => (
                            <View key={index} style={styles.recipeItem}>
                                <View style={styles.recipeTitleContainer}>
                                    <TouchableOpacity onPress={() => navigateToRecipe(recipe.recipeId)}>
                                        <Text style={styles.recipeTitle}>{recipe.recipeTitle}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => removeRecipe(recipe.recipeId, parsedDate.toDateString())} style={styles.removeButton}>
                                    <Text style={styles.removeButtonText}>X</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>
                ) : (
                    <Text style={styles.noRecipesText}>No recipes saved for {parsedDate.toLocaleDateString('en-US', { weekday: 'long' })} {parsedDate.getDate()}.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    recipeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    recipeTitleContainer: {
        flex: 1,
    },
    recipeTitle: {
        fontSize: 20,
        textDecorationLine: 'underline',
        fontWeight: '500',
        backgroundColor: "#c5ee7d",
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
    },
    removeButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 5,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    noRecipesText: {
        fontSize: 20,
        fontStyle: 'italic',
    },
});

export default DateDetails;
