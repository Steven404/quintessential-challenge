import { apiRequest } from '@/src/utils/api';
import { RICK_AND_MORTY_API_URL } from '@/src/utils/url';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Character, CharactersResponse } from '../characterTypes';

const charactersUrl = (pageId: number) =>
  `${RICK_AND_MORTY_API_URL}/character?page=${pageId}`;
const singleCharacterUrl = (id: string) =>
  `${RICK_AND_MORTY_API_URL}/character/${id}`;

const getCharacters = async (pageId: number) =>
  await apiRequest<CharactersResponse>(charactersUrl(pageId));

export const useCharactersReq = () =>
  useInfiniteQuery<CharactersResponse>({
    queryKey: ['characters'],
    queryFn: ({ pageParam = 1 }) => getCharacters(pageParam as number),
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;

      const url = new URL(lastPage.info.next); // info.next is a URL, so we need to parse it
      const nextPage = url.searchParams.get('page');

      return parseInt(nextPage!);
    },
    initialPageParam: 1,
  });

const getCharacter = async (id: string) =>
  await apiRequest<Character>(singleCharacterUrl(id));

export const useCharacterReq = (id: string) =>
  useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
  });
