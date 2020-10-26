import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import theme from '../../themes';

const Contribute = ({props}) => {
    return(
        <ScrollView>
            <TouchableOpacity style={styles.Container} onPress={()=>console.log('Heart Saved!')}>
                <FontAwesome name="heartbeat" size={50} color={theme.secondary} style={styles.icon}/>
                <Text style={styles.Text}>
                    Become A Donor
                    <Text style={{fontSize:13}}>{'\n'}Save Lives By Giving Blood</Text>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Container} onPress={()=>{
                props.navigation.navigate("DriverSignUp");
            }}>
                <MaterialCommunityIcons name="car-connected" size={50} color={theme.secondary} style={styles.icon}/>
                <Text style={styles.Text}>
                    Become A Driver
                    <Text style={{fontSize:13}}>{'\n'}Save Lives By Helping People</Text>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Container} onPress={()=>console.log('Ambulance Saved!')}>
                <MaterialCommunityIcons name="ambulance" size={50} color={theme.secondary} style={styles.icon}/>
                <Text style={styles.Text}>
                    Add Your Ambulance
                    <Text style={{fontSize:13}}>{'\n'}Register Your Ambulance With Us and Save Lives.</Text>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Container} onPress={()=>console.log('Donation Saved!')}>
                <FontAwesome5 name="hands" size={45} color={theme.secondary} style={styles.icon}/>
                <Text style={styles.Text}>
                    Give a Donation
                    <Text style={{fontSize:13}}>{'\n'}Donate for a cause, Donate to Save Lives!</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    icon:{
        flex:0.2,padding:10,alignSelf:'center'
    },
    Container:{
        flexDirection:'row',margin:10,backgroundColor:'white',shadowColor:'black',shadowOpacity:1,elevation:5,borderRadius:10
    },
    Text:{
        flex:0.8,fontSize:21,fontWeight:'bold',textAlignVertical:'center',color:theme.tabBar
    }
});

export default Contribute;