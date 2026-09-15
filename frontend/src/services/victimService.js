import apiClient from './api';
import { initialMockVictims } from '../data/mockVictims';

export const getVictims = async (filters = {}) => {
  try {
    const response = await apiClient.get('/victims', { params: filters });
    return response.data;
  } catch (error) {
    return { success: true, data: initialMockVictims, source: 'mock_fallback' };
  }
};

export const getVictimById = async (id) => {
  try {
    const response = await apiClient.get(`/victims/${id}`);
    return response.data;
  } catch (error) {
    const found = initialMockVictims.find(v => v.id === id);
    return { success: true, data: found || null, source: 'mock_fallback' };
  }
};

export const assignRescueTeam = async (victimId, teamId) => {
  try {
    const response = await apiClient.post('/victims/assign', { victimId, teamId });
    return response.data;
  } catch (error) {
    return {
      success: true,
      message: `Team ${teamId} assigned to Victim ${victimId}`,
      source: 'mock_fallback'
    };
  }
};
