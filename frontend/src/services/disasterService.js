import apiClient from './api';
import { initialMockDisaster } from '../data/mockDisasters';

export const getDisasterStatus = async () => {
  try {
    const response = await apiClient.get('/disaster');
    return response.data;
  } catch (error) {
    return { success: true, data: initialMockDisaster, source: 'mock_fallback' };
  }
};

export const getDisasterZones = async () => {
  try {
    const response = await apiClient.get('/disaster/zones');
    return response.data;
  } catch (error) {
    return { success: true, data: initialMockDisaster.zones, source: 'mock_fallback' };
  }
};
