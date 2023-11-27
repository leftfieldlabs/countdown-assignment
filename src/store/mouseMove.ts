import { atom, onMount } from 'nanostores';

export const mousePosition = atom({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 });

onMount(mousePosition, () => {
  const handleMouseMove = (e) => {
    mousePosition.set({ x: e.clientX, y: e.clientY });
  };
  document.body.addEventListener('mousemove', handleMouseMove);
  return () => {
    document.body.removeEventListener('mousemove', handleMouseMove);
  };
});
