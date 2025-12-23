import { defineStore } from "pinia";
import draftService from "../services/draftService";

export const useDraftStore = defineStore("draft", {
  state: () => ({
    buildingOwner: null,
    construction: null,
    projectDetails: null,
    engineerInformation: null,
    applicationNumber: null,
    isDraft: true,
    loading: false,
    autoSaving: false,
    lastSaved: null,
  }),

  getters: {
    hasDraftData: (state) => {
      return !!(
        state.buildingOwner ||
        state.construction ||
        state.projectDetails ||
        state.engineerInformation
      );
    },
    isFinalized: (state) => !state.isDraft && !!state.applicationNumber,
  },

  actions: {
    /**
     * Load draft data when user logs in
     */
    async loadDrafts() {
      this.loading = true;
      try {
        const result = await draftService.getUserDrafts();
        if (result.success) {
          this.buildingOwner = result.data.buildingOwner;
          this.construction = result.data.construction;
          this.projectDetails = result.data.projectDetails;
          this.engineerInformation = result.data.engineerInformation;

          // Check if any data has application number (finalized)
          if (
            this.buildingOwner?.application_number ||
            this.construction?.application_number ||
            this.projectDetails?.application_number ||
            this.engineerInformation?.application_number
          ) {
            this.isDraft = false;
            this.applicationNumber =
              this.buildingOwner?.application_number ||
              this.construction?.application_number ||
              this.projectDetails?.application_number ||
              this.engineerInformation?.application_number;
          }
        }
      } catch (error) {
        console.error("Failed to load drafts:", error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Save building owner data as draft
     */
    async saveBuildingOwner(data) {
      this.autoSaving = true;
      try {
        const result = await draftService.saveBuildingOwnerDraft(data);
        if (result.success) {
          this.buildingOwner = result.data;
          this.lastSaved = new Date();
          return { success: true, message: result.message };
        }
        return { success: false, message: result.message };
      } catch (error) {
        console.error("Failed to save building owner:", error);
        return { success: false, message: "Failed to save data" };
      } finally {
        this.autoSaving = false;
      }
    },

    /**
     * Save construction data as draft
     */
    async saveConstruction(data) {
      this.autoSaving = true;
      try {
        const result = await draftService.saveConstructionDraft(data);
        if (result.success) {
          this.construction = result.data;
          this.lastSaved = new Date();
          return { success: true, message: result.message };
        }
        return { success: false, message: result.message };
      } catch (error) {
        console.error("Failed to save construction:", error);
        return { success: false, message: "Failed to save data" };
      } finally {
        this.autoSaving = false;
      }
    },

    /**
     * Save project details as draft
     */
    async saveProjectDetails(data) {
      this.autoSaving = true;
      try {
        const result = await draftService.saveProjectDetailsDraft(data);
        if (result.success) {
          this.projectDetails = result.data;
          this.lastSaved = new Date();
          return { success: true, message: result.message };
        }
        return { success: false, message: result.message };
      } catch (error) {
        console.error("Failed to save project details:", error);
        return { success: false, message: "Failed to save data" };
      } finally {
        this.autoSaving = false;
      }
    },

    /**
     * Save engineer information as draft
     */
    async saveEngineerInformation(data) {
      this.autoSaving = true;
      try {
        const result = await draftService.saveEngineerInformationDraft(data);
        if (result.success) {
          this.engineerInformation = result.data;
          this.lastSaved = new Date();
          return { success: true, message: result.message };
        }
        return { success: false, message: result.message };
      } catch (error) {
        console.error("Failed to save engineer information:", error);
        return { success: false, message: "Failed to save data" };
      } finally {
        this.autoSaving = false;
      }
    },

    /**
     * Finalize application and generate application number
     */
    async finalizeApplication() {
      this.loading = true;
      try {
        const result = await draftService.finalizeApplication();
        if (result.success) {
          this.isDraft = false;
          this.applicationNumber = result.application_number;
          return {
            success: true,
            message: result.message,
            application_number: result.application_number,
          };
        }
        return { success: false, message: result.message };
      } catch (error) {
        console.error("Failed to finalize application:", error);
        return { success: false, message: "Failed to submit application" };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Clear all draft data (on logout or after submission)
     */
    clearDrafts() {
      this.buildingOwner = null;
      this.construction = null;
      this.projectDetails = null;
      this.engineerInformation = null;
      this.applicationNumber = null;
      this.isDraft = true;
      this.lastSaved = null;
    },

    /**
     * Format last saved time for display
     */
    getLastSavedText() {
      if (!this.lastSaved) return "";

      const now = new Date();
      const diff = Math.floor((now - this.lastSaved) / 1000); // seconds

      if (diff < 60) return "Saved just now";
      if (diff < 3600) return `Saved ${Math.floor(diff / 60)} minutes ago`;
      return `Saved at ${this.lastSaved.toLocaleTimeString()}`;
    },
  },
});
