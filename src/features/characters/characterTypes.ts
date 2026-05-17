export const characterStatuses = ['Alive', 'Dead', 'unknown'] as const;
export type CharacterStatus = (typeof characterStatuses)[number];

export const characterGenders = [
  'Female',
  'Male',
  'Genderless',
  'unknown',
] as const;
export type CharacterGender = (typeof characterGenders)[number];

export type CharacterGenderFilter = CharacterGender | 'Any';

export type CharacterStatusFilter = CharacterStatus | 'Any';

export type CharacterPlaceReference = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterPlaceReference;
  location: CharacterPlaceReference;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};
