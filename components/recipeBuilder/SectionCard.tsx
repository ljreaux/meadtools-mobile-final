import { View } from "react-native";
import React from "react";

const SectionCard = ({ children }: { children: React.ReactNode }) => {
  return <View className="p-4 my-2 rounded-lg bg-background">{children}</View>;
};

export default SectionCard;
