import React, { FC } from 'react';
import { HomeScreen } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

export type BottomTabsParamList = {
  Home: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabs: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // Возвращаем иконку для каждой вкладки
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      // tabBarOptions={{
      //   activeTintColor: 'tomato',
      //   inactiveTintColor: 'gray',
      // }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};
