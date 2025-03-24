"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "~/components/ui/input";
import useAbv from "~/hooks/useAbv";
import AbvLine from "~/components/extraCalcs/AbvLine";
import { toBrix } from "~/lib/utils/unitConverter";
import { isValidNumber, parseNumber } from "~/lib/utils/validateInput";
import { ScrollView, View } from "react-native";
import { Label } from "../ui/label";
import { Text } from "../ui/text";
import SectionCard from "../recipeBuilder/SectionCard";

export default function AbvCalculator() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;

  const [inputValues, setInputValues] = useState([
    (1.105).toLocaleString(currentLocale, {
      maximumFractionDigits: 3,
    }),
    (1).toLocaleString(currentLocale),
  ]);
  const [OG, FG] = inputValues;
  const abv = useAbv(OG, FG);
  const inputArr = [t("OG"), t("FG")];

  return (
    <ScrollView className="min-h-screen">
      <SectionCard>
        <View className="flex flex-col w-full gap-6">
          <Text className="text-xl text-center">{t("abvHeading")}</Text>
          <View className="flex flex-col gap-6">
            {inputArr.map((label, index) => {
              const brix = toBrix(parseNumber(inputValues[index]));
              return (
                <View
                  key={index}
                  className="flex flex-col justify-center gap-2"
                >
                  <Label nativeID={label}>
                    {t(`${label.toLowerCase()}Label`)}
                  </Label>
                  <Input
                    inputMode="decimal"
                    id={label}
                    value={inputValues[index]}
                    onChangeText={(val) => {
                      if (isValidNumber(val))
                        setInputValues(
                          inputValues.map((value, i) =>
                            index === i ? val : value
                          )
                        );
                    }}
                  />
                  <Text className="flex self-end">
                    {brix.toLocaleString(currentLocale, {
                      maximumFractionDigits: 2,
                    })}{" "}
                    {t("BRIX")}
                  </Text>
                </View>
              );
            })}
          </View>

          <View className="items-center justify-center my-4">
            <AbvLine {...abv} textSize="text-2xl" />
          </View>
        </View>
      </SectionCard>
    </ScrollView>
  );
}
