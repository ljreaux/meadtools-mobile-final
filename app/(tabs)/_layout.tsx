import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Wine } from "~/lib/icons/Wine";
import { Scale } from "~/lib/icons/Scale";
import { CircleUser } from "~/lib/icons/CircleUser";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "UbuntuMono_400Regular",
        },
        headerRight: () => (
          <View className="flex-row items-center">
            <ThemeToggle />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("recipeBuilder.homeHeading"),
          tabBarIcon: ({ color }) => <Wine size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="extraCalcs"
        options={{
          title: t("calculators.extraCalcs.label"),
          tabBarIcon: ({ color }) => <Scale size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t("accountPage.title"),
          tabBarIcon: ({ color }) => <CircleUser size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
