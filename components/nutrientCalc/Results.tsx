import React from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltips";
import { NutrientType } from "~/types/nutrientTypes";
import InputWithUnits from "../InputWithUnits";
import SectionCard from "../recipeBuilder/SectionCard";
import { Text } from "../ui/text";
import { View } from "react-native";

const goFermKeys = {
  "Go-Ferm": "nuteResults.gfTypes.gf",
  protect: "nuteResults.gfTypes.gfProtect",
  "sterol-flash": "nuteResults.gfTypes.gfSterol",
  none: "nuteResults.gfTypes.none",
};

function Results({ useNutrients }: { useNutrients: () => NutrientType }) {
  const { t } = useTranslation();
  const {
    nutrientAdditions,
    goFerm,
    goFermType,
    remainingYan,
    otherNutrientName,
  } = useNutrients();

  const labels = [
    "nutrients.fermO",
    "nutrients.fermK",
    "nutrients.dap",
    "other.label",
  ];

  const goFermLabel = t(goFermKeys[goFermType.value]) || t(goFermType.value);
  return (
    <SectionCard>
      <Text>{t("nuteAmounts")}</Text>
      <View className="gap-2 py-6 border-b border-muted-foreground">
        {nutrientAdditions.totalGrams.map((add, i) => {
          const isInvalid = add <= 0 || isNaN(add);
          const perAdd = nutrientAdditions.perAddition[i];
          if (isInvalid) return null;
          return (
            <View key={labels[i]} className="space-y-2">
              <Text>
                {labels[i] !== "other.label"
                  ? t(labels[i])
                  : otherNutrientName.value}
              </Text>
              <View className="gap-2">
                <InputWithUnits
                  value={add.toFixed(3)}
                  text="g total"
                  disabled
                />
                <InputWithUnits value={perAdd.toFixed(3)} text="g" disabled />
              </View>
            </View>
          );
        })}
        {Math.round(remainingYan) !== 0 && (
          <View className="p-2 bg-destructive">
            <View className="flex flex-row items-center gap-1">
              <Text>{t("nuteResults.sideLabels.remainingYan")}</Text>
              <Tooltip body={t("tipText.remainingYan")} />
            </View>
            <Text>
              {remainingYan.toFixed(0)} {t("PPM")}
            </Text>
          </View>
        )}
      </View>
      {goFermType.value !== "none" && (
        <View className="my-4">
          <Text>{t("gfDetails")}</Text>
          <View className="flex flex-row gap-4 my-2">
            <View className="flex-1">
              <Text>{t("PDF.addAmount")}</Text>
              <Text>{`${goFerm.amount}g ${goFermLabel}`}</Text>
            </View>
            <View className="flex-1">
              <Text>{t("water")}</Text>
              <Text>
                {goFerm.water} {t("ML")}
              </Text>
            </View>
          </View>
        </View>
      )}
    </SectionCard>
  );
}

export default Results;
