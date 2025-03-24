import { View } from "react-native";
import RecipeBuilder from "~/components/recipeBuilder/RecipeBuilder";

export default function Screen() {
  return (
    <View className="flex-1 gap-5 p-4 bg-secondary/70">
      <RecipeBuilder />
    </View>
  );
}
