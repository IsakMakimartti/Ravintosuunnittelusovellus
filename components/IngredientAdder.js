import { Text, View, TextInput, StyleSheet, Pressable, Image, Modal,ScrollView } from 'react-native';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
export default function Recipebuilder(props) {
    const [openmodal, setopen] = useState(false)
    const [ingredientinput, setingredient] = useState("")
    const [amountinput, setamount] = useState("")
    const [amountmes, setamountmes] = useState("")
    const [ingredientsjson, setIngredientjson] = useState([])
    const measurements = [
        { key: '1', value: 'whole' },
        { key: '2', value: 'g' },
        { key: '3', value: 'kg' },
        { key: '4', value: 'oz' },
        { key: '5', value: 'floz' },
        { key: '6', value: 'cup' },
        { key: '7', value: 'teaspoon' },
        { key: '8', value: 'pint' },
        { key: '9', value: 'quart' },
        { key: '10', value: 'gallon' },
        { key: '11', value: 'ml' },
        { key: '12', value: 'dl' },
        { key: '13', value: 'l' },
    ]
    return (
        <View>
            <View style={styles.padding}>
                <View style={styles.addedcontainers}>
                    <Pressable style={({pressed})=> ({opacity: pressed ? 0.5 : 1, alignItems:"center"})} onPress={() => setopen(!openmodal)}>
                        <Image style={styles.image} source={require('../assets/plus-icon.png')}></Image>
                    </Pressable>
                    <Modal visible={openmodal} onRequestClose={() => setopen(!openmodal)} transparent={true} animationType={"slide"}>
                        <View style={styles.popup}>
                            <View style={styles.popupcontent}>
                                <Text style={styles.headerpop}>Add or edit an Ingredient</Text>
                                <TextInput placeholder="Ingredient field" onChangeText={text => setingredient(text)} value={ingredientinput} style={styles.modalinput}></TextInput>
                                <SelectList
                                    setSelected={(val) => setamountmes(val)}
                                    data={measurements}
                                    search={false}
                                    placeholder='Select measurement!'
                                    save="value"
                                />
                            <TextInput placeholder="Amount" onChangeText={text => setamount(text)} value={amountinput} style={styles.modalinput}></TextInput>
                                <View style={{ flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Pressable style={({pressed})=> ({opacity: pressed ? 0.8 : 1, height: 70,width: "40%"})} onPress={addIngredient}>
                                        <Text style={{ padding: 20, fontSize: 20, backgroundColor: "#c5ee7d", textAlign: "center" }}> Add </Text>
                                    </Pressable>
                                    <Pressable style={({pressed})=> ({opacity: pressed ? 0.8 : 1, height: 70,width: "40%"})} onPress={() => setopen(!openmodal)}>
                                        <Text style={{ padding: 20, fontSize: 20, backgroundColor: "#c5ee7d", textAlign: "center" }}> Cancel </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
            <View styles={styles.ingredientcontainer}>
                <IngredientUI data={ingredientsjson} />
            </View>
        </View>

    );
    function jsondelete(num) {
    // :) 
    var valuetosetforrerender = ingredientsjson.splice(num)
    props.functioncall(valuetosetforrerender)
    }
    function addIngredient() {
    var pass = true; 
    var index = -1; 
    ingredientsjson.forEach((value, inx) => {
        if(String(value.ingredient.name) === ingredientinput) {
            pass = false;
            index = inx
        }
    }) 
    if(pass){
        setopen(!openmodal)
        var jsonData = {
            "ingredient" : 
                {
                 "name" : 
                  ingredientinput
                 ,
                 "amount" : 
                  amountinput
                 ,
                 "measurement" : 
                  amountmes
                }
        }
        ingredientsjson.push(jsonData)
        props.functioncall(ingredientsjson)
    } else {
       if(index !== -1){
        var jsonData = {
            "ingredient" : 
                {
                 "name" : 
                  ingredientinput
                 ,
                 "amount" : 
                  amountinput
                 ,
                 "measurement" : 
                  amountmes
                 
                }
        }
        ingredientsjson[index] = jsonData;
       }
       setopen(!openmodal)
    }
    setingredient("")
    setamount("")
    setamountmes("")
    }
    function IngredientUI(props) {
        var temparray = [];
        props.data.forEach((value, index) => {
            temparray.push(
                <Pressable onLongPress={() => jsondelete(index)} style={styles.ingredient} key={"Ingredient" + index}>
                    <Text style={styles.ingredienttext}>
                   {value.ingredient.name}
                    </Text>
                    <Text style={styles.amounttext}>
                        {value.ingredient.amount} {value.ingredient.measurement}
                    </Text>
                </Pressable>
            )
        })
        return temparray
    }
}
const styles = StyleSheet.create({
    scrollview: {
    height: 400, 
    },
    dropdown: {
        textAlign: "center"
    },
    modalinput: {
        paddingBottom: 20,
        paddingTop: 20,
        fontSize: 20,
        paddingLeft: 20, 
        backgroundColor: "#f1f1f1"
    },
    modalpressable: {
        height: 70,
        width: "40%"
    },
    popupcontent: {
        backgroundColor: "rgba(255,255,255,1)",
        width: "100%",
    },
    buttoncontainer: {
        flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f1f1"
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
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        width: "8%",
    },
    x: {
        width: 30,
        height: 30,
    },
    amounttext: {
        fontSize: 20,
        width: "25%"
    },
    ingredient: {
        flex: 1,
        width: "100%",
        height: "80%",
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.2,
        borderColor: "#000000"
    },
    ingredienttext: {
        fontSize: 30,
        width: "70%",
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
