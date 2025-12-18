import axios from '@/lib/axios';

export const offboardingService = {
  // TERMINATION
  createTermination: (data: any) =>
    axios.post('/recruitment/termination', data),

  getTerminations: (params?: any) =>
    axios.get('/recruitment/termination', { params }),

  getTerminationById: (id: string) =>
    axios.get(`/recruitment/termination/${id}`),

  approveTermination: (id: string, data: any) =>
    axios.post(`/recruitment/termination/${id}/approve`, data),

  rejectTermination: (id: string, data: any) =>
    axios.post(`/recruitment/termination/${id}/reject`, data),

  // CLEARANCE
  getClearance: (terminationId: string) =>
    axios.get(`/recruitment/termination/${terminationId}/clearance`),

  getClearanceProgress: (clearanceId: string) =>
    axios.get(`/recruitment/clearance/${clearanceId}/progress`),

  updateClearanceItem: (clearanceId: string, itemId: string, data: any) =>
    axios.patch(`/recruitment/clearance/${clearanceId}/items/${itemId}`, data),

  approveClearanceItem: (clearanceId: string, itemId: string, data: any) =>
    axios.post(
      `/recruitment/clearance/${clearanceId}/items/${itemId}/approve`,
      data,
    ),
};
