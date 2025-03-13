import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltips";
import { isValidNumber } from "~/lib/utils/validateInput";
import { cn } from "~/lib/utils";
import { Switch } from "../ui/switch";
import { NutrientType } from "~/types/nutrientTypes";
import { Settings } from "~/lib/icons/Settings";
import SectionCard from "../recipeBuilder/SectionCard";
import { View } from "react-native";
import { Text } from "../ui/text";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function NutrientSelector({
  useNutrients,
}: {
  useNutrients: () => NutrientType;
}) {
  const { t } = useTranslation();
  const {
    selected,
    setSelectedNutrients,
    inputs,
    otherYanContribution,
    otherNutrientName,
    maxGpl,
    editMaxGpl,
  } = useNutrients();
  // Handle the change of selected nutrients
  const handleNutrientChange = (nutrient: string) => {
    const prevSelected = selected?.selectedNutrients || [];

    if (prevSelected?.includes(nutrient)) {
      // If the nutrient is already selected, remove it
      setSelectedNutrients(prevSelected.filter((item) => item !== nutrient));
    } else {
      // If the nutrient is not selected, add it
      setSelectedNutrients([...prevSelected, nutrient]);
    }
  };

  return (
    <SectionCard>
      <View className="flex-row items-center gap-1 my-2">
        <Text>{t("selectNutes")}</Text>
        <Tooltip
          body={t("tipText.preferredSchedule")}
          link="https://meadmaking.wiki/en/process/nutrient_schedules"
        />
      </View>
      <View className="flex-row flex-wrap">
        {[
          { value: "Fermaid O", label: "nutrients.fermO" },
          { value: "Fermaid K", label: "nutrients.fermK" },
          { value: "DAP", label: "nutrients.dap" },
        ].map((label, i) => (
          <LabeledCheckbox
            key={label.value + i}
            label={label}
            index={i}
            useNutrients={useNutrients}
          />
        ))}
        <View className="flex gap-2">
          <Text>{t("other.label")}</Text>
          <Switch
            checked={selected.selectedNutrients?.includes("Other")}
            onCheckedChange={() => handleNutrientChange("Other")}
          />
        </View>
        {selected.selectedNutrients?.includes("Other") && (
          <View className="flex w-full gap-2 py-6">
            <Text> Other Nutrient Details</Text>
            <View className="flex-1 space-y-2">
              <Text>Name</Text>
              <Input {...otherNutrientName} />
            </View>
            <View className="flex-1 space-y-2">
              <Text>YAN Contribution</Text>
              <View className="relative">
                <Input {...otherYanContribution} />
                <Text className="absolute -translate-y-1/2 top-1/2 right-2 text-muted-foreground">
                  PPM YAN
                </Text>
              </View>
            </View>
            <View className="flex-1 space-y-2">
              <Text>Max g/L</Text>
              <View className="relative">
                <Input
                  value={maxGpl[3]}
                  onChangeText={(val) => editMaxGpl(3, val)}
                />
                <Text className="absolute -translate-y-1/2 top-1/2 right-2 text-muted-foreground">
                  g/L
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View>
        <View className="grid gap-1 joyride-numOfAdditions">
          <View className="flex-row items-center gap-1 my-2 ">
            <Text>{t("numberOfAdditions")}</Text>
            <Tooltip body={t("tipText.numberOfAdditions")} />
          </View>
          <Select
            value={{
              value: inputs.numberOfAdditions.value,
              label: inputs.numberOfAdditions.value,
            }}
            onValueChange={(val) => {
              if (val) inputs.numberOfAdditions.onValueChange(val.value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((num) => (
                <SelectItem
                  key={num}
                  value={num.toString()}
                  label={num.toString()}
                >
                  <Text>{num}</Text>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </View>
      </View>
    </SectionCard>
  );
}

export default NutrientSelector;

const SettingsPopover = ({
  maxGpl,
  yanContribution,
  providedYan,
  adjustAllowed,
  setAdjustAllowed,
  tutorialClassFlag,
}: {
  maxGpl: { value: string; onChangeText: (val: string) => void };
  yanContribution: { value: string; onChangeText: (val: string) => void };
  providedYan: { value: string; onChangeText: (val: string) => void };
  adjustAllowed: boolean;
  setAdjustAllowed: (value: boolean) => void;
  tutorialClassFlag?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Popover>
      {/* Popover Trigger (Settings Icon Button) */}
      <PopoverTrigger
        className={tutorialClassFlag ? "joyride-nutrientSettings" : ""}
      >
        <Settings size={14} className="text-foreground" />
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent>
        <View>
          <Text className="text-lg font-semibold">
            Adjust Nutrient Settings
          </Text>
          <View className="w-full gap-4 mt-4">
            {/* YAN Contribution */}
            <View>
              <Text>YAN Contribution</Text>
              <View className="relative">
                <Input {...yanContribution} inputMode="decimal" />
                <Text className="absolute -translate-y-1/2 top-1/2 right-2 text-muted-foreground">
                  PPM YAN
                </Text>
              </View>
            </View>

            {/* Max g/L */}
            <View>
              <Text>Max g/L</Text>
              <View className="relative">
                <Input {...maxGpl} inputMode="decimal" />
                <Text className="absolute -translate-y-1/2 top-1/2 right-2 text-muted-foreground">
                  g/L
                </Text>
              </View>
            </View>

            {/* Provided YAN & Adjust Toggle */}
            <View
              className={cn(
                adjustAllowed && "bg-destructive",
                "flex gap-4 p-2 rounded-md transition-colors"
              )}
            >
              <View>
                <View>
                  <Text>Provided YAN</Text>
                  <View className="relative">
                    <Input
                      {...providedYan}
                      inputMode="decimal"
                      editable={adjustAllowed}
                    />
                    <Text className="absolute -translate-y-1/2 top-1/2 right-2 text-muted-foreground">
                      PPM YAN
                    </Text>
                  </View>
                </View>
                <View className="mt-2">
                  <View className="flex-row gap-2">
                    <Text>Adjust Value</Text>
                    <Tooltip body={t("tipText.adjustYanValue")} />
                  </View>
                  <Switch
                    checked={adjustAllowed}
                    onCheckedChange={setAdjustAllowed}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </PopoverContent>
    </Popover>
  );
};

const LabeledCheckbox = ({
  index,
  label,
  useNutrients,
}: {
  useNutrients: () => NutrientType;
  index: number;
  label: { value: string; label: string };
}) => {
  const { t } = useTranslation();
  const {
    selected,
    maxGpl,
    yanContributions,
    editMaxGpl,
    editYanContribution,
    setSelectedNutrients,
    providedYan,
    updateProvidedYan,
    adjustAllowed,
    setAdjustAllowed,
  } = useNutrients();
  const handleNutrientChange = (nutrient: string) => {
    const prevSelected = selected?.selectedNutrients || [];

    if (prevSelected?.includes(nutrient)) {
      // If the nutrient is already selected, remove it
      setSelectedNutrients(prevSelected?.filter((item) => item !== nutrient));
    } else {
      // If the nutrient is not selected, add it
      setSelectedNutrients([...prevSelected, nutrient]);
    }
  };

  return (
    <View className="flex w-1/2 gap-2 my-1">
      <View className="flex flex-row items-center gap-1">
        <Text>{t(label.label)}</Text>
        <SettingsPopover
          maxGpl={{
            value: maxGpl[index],
            onChangeText: (value) => {
              if (isValidNumber(value)) {
                editMaxGpl(index, value);
              }
            },
          }}
          yanContribution={{
            value: yanContributions[index],
            onChangeText: (value) => {
              if (isValidNumber(value)) {
                editYanContribution(index, value);
              }
            },
          }}
          providedYan={{
            value: providedYan[index],
            onChangeText: (value) => {
              if (isValidNumber(value)) {
                updateProvidedYan(index, value);
              }
            },
          }}
          adjustAllowed={adjustAllowed}
          setAdjustAllowed={setAdjustAllowed}
          tutorialClassFlag={index === 0}
        />
      </View>
      <Switch
        checked={selected.selectedNutrients?.includes(label.value)}
        onCheckedChange={() => handleNutrientChange(label.value)}
        className="ml-2"
      />
    </View>
  );
};
