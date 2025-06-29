import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollOnNavigation = (scrollPosition = 0) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  }, [pathname, scrollPosition]);
};

export const scrollOnFilter = () => {
  const topPosition = window.innerWidth <= 768 ? 440 : 510;
  window.scrollTo({ top: topPosition, behavior: 'smooth' });
};