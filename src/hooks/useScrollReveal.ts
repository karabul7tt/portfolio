import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const useScrollReveal = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.08,
    });

    // Observe immediately and also after slight delay for dynamic renders
    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal:not(.revealed), .reveal-scale:not(.revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();
    const timeout = setTimeout(observeElements, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [lang]);
};
