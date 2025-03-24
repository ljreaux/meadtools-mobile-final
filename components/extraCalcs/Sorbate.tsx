"use client";
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

function Sorbate() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  const [sorbate, setSorbate] = useState({
    batchSize: (1).toLocaleString(currentLocale),
    units: "gallons",
    abv: (12).toLocaleString(currentLocale),
  });

  const sorbateAmount =
    sorbate.units === "gallons"
      ? ((-parseNumber(sorbate.abv) * 25 + 400) / 0.75) *
        parseNumber(sorbate.batchSize) *
        0.003785411784
      : (((-parseNumber(sorbate.abv) * 25 + 400) / 0.75) *
          parseNumber(sorbate.batchSize)) /
        1000;

  const handleChange = (value: string, key: string) => {
    if (isValidNumber(value))
      setSorbate((prev) => ({
        ...prev,
        [key]: value,
      }));
  };
  return (
    <ScrollView className="min-h-full">
      <SectionCard>
        <Text className="text-xl text-center">{t("sorbateHeading")}</Text>

        <View>
          <View className="flex-row items-center gap-2 my-2">
            <View className="flex-1">
              <Text>{t("batchSize")} </Text>
              <View>
                <Input
                  inputMode="decimal"
                  id="batchSize"
                  onChangeText={(txt) => handleChange(txt, "batchSize")}
                  value={sorbate.batchSize}
                />
              </View>
            </View>
            <View className="flex-1">
              <Text></Text>
              <Select
                name="units"
                value={{
                  value: sorbate.units,
                  label: sorbate.units === "gallons" ? t("GAL") : t("LIT"),
                }}
                onValueChange={(val) => {
                  if (val)
                    setSorbate((prev) => ({ ...prev, units: val.value }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gallons" label={t("GAL")}>
                    <Text>{t("GAL")}</Text>
                  </SelectItem>
                  <SelectItem value="liters" label={t("LIT")}>
                    <Text>{t("LIT")}</Text>
                  </SelectItem>
                </SelectContent>
              </Select>
            </View>
          </View>

          <View>
            <Text>{t("ABV")}: </Text>
            <View>
              <Input
                id="abv"
                inputMode="decimal"
                onChangeText={(txt) => handleChange(txt, "abv")}
                value={sorbate.abv}
              />
            </View>
          </View>

          <Text className="my-4 text-lg text-center">
            {sorbateAmount.toLocaleString(currentLocale, {
              maximumFractionDigits: 3,
            })}
            g {t("kSorb")}
          </Text>
        </View>
      </SectionCard>
    </ScrollView>
  );
}

export default Sorbate;
