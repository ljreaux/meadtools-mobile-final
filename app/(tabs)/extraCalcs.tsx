import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import ExtraCalcs from "~/components/extraCalcs/ExtraCalcs";

const extraCalcs = () => {
  return (
    <View className="flex-1 gap-5 p-4 bg-secondary/70">
      <ExtraCalcs />
    </View>
  );
};

export default extraCalcs;
