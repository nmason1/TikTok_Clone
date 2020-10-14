import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  AntDesign,
  Fontisto
} from "@expo/vector-icons";
import Home from "./screens/Home";
import Comments from "./screens/Comments";
import Discover from "./screens/Discover";
import Inbox from "./screens/Inbox";
import Me from "./screens/Me";

import { NavigationContainer } from "@react-navigation/native";
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [comments, setComments] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        labeled={true}
        barStyle={{ backgroundColor: "transparent", position: "absolute" }}
      >
        <Tab.Screen
          name="Home"
          children={() => (
            <Home setComments={setComments} comments={comments} />
          )}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({}) => (
              <View>
                <Ionicons name="ios-home" size={24} color="white" />
              </View>
            )
          }}
        />

        <Tab.Screen
          name="Discover"
          children={() => <Discover />}
          options={{
            tabBarLabel: "Discover",
            tabBarIcon: ({}) => (
              <View>
                <SimpleLineIcons name="magnifier" size={24} color="white" />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Add"
          children={() => <Discover />}
          options={{
            tabBarIcon: ({}) => (
              <View>
                <MaterialCommunityIcons
                  name="plus-box-outline"
                  size={24}
                  color="white"
                />
              </View>
            )
          }}
        />

        <Tab.Screen
          name="Comments"
          children={() => <Comments comments={comments} />}
          options={{
            tabBarLabel: "Comments",
            tabBarIcon: ({}) => (
              <View>
                <MaterialIcons name="chat" size={24} color="white" />
              </View>
            )
          }}
        />

        <Tab.Screen
          name="Me"
          children={() => <Me />}
          options={{
            tabBarLabel: "Me",
            tabBarIcon: ({}) => (
              <View>
                <AntDesign name="user" size={24} color="white" />
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  }
});
