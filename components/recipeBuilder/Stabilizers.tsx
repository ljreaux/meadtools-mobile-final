import { View, ScrollView } from "react-native";
import React from "react";
import { Switch } from "../ui/switch";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import Tooltip from "../Tooltips";
import { Recipe } from "~/types/recipeDataTypes";
import InputWithUnits from "../InputWithUnits";
import { useRecipe } from "../providers/RecipeProvider";
import SectionCard from "./SectionCard";
import { Text } from "../ui/text";
const Stabilizers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ScrollView>
      <StabilizersCard useRecipe={useRecipe} />
      {children}
    </ScrollView>
  );
};

export default Stabilizers;

function StabilizersCard({ useRecipe }: { useRecipe: () => Recipe }) {
  const { t } = useTranslation();
  const {
    addingStabilizers,
    toggleStabilizers,
    takingPh,
    toggleTakingPh,
    phReading,
    updatePhReading,
    sorbate,
    sulfite,
    campden,
  } = useRecipe();
  return (
    <SectionCard>
      <View className="flex flex-row items-center justify-between my-2">
        <Text>{t("adding")}</Text>
        <Switch
          checked={addingStabilizers}
          onCheckedChange={toggleStabilizers}
        />
      </View>
      {addingStabilizers && (
        <>
          <View className="flex justify-between pb-6 border-b border-muted-foreground">
            <View className="flex flex-row items-center justify-between my-2">
              <Text>{t("pH")}</Text>
              <Switch checked={takingPh} onCheckedChange={toggleTakingPh} />
            </View>
            {takingPh && (
              <View>
                <Text>Reading</Text>
                <Input
                  value={phReading}
                  onChangeText={(value) => updatePhReading(value)}
                  inputMode="decimal"
                />
              </View>
            )}
          </View>
          <Text className="pt-6">{t("results")} </Text>
          <View className="py-4 border-b border-dashed">
            <Text>{t("kSorbate")}</Text>
            {sorbate > 0 ? (
              <InputWithUnits value={sorbate.toFixed(3)} disabled text="g" />
            ) : (
              <Text>{t("noSorb")}</Text>
            )}
          </View>
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text>{t("kMeta")}</Text>
              <InputWithUnits value={sulfite.toFixed(3)} disabled text="g" />
            </View>
            <Text className="text-center"> {t("accountPage.or")}</Text>
            <View>
              <View className="flex flex-row items-center gap-1">
                <Text>{t("campden")}</Text>
                <Tooltip body={t("tipText.campden")} />
              </View>
              <InputWithUnits value={campden.toFixed(2)} disabled text="" />
            </View>
          </View>
        </>
      )}
    </SectionCard>
  );
}
