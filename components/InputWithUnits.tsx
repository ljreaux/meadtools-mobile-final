import { View } from "react-native";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";
import { Text } from "./ui/text";

const InputWithUnits = ({
  value,
  text,
  disabled,
  handleChange,
  className,
}: {
  value: string;
  text: string;
  disabled?: boolean;
  handleChange?: (text: string) => void;
  className?: string;
}) => {
  return (
    <View className={cn("relative", className)}>
      <Input
        editable={disabled}
        value={value}
        readOnly={disabled}
        onChangeText={handleChange}
        inputMode="decimal"
      />
      <Text className="absolute -translate-y-1/2 top-1/2 right-2 text-muted-foreground">
        {text}
      </Text>
    </View>
  );
};

export default InputWithUnits;
