import api from "./api";

const buildingOwnerService = {
  // Create a new Building Owner record
  async create(data) {
    try {
      const response = await api.post("/bldg_owner", data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to create building owner record",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Get all Building Owner records
  async getAll() {
    try {
      const response = await api.get("/bldg_owner");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch building owner records",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Get Building Owner record by ID
  async getById(id) {
    try {
      const response = await api.get(`/bldg_owner/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch building owner record",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Update Building Owner record
  async update(id, data) {
    try {
      const response = await api.put(`/bldg_owner/${id}`, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to update building owner record",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Delete Building Owner record
  async delete(id) {
    try {
      const response = await api.delete(`/bldg_owner/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to delete building owner record",
        error: error.response?.data?.error || error.message,
      };
    }
  },
};

export default buildingOwnerService;
