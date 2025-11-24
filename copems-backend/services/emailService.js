const axios = require("axios");
require("dotenv").config();

class EmailService {
  constructor() {
    // EmailJS configuration
    this.publicKey = process.env.EMAILJS_PUBLIC_KEY;
    this.serviceId = process.env.EMAILJS_SERVICE_ID;
    this.templateId = process.env.EMAILJS_TEMPLATE_ID;
    this.apiUrl = "https://api.emailjs.com/api/v1.0/email/send";

    console.log("📧 EmailJS initialized with:", {
      publicKey: this.publicKey,
      serviceId: this.serviceId,
      templateId: this.templateId,
    });
  }

  /**
   * Send email confirmation to user using EmailJS HTTP API
   * @param {string} userEmail - User's email address
   * @param {string} userName - User's name
   * @param {string} confirmationToken - Unique token for verification
   */
  async sendConfirmationEmail(userEmail, userName, confirmationToken) {
    console.log("🔍 === EMAIL SERVICE DEBUG START ===");
    console.log("📧 EmailJS Config Check:", {
      publicKey: this.publicKey ? "✓ Present" : "❌ Missing",
      serviceId: this.serviceId ? "✓ Present" : "❌ Missing",
      templateId: this.templateId ? "✓ Present" : "❌ Missing",
      apiUrl: this.apiUrl,
    });

    try {
      const confirmationUrl = `${process.env.FRONTEND_URL}/confirm-email?token=${confirmationToken}`;
      console.log("🔗 Confirmation URL:", confirmationUrl);

      // EmailJS API payload
      const payload = {
        service_id: this.serviceId,
        template_id: this.templateId,
        user_id: this.publicKey,
        template_params: {
          to_email: userEmail,
          to_name: userName,
          user_email: userEmail,
          user_name: userName,
          confirmation_url: confirmationUrl,
          confirmation_token: confirmationToken,
          system_name: "COPEMS",
          expiry_time: "24 hours",
          from_name: "COPEMS Team",
          reply_to: "noreply@copems.com",
        },
      };

      console.log("📨 Sending email via EmailJS HTTP API...");
      console.log("📋 Full Payload:", JSON.stringify(payload, null, 2));
      console.log("🌐 Making request to:", this.apiUrl);

      // Send POST request to EmailJS API
      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      });

      console.log("✅ Email sent successfully!");
      console.log("📊 Response Status:", response.status);
      console.log("📄 Response Data:", response.data);
      console.log("🔍 === EMAIL SERVICE DEBUG END ===");

      return {
        success: true,
        messageId: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log("🔍 === EMAIL SERVICE ERROR DEBUG ===");
      console.error("❌ Failed to send email");
      console.error("🚨 Error Type:", error.name);
      console.error("📝 Error Message:", error.message);
      console.error("🔢 Error Code:", error.code);

      if (error.response) {
        console.error("📊 HTTP Status:", error.response.status);
        console.error("📋 Response Headers:", error.response.headers);
        console.error(
          "📄 Response Data:",
          JSON.stringify(error.response.data, null, 2)
        );
      } else if (error.request) {
        console.error("📡 Request was made but no response received");
        console.error("🌐 Request Details:", error.request);
      } else {
        console.error("⚙️ Error setting up request:", error.message);
      }

      console.error("📚 Full Error Stack:", error.stack);
      console.log("🔍 === EMAIL SERVICE ERROR DEBUG END ===");

      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status,
        errorType: error.name,
        errorCode: error.code,
      };
    }
  }

  /**
   * Test EmailJS connection with a simple test email
   */
  async testConnection() {
    try {
      console.log("🧪 Testing EmailJS HTTP API connection...");

      const testResult = await this.sendConfirmationEmail(
        "test@example.com",
        "Test User",
        "test-token-123"
      );

      if (testResult.success) {
        console.log("✅ EmailJS HTTP API is working");
        return true;
      } else {
        console.error("❌ EmailJS test failed:", testResult.error);
        return false;
      }
    } catch (error) {
      console.error("❌ EmailJS service error:", error.message);
      return false;
    }
  }
}

module.exports = new EmailService();
