import React from "react";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import { Recipe } from "~/types/recipeDataTypes";
import { cn } from "~/lib/utils";
import InputWithUnits from "../InputWithUnits";
import Tooltip from "../Tooltips";
import { View } from "react-native";
import { Text } from "../ui/text";
import SectionCard from "./SectionCard";

function Results({ useRecipe }: { useRecipe: () => Recipe }) {
  const {
    OG,
    FG,
    updateFG,
    backsweetenedFG,
    totalVolume,
    volume,
    ABV,
    delle,
    units,
  } = useRecipe();
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  const backgroundColor = {
    warning: "bg-[rgb(255,204,0)] text-black",
    destructive: "bg-destructive",
    default: "p-0",
  };
  const ogWarningClass: keyof typeof backgroundColor =
    OG > 1.16 ? "destructive" : OG > 1.125 ? "warning" : "default";
  const abvWarningClass: keyof typeof backgroundColor =
    ABV > 23 ? "destructive" : ABV > 20 ? "warning" : "default";

  if (totalVolume <= 0 || OG <= 1) return null;

  return (
    <SectionCard>
      <Text>{t("results")}</Text>
      <View className={cn(backgroundColor[ogWarningClass], "my-2")}>
        <View>
          <Text>{t("recipeBuilder.resultsLabels.estOG")}</Text>
          {ogWarningClass !== "default" && (
            <Tooltip
              body={t(
                ogWarningClass === "warning"
                  ? "tipText.ogWarning"
                  : "tipText.ogSeriousWarning"
              )}
            />
          )}
        </View>
        <Input
          value={OG.toLocaleString(currentLocale, { maximumFractionDigits: 3 })}
          editable={false}
        />
      </View>

      <View className="flex flex-row gap-2 my-2">
        <View className="flex-1">
          <View className="flex flex-row items-center gap-2">
            <Text>{t("recipeBuilder.resultsLabels.estFG")}</Text>
            <Tooltip body={t("tipText.estimatedFg")} />
          </View>
          <Input value={FG} onChangeText={updateFG} inputMode="decimal" />
        </View>
        <View className="flex-1">
          <Text>{t("recipeBuilder.resultsLabels.backFG")}</Text>
          <Input
            editable={false}
            value={backsweetenedFG.toLocaleString(currentLocale, {
              maximumFractionDigits: 3,
            })}
          />
        </View>
      </View>

      <View className="my-2">
        <View className="flex flex-row items-center gap-2">
          <Text>{t("recipeBuilder.resultsLabels.totalPrimary")}</Text>
          <Tooltip body={t("tipText.totalVolume")} />
        </View>
        <InputWithUnits disabled value={volume} text={units.volume} />
      </View>
      <View className="my-2">
        <View className="flex flex-row items-center gap-2">
          <Text>{t("recipeBuilder.resultsLabels.totalSecondary")}</Text>
          <Tooltip body={t("tipText.totalSecondary")} />
        </View>
        <InputWithUnits
          disabled
          value={totalVolume.toLocaleString(currentLocale, {
            maximumFractionDigits: 3,
          })}
          text={units.volume}
        />
      </View>

      <View className="flex flex-row gap-2 my-2">
        <View
          className={cn(
            backgroundColor[abvWarningClass],
            abvWarningClass !== "default" && "p-2",
            "flex-1"
          )}
        >
          <View className="flex flex-row items-center gap-2">
            <Text>{t("recipeBuilder.resultsLabels.abv")}</Text>
            {abvWarningClass !== "default" && (
              <Tooltip
                body={t(
                  abvWarningClass === "warning"
                    ? "tipText.abvWarning"
                    : "tipText.abvSeriousWarning"
                )}
              />
            )}
          </View>
          <InputWithUnits
            disabled
            value={ABV.toLocaleString(currentLocale, {
              maximumFractionDigits: 2,
            })}
            text={t("recipeBuilder.percent")}
          />
        </View>
        <View className="flex-1">
          <View className="flex flex-row items-center gap-2">
            <Text>{t("recipeBuilder.resultsLabels.delle")}</Text>
            <Tooltip
              body={t("tipText.delleUnits")}
              link="https://meadmaking.wiki/en/process/stabilization#via-yeast-alcohol-tolerance"
            />
          </View>
          <InputWithUnits disabled value={delle.toFixed()} text={t("DU")} />
        </View>
      </View>
    </SectionCard>
  );
}

export default Results;
