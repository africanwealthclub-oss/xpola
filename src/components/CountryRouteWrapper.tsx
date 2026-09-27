// FILE PATH: src/components/common/CountryRouteWrapper.tsx
// Place this file at: src/components/common/CountryRouteWrapper.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCountry } from '@/contexts/CountryContext';

interface CountryRouteWrapperProps {
  children: React.ReactNode;
}

const CountryRouteWrapper = ({ children }: CountryRouteWrapperProps) => {
  const location = useLocation();
  const { setSelectedCountry } = useCountry();

  useEffect(() => {
    // Auto-detect country from URL path
    if (location.pathname.startsWith('/nigeria')) {
      setSelectedCountry('nigeria');
    } else if (location.pathname.startsWith('/canada')) {
      setSelectedCountry('canada');
    }
    // For root paths, keep the user's currently selected country
  }, [location.pathname, setSelectedCountry]);

  return <>{children}</>;
};

export default CountryRouteWrapper;
