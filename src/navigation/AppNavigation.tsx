import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Cricket } from "../views/Cricket";
import { Football } from "../views/Football";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTab = createMaterialTopTabNavigator();
export const AppNavigation = () => {
  return (
    <SafeAreaView
        style={{flex : 1 , backgroundColor : '#00000'}} 
    >
        <TopTab.Navigator
        initialRouteName="Cricket"
        screenOptions={{
            tabBarStyle: {
            borderRadius: 5,
            backgroundColor: "#000000",
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

    </SafeAreaView>
  );
};
