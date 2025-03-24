import AbvLine from "~/components/extraCalcs/AbvLine";
import Tooltip from "~/components/Tooltips";
import { Input } from "~/components/ui/input";
import useAbv from "~/hooks/useAbv";
import { toBrix } from "~/lib/utils/unitConverter";
import { isValidNumber, parseNumber } from "~/lib/utils/validateInput";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Text } from "../ui/text";
import { Label } from "../ui/label";
import SectionCard from "../recipeBuilder/SectionCard";

function EstimatedOG() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  const [gravity, setGravity] = useState({
    fgh: "1.0",
    fgr: "5",
  });
  const estOG =
    Math.round(
      (-1.728 * parseNumber(gravity.fgh) +
        0.01085 * parseNumber(gravity.fgr) +
        2.728) *
        1000
    ) / 1000;

  const abv = useAbv(estOG.toString(), gravity.fgh.toString());

  return (
    <ScrollView className="min-h-screen">
      <SectionCard>
        <View className="gap-2">
          {/* Heading with Tooltip */}
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-xl">{t("ogHeading")}</Text>
            <Tooltip
              body={t("tipText.estOG")}
              link="http://www.woodlandbrew.com/2013/02/abv-without-og.html"
            />
          </View>

          {/* Inputs Section */}
          <View className="flex flex-col gap-6">
            <View>
              <Label nativeID="hydrometerFG" className="mb-1">
                {t("hydrometerFG")}
              </Label>
              <Input
                value={gravity.fgh}
                onChangeText={(value) => {
                  if (isValidNumber(value))
                    setGravity((prev) => ({ ...prev, fgh: value }));
                }}
                inputMode="decimal"
                id="hydrometerFG"
              />
            </View>

            <View>
              <Label nativeID="refractometerFG" className="mb-1">
                {t("refractometerFG")}
              </Label>
              <Input
                value={gravity.fgr}
                onChangeText={(value) => {
                  if (isValidNumber(value))
                    setGravity((prev) => ({ ...prev, fgr: value }));
                }}
                inputMode="decimal"
                id="refractometerFG"
              />
            </View>
          </View>

          {/* Results Section */}
          <View className="flex items-center">
            <View className="flex-row items-center justify-center gap-2">
              <Text className="text-lg">
                {estOG.toLocaleString(currentLocale)}
              </Text>
              <Text className="text-lg">
                {toBrix(estOG).toLocaleString(currentLocale, {
                  maximumFractionDigits: 2,
                })}{" "}
                {t("BRIX")}
              </Text>
            </View>

            {/* ABV Line */}
            <AbvLine {...abv} textSize="text-lg" />
          </View>
        </View>
      </SectionCard>
    </ScrollView>
  );
}

export default EstimatedOG;
