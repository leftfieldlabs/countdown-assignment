import { atom, onMount } from 'nanostores';

export const mousePosition = atom({ x: 0, y: 0 });

onMount(mousePosition, () => {
  const handleMouseMove = (e) => {
    mousePosition.set({ x: e.clientX, y: e.clientY });
  };
  document.body.addEventListener('mousemove', handleMouseMove);
  return () => {
    document.body.removeEventListener('mousemove', handleMouseMove);
  };
});
