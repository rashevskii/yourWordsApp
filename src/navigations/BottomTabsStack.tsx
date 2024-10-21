import React, { FC } from 'react';
import { 
  AchievenessScreen, 
  DictionaryScreen, 
  HomeScreen, 
  TrainingsScreen 
} from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderComponent, PlanetIconComponent, SettingsIconComponent, TabBarComponent } from '../components';
import { useTranslation } from 'react-i18next';

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
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Dictionary" 
        component={DictionaryScreen} 
        options={{ 
          header: () => 
            <HeaderComponent 
              leftIcon={() => <PlanetIconComponent />} 
              rightIcon={() => <SettingsIconComponent />} 
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
