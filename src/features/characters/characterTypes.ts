export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

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
