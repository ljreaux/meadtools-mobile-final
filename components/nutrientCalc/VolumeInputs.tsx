"use client";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { calcSb, toBrix } from "~/lib/utils/unitConverter";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltips";
import { NutrientType } from "~/types/nutrientTypes";
import { parseNumber } from "~/lib/utils/validateInput";
import { View } from "react-native";
import { Text } from "../ui/text";
import SectionCard from "../recipeBuilder/SectionCard";

function VolumeInputs({
  useNutrients,
  disabled,
}: {
  useNutrients: () => NutrientType;
  disabled?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  const { inputs } = useNutrients();
  const sgNum = isNaN(parseNumber(inputs.sg.value))
    ? 1
    : parseNumber(inputs.sg.value);
  const brixString = toBrix(sgNum).toLocaleString(currentLocale, {
    maximumFractionDigits: 2,
  });
  const sugarBreak =
    t("nuteResults.sb") +
    ": " +
    calcSb(parseNumber(inputs.sg.value)).toLocaleString(currentLocale, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });

  const unitOption = {
    value: inputs.volumeUnits.value,
    label: inputs.volumeUnits.value === "gal" ? t("GAL") : t("LIT"),
  };

  return (
    <SectionCard>
      <View className="flex flex-row gap-2 my-2">
        <View className="flex-1">
          <Text>{t("nuteVolume")}</Text>
          <Input {...inputs.volume} editable={!disabled} inputMode="decimal" />
        </View>

        <View className="flex-1">
          <Text>{t("UNITS")}</Text>
          <Select
            value={unitOption}
            onValueChange={(opt) => {
              if (opt)
                inputs.volumeUnits.onChange((opt.value as "gal") || "liter");
            }}
          >
            <SelectTrigger disabled={disabled}>
              <SelectValue placeholder={t("GAL")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gal" label={t("GAL")}>
                <Text>Gallons</Text>
              </SelectItem>
              <SelectItem value="liter" label={t("LIT")}>
                <Text>Liters</Text>
              </SelectItem>
            </SelectContent>
          </Select>
        </View>
      </View>
      <View className="my-2">
        <View>
          <View className="flex flex-row items-center gap-2">
            <Text>{t("nuteSgLabel")}</Text>
            <Tooltip body={t("tipText.nutrientSg")} />
          </View>
          <Input {...inputs.sg} editable={!disabled} inputMode="decimal" />
        </View>
        <View className="flex flex-row justify-between">
          <Text>{brixString + " Brix"}</Text>
          <Text>{sugarBreak}</Text>
        </View>
      </View>
      <View>
        <View>
          <View className="flex flex-row gap-2">
            <Text>{t("offset")}</Text>
            <Tooltip body={t("tipText.offsetPpm")} />
          </View>
          <Input {...inputs.offset} inputMode="decimal" />
        </View>
      </View>
    </SectionCard>
  );
}

export default VolumeInputs;
