import { apiRequest } from '@/src/utils/api';
import { RICK_AND_MORTY_API_URL } from '@/src/utils/url';
import { useQuery } from '@tanstack/react-query';
import { CharacterResponse } from '../characterTypes';

const url = `${RICK_AND_MORTY_API_URL}/character`;

const getCharacters = async () => await apiRequest<CharacterResponse>(url);

export const useCharactersReq = () =>
  useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  });
