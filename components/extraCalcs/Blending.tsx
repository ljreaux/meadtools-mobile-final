import { blendingArr, blendValues } from "~/lib/utils/blendValues";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "~/components/ui/input";
import { isValidNumber } from "~/lib/utils/validateInput";
import SectionCard from "../recipeBuilder/SectionCard";
import { Text } from "../ui/text";
import { ScrollView, View } from "react-native";

function Blending() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  const [input, setInput] = useState<blendingArr>([
    ["0", "0"],
    ["0", "0"],
  ]);

  function handleChange(value: string, row: number, col: number) {
    if (isValidNumber(value))
      setInput((prev) =>
        prev.map((arr, i) =>
          i === row
            ? ([...arr.slice(0, col), value, ...arr.slice(col + 1)] as [
                string,
                string,
              ])
            : arr
        )
      );
  }

  const { blendedValue, totalVolume } = blendValues(input);

  return (
    <ScrollView className="min-h-screen">
      <SectionCard>
        <Text className="text-xl text-center sm:text-3xl text-foreground">
          {t("blendingHeading")}
        </Text>

        {input.map(([val, vol], rowIndex) => (
          <View key={rowIndex} className="flex-row gap-2 my-2">
            <View className="flex-1">
              <Text>{t(`val${rowIndex + 1}`)}</Text>

              <Input
                inputMode="decimal"
                value={val}
                onChangeText={(val) => handleChange(val, rowIndex, 0)}
              />
            </View>
            <View className="flex-1">
              <Text>{t(`vol${rowIndex + 1}`)}</Text>

              <Input
                inputMode="decimal"
                value={vol}
                onChangeText={(val) => handleChange(val, rowIndex, 1)}
              />
            </View>
          </View>
        ))}

        <View className="flex-row gap-2 my-2">
          <View className="flex-1">
            <View>
              <Text>{t("blendedVal")}</Text>
              <Text>
                {blendedValue.toLocaleString(currentLocale, {
                  maximumFractionDigits: 3,
                })}
              </Text>
            </View>
          </View>
          <View className="flex-1">
            <View>
              <Text>{t("totalVol")}</Text>
              <Text> {totalVolume.toLocaleString(currentLocale)}</Text>
            </View>
          </View>
        </View>
      </SectionCard>
    </ScrollView>
  );
}

export default Blending;
