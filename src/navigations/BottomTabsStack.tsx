import React, { FC } from 'react';
import { 
  AchievenessScreen, 
  DictionaryScreen, 
  HomeScreen, 
  TrainingsScreen 
} from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HeaderComponent,
  PlanetIconComponent,
  SettingsIconComponent,
  TabBarComponent
} from '../components';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export type BottomTabsParamList = {
  Home: undefined;
  Dictionary: undefined;
  Trainings: undefined;
  Achieveness: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabs: FC = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator tabBar={props => <TabBarComponent {...props} />}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          header: () => 
            <HeaderComponent 
              leftIcon={() => <PlanetIconComponent disabled={false} />} 
              rightIcon={() => <SettingsIconComponent disabled={false} />} 
              title="WORDS"
              titleStyle={styles.words}
            />
        }} 
      />
      <Tab.Screen 
        name="Dictionary" 
        component={DictionaryScreen} 
        options={{ 
          header: () => 
            <HeaderComponent 
              leftIcon={() => <PlanetIconComponent disabled={false} />} 
              rightIcon={() => <SettingsIconComponent disabled={false} />} 
              title={t("My dictionary")} 
            />
        }} 
      />
      <Tab.Screen 
        name="Trainings" 
        component={TrainingsScreen} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Achieveness" 
        component={AchievenessScreen} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  words: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 8,
    textAlign: "center"
  },
});
