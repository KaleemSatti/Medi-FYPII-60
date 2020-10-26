import React,{useEffect,useState} from 'react';
import MapView from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import mapStyles from '../../mapStyles';
import * as Permissions from 'expo-permissions';
import theme from '../../themes';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width,height}  = Dimensions.get('screen');
const Request = (props) => {
    const [latitude,setLatitude] = useState(0);
    const [longitude,setLongitude] = useState(0);
    useEffect(() => {
        async function getPermission(){
            const status = await Permissions.askAsync(Permissions.LOCATION);
            if(status.granted){
                navigator.geolocation.getCurrentPosition(({coords})=>{
                    setLongitude(coords.longitude);
                    setLatitude(coords.latitude);
                });
            console.log('Set Intial Region!');
            } 
        }
        getPermission();
    }, []);

    const PutMarker = ({longitude,latitude}) =>{
        if(latitude){
            return(
                <MapView.Marker draggable 
                pinColor="pink"
                coordinate={{
                    longitude:longitude,
                    latitude:latitude
                }}
            />
        );
        }else{
            return (null);
        }
    }
    
    return(
        <View style={{flex:1,marginTop:1}}>
            {longitude!=0&&(
                <View style={{height:'92%'}}>
                    <MapView 
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={{width:'100%',height:'100%',zIndex:1}}
                        provider="google"
                        maxZoomLevel={20}
                        minZoomLevel={18}
                        customMapStyle={mapStyles}
                        region={{
                            latitude,
                            longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        rotateEnabled
                    >
                        <PutMarker longitude={longitude} latitude={latitude}/>
                    </MapView>
                    <View style={{backgroundColor:"#dee1ec",margin:1,marginTop:0}}>
                        <TouchableOpacity style={styles.Background}>
                            <Text style={styles.Button}>Get Help!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    Background:{
        height:'100%',
        width:'60%',
        alignSelf:'center',
        marginTop:2
    },
    Button:{
        backgroundColor:theme.secondary,
        color:'white',
        padding:10,
        fontSize: 22,
        width:'100%',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 10
    }
})
export default Request;