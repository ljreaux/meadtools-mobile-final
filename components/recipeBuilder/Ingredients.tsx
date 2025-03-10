import { Ingredient, IngredientDetails, Recipe } from "~/types/recipeDataTypes";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import SearchableInput from "../ui/SearchableInput";
import { useTranslation } from "react-i18next";
import InputWithUnits from "../InputWithUnits";
import { Text } from "../ui/text";
import { View } from "react-native";
import SectionCard from "./SectionCard";

function Ingredients({ useRecipe }: { useRecipe: () => Recipe }) {
  const { t } = useTranslation();
  const {
    ingredients,
    removeIngredient,
    changeIngredient,
    loadingIngredients,
    updateIngredientWeight,
    updateIngredientVolume,
    updateBrix,
    toggleSecondaryChecked,
    addIngredient,
    ingredientList,
    units,
    fillToNearest,
  } = useRecipe();

  if (loadingIngredients) {
    return <Text>Loading</Text>;
  }

  return (
    <SectionCard>
      <Text> {t("recipeBuilder.labels.ingredients")}</Text>
      <View>
        {ingredients.length === 0
          ? "Add Some Ingredients to Continue Building your Recipe."
          : ingredients.map((ing, i) => {
              return (
                <View
                  className={`${
                    i !== ingredients.length - 1
                      ? "border-b border-dotted border-muted-foreground"
                      : ""
                  }`}
                  key={i}
                >
                  <IngredientLine
                    units={units}
                    ingredientList={ingredientList}
                    ing={ing}
                    deleteFn={() => removeIngredient(ing.id)}
                    changeIng={(val) => changeIngredient(ing, i, val)}
                    updateWeight={(val) => {
                      updateIngredientWeight(ing, ing.id, val);
                    }}
                    updateVolume={(val) => {
                      updateIngredientVolume(ing, ing.id, val);
                    }}
                    updateBrix={(val) => {
                      updateBrix(val, ing.id);
                    }}
                    toggleChecked={(val) => {
                      toggleSecondaryChecked(ing.id, val);
                    }}
                    fillToNearest={() => fillToNearest(ing.id)}
                    index={i}
                  />
                </View>
              );
            })}
      </View>
      <Button
        onPress={addIngredient}
        variant={"secondary"}
        disabled={ingredients.length >= 10}
      >
        <Text>{t("recipeBuilder.addNew")}</Text>
      </Button>
    </SectionCard>
  );
}

export default Ingredients;

const IngredientLine = ({
  units,
  ingredientList,
  ing,
  deleteFn,
  changeIng,
  updateWeight,
  updateVolume,
  updateBrix,
  toggleChecked,
  fillToNearest,
  index,
}: {
  ing: IngredientDetails;
  deleteFn: () => void;
  changeIng: (val: string) => void;
  updateWeight: (val: string) => void;
  updateVolume: (val: string) => void;
  updateBrix: (val: string) => void;
  toggleChecked: (val: boolean) => void;
  ingredientList: Ingredient[];
  units: { weight: string; volume: string };
  fillToNearest: () => void;
  index: number;
}) => {
  const { t } = useTranslation();

  const handleIngredientSelect = (selectedIngredient: Ingredient) => {
    changeIng(selectedIngredient.name);
  };

  return (
    <View className="my-4">
      <View className="flex flex-row w-full gap-2 my-2">
        <View className="flex-1">
          <Text> {t("ingredient")}</Text>
          <SearchableInput
            items={ingredientList}
            query={ing.name}
            setQuery={(value) => changeIng(value)}
            keyName="name"
            onSelect={handleIngredientSelect}
          />
        </View>
        {/* Other fields */}
        <View className="flex-1">
          <Text>{t("BRIX")}</Text>
          <Input
            value={ing.brix}
            inputMode="decimal"
            onChangeText={updateBrix}
          />
        </View>
      </View>
      <View className="flex flex-row w-full gap-2 my-2">
        <View className="flex-1">
          <Text>{t("recipeBuilder.labels.weight")}</Text>
          <InputWithUnits
            value={ing.details[0]}
            handleChange={updateWeight}
            text={units.weight}
          />
        </View>
        <View className="flex-1">
          <Text>{t("recipeBuilder.labels.volume")}</Text>
          <InputWithUnits
            value={ing.details[1]}
            handleChange={updateVolume}
            text={units.volume}
          />
        </View>
      </View>
      <View className="flex flex-row items-center gap-2 my-4">
        <Text>{t("recipeBuilder.labels.secondary")}</Text>
        <Switch checked={ing.secondary} onCheckedChange={toggleChecked} />
      </View>
      <Button onPress={deleteFn} variant="destructive">
        <Text>{t("desktop.delete")}</Text>
      </Button>
      <Button onPress={fillToNearest} className="my-2">
        <Text>{t("toNextVolume", { volumeUnit: units.volume })}</Text>
      </Button>
    </View>
  );
};
