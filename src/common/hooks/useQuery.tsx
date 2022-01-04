import { useLocation } from 'react-router';

export const useQuery = (): URLSearchParams => {
  const location = useLocation();

  return new URLSearchParams(location.search);
};
