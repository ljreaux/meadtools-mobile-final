import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslation } from "react-i18next";
import { Recipe } from "~/types/recipeDataTypes";
import { View } from "react-native";
import { Text } from "../ui/text";
import SectionCard from "./SectionCard";

function Units({ useRecipe }: { useRecipe: () => Recipe }) {
  const { units, changeVolumeUnits, changeWeightUnits } = useRecipe();
  const { t } = useTranslation();

  const weightUnits = {
    label: t(units.weight.toUpperCase()),
    value: units.weight,
  };

  const volumeUnits = {
    label: t(units.volume === "liter" ? "LIT" : "GAL"),
    value: units.volume,
  };

  return (
    <SectionCard>
      <Text>{t("UNITS")}</Text>
      <View className="flex flex-row items-center justify-between gap-4">
        <View className="flex-1">
          <Text>{t("recipeBuilder.labels.weight")}</Text>
          <Select value={weightUnits} onValueChange={changeWeightUnits}>
            <SelectTrigger>
              <SelectValue placeholder={t("LBS")} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="lbs" label={t("LBS")}>
                {t("LBS")}
              </SelectItem>
              <SelectItem value="kg" label={t("KG")}>
                {t("KG")}
              </SelectItem>
            </SelectContent>
          </Select>
        </View>
        <View className="flex-1">
          <Text>{t("nuteVolume")}</Text>
          <Select value={volumeUnits} onValueChange={changeVolumeUnits}>
            <SelectTrigger>
              <SelectValue placeholder={t("GAL")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gal" label={t("GAL")}>
                {t("GAL")}
              </SelectItem>
              <SelectItem value="liter" label={t("LIT")}>
                {t("LIT")}
              </SelectItem>
            </SelectContent>
          </Select>
        </View>
      </View>
    </SectionCard>
  );
}

export default Units;
