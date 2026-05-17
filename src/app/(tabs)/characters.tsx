import ErrorView from '@/src/components/errorView';
import FilterBottomSheet from '@/src/components/filterBottomSheet';
import { SearchBar } from '@/src/components/searchBar';
import { useCharactersReq } from '@/src/features/characters/api/characterRequests';
import {
  CharacterGender,
  CharacterGenderFilter,
  CharacterStatus,
  CharacterStatusFilter,
} from '@/src/features/characters/characterTypes';
import CharacterFlatList from '@/src/features/characters/components/characterFlatList';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutUp,
} from 'react-native-reanimated';

export default function Index() {
  const [status, setStatus] = useState<CharacterStatus | undefined>(undefined);
  const [gender, setGender] = useState<CharacterGender | undefined>(undefined);
  const [nameSearchTerm, setNameSearchTerm] = useState<string>('');

  const {
    data,
    isLoading,
    isRefetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useCharactersReq({ status, gender, name: nameSearchTerm });

  const searchBarOnChangeText = useCallback(
    debounce((text: string) => {
      setNameSearchTerm(text);
    }, 500),
    [],
  );

  const characters = data?.pages.flatMap((page) => page.results); // page.results is an array of arrays, so we need to flatten it

  if (!characters?.length && !isLoading && !isRefetching && !isError) {
    return <ErrorView message="No characters found" />;
  }

  const handleOnEndReached = () => {
    if (!hasNextPage || isFetchingNextPage || isFetching) {
      return;
    }
    fetchNextPage();
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

  const clearFilters = () => {
    setStatus(undefined);
    setGender(undefined);
    setNameSearchTerm('');
  };

  return (
    <GestureHandlerRootView>
      <View className="px-[2.5%] py-4 ">
        <SearchBar
          value={nameSearchTerm}
          onChangeText={(text) => searchBarOnChangeText(text)}
          onClear={() => setNameSearchTerm('')}
        />
      </View>
      {!isError ? (
        <Animated.View
          key="characters-list"
          className="flex-1"
          entering={FadeIn.delay(500)}
          exiting={FadeOut.duration(500)}
        >
          <CharacterFlatList
            key={`${status}-${gender}-${nameSearchTerm}`} // this will force a re-render when the filters are changed, fastest way to reset scroll position
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
        </Animated.View>
      ) : (
        <Animated.View
          key="error-view"
          entering={FadeInUp.delay(500)}
          exiting={FadeOutUp.duration(500)}
          className="flex-1"
        >
          <ErrorView
            title="Failed to load characters."
            message={error.message || 'Please try again later.'}
            button={{ title: 'Clear filters & retry', onPress: clearFilters }}
          />
        </Animated.View>
      )}
    </GestureHandlerRootView>
  );
}
