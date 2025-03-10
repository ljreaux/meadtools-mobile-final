import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import { Input } from "../ui/input";
import useSuggestions from "~/hooks/useSuggestions";
import { useTranslation } from "react-i18next";
import lodash from "lodash";

type SearchableInputProps<T> = {
  items: T[];
  query: string;
  setQuery: (val: string) => void;
  keyName: keyof T;
  onSelect: (item: T) => void;
};

function SearchableInput<T extends { [key: string]: any }>({
  items,
  query,
  setQuery,
  keyName,
  onSelect,
}: SearchableInputProps<T>) {
  const inputRef = useRef<React.ElementRef<typeof Input>>(null);
  const { t } = useTranslation();

  const { suggestions, isDropdownVisible } = useSuggestions(
    items,
    query,
    keyName
  );

  const handleSelect = (item: T) => {
    onSelect(item);
    setQuery(t(lodash.camelCase(item[keyName]?.toString())));
    Keyboard.dismiss();
  };

  return (
    <View className="w-full">
      <Input ref={inputRef} value={query} onChangeText={setQuery} />

      {isDropdownVisible && suggestions.length > 0 && (
        <View className="absolute left-0 right-0 z-50 overflow-hidden border rounded-md shadow-md top-12 bg-background border-input max-h-60">
          {/* Replace FlatList with ScrollView and manually render the items */}
          <ScrollView keyboardShouldPersistTaps="handled" className="max-h-60">
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="px-4 py-3 border-b border-border active:bg-muted"
                onPress={() => handleSelect(item)}
              >
                <Text className="text-sm text-foreground">
                  {t(lodash.camelCase(item[keyName]?.toString()))}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default SearchableInput;
