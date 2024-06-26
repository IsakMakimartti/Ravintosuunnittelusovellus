import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Linking, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function RecipePage({ route }) {
    const { id } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [calories, setCalories] = useState(null);

    const handleButtonPress = () => {
        console.log('Add button pressed');
    };
    const handlePress = () => {
        Linking.openURL(data.recipe.url);
    };

    const handleIngredientPress = async (quantity, measure, food) => {
        try {
            const encodedFood = encodeURIComponent(food);
            const url = `https://api.edamam.com/api/nutrition-data?app_id=c6c2b88e&app_key=3088670e164afefa6e318e68dd871cb4&nutrition-type=cooking&ingr=${quantity}%20${measure}%20${encodedFood}`;
            const response = await fetch(url);
            const result = await response.json();
            setCalories(result.calories);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching nutritional data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchurl = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${process.env.app_id}&app_key=${process.env.app_KEY}`;
                console.log(fetchurl)
                const response = await fetch(fetchurl);
                const fetchedData = await response.json();
                setData(fetchedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
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
                <Image style={styles.image} source={{ uri: data.recipe.image }} />
                <View style={styles.ingredientBox}>
                    <AddRecipeButton
                        id={id}
                        totalCalories={data.recipe.calories}
                        recipeLabel={data.recipe.label}
                        recipeImage={data.recipe.images.SMALL.url}
                        recipeFat={data.recipe.totalNutrients.FAT}
                        recipeCarbs={data.recipe.totalNutrients.CHOCDF}
                        recipeProtein={data.recipe.totalNutrients.PROCNT}
                    />
                    <Text style={styles.subLabel}>Ingredients</Text>
                    {data.recipe.ingredientLines.map((ingredientLine, index) => {
                        const [quantity, measure, ...foods] = ingredientLine.split(' ');
                        const food = foods.join(' ');

                        let displayIngredient = '';

                        if (quantity && measure && food !== '<unit>') {
                            displayIngredient += quantity;
                            if (measure !== '<unit>') {
                                displayIngredient += ` ${measure}`;
                            }
                            displayIngredient += ` ${food}`;
                        }

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleIngredientPress(quantity, measure, food)}
                            >
                                <Text style={styles.ingredient}>{displayIngredient}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <Text style={styles.subLabel}>Source</Text>
                <View style={{ width: imageWidth }}>
                    <RecipeLink onPress={handlePress} recipeLink={data.recipe.url} recipeSource={data.recipe.source} />
                </View>
                <Text style={styles.subLabel}>Nutritional values</Text>
                <View style={styles.ingredientBox}>
                    {Object.keys(data.recipe.totalNutrients).map((key, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                {data.recipe.totalNutrients[key].label}:
                            </Text>
                            <Text>
                                {data.recipe.totalNutrients[key].quantity.toFixed(0)}{' '}
                                {data.recipe.totalNutrients[key].unit}
                            </Text>
                        </View>
                    ))}
                </View>
                <StatusBar style="auto" />
            </ScrollView>
            <Modal isVisible={modalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Calories: {calories}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const AddRecipeButton = ({ id, totalCalories, recipeLabel, recipeImage, recipeFat, recipeCarbs, recipeProtein }) => {
    const [modalButtonsVisible, setModalButtonsVisible] = useState(false);
    const label = 'Add';

    const handlePress = () => {
        setModalButtonsVisible(!modalButtonsVisible)
    };

    return (
        <View>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={{ textAlign: 'center' }}>{label}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalButtonsVisible}
                onRequestClose={() => {
                    Alert.alert('ModalButtons has been closed.');
                    setModalButtonsVisible(!modalButtonsVisible);
                }}
            >
                <View style={styles.modalButtonsContainer}>
                    <ModalButtons
                        id={id}
                        onPress={handlePress}
                        totalCalories={totalCalories}
                        recipeLabel={recipeLabel}
                        recipeImage={recipeImage}
                        recipeFat={recipeFat}
                        recipeCarbs={recipeCarbs}
                        recipeProtein={recipeProtein}
                    />
                </View>
            </Modal>
        </View>
    );
};

const RecipeLink = ({ onPress, recipeLink, recipeSource }) => {
    const handlePress = () => {
        Linking.openURL(recipeLink);
        onPress();
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 20, marginBottom: 20, textAlign: 'left' }}>{recipeSource}</Text>
        </TouchableOpacity>
    );
};

const ModalButtons = ({id, onPress, totalCalories, recipeLabel, recipeImage, recipeFat, recipeCarbs, recipeProtein }) => {
    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showSaveButton, setShowSaveButton] = useState(false);

    const label1 = 'Calculator'
    const label2 = 'Calendar'
    const label3 = 'Save'
    const label4 = 'Cancel'

    const handlePressCalculator = () => {
        const newRecipe = {
            id: Math.random().toString(),
            title: recipeLabel,
            calories: totalCalories,
            image: recipeImage,
            fat: recipeFat,
            carbs: recipeCarbs,
            protein: recipeProtein
        }
        onPress()
        navigation.navigate('Calculator', { newRecipe })
    };

    const handlePressCalendar = async () => {
        const recipeId = id;
        const recipeDate = selectedDate ? selectedDate.toDateString() : new Date().toDateString();
        const recipeTitle = recipeLabel;
    
        try {
            const savedRecipesJSON = await AsyncStorage.getItem('savedRecipes');
            const savedRecipes = savedRecipesJSON ? JSON.parse(savedRecipesJSON) : [];
            
            const existingRecipeIndex = savedRecipes.findIndex(recipe => recipe.recipeId === recipeId && recipe.recipeDate === recipeDate);
    
            if (existingRecipeIndex !== -1) {
                Alert.alert('Recipe Already Saved', 'This recipe has already been saved for this date.');
            } else {
                navigation.navigate('Calendar', { recipeId, recipeDate, recipeTitle });
            }
        } catch (error) {
            console.error('Error checking saved recipes:', error);
        }
    };

    const handlePressCancel = () => {
        onPress();
    };

    useEffect(() => {
        if (selectedDate) {
            setShowSaveButton(true);
        } else {
            setShowSaveButton(false);
        }
    }, [selectedDate]);

    return (
        <View style={styles.modalButtonsView}>
            <TouchableOpacity onPress={handlePressCalculator} style={[styles.button, styles.modalButtons]}>
                <Text style={{ textAlign: 'center' }}>{label1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={[styles.button, styles.modalButtons]}>
                <Text style={{ textAlign: 'center' }}>{label2}</Text>
            </TouchableOpacity>
            {showSaveButton && (
                <TouchableOpacity onPress={handlePressCalendar} style={[styles.button, styles.modalButtons]}>
                    <Text style={{ textAlign: 'center' }}>{label3}</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handlePressCancel} style={[styles.button, styles.modalButtons]}>
                <Text style={{ textAlign: 'center' }}>{label4}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                    setSelectedDate(date);
                    setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
            />
        </View>
    );
};

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
    subLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
    },
    ingredientBox: {
        width: imageWidth,
        marginTop: 15,
    },
    ingredient: {
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
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'center',
    },
    modalButtonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonsView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'stretch',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'black'
    },
    modalButtons: {
        marginVertical: 8
    }
});
