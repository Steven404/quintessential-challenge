import { Pressable, Text, View } from 'react-native';

type SelectButtonProps<T extends string> = {
  title: string;
  value: T;
  onValueChange: (value: T) => void;
  options: readonly T[];
};

export default function SelectButton<T extends string>({
  title,
  value,
  onValueChange,
  options,
}: SelectButtonProps<T>) {
  return (
    <View>
      <Text className="mb-3 text-lg font-bold text-gray-900">{title}</Text>
      <View className="flex-row overflow-hidden rounded-xl border border-gray-200">
        {options.map((option) => {
          const isSelected = option === value;

          return (
            <Pressable
              key={option}
              className={`flex-1 items-center border-r border-gray-200 px-1 py-3 last:border-r-0 ${
                isSelected ? 'bg-blue-500' : 'bg-white'
              }`}
              onPress={() => onValueChange(option)}
            >
              <Text
                className={`text-xs font-semibold ${
                  isSelected ? 'text-white' : 'text-gray-700'
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
