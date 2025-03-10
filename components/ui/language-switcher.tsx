import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  type Option,
} from "./select";
import i18nConfig from "~/i18nConfig";
import { View } from "react-native";
import { Text } from "./text";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || "en";

  const [selectedOption, setSelectedOption] = useState({
    value: currentLanguage,
    label: currentLanguage.toUpperCase(),
  });

  return (
    <View className="grid my-2">
      <Text>Toggle Language</Text>
      <Select
        value={selectedOption}
        onValueChange={(val) => {
          if (val) {
            i18n.changeLanguage(val.value);
            setSelectedOption(val);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {i18nConfig.locales.map((lang) => {
              const option: Option = {
                value: lang,
                label: lang.toUpperCase(),
              };
              return (
                <SelectItem
                  key={option?.value}
                  value={lang}
                  label={option?.label || ""}
                />
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </View>
  );
};

export default LanguageSwitcher;
