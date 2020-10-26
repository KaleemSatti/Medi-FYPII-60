import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Image, ScrollView } from 'react-native';
import theme from '../../themes';
import { CommonActions } from '@react-navigation/native';

const LogIn = (props) => {
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [activity,showActivity] = useState(false);

    async function logIn(){
        showActivity(true);
        setTimeout(() => {
            showActivity(false);
            props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'HOME' },
                  ],
                })
              );
        }, 3000);
    }
    return(
        <View>
            <Image source={require('../../assets/icon-removebg-preview.png')} style={{width:'60%', height:'40%',alignSelf:'center'}} resizeMode='contain'/>
            <Text style={styles.MainHeading}>Log In To Medi</Text>            
                <View style={styles.OtherView}>
                    <TextInput 
                        value={phone}
                        placeholder="Enter Your Phone Number"
                        placeholderTextColor={theme.white}
                        onChangeText={(text)=>setPhone(text)}
                        style={styles.TextStyles}
                    />
                    {phone?executeRule("Phone",phone):null}
                </View>
                <Text style={styles.RestrictionText}>Format: 11 Digits Only, No Alphabets</Text>

                <View style={styles.OtherView}>
                    <TextInput 
                        value={password}
                        placeholder="Enter Your Password"
                        placeholderTextColor={theme.white}
                        onChangeText={(text)=>setPassword(text)}
                        style={styles.TextStyles}
                    />
                    {password?executeRule("Password",password):null}
                </View>
                <Text style={styles.RestrictionText}>Password must contain Special Characters {"[!,?,@,#,$,%,^,&]"}</Text>
                
                <TouchableOpacity style={styles.SaveButton} onPress={async()=>await logIn()}>
                {activity==false?(
                    <Text style={styles.SaveText}>Save Information</Text>
                ):(
                    <ActivityIndicator size={60} color={theme.white} style={styles.SaveText}/>
                )}
                </TouchableOpacity>

                <TouchableOpacity style={[styles.SaveButton,{marginTop:'5%'}]} onPress={()=>{
                    props.navigation.navigate('SignUp')
                }}>
                {activity==false?(
                    <Text style={styles.SaveText}>Create Account</Text>
                ):(
                    <ActivityIndicator size={60} color={theme.white} style={styles.SaveText}/>
                )}
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    MainHeading: {
      fontSize: 28,
      fontWeight: "bold",
      padding: 30,
      color: theme.tabBar,
      paddingTop:0
    },
    OtherView: {
      flexDirection: "row",
      backgroundColor: theme.tabBar,
      width: "90%",
      alignSelf: "center",
      borderRadius: 10,
    },
    TextStyles: {
      padding: 15,
      alignSelf: "center",
      color: theme.white,
      flex: 0.9,
      fontSize:16
    },
    IconStyles: {
      justifyContent: "center",
      alignItems: "center",
      textAlignVertical: "center",
    },
    RestrictionText: {
      padding: 22,
      color: theme.tabBar,
      paddingTop: 0,
    },
    SaveButton:{
      backgroundColor: theme.secondary,
      width: "50%",
      alignSelf: "flex-start",
      borderRadius: 20,
      marginLeft:20
    },
    SaveText: {
      padding: 15,
      color: theme.white,
      fontSize:22,
      fontWeight:'bold',
      textAlign:'center',
    },
  });

export default LogIn;