import { Text, View, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { useState } from 'react';
import IngredientAdder from "./IngredientAdder"
var arrayb = []
var arrayb2 = []
export default function Recipebuilder() {
    const [recipeName, setName] = useState("")
    const [recipeInstructions, setInstructions] = useState("")
    handlePress = (array,array2) => {
        arrayb = array
        arrayb2 = array2
        console.log(arrayb)
        console.log(arrayb2)
    }
    handleFinnish = () => {
     console.log("Handeled")
     console.log(recipeInstructions)
     console.log(recipeName)
     console.log(arrayb)
     console.log(arrayb2)
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.padding}>
                <View style={styles.inputcontainer}>
                    <TextInput onChangeText={text => setName(text)} style={styles.inputstyle} value={recipeName} placeholder='Recipe name here!'></TextInput>
                </View>
            </View>
            <View style={styles.padding}>
                <IngredientAdder functioncall={handlePress}/>
            </View>
            <View style={styles.padding}>
                <View style={styles.instructions}>
                    <TextInput onChangeText={text => setInstructions(text)} style={styles.instructionsinput} value={recipeInstructions} placeholder='Write instructions here!'></TextInput>
                </View>
            </View>
            <View style={styles.addedcontainers}>
                <Pressable style={styles.pressable} onPress={() => handleFinnish()}>
                    <Text>Finnish Recipe</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    padding: {
        paddingBottom: 20,
    },
    inputcontainer: {
        width: "100%",
        borderColor: "#000000",
        borderWidth: 0.5,
    },
    instructionsinput: {
        paddingBottom: 20,
        paddingTop: 20,
        textAlign: "center",
        width: "100%",
        borderColor: "#000000",
        borderWidth: 0.5,
    },
    instructions: {
        width: "100%",
    },
    pressable: {
        width: "40%",
        alignItems: "center",
    },
    addedcontainers: {
        backgroundColor: "#c5ee7d",
        borderRadius: 200,
        width: "100%",
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
        borderColor: "#000000",
        borderWidth: 0.5,
    },
    inputstyle: {
        paddingBottom: 20,
        paddingTop: 20,
        fontSize: 30,
        textAlign: "center"
    },
    image: {
        width: 50,
        height: 50,
    },
});
