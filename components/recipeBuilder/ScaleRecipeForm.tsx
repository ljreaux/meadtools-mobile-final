import { FormEvent, useState } from "react";
import { isValidNumber, parseNumber } from "~/lib/utils/validateInput";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Recipe } from "~/types/recipeDataTypes";
import InputWithUnits from "../InputWithUnits";
import { View } from "react-native";
import { Text } from "../ui/text";
import SectionCard from "./SectionCard";

function ScaleRecipeForm({ useRecipe }: { useRecipe: () => Recipe }) {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const {
    scaleRecipe,
    totalVolume,
    units: { volume },
  } = useRecipe();
  const [scaled, setScaled] = useState("0.000");

  const scale = () => {
    scaleRecipe(totalVolume, parseNumber(scaled));
  };

  return (
    <SectionCard>
      <Text>{t("scale.title")}</Text>
      <View className="flex flex-row gap-2 my-4">
        <View className="flex-1">
          <Text>{t("scale.current")}</Text>
          <InputWithUnits
            value={totalVolume.toLocaleString(currentLocale)}
            disabled
            text={volume}
          />
        </View>
        <View className="flex-1">
          <Text>{t("scale.target")}</Text>
          <InputWithUnits
            value={scaled}
            handleChange={(value) => {
              if (isValidNumber(value)) setScaled(value);
            }}
            text={volume}
            className="mt-auto"
          />
        </View>
      </View>
      <Button className="col-span-full" onPress={scale}>
        <Text>{t("scale.title")}</Text>
      </Button>
    </SectionCard>
  );
}

export default ScaleRecipeForm;
