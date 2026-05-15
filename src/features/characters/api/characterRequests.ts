import { apiRequest } from '@/src/utils/api';
import { RICK_AND_MORTY_API_URL } from '@/src/utils/url';
import { useQuery } from '@tanstack/react-query';
import { Character, CharactersResponse } from '../characterTypes';

const url = `${RICK_AND_MORTY_API_URL}/character`;

const getCharacters = async () => await apiRequest<CharactersResponse>(url);

export const useCharactersReq = () =>
  useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  });

const getCharacter = async (id: string) =>
  await apiRequest<Character>(`${url}/${id}`);

export const useCharacterReq = (id: string) =>
  useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
  });
