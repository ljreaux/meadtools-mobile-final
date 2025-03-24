import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Text } from "../ui/text";
import { useTranslation } from "react-i18next";
import { extraCalcTabs } from "~/lib/extraCalcTabs";

const ExtraCalcs = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(extraCalcTabs[0].label);

  return (
    <View className="flex-1">
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
      >
        <TabsList className="flex-row w-full">
          <ScrollView horizontal>
            {extraCalcTabs.map(({ label }) => (
              <TabsTrigger value={label} key={label}>
                <Text>{t(label)}</Text>
              </TabsTrigger>
            ))}
          </ScrollView>
        </TabsList>

        {extraCalcTabs.map(({ component, label }) => (
          <TabsContent key={label} value={label}>
            {component}
          </TabsContent>
        ))}
      </Tabs>
    </View>
  );
};

export default ExtraCalcs;
