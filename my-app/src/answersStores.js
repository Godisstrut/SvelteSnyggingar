import { writable } from 'svelte/store';

const STORAGE_KEY = 'game_answers';

const initializeGameData = () => {
  let storedData = [];
  if (typeof window !== 'undefined') {
    storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }
  return storedData;
};

export const createAnswersStore = (gameId) => {
  let storedAnswers = [];
  let allGamesData = [];
  if (typeof window !== 'undefined') {
    allGamesData = initializeGameData();
  }

  const gameDataIndex = allGamesData.findIndex(game => game.gameId === gameId);
  if (gameDataIndex !== -1) {
    storedAnswers = allGamesData[gameDataIndex].answers || [];
  } else {
    allGamesData.push({ gameId, answers: [] });
  }

  const { subscribe, set, update } = writable(storedAnswers);

  if (typeof window !== 'undefined') {
    subscribe(value => {
      const newData = { gameId, answers: value };
      if (gameDataIndex !== -1) {
        allGamesData[gameDataIndex] = newData;
      } else {
        allGamesData.push(newData);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allGamesData));
    });
  }

  return {
    subscribe,
    set,
    update
  };
};
