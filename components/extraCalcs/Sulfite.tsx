"use client";
import Tooltip from "~/components/Tooltips";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { isValidNumber, parseNumber } from "~/lib/utils/validateInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "../ui/text";
import { ScrollView, View } from "react-native";
import SectionCard from "../recipeBuilder/SectionCard";

function Sulfite() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;

  const [sulfite, setSulfite] = useState({
    batchSize: (1).toLocaleString(currentLocale),
    units: "gallons",
    ppm: (50).toLocaleString(currentLocale),
  });
  const handleChange = (value: string, name: string) => {
    if (isValidNumber(value))
      setSulfite((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const sulfiteAmount =
    sulfite.units === "gallons"
      ? (parseNumber(sulfite.batchSize) * 3.785 * parseNumber(sulfite.ppm)) /
        570
      : (parseNumber(sulfite.batchSize) * parseNumber(sulfite.ppm)) / 570;

  const campden =
    sulfite.units !== "gallons"
      ? (parseNumber(sulfite.ppm) / 75) *
        (parseNumber(sulfite.batchSize) / 3.785)
      : (parseNumber(sulfite.ppm) / 75) * parseNumber(sulfite.batchSize);
  return (
    <ScrollView className="min-h-full">
      <SectionCard>
        <View>
          <Text className="text-xl text-center sm:text-3xl text-foreground">
            {t("sulfiteHeading")}
          </Text>
        </View>
        <View>
          <View className="flex-row gap-2 my-2">
            <View className="flex-1">
              <Text>{t("batchSize")} </Text>

              <Input
                inputMode="decimal"
                onChangeText={(val) => handleChange(val, "batchSize")}
                value={sulfite.batchSize}
              />
            </View>
            <View className="flex-1">
              <Text></Text>
              <Select
                name="units"
                onValueChange={(val) => {
                  if (val)
                    setSulfite((prev) => ({ ...prev, units: val.value }));
                }}
                value={{
                  value: sulfite.units,
                  label: sulfite.units === "gallons" ? t("GAL") : t("LIT"),
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gallons" label={t("GAL")}>
                    <Text></Text> {t("GAL")}
                  </SelectItem>
                  <SelectItem value="liter" label={t("LIT")}>
                    {t("LIT")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </View>
          </View>

          <View className="my-2">
            <Text>{t("desiredPpm")} </Text>
            <Input
              inputMode="decimal"
              onChangeText={(val) => handleChange(val, "ppm")}
              value={sulfite.ppm}
            />
          </View>

          <View>
            <Text className="text-center">
              {sulfiteAmount.toLocaleString(currentLocale, {
                maximumFractionDigits: 3,
              })}
              g {t("kMeta")}
            </Text>
            <Text className="text-center">{t("accountPage.or")}</Text>
            <View className="flex-row justify-center gap-2 item-center">
              <Text>
                {campden.toLocaleString(currentLocale)} {t("campden")}
              </Text>
              <Tooltip body={t("tipText.campden")} />
            </View>
          </View>
        </View>
      </SectionCard>
    </ScrollView>
  );
}

export default Sulfite;
