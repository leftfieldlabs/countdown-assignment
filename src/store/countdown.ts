import { atom, onMount } from 'nanostores';
import { END_DATE } from '../data';
import { calculateCountdown } from '../utils/index';

export const timeLeft = atom(calculateCountdown(END_DATE));

onMount(timeLeft, () => {
  let interval = setInterval(() => {
    timeLeft.set(calculateCountdown(END_DATE));
  }, 1000);
  return () => {
    clearInterval(interval);
  };
});

