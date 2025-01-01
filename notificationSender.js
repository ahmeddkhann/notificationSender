import React, {useState, useEffect, useRef} from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {Constants} from "expo-constants";
import { Platform } from "react-native";

const usePushNotifications = () => {
    Notifications.setNotificationHandler ({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false
        })
    })

    const [expoPushToken, setExpoPushToken] = useState();
    const [notifications, setNotifications] = useState();
    const notificationListner = useRef();
    const notificationResponse = useRef();

    async function registerForPushNotificationsAsync (){
        let token ;

        if (Device.isDevice){
            const {status} = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus;

            if (existingStatus !== "granted"){
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            };
            if (existingStatus !== "granted"){
                alert("Failed to get push token")
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId
            });

            if (Platform.OS == "android"){
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    imposrtance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "red"
                })
            }

            return token;
        }else {
            console.log("Please use a physical device");
            
        }
    }
}