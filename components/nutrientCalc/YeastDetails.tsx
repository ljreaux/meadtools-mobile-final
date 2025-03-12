import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltips";
import { Input } from "../ui/input";
import {
  NitrogenRequirement,
  NutrientType,
  Yeast,
  YeastBrand,
} from "~/types/nutrientTypes";
import InputWithUnits from "../InputWithUnits";
import { View } from "react-native";
import { Text } from "../ui/text";
import SectionCard from "../recipeBuilder/SectionCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function YeastDetails({ useNutrients }: { useNutrients: () => NutrientType }) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const { t } = useTranslation();
  const {
    selected,
    setYeastBrand,
    yeastList,
    setYeastName,
    setNitrogenRequirement,
    targetYAN,
  } = useNutrients();

  const selectedYeastBrand = {
    label: selected.yeastBrand,
    value: selected.yeastBrand,
  };
  const selectedYeastStrain = {
    label: selected.yeastStrain,
    value: selected.yeastStrain,
  };
  const selectedNitrogenRequirement = {
    label: selected.yeastNitrogenRequirement,
    value: selected.yeastNitrogenRequirement,
  };

  return (
    <SectionCard>
      <View className="flex flex-row gap-2 my-2">
        <View className="flex-1">
          <View>
            <Text>{t("yeastBrand")}</Text>
            <Select
              defaultValue={selectedYeastBrand}
              onValueChange={(val) => {
                if (val) {
                  setYeastBrand(val.value as YeastBrand);
                }
              }}
            >
              <SelectTrigger>
                <Text>{selected.yeastBrand}</Text>
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(yeastList.map((yeast) => yeast.brand))).map(
                  (brand) => (
                    <SelectItem key={brand} value={brand} label={brand}>
                      <Text>{brand}</Text>
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </View>
        </View>
        <View className="flex-1">
          <View>
            <Text>{t("yeastStrain")}</Text>

            {selected.yeastBrand !== "Other" ? (
              <Select
                defaultValue={selectedYeastStrain}
                onValueChange={(val) => {
                  if (val) setYeastName(val.value);
                }}
              >
                <SelectTrigger>
                  <Text>{selected.yeastStrain}</Text>
                </SelectTrigger>
                <SelectContent>
                  {yeastList
                    .filter((yeast) => yeast.brand === selected.yeastBrand)
                    .map((yeast) => (
                      <SelectItem
                        key={yeast.id}
                        value={yeast.name}
                        label={yeast.name}
                      >
                        <Text>{yeast.name}</Text>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={selected.yeastDetails.name}
                onChangeText={(value) => setYeastName(value)}
              />
            )}
          </View>
        </View>
      </View>
      <View>
        <View>
          <View className="flex flex-row items-center gap-2 my-2">
            <Text>{t("n2Requirement.label")}</Text>
            <Tooltip body={t("tipText.nitrogenRequirements")} />
          </View>
          <Select
            value={selectedNitrogenRequirement}
            onValueChange={(val) => {
              if (val) setNitrogenRequirement(val.value as NitrogenRequirement);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Nitrogen Requirement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="Low" value="Low" label={t("n2Requirement.low")}>
                <Text>{t("n2Requirement.low")}</Text>
              </SelectItem>
              <SelectItem
                key="Medium"
                value="Medium"
                label={t("n2Requirement.medium")}
              >
                <Text>{t("n2Requirement.medium")}</Text>
              </SelectItem>
              <SelectItem
                key="High"
                value="High"
                label={t("n2Requirement.high")}
              >
                <Text>{t("n2Requirement.high")}</Text>
              </SelectItem>
              <SelectItem
                key="Very High"
                value="Very High"
                label={t("n2Requirement.veryHigh")}
              >
                <Text>{t("n2Requirement.veryHigh")}</Text>
              </SelectItem>
            </SelectContent>
          </Select>
        </View>
      </View>
      <View>
        <View>
          <View className="flex flex-row items-center gap-2 my-2">
            <Text>{t("targetYan")}</Text>
            <Tooltip body={t("tipText.yan")} />
          </View>
          <InputWithUnits value={targetYAN.toString()} text={"PPM"} disabled />
        </View>
      </View>
    </SectionCard>
  );
}

export default YeastDetails;
