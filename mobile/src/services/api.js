import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Owner login
export const ownerLogin = (email, password) => {
  return axios.post(`${API_URL}/auth/owner-login`, { email, password });
};

// Worker login
export const workerLogin = (login, password) => {
  return axios.post(`${API_URL}/auth/worker-login`, { login, password });
};

// Register new worker (owner only)
export const registerWorker = (workerData) => {
  return axios.post(`${API_URL}/worker/register`, workerData);
};

// Get workers list for owner shop
export const getWorkersList = (shopId) => {
  return axios.get(`${API_URL}/worker/list/${shopId}`);
};

// Get past workers list for owner shop
export const getPastWorkersList = (shopId) => {
  return axios.get(`${API_URL}/worker/past/${shopId}`);
};

// Remove a worker by ID (owner only)
export const removeWorker = (workerId) => {
  return axios.post(`${API_URL}/worker/remove/${workerId}`);
};

// Change worker password (worker or owner can call)
export const changeWorkerPassword = (workerId, newPassword) => {
  return axios.post(`${API_URL}/worker/change-password/${workerId}`, { password: newPassword });
};

// Mark attendance (fingerprint/manual)
export const markAttendance = (payload) => {
  // payload: { workerId, shop, fingerprint, manual, type: 'checkin'|'checkout' }
  return axios.post(`${API_URL}/attendance/mark`, payload);
};

// Get attendance summary for a specific date (owner)
export const getAttendanceSummary = (shopId, date) => {
  return axios.get(`${API_URL}/attendance/summary/${shopId}/${date}`);
};

// Export attendance report as PDF by date range (owner)
// Note: This returns a blob/file stream to be handled in the app (e.g. download or view)
export const exportAttendanceReportPdf = (shopId, fromDate, toDate) => {
  return axios.get(`${API_URL}/report/pdf/${shopId}/${fromDate}/${toDate}`, {
    responseType: 'blob'
  });
};

export default {
  ownerLogin,
  workerLogin,
  registerWorker,
  getWorkersList,
  getPastWorkersList,
  removeWorker,
  changeWorkerPassword,
  markAttendance,
  getAttendanceSummary,
  exportAttendanceReportPdf
};
