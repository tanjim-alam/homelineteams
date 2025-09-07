import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useHeroData = () => {
  const [heroData, setHeroData] = useState({
    mobileBackgroundImages: [
      { imageUrl: '/mobileheroimg1.png', altText: 'Mobile Hero Background 1', isActive: true },
      { imageUrl: '/mobileheroimg.jpg', altText: 'Mobile Hero Background 2', isActive: true },
      { imageUrl: '/mobileheroimg2.png', altText: 'Mobile Hero Background 3', isActive: true },
      { imageUrl: '/mobileheroimg3.png', altText: 'Mobile Hero Background 4', isActive: true }
    ],
    desktopBackgroundImages: [
      { imageUrl: '/hero-bg-1.jpg', altText: 'Desktop Hero Background 1', isActive: true },
      { imageUrl: '/hero-bg-2.jpg', altText: 'Desktop Hero Background 2', isActive: true },
      { imageUrl: '/hero-bg-3.jpg', altText: 'Desktop Hero Background 3', isActive: true }
    ],
    categories: [
      { imageUrl: 'https://www.vijayhomeservices.com/static/media/vp1.126c81b8638d44a4a4a1.png', title: 'Home Cleaning', link: '/collections/home-cleaning', altText: 'Home Cleaning', isActive: true },
      { imageUrl: 'https://www.vijayhomeservices.com/static/media/vp1.126c81b8638d44a4a4a1.png', title: 'Kitchen Cleaning', link: '/collections/kitchen-cleaning', altText: 'Kitchen Cleaning', isActive: true },
      { imageUrl: 'https://www.vijayhomeservices.com/static/media/vp1.126c81b8638d44a4a4a1.png', title: 'Bathroom Cleaning', link: '/collections/bathroom-cleaning', altText: 'Bathroom Cleaning', isActive: true },
      { imageUrl: 'https://www.vijayhomeservices.com/static/media/vp1.126c81b8638d44a4a4a1.png', title: 'Pest Control', link: '/collections/pest-control', altText: 'Pest Control', isActive: true }
    ],
    sliderSettings: {
      autoSlide: true,
      slideInterval: 3000,
      transitionDuration: 1000
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchHeroData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    
    setError(null);
    
    try {
      console.log('Fetching hero data from API...');
      const data = await apiService.getHeroSection();
      console.log('Hero data received:', data);
      
      if (data && data.success) {
        setHeroData(data.data);
        setLastUpdated(new Date());
        console.log('Hero data updated successfully');
      } else {
        console.log('API returned unsuccessful response, using default data');
        console.log('API response:', data);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
      setError(error.message);
      console.log('Using default hero data due to API error');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHeroData();
    
    // Set up auto-refresh every 30 seconds to get latest data
    const refreshInterval = setInterval(() => fetchHeroData(true), 30000);
    
    return () => clearInterval(refreshInterval);
  }, [fetchHeroData]);

  // Listen for focus events to refresh when user returns to tab
  useEffect(() => {
    const handleFocus = () => {
      fetchHeroData(true);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchHeroData]);

  // Listen for visibility change to refresh when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchHeroData(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchHeroData]);

  return {
    heroData,
    isLoading,
    isRefreshing,
    lastUpdated,
    error,
    refresh: () => fetchHeroData(true)
  };
};
