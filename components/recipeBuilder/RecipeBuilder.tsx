import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import RecipeProvider from "../providers/RecipeProvider";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Text } from "../ui/text";
import Builder from "./Builder";
import { Button } from "../ui/button";
import lodash from "lodash";
import Nutrients from "./Nutrients";

const RecipeBuilder = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState("ingredients");

  const tabKeys = [
    "ingredients",
    "nutrients",
    "stabilizers",
    "additives",
    "notes",
    "save",
  ];

  const next = () => {
    const nextIndex = tabKeys.indexOf(tab) + 1;
    if (nextIndex <= tabKeys.length - 1) {
      setTab(tabKeys[nextIndex]);
    }
  };
  const prev = () => {
    const prevIndex = tabKeys.indexOf(tab) - 1;
    if (prevIndex >= 0) {
      setTab(tabKeys[prevIndex]);
    }
  };

  const navButtonProps = {
    prev: {
      onPress: prev,
      disabled: tabKeys.indexOf(tab) === 0,
    },
    next: {
      onPress: next,
      disabled: tabKeys.indexOf(tab) === tabKeys.length - 1,
    },
  };

  return (
    <RecipeProvider>
      <View className="flex-1">
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <ScrollView horizontal>
              {tabKeys.map((tab) => (
                <TabsTrigger value={tab} key={tab}>
                  <Text>{lodash.capitalize(tab)}</Text>
                </TabsTrigger>
              ))}
            </ScrollView>
          </TabsList>

          <TabsContent value="ingredients">
            <Builder>
              <NavButtons {...navButtonProps} />
            </Builder>
          </TabsContent>
          <TabsContent value="nutrients">
            <Nutrients disabled>
              <NavButtons {...navButtonProps} />
            </Nutrients>
          </TabsContent>
          <TabsContent value="save">
            <NavButtons {...navButtonProps} />
          </TabsContent>
        </Tabs>
      </View>
    </RecipeProvider>
  );
};

export default RecipeBuilder;

const NavButtons = ({
  next,
  prev,
}: {
  next: { onPress: () => void; disabled: boolean };
  prev: { onPress: () => void; disabled: boolean };
}) => (
  <View className="flex flex-row gap-4 mt-4 mb-32">
    <Button className="flex-1" {...prev}>
      <Text>Previous</Text>
    </Button>
    <Button className="flex-1" {...next}>
      <Text>Next</Text>
    </Button>
  </View>
);
