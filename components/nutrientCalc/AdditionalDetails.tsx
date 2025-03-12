import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltips";
import { GoFermType, NutrientType } from "~/types/nutrientTypes";
import InputWithUnits from "../InputWithUnits";
import SectionCard from "../recipeBuilder/SectionCard";
import { View } from "react-native";
import { Text } from "../ui/text";

const gfOptions = [
  { value: "Go-Ferm", label: "nuteResults.gfTypes.gf" },
  { value: "protect", label: "nuteResults.gfTypes.gfProtect" },
  { value: "sterol-flash", label: "nuteResults.gfTypes.gfSterol" },
  { value: "none", label: "nuteResults.gfTypes.none" },
];
function AdditionalDetails({
  useNutrients,
}: {
  useNutrients: () => NutrientType;
}) {
  const { t } = useTranslation();
  const { goFermType, yeastAmount, changeYeastAmount } = useNutrients();

  const currentLabel =
    gfOptions.find((o) => o.value === goFermType.value)?.label ?? "";

  const goFermValue = {
    value: goFermType.value,
    label: t(currentLabel),
  };

  return (
    <SectionCard>
      <View className="my-2">
        <View className="flex flex-row items-center gap-2">
          <Text>{t("goFermType")}</Text>
          <Tooltip body={t("tipText.goFerm")} />
        </View>
        <Select
          onValueChange={(val) => {
            if (val) goFermType.onChange(val.value as GoFermType);
          }}
          value={goFermValue}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Go-Ferm" />
          </SelectTrigger>
          <SelectContent>
            {gfOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value} label={t(label)}>
                {t(label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>
      <View className="my-2">
        <View className="flex flex-row items-center gap-1">
          <Text>{t("yeastAmount")}</Text>
          <Tooltip body={t("tipText.yeastAmount")} />
        </View>
        <InputWithUnits
          value={yeastAmount}
          text="g"
          handleChange={changeYeastAmount}
        />
      </View>
    </SectionCard>
  );
}

export default AdditionalDetails;
