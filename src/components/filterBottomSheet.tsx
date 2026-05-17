import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  CharacterGenderFilter,
  characterGenders,
  characterStatuses,
  CharacterStatusFilter,
} from '../features/characters/characterTypes';
import { wigglyConfigCard } from '../utils/animationConfigs';
import SelectButton from './selectButton';
import SimpleButton from './simpleButton';

type FilterBottomSheetProps = {
  onApply: (
    status: CharacterStatusFilter,
    gender: CharacterGenderFilter,
  ) => void;
  onReset: () => void;
  status: CharacterStatusFilter;
  gender: CharacterGenderFilter;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const statusOptions: CharacterStatusFilter[] = [...characterStatuses, 'Any'];
const genderOptions: CharacterGenderFilter[] = [...characterGenders, 'Any'];

export default function FilterBottomSheet({
  onApply,
  onReset,
  status,
  gender,
}: FilterBottomSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<CharacterStatusFilter>(status);
  const [selectedGender, setSelectedGender] =
    useState<CharacterGenderFilter>(gender);
  const pressAnim = useSharedValue(1);

  const statusRef = useRef<CharacterStatusFilter>(status);
  const genderRef = useRef<CharacterGenderFilter>(gender);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressAnim.value }],
    opacity: pressAnim.value ** 4,
  }));

  const handlePressIn = () => {
    pressAnim.value = withSpring(0.94, wigglyConfigCard);
  };

  const handlePressOut = () => {
    pressAnim.value = withSpring(1, wigglyConfigCard);
  };

  const handleFilterButtonPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleApplyPressed = () => {
    onApply(selectedStatus, selectedGender);
    statusRef.current = selectedStatus;
    genderRef.current = selectedGender;
    setTimeout(closeBottomSheet, 150);
  };

  const handleResetPressed = () => {
    setSelectedStatus('Any');
    setSelectedGender('Any');
    statusRef.current = 'Any';
    genderRef.current = 'Any';
    onReset();
    setTimeout(closeBottomSheet, 150);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const onModalDismiss = () => {
    setSelectedStatus(statusRef.current);
    setSelectedGender(genderRef.current);
  };

  return (
    <BottomSheetModalProvider>
      <AnimatedPressable
        style={animatedStyle}
        className="absolute bottom-10 right-4 rounded-full bg-white px-4 py-3 shadow-lg"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleFilterButtonPress}
      >
        <FontAwesome name="filter" size={30} color="black" />
      </AnimatedPressable>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        onDismiss={onModalDismiss}
      >
        <BottomSheetView className="gap-6 px-5 pb-8 pt-2">
          <SelectButton
            title="Status"
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            options={statusOptions}
          />

          <SelectButton
            title="Gender"
            value={selectedGender}
            onValueChange={setSelectedGender}
            options={genderOptions}
          />

          <SimpleButton title="Apply" onPress={handleApplyPressed} />
          <SimpleButton
            title="Reset"
            type="cancel"
            onPress={handleResetPressed}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
