import { Character } from '@/src/features/characters/characterTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (character: Character) => void;
}

const initialState: FavoritesContextType = {
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
};

const FavoritesContext = createContext<FavoritesContextType>(initialState);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [areFavoritesLoaded, setAreFavoritesLoaded] = useState(false);

  const addFavorite = (character: Character) => {
    if (favorites.some((f) => f.id === character.id)) {
      return;
    }

    setFavorites([...favorites, character]);
  };

  const removeFavorite = (character: Character) => {
    setFavorites(favorites.filter((f) => f.id !== character.id));
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      setAreFavoritesLoaded(true);
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    if (!areFavoritesLoaded) {
      return;
    }

    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, areFavoritesLoaded]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};
