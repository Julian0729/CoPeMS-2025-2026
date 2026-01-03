import api from "./api";

const draftService = {
  /**
   * Get all draft data for the logged-in user
   */
  async getUserDrafts() {
    try {
      const response = await api.get("/draft");
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      console.error("Error fetching drafts:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch drafts",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Save building owner data as draft
   */
  async saveBuildingOwnerDraft(data) {
    try {
      const response = await api.post("/draft/building-owner", data);
      return {
        success: true,
        message: "Building owner information saved",
        data: response.data.data,
      };
    } catch (error) {
      console.error("Error saving building owner draft:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to save building owner information",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Save construction data as draft
   */
  async saveConstructionDraft(data) {
    try {
      const response = await api.post("/draft/construction", data);
      return {
        success: true,
        message: "Construction information saved",
        data: response.data.data,
      };
    } catch (error) {
      console.error("Error saving construction draft:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to save construction information",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Save project details as draft
   */
  async saveProjectDetailsDraft(data) {
    try {
      const response = await api.post("/draft/project-details", data);
      return {
        success: true,
        message: "Project details saved",
        data: response.data.data,
      };
    } catch (error) {
      console.error("Error saving project details draft:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to save project details",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Save engineer information as draft
   */
  async saveEngineerInformationDraft(data) {
    try {
      const response = await api.post("/draft/engineer-information", data);
      return {
        success: true,
        message: "Signatory information saved",
        data: response.data.data,
      };
    } catch (error) {
      console.error("Error saving engineer information draft:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to save signatory information",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Finalize application and generate application number
   */
  async finalizeApplication() {
    try {
      const response = await api.post("/draft/finalize");
      return {
        success: true,
        message: "Application submitted successfully",
        application_number: response.data.application_number,
        data: response.data.data,
      };
    } catch (error) {
      console.error("Error finalizing application:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to submit application",
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Auto-save with debounce
   * Use this to save data automatically after user stops typing
   */
  debounce(func, delay = 1000) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },
};

export default draftService;
