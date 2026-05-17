import ErrorView from '@/src/components/errorView';
import FilterBottomSheet from '@/src/components/filterBottomSheet';
import { useCharactersReq } from '@/src/features/characters/api/characterRequests';
import {
  CharacterGender,
  CharacterGenderFilter,
  CharacterStatus,
  CharacterStatusFilter,
} from '@/src/features/characters/characterTypes';
import CharacterFlatList from '@/src/features/characters/components/characterFlatList';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  const fetchNextPageTimeout = useRef<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState<CharacterStatus | undefined>(undefined);
  const [gender, setGender] = useState<CharacterGender | undefined>(undefined);
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useCharactersReq({ status, gender });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (isError) {
    return (
      <ErrorView
        title="Failed to load characters."
        message={error?.message || 'Please try again later.'}
      />
    );
  }

  const characters = data?.pages.flatMap((page) => page.results); // page.results is an array of arrays, so we need to flatten it

  if (!characters?.length) {
    return <ErrorView message="No characters found" />;
  }

  const handleOnEndReached = () => {
    if (fetchNextPageTimeout.current) {
      return;
    }

    fetchNextPageTimeout.current = setTimeout(() => {
      fetchNextPage();
      fetchNextPageTimeout.current = null;
    }, 500);
  };

  const handleApplyFilters = (
    status: CharacterStatusFilter,
    gender: CharacterGenderFilter,
  ) => {
    setStatus(status === 'Any' ? undefined : status);
    setGender(gender === 'Any' ? undefined : gender);
  };

  const handleResetFilters = () => {
    setStatus(undefined);
    setGender(undefined);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <CharacterFlatList
        characters={characters}
        isInitialRender={true}
        onEndReached={hasNextPage ? handleOnEndReached : undefined}
      />
      <FilterBottomSheet
        status={status || 'Any'}
        gender={gender || 'Any'}
        onApply={(
          selectedStatus: CharacterStatusFilter,
          selectedGender: CharacterGenderFilter,
        ) => handleApplyFilters(selectedStatus, selectedGender)}
        onReset={handleResetFilters}
      />
    </GestureHandlerRootView>
  );
}
