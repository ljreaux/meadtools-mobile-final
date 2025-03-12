import { View } from "react-native";
import React from "react";
import { cn } from "~/lib/utils";

const SectionCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <View className={cn("p-4 my-2 rounded-lg bg-background", className)}>
      {children}
    </View>
  );
};

export default SectionCard;
