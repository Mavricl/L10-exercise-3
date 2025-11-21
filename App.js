import { StatusBar } from 'expo-status-bar';
import {
    SectionList, ToastAndroid,
    Image, FlatList, StyleSheet,
    Text, TouchableOpacity, View,
} from 'react-native';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, {useState} from 'react';
import {TextInput} from "react-native";
import { Picker } from '@react-native-picker/picker';



const App = () =>{

    const [newName, setNewName] = useState("");
    const [newCode, setNewCode] = useState("");
    const [newType, setNewType] = useState("Water");

    const [datasource, setDatasource] = useState([
        {
            data:[
                {key:'Lapras', code: "131"},
                {key:'Gyarados', code: '130'},
                {key:'Dewgong', code:'87'}
            ],
            title:"Water",
            icon:"droplet",
            bgcolor:"aqua",
        },

        {
            data:[
                {key:'Flareon', code: "136"},
                {key:'Rapidash', code: '78'}
            ],
            title:"Fire",
            icon:"fire",
            bgcolor:"orangered",
        },

        {
            data:[
                {key:'Zapdos', code: "145"},
                {key:'Electabuzz', code: '125'}
            ],
            title:"Electric",
            icon:"bolt",
            bgcolor:"yellow",
        },
    ]);

    const addPokemon = () => {
        if (!newName || !newCode){
            ToastAndroid.show("Please fill in both fields! ", ToastAndroid.SHORT);
            return;
        }
        const newPokemon = {
            key: newName , code: newCode,
        };

        const updated = datasource.map(section => {
            if(section.title === newType){
                return{
                    ...section,
                    data: [...section.data,newPokemon]
                };
            }
            return section;
        });
        setDatasource(updated);

        setNewName("");
        setNewCode("");
    };


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter Pokemon Name"
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
            />

            <TextInput
                placeholder="Enter Pokemon Code"
                style={styles.input}
                value={newCode}
                onChangeText={setNewCode}
                keyboardType="numeric"
            />

            <View style = {styles.pickerWrapper}>
                <Picker
                    selectedValue={newType}
                    onValueChange={(value) => setNewType(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Water" value="Water" />
                    <Picker.Item label="Fire" value="Fire" />
                    <Picker.Item label="Electric" value="Electric" />
                </Picker>
            </View>

            <TouchableOpacity
                style = {styles.buttonStyle}
                onPress={addPokemon}
            >
                <Text style={styles.buttonText}>
                    ADD POKEMON
                </Text>
            </TouchableOpacity>

            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader = {sectionHeader}
            />
            <StatusBar style="auto" />
        </View>
    );
};


const styles = StyleSheet.create({

    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 50,
        textAlign: 'center',
        flex: 1,
    },

    headerText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1
    },

    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 10,
    },

    opacityStyle: {
        borderWidth: 1,
        backgroundColor: '#e2dce3',
    },

    buttonStyle: {
        backgroundColor: '#1d86e2',
        padding: 2,
        marginHorizontal: 20,
        borderWidth: 2,
        borderColor: 'darkblue',
    },

    buttonText: {
        fontSize:20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },

    container : {
        flex: 1,
        backgroundColor: "black",
        gap: 12,
    },

    image: {
        width: 120,
        height: 180,
        resizeMode: 'contain',
        marginLeft:10,
    },

    pickerWrapper: {
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: 20,
        marginTop: 10,
    },

    picker: {
        height: 50,
        width: "100%",
    },

});

const handler = () => {
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
}


const renderItem = ({item}) => {
    let cardimg = "https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_" + item.code + "-2x.png"
    return(
        <TouchableOpacity style={styles.opacityStyle} onPress={handler}>
            <View style={{ margin: 10, flexDirection: 'row' }}>
                <Text style={styles.textStyle}>{item.key}</Text>
                <Image source={{ uri: cardimg }} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
};

const sectionHeader = ({section: {title, bgcolor, icon}}) => {
    return(
        <Text style={[styles.headerText, {backgroundColor: bgcolor}]}>
            <FontAwesome6 name = {icon} size={20} color="#B23B23" /> {title}
        </Text>
    );
};


export default App;
