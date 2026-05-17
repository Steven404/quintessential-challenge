import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ActionButtonProps = {
  title: string;
  onPress: () => void;
};

type ErrorViewProps = {
  title?: string;
  message: string;
  button?: ActionButtonProps;
};

export default function ErrorView({ title, message, button }: ErrorViewProps) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center justify-center px-6">
      {title && (
        <Text className="text-center text-lg text-red-500">{title}</Text>
      )}
      <Text className="mt-2 text-center text-gray-500">{message}</Text>
      {button && (
        <TouchableOpacity
          onPress={button.onPress}
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2"
        >
          <Text className="font-medium text-white">{button.title}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
