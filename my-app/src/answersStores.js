import { writable } from 'svelte/store';

export const createAnswersStore = (gameId) => {
  let storedAnswers = [];
  const storageKey = `answers_${gameId}`;

  if (typeof window !== 'undefined') {
    storedAnswers = JSON.parse(localStorage.getItem(storageKey)) || [];
  }

  const { subscribe, set, update } = writable(storedAnswers);

  if (typeof window !== 'undefined') {
    subscribe(value => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    });
  }

  return {
    subscribe,
    set,
    update
  };
};
