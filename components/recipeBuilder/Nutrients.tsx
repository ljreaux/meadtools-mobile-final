import { ScrollView } from "react-native";
import React from "react";
import VolumeInputs from "../nutrientCalc/VolumeInputs";
import { useNutrients } from "../providers/NutrientProvider";
import YeastDetails from "../nutrientCalc/YeastDetails";
import AdditionalDetails from "../nutrientCalc/AdditionalDetails";
import NutrientSelector from "../nutrientCalc/NutrientSelector";
import Results from "../nutrientCalc/Results";

const Nutrients = ({
  children,
  disabled,
}: {
  children?: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <ScrollView className="px-3 py-4" showsVerticalScrollIndicator={true}>
      <VolumeInputs useNutrients={useNutrients} disabled={disabled} />
      <YeastDetails useNutrients={useNutrients} />
      <AdditionalDetails useNutrients={useNutrients} />
      <NutrientSelector useNutrients={useNutrients} />
      <Results useNutrients={useNutrients} />
      {children}
    </ScrollView>
  );
};

export default Nutrients;
