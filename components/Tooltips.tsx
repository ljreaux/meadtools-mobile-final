import * as React from "react";
import { Linking, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Text } from "~/components/ui/text";
import { useTranslation } from "react-i18next";
import { Info } from "~/lib/icons/Info";

const Tooltip = ({
  body,
  link,
  links,
}: {
  body: string;
  link?: string;
  links?: string[][];
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <View className="items-center justify-center">
      <TooltipComponent delayDuration={150}>
        <TooltipTrigger asChild>
          <Info size={14} className="text-foreground" />
        </TooltipTrigger>
        <TooltipContent insets={contentInsets}>
          <Text className="native:text-lg">
            {body}
            {link && (
              <Text className="underline" onPress={() => Linking.openURL(link)}>
                {t("tipText.linkText")}
              </Text>
            )}
            {links &&
              links.map((linkArr) => (
                <Text
                  onPress={() => Linking.openURL(linkArr[0])}
                  className="underline"
                  key={linkArr[0]}
                >
                  {linkArr[1]}
                </Text>
              ))}
          </Text>
        </TooltipContent>
      </TooltipComponent>
    </View>
  );
};

export default Tooltip;
