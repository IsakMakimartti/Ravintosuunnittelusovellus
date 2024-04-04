import { Text, View, TextInput, StyleSheet, Pressable, Image, Modal } from 'react-native';
import { useState } from 'react';
export default function Recipebuilder(props) {
    const [ingredients, setIngredient] = useState([])
    const [amounts, setAmounts ]= useState([])
    const [openmodal, setopen] = useState(false)
    const [ingredientinput, setingredient] = useState("")
    const [amountinput, setamount] = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.padding}>
                <View style={styles.addedcontainers}>
                    <Pressable style={styles.pressable} onPress={() => setopen(!openmodal)}>
                        <Image style={styles.image} source={require('../assets/plus-icon.png')}></Image>
                    </Pressable>
                    <Modal visible={openmodal} onRequestClose={() => setopen(!openmodal)} transparent={true} animationType={"slide"}>
                        <View style={styles.popup}>
                            <View style={styles.popupcontent}>
                                <Text style={styles.headerpop}>ADD an Ingredient</Text>
                                <TextInput placeholder="Ingredient field" onChangeText={text => setingredient(text)} value={ingredientinput} style={styles.modalinput}></TextInput>
                                <TextInput placeholder="Amount" onChangeText={text => setamount(text)} value={amountinput} style={styles.modalinput}></TextInput>
                                <View style={{flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                                <Pressable style={styles.modalpressable} onPress={addIngredient}>
                                    <Text style={{padding: 20, fontSize: 20,backgroundColor: "#c5ee7d", textAlign: "center"}}> Add </Text>
                                </Pressable>
                                <Pressable style={styles.modalpressable} onPress={() => setopen(!openmodal)}>
                                    <Text style={{padding: 20,fontSize: 20,backgroundColor: "#c5ee7d", textAlign: "center"}}> Cancel </Text>
                                </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
            <View styles={styles.ingredientcontainer}>
                <IngredientUI data={ingredients} />
            </View>
        </View>
        
    );
    function addIngredient() {
        setopen(!openmodal)
        ingredients.push(ingredientinput)
        amounts.push(amountinput)
        props.functioncall(amounts,ingredients)
    }
    function IngredientUI(props) {
        var temparray = [];
        props.data.forEach((value, index) => {
            temparray.push(
                <View style={styles.ingredient} key={"Ingredient" + index}>
                    <Text style={styles.ingredienttext}>
                        {value}
                    </Text>
                    <Text style={styles.amounttext}>
                        {amounts[index]}
                    </Text>
                </View>
            )
        })
        return temparray
    }
}
const styles = StyleSheet.create({
    modalinput: {
    paddingBottom: 20, 
    paddingTop: 20,
    fontSize: 20, 
    textAlign: "center",
    backgroundColor: "#cccc"
    },
    modalpressable: {
    height: 70,
    width: "40%"
    },
    popupcontent: {
        backgroundColor: "rgba(255,255,255,1)",
        width: "100%",
    },
    headerpop: {
        backgroundColor: "#c5ee7d",
        textAlign: "center",
        fontSize: 20,
        padding: 10,
    },
    popup: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    ingredientcontainer: {
        display: "flex",
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
