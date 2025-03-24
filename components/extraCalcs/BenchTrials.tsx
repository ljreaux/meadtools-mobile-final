"use client";
import Tooltip from "~/components/Tooltips";
import { useTranslation } from "react-i18next";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";
import Trials from "~/components/extraCalcs/Trials";
import { isValidNumber } from "~/lib/utils/validateInput";
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputChangeEventData,
  View,
} from "react-native";
import { Text } from "../ui/text";
import SectionCard from "../recipeBuilder/SectionCard";

function BenchTrials() {
  const { t } = useTranslation();
  const { batchDetails, changeUnits, setInput } = useBenchTrials();
  const benchTrialLinks = [
    [
      "https://www.youtube.com/watch?v=AaibXsslBlE&ab_channel=Doin%27theMostBrewing",
      t("tipText.benchTrials.linkTexts.0"),
    ],
    [
      "https://scottlab.com/bench-trial-protocol",
      t("tipText.benchTrials.linkTexts.1"),
    ],
    [
      "https://www.reddit.com/r/mead/wiki/process/bench_trials/",
      t("tipText.benchTrials.linkTexts.2"),
    ],
  ];

  const units = {
    value: batchDetails.units,
    label: batchDetails.units === "gallon" ? t("GAL") : t("LIT"),
  };

  return (
    <ScrollView>
      <SectionCard>
        <View className="flex-row w-full gap-2">
          <Text className="text-xl">{t("benchTrialsHeading")}</Text>
          <Tooltip
            body={t("tipText.benchTrials.body")}
            links={benchTrialLinks}
          />
        </View>
        <View>
          <View>
            <View>
              <Text>{t("batchSize")}</Text>
              <View>
                <Input
                  id="batchSize"
                  inputMode="decimal"
                  value={batchDetails.batchSize}
                  onChange={(e) => setInput(e, "batchSize")}
                />
              </View>
            </View>
            <View>
              <Text>{t("UNITS")}:</Text>
              <View>
                <Select
                  name="trialBatchUnits"
                  value={units}
                  onValueChange={(val) => {
                    if (val) changeUnits(val.value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gallon" label={t("GAL")}>
                      <Text>{t("GAL")}</Text>
                    </SelectItem>
                    <SelectItem value="liter" label={t("LIT")}>
                      <Text>{t("LIT")}</Text>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </View>
            </View>
            <View>
              <Text>{t("sampleSize")}</Text>
              <View>
                <Input
                  inputMode="decimal"
                  value={batchDetails.sampleSize}
                  onChange={(e) => setInput(e, "sampleSize")}
                />
              </View>
            </View>
            <View>
              <Text>{t("stockSolutionConcentration")}</Text>
              <View>
                <Input
                  id="stockSolutionConcentration"
                  inputMode="decimal"
                  value={batchDetails.stockSolutionConcentration}
                  onChange={(e) => setInput(e, "stockSolutionConcentration")}
                />
              </View>
            </View>
          </View>
        </View>
        <Trials batchDetails={batchDetails} />
      </SectionCard>
    </ScrollView>
  );
}

export default BenchTrials;

const useBenchTrials = () => {
  const [batchDetails, setBatchDetails] = useState({
    batchSize: "1",
    sampleSize: "50",
    stockSolutionConcentration: "10",
    units: "gallon",
  });

  const changeUnits = (unit: string) => {
    setBatchDetails((prev) => ({ ...prev, units: unit }));
  };

  const setInput = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    id: string
  ) => {
    const val = e.nativeEvent.text;
    if (isValidNumber(val)) {
      const key = id;
      setBatchDetails((prev) => ({ ...prev, [key]: val }));
    }
  };

  return { batchDetails, changeUnits, setInput };
};
