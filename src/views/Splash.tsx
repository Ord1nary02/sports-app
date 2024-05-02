import React, { useEffect } from "react"
import { View , Image, Text} from "react-native"
import {useNavigation} from '@react-navigation/native'

export const Splash = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            
            navigation.reset({
                index : 0,
                //@ts-ignore
                routes : [{name : 'Home'}]
            })
        } , 3000)
    } , [])
    return (
        <View
            style={{
                flex : 1,
                backgroundColor : '#F3CA52',
                justifyContent : 'center',
                alignItems : 'center'
            }}
        >
            <Image 
                source={require('../../assets/football.png')}
                resizeMode="contain"
                style={{
                    width : '80%'
                }}
            />
            <Text
                style={{
                    fontSize: 30,
                    fontWeight : "800"
                }}
            >SPORTS APP</Text>
            <Text
                style={{
                    fontSize : 18,
                }}
            >by</Text>
            <Text
                style={{
                    fontSize : 20,
                    fontWeight : '800'
                }}
            >Ammar Siddiqui</Text>
        </View>
    )
}