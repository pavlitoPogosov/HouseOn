import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'] as any;

export const useGoogleMapReadiness = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCFCU2egUt6UXn7DzXfUDj0ZZeuwwvvO0w',
    libraries
  });

  return isLoaded;
};
