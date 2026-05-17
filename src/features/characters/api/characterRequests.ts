import { apiRequest } from '@/src/utils/api';
import { RICK_AND_MORTY_API_URL } from '@/src/utils/url';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {
  Character,
  CharacterGender,
  CharactersResponse,
  CharacterStatus,
} from '../characterTypes';

const charactersUrl = (
  pageId: number,
  status?: CharacterStatus,
  gender?: CharacterGender,
  name?: string,
) =>
  `${RICK_AND_MORTY_API_URL}/character?page=${pageId}${status ? `&status=${status.toLowerCase()}` : ''}${gender ? `&gender=${gender.toLowerCase()}` : ''}${name ? `&name=${name}` : ''}`;
const singleCharacterUrl = (id: string) =>
  `${RICK_AND_MORTY_API_URL}/character/${id}`;

const getCharacters = async (
  pageId: number,
  status?: CharacterStatus,
  gender?: CharacterGender,
  name?: string,
) =>
  await apiRequest<CharactersResponse>(
    charactersUrl(pageId, status, gender, name),
  );

export const useCharactersReq = ({
  status,
  gender,
  name,
}: {
  status?: CharacterStatus;
  gender?: CharacterGender;
  name?: string;
}) =>
  useInfiniteQuery<CharactersResponse>({
    queryKey: [
      'characters',
      status?.toString().toLowerCase(),
      gender?.toString().toLowerCase(),
      name?.toString().toLowerCase(),
    ],
    queryFn: ({ pageParam = 1, queryKey }) =>
      getCharacters(
        pageParam as number,
        queryKey?.[1] as CharacterStatus,
        queryKey?.[2] as CharacterGender,
        queryKey?.[3] as string,
      ),
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;

      const url = new URL(lastPage.info.next); // info.next is a URL, so we need to parse it
      const nextPage = url.searchParams.get('page');

      return parseInt(nextPage!);
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    retry: 0,
  });

const getCharacter = async (id: string) =>
  await apiRequest<Character>(singleCharacterUrl(id));

export const useCharacterReq = (id: string) =>
  useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
  });
