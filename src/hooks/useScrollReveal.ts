import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const useScrollReveal = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Sayfa o alana gelince animasyonu başlat
          entry.target.classList.add('revealed');
        } else {
          // Sayfadan çıkınca sıfırla ki yukarı/aşağı kaydırırken her seferinde tekrar oynasın
          entry.target.classList.remove('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.08,
    });

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal, .reveal-scale');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();
    const timeout = setTimeout(observeElements, 150);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [lang]);
};
