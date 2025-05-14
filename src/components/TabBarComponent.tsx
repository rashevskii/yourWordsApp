import React, { FC } from "react";
import HomeIcon from "../assets/icons/home.svg";
import DictionaryIcon from "../assets/icons/letter-w.svg";
import TrainingsIcon from "../assets/icons/hat-graduation.svg";
import AchievenessIcon from "../assets/icons/diagram.svg";
import { 
  StyleSheet,
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { 
  NavigationHelpers, 
  ParamListBase, 
  TabNavigationState 
} from "@react-navigation/native";
import { 
  BottomTabDescriptorMap, 
  BottomTabNavigationEventMap 
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { EdgeInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks";

export interface TabBarComponentProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  insets: EdgeInsets;
}

export const TabBarComponent: FC<TabBarComponentProps> = ({ state, descriptors, navigation }) => {
  const { t } = useTranslation();
  const { colors: { background } } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const getLabel = () => {
          if (route.name === "Home") {
            return "Home";
          } else if (route.name === "Dictionary") {
            return "Dictionary";
          } else if (route.name === "Trainings") {
            return "Trainings";
          } else if (route.name === "Achieveness") {
            return "Achieveness";
          } else return "";
        }

        const Icon = () => {
          if (route.name === "Home") {
            return <HomeIcon width={45} height={45} />;
          } else if (route.name === "Dictionary") {
            return <DictionaryIcon width={45} height={45} />;
          } else if (route.name === "Trainings") {
            return <TrainingsIcon width={45} height={45} />;
          } else if (route.name === "Achieveness") {
            return <AchievenessIcon width={45} height={45} />;
          }
          return <HomeIcon width={45} height={45} />;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <Icon />
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {t(getLabel())}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    paddingVertical: 7, 
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center"
  }
});