
import { useState } from 'react';
import { getDocs, firestore, collection, userrecipes, query, where } from '../firebase/Config';
import { StyleSheet, Text, TextInput, View, Image, Pressable, ScrollView, Modal, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import { cuisineType } from "../data/random.json"
import { useNavigation } from '@react-navigation/native';
import AlertModal from './Alert'
export default function Searchbar() {
    const navigation = useNavigation();
    const [inputText, setInput] = useState("")
    const [responsearray, setArray] = useState([undefined])
    const [randomarray, setRanArray] = useState([undefined])
    const [userarray, setuserarray] = useState([undefined])
    const [modal, ismodal] = useState(false)
    const [modaldata, setdata] = useState([])
    const [alert, setalert] = useState(false)
    const [loaded, setloaded] = useState(false)

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.row}>
                <TextInput returnKeyType="done" autoCapitalize="none" onSubmitEditing={() => inputText.length > 3 ? APIsearch() : alertuser()} value={inputText} onChangeText={text => setInput(text.replace())} style={styles.input} placeholder='Search...'></TextInput>
                <Pressable onPress={() => inputText.length > 3 ? APIsearch() + Keyboard.dismiss() : alertuser()} style={styles.press}>
                    <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')} />
                </Pressable>
            </View>
            { loaded ?
                <View style={{ maxHeight: 240 }}>
                    <View style={{ flexShrink: 1 }}>
                        <ScrollView style={{ flexGrow: 1 }}>
                            <Searchresults data={responsearray} />
                            <UserSearchResults data={userarray} />
                        </ScrollView>
                    </View>
                </View> :
                <></>
            }
            {modal ? <ModalComponent/> : <></>
            }
            {alert ? <AlertModal alertstate={alert} alert={"Please Make the input more than 3 charaters!"}/> : <></>
            }
            <View style={{ flex: 1, margin: 10 }}>
                <View>
                    <Button onPress={() => Random()} labelStyle={{ fontSize: 18, textAlign: "center" }} style={styles.randombutton}>Give me ideas</Button>
                </View>
                <View style={styles.RandomResultContainer}>
                    <RandomResultElement data={randomarray} />
                </View>
            </View>
        </View>
    );
    function alertuser() {
        setalert(!alert)
        setTimeout(() => {
            setalert(false)
        }, 4000)
    }
    async function usersearch(string) {
        setArray([])
        setloaded(false)
        console.log(inputText)
        const citiesRef = collection(firestore, userrecipes);
        const q = query(citiesRef, where("keywords", 'array-contains', string))
        const res = await getDocs(q)
        var temparray = []
        res.forEach((doc) => {
            temparray.push(doc.data())
        })
        setuserarray(temparray)
        setloaded(true)
    }
    function ModalComponent() {
        return (
            <Modal visible={modal} onRequestClose={() => ismodal(!modal)} transparent={true} animationType={"slide"}>
                <View style={{ flex: 1, alignContent: "center", alignSelf: "center", justifyContent: "center" }}>
                    <View style={styles.modal}>
                        <Text style={styles.modalheader}>Recipe</Text>
                        <Text style={{ fontSize: 30, marginBottom: 10 }}>{modaldata.name}</Text>
                        <Text style={styles.modalheader}>User</Text>
                        <Pressable onPress={usernameonlick}>
                            <Text style={{ fontSize: 20, marginBottom: 10 }}>{modaldata.username}</Text>
                        </Pressable>
                        <Text style={styles.modalheader}>Instructions</Text>
                        <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 10 }}>{modaldata.instructions}</Text>
                        <Text style={styles.modalheader}>Ingredients</Text>
                        <MapArray />
                        <Pressable style={{ width: "100%", alignItems: "center", marginTop: 20, backgroundColor: "rgba(255,0,0,0.7)" }} onPress={() => ismodal(!modal)}><Text>Close</Text></Pressable>
                    </View>
                </View>
            </Modal>
        );
    }
    function usernameonlick(){
        ismodal(false)
        setInput(modaldata.username) 
        usersearch(modaldata.username)
    }
    function setModalData(array) {
        setdata(array)
        array.ingredients.forEach(value => {
            console.log(value.ingredient.name)
        })
        ismodal(true)

    }
    function MapArray() {
        var temparray = []
        modaldata.ingredients.forEach((value, index) => {
            temparray.push(
                <View key={"2" + index} style={{ borderWidth: 0.3, width: "100%", alignItems: "center", padding: 10 }}><Text style={{ fontSize: 15 }}>{value.ingredient.name} {value.ingredient.amount}{value.ingredient.measurement}</Text></View>
            )
        })
        return temparray
    }
    async function usersearchquery() {
        console.log(inputText)
        const citiesRef = collection(firestore, userrecipes);
        const q = query(citiesRef, where("keywords", 'array-contains', inputText))
        const res = await getDocs(q)
        var temparray = []
        res.forEach((doc) => {
            temparray.push(doc.data())
        })
        setuserarray(temparray)
    }
    async function APIsearch() {
        await usersearchquery()
        var response = "";
        var parsedinput = inputText.replace(" ", "%20")
        url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + inputText + "&app_id=" + process.env.app_id + "&app_key=" + process.env.app_KEY
        await fetch(url)
            .then(async res => response = await res.json())
            .catch(error => console.log(error))
        setArray(response)
        setloaded(true)
    }
    async function Random() {
        var random = Math.floor(1 + Math.random() * (18 - 1))
        var cusine = cuisineType[random]
        var response = "";
        var url = "https://api.edamam.com/api/recipes/v2?type=public&" + "&app_id=" + process.env.app_id + "&app_key=+ " + process.env.app_KEY + "&cuisineType=" + cusine + "&random=true"
        console.log(url)
        await fetch(url)
            .then(async res => response = await res.json())
            .catch(error => console.log(error))
        var randomrecipe = Math.floor(1 + Math.random() * (20 - 1))
        setRanArray(response.hits[randomrecipe].recipe)
    }
    function RandomResultElement(props) {
        if (props.data.images !== undefined) {
            var image = props.data.images.REGULAR.url
            var text = props.data.label
            return (
                <Pressable style={styles.randompress} onPress={() => recipesend(props.data.uri.split('_')[1], navigation)}>
                    <View style={styles.randomcontainer}>
                        <Image source={{ uri: image }} style={styles.Randomimageoffood} />
                        <Text style={styles.randomHeader}>{text}</Text>
                    </View>
                </Pressable>
            )
        } else {
            return (
                <></>
            )
        }
    }
    function UserSearchResults(props) {
        var temparray = [];
        props.data.forEach((element, index) => {
            temparray.push(
                <Pressable key={index + element.name} onPress={() => setModalData(element)}>
                    <View style={styles.SearchRow}>
                        <Image source={require("../assets/user.png")} style={styles.imageoffood} />
                        <Text style={{ paddingLeft: 20, height: "80%", width: "80%", alignContent: "center", justifyContent: "center", alignItems: "center", textAlignVertical: "center" }}>{element.name}</Text>
                    </View>
                </Pressable>
            )
        })

        return temparray
    }
    function Searchresults(props) {
        var temparray = [];
        if (props.data.hits !== undefined) {
            props.data.hits.forEach((element, index) => {
                if (element.recipe.images.SMALL.url && element.recipe.label) {
                    imageUrl = element.recipe.images.SMALL.url
                    imgText = element.recipe.label
                    temparray.push(
                        <Pressable key={index} onPress={() => recipesend(element.recipe.uri.split('_')[1], navigation)}>
                            <View style={styles.SearchRow}>
                                <Image source={{ uri: imageUrl }} style={styles.imageoffood} />
                                <Text style={{ paddingLeft: 20, height: "80%", width: "80%", alignContent: "center", justifyContent: "center", alignItems: "center", textAlignVertical: "center" }}>{imgText}</Text>
                            </View>
                        </Pressable>
                    )
                } else {
                    temparray.push(
                        <Text>Error</Text>
                    )
                }
            });
        } else {
            temparray.push(<></>)
        }
        return temparray
    }
}
function recipesend(id, nav) {
    console.log(id)
    nav.navigate("Recipe", { id })
}

const styles = StyleSheet.create({
    modalheader: {
        fontSize: 20,
        marginBottom: 10,
        borderWidth: 0.3,
        width: "100%",
        textAlign: "center"
    },
    alert: {
        fontSize: 15,
        width: "100%",
        textAlign: "center",
        color: "#B20000",
        fontWeight: "bold"
    },
    alertmodal: {
        padding: 10,
        backgroundColor: "#c5ee7d",
        alignItems: "center",
        minWidth: "80%"
    },
    modal: {
        backgroundColor: "#c5ee7d",
        padding: 20,
        borderWidth: 0.5,
        alignItems: "center",
        minWidth: "80%"
    },
    safearea: {
        width: 20,
    },
    scrollArea: {
        flex: 1,
    },
    RandomResultContainer: {
        flex: 1,
    },
    randompress: {
        flex: 1,
    },
    randomHeader: {
        margin: 10,
        fontSize: 20,
    },
    randomcontainer: {
        alignItems: "center",
        flex: 1,
        flexDirection: "Column",
    },
    randombutton: {
        backgroundColor: "#c5ee7d",
    },
    SearchRow: {
        borderColor: "#ccc",
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        width: "100%",
        textAlign: "center",
    },
    scroll: {
        flex: 1,
        borderColor: "#ccc",
        borderWidth: 0.6,
        flexGrow: 1,
    },
    press: {
        flexBasis: '20%',
        height: "20%",
        alignItems: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        borderColor: '#000',
        borderWidth: 2,

    },
    rowalert: {
        flexDirection: 'row',
        width: '100%',
        borderColor: '#000',
        borderWidth: 2,
        backgroundColor: "#FF9999"
    },
    input: {
        flexBasis: '80%',
        width: '80%',
        height: 50,
        fontSize: 20,
    },
    inputalert: {
        flexBasis: '80%',
        width: '80%',
        height: 50,
        fontSize: 20,
        backgroundColor: "#FF9999"
    },
    image: {
        width: 50,
        height: 50,
    },
    imageoffood: {
        width: 100,
        height: 80,
    },
    Randomimageoffood: {
        margin: 10,
        width: 150,
        height: 120,
    },
    container: {
        flex: 1,
        backgroundColor: '#a5c4ad',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
