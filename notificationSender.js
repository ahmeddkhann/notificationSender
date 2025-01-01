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
}