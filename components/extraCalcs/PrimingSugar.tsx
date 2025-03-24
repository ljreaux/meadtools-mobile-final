"use client";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import usePrimingSugar from "~/hooks/usePrimingSugar";
import { cn } from "~/lib/utils";

import React from "react";
import { useTranslation } from "react-i18next";
import PrimingSugarTable from "~/components/extraCalcs/PrimingSugarTable";
import SectionCard from "../recipeBuilder/SectionCard";
import { Text } from "../ui/text";
import { ScrollView, View } from "react-native";

function PrimingSugar() {
  const { t } = useTranslation();
  const {
    tempProps,
    tempUnitProps,
    volsProps,
    volumeProps,
    volumeUnitProps,
    primingSugarAmounts,
    tempInvalid,
    volsInvalid,
  } = usePrimingSugar();

  return (
    <ScrollView>
      <SectionCard>
        <Text className="text-xl text-center sm:text-3xl text-foreground">
          {t("primingSugarHeading")}
        </Text>
        <View className="grid gap-1 sm:grid-cols-2">
          <View className={cn("p-2", tempInvalid && "bg-destructive")}>
            <Text>{t("enterTemp")}</Text>
            <Input {...tempProps} inputMode="decimal" />
            {tempInvalid && <p>{t("tempInvalid")}</p>}
          </View>
          <View className="p-2">
            <Text>{t("tempUnits")}</Text>
            <Select {...tempUnitProps}>
              <SelectTrigger>
                <SelectValue placeholder="Select Temperature Units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="C" label="C">
                  C
                </SelectItem>
                <SelectItem value="F" label="F">
                  F
                </SelectItem>
              </SelectContent>
            </Select>
          </View>
          <View
            className={cn("col-span-full p-2", volsInvalid && "bg-destructive")}
          >
            <Text>{t("co2Vol")}</Text>
            <Input {...volsProps} inputMode="decimal" />
            {volsInvalid && <p>{t("volInvalid")}</p>}
          </View>
          <View className="p-2">
            <Text>{t("brewVolume")}</Text>
            <Input {...volumeProps} inputMode="decimal" />
          </View>
          <View className="p-2">
            <Text>{t("volumeUnits")}</Text>
            <Select {...volumeUnitProps}>
              <SelectTrigger>
                <SelectValue placeholder="Select Volume Units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gal" label={t("GAL")}>
                  {t("GAL")}
                </SelectItem>
                <SelectItem value="lit" label={t("LIT")}>
                  {t("LIT")}
                </SelectItem>
              </SelectContent>
            </Select>
          </View>
          <View className="border-b border-muted-foreground col-span-full" />
        </View>
        <PrimingSugarTable
          primingSugar={primingSugarAmounts}
        ></PrimingSugarTable>
      </SectionCard>
    </ScrollView>
  );
}

export default PrimingSugar;
