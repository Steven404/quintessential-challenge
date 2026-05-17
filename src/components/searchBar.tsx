import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (str: string) => void;
  onClear: () => void;
};

export function SearchBar({ value, onChangeText, onClear }: SearchBarProps) {
  const [internalValue, setInternalValue] = useState<string>(value);

  // this fixes the reset bug
  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    onChangeText(internalValue);
  }, [internalValue]);

  return (
    <View className="flex-row items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <TextInput
        className="flex-1 text-base text-gray-900 dark:text-white"
        placeholder="Search by name..."
        placeholderTextColor="#9CA3AF"
        value={internalValue}
        onChangeText={setInternalValue}
      />
      {internalValue && value && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons name="close" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
}
