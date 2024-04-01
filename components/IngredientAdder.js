import { Text, View, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { useState } from 'react';
export default function Recipebuilder() {
    const [ingredients, setIngredient] = useState([])
    return (
        <View style={styles.container}>
            <View style={styles.padding}>
                <View style={styles.addedcontainers}>
                    <Pressable style={styles.pressable} onPress={ingredientUIADD}>
                        <Image style={styles.image} source={require('../assets/plus-icon.png')}></Image>
                    </Pressable>
                </View>
            </View>
            <View styles={styles.ingredientcontainer}>
                <IngredientUI data={ingredients} />
            </View>
        </View>
    );
    function IngredientUI(props) {
        var temparray = [];
        props.data.forEach((value, index) => {
            temparray.push(
                <View style={styles.ingredient} key={"Ingredient" + index}>
                    <Text style={styles.ingredienttext}>
                        {value}
                    </Text>
                    <Text style={styles.amounttext}>
                        1g
                    </Text>
                </View>
            )
        })
        return temparray
    }
    function ingredientUIADD() {
        var array = ["Salt", "Pepper"]
        setIngredient(array)
        console.log(ingredients)
    }
}
const styles = StyleSheet.create({
    ingredientcontainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "column",
    },
    xpress: {
        backgroundColor: "	rgba(255, 0, 0, 0.1)",
        width: "8%",
    },
    x: {
        width: 30,
        height: 30,
    },
    amounttext: {
        fontSize: 40,
        height: 60,
        width: "30%"
    },
    ingredient: {
        flex: 1,
        width: "100%",
        height: "100%",
        paddingTop: 40,
        paddingBottom: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.2,
        borderColor: "#000000"
    },
    ingredienttext: {
        fontSize: 40,
        width: "70%",
        height: 60,
        textAlign: "center"
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
