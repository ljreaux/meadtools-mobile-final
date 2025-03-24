"use client";

import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { calculateAdjunctValues } from "../../lib/utils/benchTrials";
import { isValidNumber } from "~/lib/utils/validateInput";
import { Label } from "../ui/label";
import { View } from "react-native";
import { Text } from "../ui/text";

interface TrialsProps {
  batchDetails: BatchDetails;
}

export type BatchDetails = {
  batchSize: string;
  sampleSize: string;
  stockSolutionConcentration: string;
  units: string;
};

export default function Trials({ batchDetails }: TrialsProps) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;

  const [stockVolume, setStockVolume] = useState<string[]>([
    (0.5).toLocaleString(currentLocale),
    (1).toLocaleString(currentLocale),
    (1.5).toLocaleString(currentLocale),
    (2).toLocaleString(currentLocale),
  ]);

  const handleStockVolumeChange = (index: number, value: string) => {
    setStockVolume((prev) => prev.map((vol, i) => (i === index ? value : vol)));
  };

  return (
    <View className="my-10">
      <View>
        {stockVolume.map((volume, index) => (
          <StockVolumeRow
            key={index}
            index={index}
            volume={volume}
            batchDetails={batchDetails}
            onVolumeChange={handleStockVolumeChange}
          />
        ))}
      </View>
    </View>
  );
}

interface StockVolumeRowProps {
  index: number;
  volume: string;
  batchDetails: BatchDetails;
  onVolumeChange: (index: number, value: string) => void;
}

function StockVolumeRow({
  index,
  volume,
  batchDetails,
  onVolumeChange,
}: StockVolumeRowProps) {
  const { adjunctAmount, adjunctConcentration, scaledAdjunct, scaledBatch } =
    calculateAdjunctValues(volume, batchDetails);

  const { i18n, t } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;
  return (
    <View className="my-2 border-b border-muted-foreground">
      <View className="my-2">
        <Label nativeID={`stockVolume-${index}`} className="mb-2">
          {t("solutionVolume")}
        </Label>
        <Input
          id={`stockVolume-${index}`}
          inputMode="decimal"
          value={volume}
          onChangeText={(value) => {
            if (isValidNumber(value)) onVolumeChange(index, value);
          }}
          className="flex-1"
        />
      </View>

      {/* Responsive Layout */}
      <View className="mb-4">
        <View className="flex-row gap-2">
          <Label>{t("adjunctAmount")}</Label>
          <Text>{adjunctAmount.toLocaleString(currentLocale)}</Text>
        </View>
        <View className="flex-row gap-2">
          <Label>{t("adjunctConcentration")}</Label>

          <Text>{adjunctConcentration}</Text>
        </View>
        <View className="flex-row gap-2">
          <Label>{t(`${batchDetails.units}ScaledAdjunct`)}</Label>
          <Text>{scaledAdjunct.toLocaleString(currentLocale)}</Text>
        </View>
        <View className="flex-row gap-2">
          <Label>{t("scaledBatch")}</Label>
          <Text>{scaledBatch.toLocaleString(currentLocale)}</Text>
        </View>
      </View>
    </View>
  );
}
