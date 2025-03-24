"use client";
import AbvLine from "~/components/extraCalcs/AbvLine";
import Tooltip from "~/components/Tooltips";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import useAbv from "~/hooks/useAbv";
import useRefrac from "~/hooks/useRefrac";
import { cn } from "~/lib/utils";
import { useTranslation } from "react-i18next";
import { Text } from "../ui/text";
import { ScrollView, View } from "react-native";
import SectionCard from "../recipeBuilder/SectionCard";

function RefractometerCorrection() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  const {
    correctionFactorProps,
    ogProps,
    ogUnitProps,
    fgProps,
    correctedFg,
    correctedBrix,
  } = useRefrac();
  const abv = useAbv(ogProps.value, correctedFg.toString());

  const warn = correctionFactorProps.value !== "1";

  return (
    <ScrollView className="min-h-screen">
      <SectionCard>
        <Text className="text-xl text-center sm:text-3xl text-foreground">
          {t("refractometerHeading")}
        </Text>
        <View>
          <View>
            <View className={cn(warn && "bg-[rgb(255,204,0)] text-black")}>
              <View className="flex-row items-center gap-2 my-2">
                <Text className={cn(warn ? "text-black" : "text-foreground")}>
                  {t("correctionFactor")}
                </Text>
                <Tooltip
                  body={t("tiptext.refractometerWarning")}
                  link="https://www.brewersfriend.com/how-to-determine-your-refractometers-wort-correction-factor/"
                />
              </View>
            </View>
            <Input inputMode="decimal" id="cf" {...correctionFactorProps} />

            <View className="my-2">
              <Text>{t("ogLabel")} </Text>

              <View className="flex-row items-center gap-2">
                <View className="flex-1">
                  <Select
                    name="units"
                    value={{
                      ...ogUnitProps.value,
                      label: t(ogUnitProps.value.label),
                    }}
                    onValueChange={ogUnitProps.onValueChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a unit" />
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

                <Input
                  inputMode="decimal"
                  id="og"
                  className="flex-1"
                  {...ogProps}
                />
              </View>
            </View>
            <View>
              <Text>{t("fgInBrix")} </Text>
              <View>
                <View className="flex">
                  <Input inputMode="decimal" id="fg" {...fgProps} />
                  <View className="flex-row justify-center gap-2">
                    <Text className="text-lg">
                      {correctedFg.toLocaleString(currentLocale, {
                        maximumFractionDigits: 3,
                      })}
                    </Text>
                    <Text className="text-lg min-w-fit">{`${correctedBrix.toLocaleString(
                      currentLocale,
                      {
                        maximumFractionDigits: 2,
                      }
                    )} ${t("BRIX")}`}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <View className="flex items-center justify-center text-center">
                  <AbvLine {...abv} textSize="text-lg" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SectionCard>
    </ScrollView>
  );
}

export default RefractometerCorrection;
