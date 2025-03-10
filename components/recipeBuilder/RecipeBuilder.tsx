import { ScrollView, View } from "react-native";
import React from "react";
import RecipeProvider from "../providers/RecipeProvider";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../ui/language-switcher";
import Units from "./Units";
import { useRecipe } from "../providers/RecipeProvider";
import DesiredBatchDetails from "./DesiredBatchDetails";
import Ingredients from "./Ingredients";
import Results from "./Results";
import ScaleRecipeForm from "./ScaleRecipeForm";

const RecipeBuilder = () => {
  const { t } = useTranslation();

  return (
    <RecipeProvider>
      <View className="flex-1">
        <ScrollView className="px-3 py-4" showsVerticalScrollIndicator={true}>
          <View className="flex items-end">
            <LanguageSwitcher />
          </View>
          <Units useRecipe={useRecipe} />
          <DesiredBatchDetails />
          <Ingredients useRecipe={useRecipe} />
          <Results useRecipe={useRecipe} />
          <ScaleRecipeForm useRecipe={useRecipe} />
        </ScrollView>
      </View>
    </RecipeProvider>
  );
};

export default RecipeBuilder;
