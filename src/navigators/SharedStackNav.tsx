import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screeens/Profile";
import Feed from "../screeens/Feed";
import Search from "../screeens/Search";
import Me from "../screeens/Me";
import Notifications from "../screeens/Notifications";
import { Image, View } from "react-native";
import { RootStackParamList, TabParamList } from "../types";
import PhotoScreen from "../screeens/PhotoScreen";
import Likes from "../screeens/Likes";
import Comments from "../screeens/Comments";
import useMe from "../hooks/useMe";

type Prop = {
  screenName: keyof TabParamList;
};
const Stack = createStackNavigator<TabParamList>();
export default function SharedStackNav({ screenName }: Prop) {
  const { data } = useMe();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "black",
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"Feed"}
          component={Feed}
          options={{
            headerTitle: (props) => (
              <Image
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="contain"
                source={require("../../assets/instagram-logo-black-on-white.webp")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : null}
      {screenName === "Me" ? (
        <Stack.Screen
          name={"Me"}
          component={Profile}
          initialParams={{ username: data?.me?.username }}
        />
      ) : null}
      <Stack.Screen
        name={"Profile"}
        component={Profile}
        options={({ route }) => ({
          title: route.params?.username,
        })}
      />
      <Stack.Screen name={"PhotoScreen"} component={PhotoScreen} />
      <Stack.Screen name={"Likes"} component={Likes} />
      <Stack.Screen name={"Comments"} component={Comments} />
    </Stack.Navigator>
  );
}
