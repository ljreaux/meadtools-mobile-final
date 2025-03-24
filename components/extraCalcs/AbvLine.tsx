import { cn } from "~/lib/utils";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "../ui/text";

export default function AbvLine({
  ABV,
  delle,
  textSize,
}: {
  ABV: number;
  delle: number;
  textSize?: string;
}) {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  return (
    <View className="flex flex-row gap-2 text-center">
      <Text className={cn(textSize || "text-2xl")}>
        {ABV.toLocaleString(currentLocale, { maximumFractionDigits: 2 })}%{" "}
        {t("ABV")}
      </Text>
      <Text className={cn(textSize || "text-2xl")}>
        {delle.toLocaleString(currentLocale, { maximumFractionDigits: 0 })}{" "}
        {t("DU")}
      </Text>
    </View>
  );
}
