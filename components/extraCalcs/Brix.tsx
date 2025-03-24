import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import useBrix from "~/hooks/useBrix";
import { isValidNumber, parseNumber } from "~/lib/utils/validateInput";
import { useTranslation } from "react-i18next";
import { Text } from "../ui/text";
import { ScrollView, View } from "react-native";
import SectionCard from "../recipeBuilder/SectionCard";
import { Label } from "../ui/label";

function Brix() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  const { gravity, sg, brix, units, setGravity, setUnits } = useBrix();

  const displayString =
    units === "SG"
      ? `${parseNumber(brix).toLocaleString(currentLocale, {
          maximumFractionDigits: 2,
        })} ${t("BRIX")}`
      : parseNumber(sg).toLocaleString(currentLocale, {
          maximumFractionDigits: 3,
        });
  return (
    <ScrollView className="min-h-screen">
      <SectionCard>
        <Text className="text-xl text-center">{t("brixHeading")} </Text>
        <View className="flex gap-2">
          <View className="my-2">
            <Label nativeID="gravity">{t("gravityLabel")}</Label>

            <Input
              inputMode="decimal"
              id="gravity"
              value={gravity}
              onChangeText={(value) => {
                if (isValidNumber(value)) setGravity(value);
              }}
            />
          </View>

          <Select
            name="units"
            onValueChange={(val) => {
              if (val) setUnits(val.value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("SG")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SG" label={t("SG")}>
                <Text>{t("SG")}</Text>
              </SelectItem>
              <SelectItem value="Brix" label={t("BRIX")}>
                <Text>{t("BRIX")}</Text>
              </SelectItem>
            </SelectContent>
          </Select>
        </View>
        <Text className="my-2 text-2xl text-center">{displayString}</Text>
      </SectionCard>
    </ScrollView>
  );
}

export default Brix;
