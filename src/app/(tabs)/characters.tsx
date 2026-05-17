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
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  const fetchNextPageTimeout = useRef<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState<CharacterStatus | undefined>(undefined);
  const [gender, setGender] = useState<CharacterGender | undefined>(undefined);
  const {
    data,
    isLoading,
    isRefetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useCharactersReq({ status, gender });

  if (isError) {
    return (
      <ErrorView
        title="Failed to load characters."
        message={error?.message || 'Please try again later.'}
        button={{ title: 'Retry', onPress: () => refetch() }}
      />
    );
  }

  const characters = data?.pages.flatMap((page) => page.results); // page.results is an array of arrays, so we need to flatten it

  if (!characters?.length && !isLoading && !isRefetching) {
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
    <GestureHandlerRootView>
      <CharacterFlatList
        key={`${status}-${gender}`} // this will force a re-render when the filters are changed, fastest way to reset scroll position
        characters={characters || []}
        isInitialRender={true}
        onEndReached={hasNextPage ? handleOnEndReached : undefined}
        showSkeletons={isLoading || isRefetching}
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
