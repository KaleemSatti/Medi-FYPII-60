import React,{useState} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import theme from '../../themes';
import Contribute from './Contribute';

const HomeScreen = (props) => {
    const {width,height} = Dimensions.get('screen');
    const [activeNow,setActiveNow] = useState("FirstAid");
    function activeStyles(component){
        if(component===activeNow){
            return styles.activeService
        }
        else{
            return styles.inactiveService
        }
    }
    return(
        <View style={{flex:1}}>
            <View>
                <Text style={[styles.Heading,{paddingBottom:0,marginTop:35}]}>Always Ready</Text>
                <Text style={[styles.Heading,{paddingTop:0}]}>anytime & anywhere!</Text>

                <Text style={[styles.Heading,{fontSize:20,paddingTop:0,paddingBottom:5}]}>Services By Category</Text>
                <ScrollView horizontal contentContainerStyle={{
                    paddingLeft:20
                }}
                showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity style={{width:width*0.40,margin:5}} onPress={()=>setActiveNow("FirstAid")}>
                        <Text style={activeStyles("FirstAid")}>First Aid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:width*0.40,margin:5}} onPress={()=>setActiveNow("Donations")}>
                        <Text style={activeStyles("Donations")}>Donations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:width*0.40,margin:5}} onPress={()=>setActiveNow("Health")}>
                        <Text style={activeStyles("Health")}>Health</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:width*0.40,margin:5}} onPress={()=>setActiveNow("Contribute")}>
                        <Text style={activeStyles("Contribute")}>Contribute</Text>
                    </TouchableOpacity>
                </ScrollView>
                {activeNow==="Contribute"&&(
                    <Contribute props={props}/>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Heading:{
        fontSize:35,
        fontWeight:'bold',
        padding:30,
        color:theme.tabBar
    },
    activeService:{
        backgroundColor:theme.secondary,
        color:theme.white,
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        borderRadius:30,
        padding:10,
    },
    inactiveService:{
        backgroundColor:theme.white,
        color:theme.tabBar,
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        borderRadius:30,
        padding:10,
        borderWidth:0.2
    }
}); 
export default HomeScreen;