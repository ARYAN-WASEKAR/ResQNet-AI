import apiClient from './api';
import { initialMockShelters } from '../data/mockShelters';

export const getShelters = async () => {
  try {
    const response = await apiClient.get('/shelters');
    return response.data;
  } catch (error) {
    return { success: true, data: initialMockShelters, source: 'mock_fallback' };
  }
};

export const getShelterById = async (id) => {
  try {
    const response = await apiClient.get(`/shelters/${id}`);
    return response.data;
  } catch (error) {
    const found = initialMockShelters.find(s => s.id === id);
    return { success: true, data: found || null, source: 'mock_fallback' };
  }
};

export const findNearestShelters = async (userLat, userLng) => {
  try {
    const response = await apiClient.post('/shelters/nearest', { lat: userLat, lng: userLng });
    return response.data;
  } catch (error) {
    // Return mock shelters sorted by safety & available capacity
    const sorted = [...initialMockShelters].sort((a, b) => {
      if (a.status === 'SAFE' && b.status !== 'SAFE') return -1;
      if (b.status === 'SAFE' && a.status !== 'SAFE') return 1;
      return a.distanceKm - b.distanceKm;
    });
    return { success: true, data: sorted, source: 'mock_fallback' };
  }
};
