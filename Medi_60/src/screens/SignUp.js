import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Image } from 'react-native';
import theme from '../../themes';

const SignUp = (props) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [bloodGroup,setBloodGroup] = useState("");
    const [image,setImage] = useState("");
    const [activity,showActivity] = useState(false);

    function getImagesSeleceted(Images){
        if(Images){
            setImage(Images);
        }
    }

    async function saveUser(){
        showActivity(true);
        setTimeout(() => {
            showActivity(false);
            props.navigation.goBack();
        }, 4000);
    }
    function executeRule(ruleType,value){
        let length = value.length;
        if(length==0){
            return <View></View>
        }
        else{
            switch(ruleType){
                case "Name":
                    if(length>=3){
                        okArray[0] = true;
                        return <MaterialIcons name="done-all" size={50} color={theme.success} style={styles.IconStyles}/>
                    }
                    else{
                        okArray[0] = false;
                        return <MaterialIcons name="error" size={40} color={theme.error} style={styles.IconStyles}/>
                    }
                case "Email":
                    if(value.includes("@")&&value.includes(".com")){
                        okArray[1] = true;
                        return <MaterialIcons name="done-all" size={40} color={theme.success} style={styles.IconStyles}/>
                    }
                    else{
                        okArray[1] = false;
                        return <MaterialIcons name="error" size={40} color={theme.error} style={styles.IconStyles}/>
                    }
                case "Password":
                    let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                    if(value.search(regularExpression)>=0){
                        okArray[2] = true;
                        return <MaterialIcons name="done-all" size={40} color={theme.success} style={styles.IconStyles}/>
                    }
                    else{
                        okArray[2] = false;
                        return <MaterialIcons name="error" size={40} color={theme.error} style={styles.IconStyles}/>
                    }
                case "Phone":
                    if(length==11&&value.match(/^[0-9]+$/)!=null){
                        okArray[3] = true;
                        return <MaterialIcons name="done-all" size={40} color={theme.success} style={styles.IconStyles}/>
                    }
                    else{
                        okArray[3] = false;
                        return <MaterialIcons name="error" size={40} color={theme.error} style={styles.IconStyles}/>
                    }
                case "Age":
                    if(value.match(/^[0-9]+$/)!=null&&value>=18&&value<=45){
                        okArray[4] = true;
                        return <MaterialIcons name="done-all" size={40} color={theme.success} style={styles.IconStyles}/>
                    }
                    else{
                        okArray[4] = false;
                        return <MaterialIcons name="error" size={40} color={theme.error} style={styles.IconStyles}/>
                    }
                case "BloodGroup":
                    if(["A+","A-","B+","B-","O+","O-"].includes(value)){
                        okArray[5] = true;
                        return <MaterialIcons name="done-all" size={40} color={theme.success} style={styles.IconStyles}/>
                    }
                    else{
                        okArray[5] = false;
                        return <MaterialIcons name="error" size={40} color={theme.error} style={styles.IconStyles}/>
                    }
                case "Images":
                    if(value.length==2){
                        okArray[6] = true;
                        return <MaterialIcons name="done-all" size={40} color={theme.success} style={styles.IconStyles}/>
                    }
                    else{
                        okArray[6] = false;
                        return <MaterialIcons name="error" size={40} color={theme.error} style={styles.IconStyles}/>
                    }
            }
        }
    }


    return(
        <View>
            <Image source={require('../../assets/icon-removebg-preview.png')} style={{width:'30%', height:'10%', alignSelf:'center'}} resizeMode='contain'/>
            <Text style={styles.MainHeading}>Create New Account</Text>
            <ScrollView>

                <View style={styles.OtherView}>
                    <TextInput 
                        value={name}
                        placeholder="Enter Your Name"
                        placeholderTextColor={theme.white}
                        onChangeText={(text)=>setName(text)}
                        style={styles.TextStyles}
                    />
                    {name?executeRule("Name",name):null}
                </View>
                <Text style={styles.RestrictionText}>Name must be 3 characters or more</Text>

                <View style={styles.OtherView}>
                    <TextInput 
                        value={email}
                        placeholder="Enter Your Email Address"
                        placeholderTextColor={theme.white}
                        onChangeText={(text)=>setEmail(text)}
                        style={styles.TextStyles}
                    />
                    {email?executeRule("Email",email):null}
                </View>
                <Text style={styles.RestrictionText}>Format: example123@service.com</Text>

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
                    value={bloodGroup}
                    placeholder="Enter Your BloodGroup"
                    placeholderTextColor={theme.white}
                    onChangeText={(text)=>setBloodGroup(text)}
                    style={styles.TextStyles}
                />
                {bloodGroup?executeRule("BloodGroup",bloodGroup):null}
            </View>
            <Text style={styles.RestrictionText}>Valid Items: A+, A-, B+, B-, O+, O-</Text>

            <View style={styles.OtherView}>
                <TouchableOpacity style={styles.TextStyles}onPress={()=>{
                    props.navigation.navigate('SelectImages',{
                        setImages:getImagesSeleceted
                    });
                }}>
                    <Text style={{color:'white',fontSize:16}}>{image.length>0?image.length+" Image Selected":"Choose Licence Front and Back Image"}</Text>
                </TouchableOpacity>
                {image?executeRule("Images",image):null}
            </View>
            <Text style={styles.RestrictionText}>Take Or Choose Your Picture</Text>

            <TouchableOpacity style={styles.SaveButton} onPress={async()=>await saveUser()}>
                {activity==false?(
                    <Text style={styles.SaveText}>Save Information</Text>
                ):(
                    <ActivityIndicator size={60} color={theme.white} style={styles.SaveText}/>
                )}
            </TouchableOpacity>

            <View style={{marginTop:200}}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    MainHeading: {
      fontSize: 28,
      fontWeight: "bold",
      padding: 30,
      color: theme.tabBar,
      paddingTop:0,
      alignSelf:'center'
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

export default SignUp;