import SearchableInput from "../ui/SearchableInput";
import { Button, buttonTextVariants } from "../ui/button";
import { useTranslation } from "react-i18next";
import { Additive, AdditiveType, Recipe } from "~/types/recipeDataTypes";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { isValidNumber } from "~/lib/utils/validateInput";
import { ScrollView, View } from "react-native";
import { useRecipe } from "../providers/RecipeProvider";
import SectionCard from "./SectionCard";
import { Text } from "../ui/text";
import { ChevronUp } from "~/lib/icons/ChevronUp";
import { ChevronDown } from "~/lib/icons/ChevronDown";

const units = [
  { value: "g", label: "G" },
  { value: "mg", label: "MG" },
  { value: "kg", label: "KG" },
  { value: "oz", label: "OZ" },
  { value: "lbs", label: "LBS" },
  { value: "ml", label: "ML" },
  { value: "liters", label: "LIT" },
  { value: "fl oz", label: "FLOZ" },
  { value: "quarts", label: "QUARTS" },
  { value: "gal", label: "GALS" },
  { value: "tsp", label: "TSP" },
  { value: "tbsp", label: "TBSP" },
  { value: "units", label: "UNITS" },
];

const Additives = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ScrollView>
      <AdditivesCard useRecipe={useRecipe} />
      {children}
    </ScrollView>
  );
};

export default Additives;

function AdditivesCard({ useRecipe }: { useRecipe: () => Recipe }) {
  const { t } = useTranslation();
  const {
    additives,
    changeAdditive,
    changeAdditiveUnits,
    changeAdditiveAmount,
    addAdditive,
    removeAdditive,
    additiveList,
    updateAdditives,
  } = useRecipe();

  const moveUp = (index: number) => {
    if (index > 0) {
      const temp = additives[index];
      additives[index] = additives[index - 1];
      additives[index - 1] = temp;
      updateAdditives([...additives]);
    }
  };

  const moveDown = (index: number) => {
    if (index < additives.length - 1) {
      const temp = additives[index];
      additives[index] = additives[index + 1];
      additives[index + 1] = temp;
      updateAdditives([...additives]);
    }
  };

  return (
    <SectionCard>
      <View>
        {additives.length === 0 ? (
          <Text className="my-4">
            Add Some Additives to Continue Building your Recipe.
          </Text>
        ) : (
          additives.map((add, i) => {
            const id = additives.find((item) => item.id === add.id)?.id || "";
            return (
              <AdditiveLine
                additiveList={additiveList}
                add={add}
                changeAdditive={(value) => {
                  changeAdditive(id, value);
                }}
                changeUnit={(unit) => {
                  changeAdditiveUnits(id, unit);
                }}
                changeAmount={(amount) => {
                  changeAdditiveAmount(id, amount);
                }}
                remove={() => {
                  removeAdditive(id);
                }}
                key={add.id}
              >
                <View className="flex-row w-full gap-2 my-2">
                  {i !== 0 && (
                    <Button
                      onPress={() => moveUp(i)}
                      className="flex-1"
                      variant="secondary"
                    >
                      <ChevronUp
                        className={buttonTextVariants({
                          variant: "secondary",
                        })}
                      />
                    </Button>
                  )}
                  {i !== additives.length - 1 && (
                    <Button
                      onPress={() => moveDown(i)}
                      className="flex-1"
                      variant="secondary"
                    >
                      <ChevronDown
                        className={buttonTextVariants({
                          variant: "secondary",
                        })}
                      />
                    </Button>
                  )}
                </View>
              </AdditiveLine>
            );
          })
        )}
      </View>
      <Button
        onPress={addAdditive}
        variant={"secondary"}
        disabled={additives.length >= 10}
        className="w-full"
      >
        <Text>{t("additives.addNew")}</Text>
      </Button>
    </SectionCard>
  );
}

const AdditiveLine = ({
  additiveList,
  add,
  changeAdditive,
  changeUnit,
  changeAmount,
  remove,
  children,
}: {
  additiveList: Additive[];
  add: AdditiveType;
  changeAdditive: (val: string) => void;
  changeUnit: (val: string) => void;
  changeAmount: (val: string) => void;
  remove: () => void;
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation();

  const handleAdditiveSelect = (selectedIngredient: Additive) => {
    changeAdditive(selectedIngredient.name);
  };

  const currentUnits = units
    .map((u) => ({ ...u, label: t(u.label) }))
    .find((u) => u.value === add.unit);

  return (
    <View className="my-4">
      <View>
        <Text>{t("name")}</Text>
        <SearchableInput
          items={additiveList}
          query={add.name}
          setQuery={(val) => changeAdditive(val)}
          keyName="name"
          onSelect={handleAdditiveSelect}
        />
      </View>
      <View className="flex flex-row justify-between gap-2 my-2">
        <View className="flex-[0.5]">
          <Text>{t("PDF.addAmount")}</Text>
          <Input
            value={add.amount}
            onChangeText={(value) => {
              if (isValidNumber(value)) changeAmount(value);
            }}
            inputMode="decimal"
            className="w-full"
          />
        </View>
        <View className="flex-[0.5]">
          <Text>{t("UNITS")}</Text>
          <Select
            value={currentUnits}
            onValueChange={(val) => {
              if (val) changeUnit(val.value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="SelectUnits" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem
                  key={unit.value}
                  value={unit.value}
                  label={t(unit.label)}
                />
              ))}
            </SelectContent>
          </Select>
        </View>
      </View>
      {children}
      <Button onPress={remove} variant={"destructive"} className="mt-auto">
        <Text>Remove</Text>
      </Button>
    </View>
  );
};
