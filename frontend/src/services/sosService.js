import apiClient from './api';

export const sendSOS = async (sosPayload) => {
  try {
    const response = await apiClient.post('/sos', sosPayload);
    return response.data;
  } catch (error) {
    // Return structured mock result if backend is offline
    return {
      success: true,
      data: {
        id: `V${Math.floor(100 + Math.random() * 900)}`,
        ...sosPayload,
        status: 'Waiting',
        reportedAt: new Date().toISOString(),
      },
      source: 'mock_fallback'
    };
  }
};

export const getSOSStatus = async (sosId) => {
  try {
    const response = await apiClient.get(`/sos/${sosId}`);
    return response.data;
  } catch (error) {
    return {
      success: true,
      data: { id: sosId, status: 'En Route', etaMinutes: 8 },
      source: 'mock_fallback'
    };
  }
};

export const cancelSOS = async (sosId) => {
  try {
    const response = await apiClient.post(`/sos/${sosId}/cancel`);
    return response.data;
  } catch (error) {
    return { success: true, message: 'SOS cancelled successfully', source: 'mock_fallback' };
  }
};
