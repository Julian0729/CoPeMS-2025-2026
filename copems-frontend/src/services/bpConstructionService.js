import api from './api';

const bpConstructionService = {
  // Create a new BP Construction record
  async create(data) {
    try {
      const response = await api.post('/bp_construction', data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create construction record',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Get all BP Construction records
  async getAll() {
    try {
      const response = await api.get('/bp_construction');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch construction records',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Get BP Construction record by ID
  async getById(id) {
    try {
      const response = await api.get(`/bp_construction/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch construction record',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Update BP Construction record
  async update(id, data) {
    try {
      const response = await api.put(`/bp_construction/${id}`, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update construction record',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Delete BP Construction record
  async delete(id) {
    try {
      const response = await api.delete(`/bp_construction/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete construction record',
        error: error.response?.data?.error || error.message,
      };
    }
  },
};

export default bpConstructionService;
