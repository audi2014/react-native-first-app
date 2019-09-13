import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {LoginScreen} from "./screens/Login";
import {ProductsScreen} from "./screens/Products";
import {RegisterScreen} from "./screens/Register";
import React from "react";
import {ProductInfoScreen} from "./screens/ProductInfo";
import {ProductReviewsScreen} from "./screens/ProductReviews";
import {NavigationRight, Text} from "./components";
import {ProfileScreen} from "./screens/Profile";

import ('react-native-vector-icons/Fonts/Ionicons.ttf')

const Navigation = createDrawerNavigator({
    Stack:createStackNavigator({
        mainFlow: createStackNavigator({
            Products: {screen: ProductsScreen,},
            ProductInfo: {screen: ProductInfoScreen},
            ProductReviews: {screen: ProductReviewsScreen},
            Profile: {screen: ProfileScreen},
        }, {
            defaultNavigationOptions: {
                headerRight: <NavigationRight/>
            },
        }),
        loginFlow: createStackNavigator({
            Login: {screen: LoginScreen},
            Register: {screen: RegisterScreen},
        }),
    }, {
        defaultNavigationOptions: {
            header: null,
        },

    })
});

const AppContainer = createAppContainer(Navigation);



export const App = AppContainer;
