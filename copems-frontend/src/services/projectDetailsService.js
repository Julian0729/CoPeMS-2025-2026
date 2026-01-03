import api from "./api";

const projectDetailsService = {
  // Create a new Project Details record
  async create(data) {
    try {
      const response = await api.post("/project_details", data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to create project details",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Get all Project Details records for the authenticated user
  async getAll() {
    try {
      const response = await api.get("/project_details");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch project details",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Get Project Details record by ID
  async getById(id) {
    try {
      const response = await api.get(`/project_details/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch project details",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Update Project Details record
  async update(id, data) {
    try {
      const response = await api.put(`/project_details/${id}`, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update project details",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Delete Project Details record
  async delete(id) {
    try {
      const response = await api.delete(`/project_details/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to delete project details",
        error: error.response?.data?.error || error.message,
      };
    }
  },
};

export default projectDetailsService;
