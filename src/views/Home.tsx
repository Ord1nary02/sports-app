import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context"
import { Cricket } from "./Cricket";
import { Football } from "./Football";
import { View } from "react-native";


const TopTab = createMaterialTopTabNavigator();
export const Home = () => {
    return (
        <View
        style={{flex : 1 , backgroundColor : '#00000'}} 
    >
        <TopTab.Navigator
        initialRouteName="Cricket"
        screenOptions={{
            tabBarStyle: {
            borderRadius: 5,
            backgroundColor: "#000000",
            paddingTop : '10%'
            },
            tabBarLabelStyle: {
            textAlign: "center",
            color : '#FFFFFF'
            },
            tabBarIndicatorStyle: {
                height : 3,
                backgroundColor : '#FFFFFF'
            }
        }}
        >
        <TopTab.Screen name="Cricket" component={Cricket} />
        <TopTab.Screen name="Football" component={Football} />
        </TopTab.Navigator>

    </View>
    )
}