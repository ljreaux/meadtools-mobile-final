"use client";
import { useTranslation } from "react-i18next";
import { Input } from "~/components/ui/input";
import {
  Option,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { temperatureCorrection, toFahrenheit } from "~/lib/utils/temperature";
import { useState } from "react";
import { toBrix } from "~/lib/utils/unitConverter";
import { isValidNumber, parseNumber } from "~/lib/utils/validateInput";
import SectionCard from "../recipeBuilder/SectionCard";
import { Text } from "../ui/text";
import { ScrollView, View } from "react-native";

function TempCorrection() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  const { tempObj, handleChange, setTempUnits, result, resultBrix } =
    useTempCorrection();
  return (
    <ScrollView className="min-h-full">
      <SectionCard>
        <Text className="text-xl text-center">
          {t("tempCorrectionHeading")}
        </Text>

        <View className="my-2">
          <Text>{t("measuredSG")} </Text>
          <View>
            <Input
              inputMode="decimal"
              id="measured"
              value={tempObj.measured}
              onChangeText={(txt) => handleChange(txt, "measured")}
            />
          </View>
          <Text>
            {toBrix(parseNumber(tempObj.measured)).toLocaleString(
              currentLocale,
              {
                maximumFractionDigits: 2,
              }
            )}{" "}
            {t("Brix")}
          </Text>
        </View>
        <View className="flex-row gap-2 my-2">
          <View className="flex-1">
            <Text>{t("curTemp")} </Text>

            <Input
              inputMode="decimal"
              id="curTemp"
              value={tempObj.curTemp}
              onChangeText={(txt) => handleChange(txt, "curTemp")}
            />
          </View>

          <View className="flex-1">
            <Text></Text>
            <Select
              name="deg"
              onValueChange={setTempUnits}
              value={{
                value: tempObj.tempUnits,
                label: tempObj.tempUnits === "F" ? t("FAR") : t("CEL"),
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Temp Units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="F" label={t("FAR")}>
                  <Text>{t("FAR")}</Text>
                </SelectItem>
                <SelectItem value="C" label={t("CEL")}>
                  <Text>{t("CEL")}</Text>
                </SelectItem>
              </SelectContent>
            </Select>
          </View>
        </View>
        <View className="my-2">
          <Text>{t("calTemp")} </Text>
          <View>
            <Input
              inputMode="decimal"
              id="calTemp"
              value={tempObj.calTemp}
              onChangeText={(txt) => handleChange(txt, "calTemp")}
            />
          </View>
        </View>

        <View>
          <Text className="my-2 text-xl text-center">
            {result.toLocaleString(currentLocale, {
              maximumFractionDigits: 3,
            })}{" "}
            {resultBrix.toLocaleString(currentLocale, {
              maximumFractionDigits: 2,
            })}{" "}
            {t("Brix")}
          </Text>
        </View>
      </SectionCard>
    </ScrollView>
  );
}

export default TempCorrection;

const useTempCorrection = () => {
  const [tempObj, setTempObj] = useState({
    measured: "1.1",
    tempUnits: "F",
    curTemp: "90",
    calTemp: "68",
  });

  const handleChange = (value: string, name: string) => {
    if (isValidNumber(value))
      setTempObj((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const result =
    tempObj.tempUnits === "F"
      ? temperatureCorrection(
          parseNumber(tempObj.measured),
          parseNumber(tempObj.curTemp),
          parseNumber(tempObj.calTemp)
        )
      : temperatureCorrection(
          parseNumber(tempObj.measured),
          toFahrenheit(parseNumber(tempObj.curTemp)),
          toFahrenheit(parseNumber(tempObj.calTemp))
        );
  const resultBrix = toBrix(result);

  const setTempUnits = (opt: Option) => {
    if (opt) setTempObj((prev) => ({ ...prev, tempUnits: opt.value }));
  };

  return { tempObj, handleChange, result, resultBrix, setTempUnits };
};
