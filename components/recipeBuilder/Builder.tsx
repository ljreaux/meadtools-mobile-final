import { View, ScrollView } from "react-native";
import React from "react";
import LanguageSwitcher from "../ui/language-switcher";
import Units from "./Units";
import DesiredBatchDetails from "./DesiredBatchDetails";
import Ingredients from "./Ingredients";
import Results from "./Results";
import ScaleRecipeForm from "./ScaleRecipeForm";
import { useRecipe } from "../providers/RecipeProvider";

const Builder = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ScrollView className="px-3 py-4" showsVerticalScrollIndicator={true}>
      {/* <View className="flex items-end">
        <LanguageSwitcher />
      </View> */}
      <Units useRecipe={useRecipe} />
      <DesiredBatchDetails />
      <Ingredients useRecipe={useRecipe} />
      <Results useRecipe={useRecipe} />
      <ScaleRecipeForm useRecipe={useRecipe} />
      {children}
    </ScrollView>
  );
};

export default Builder;
