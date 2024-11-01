const API_URL = "/api/emails";

export const emailService = {
  async getEmails(search = "") {
    const response = await fetch(
      `${API_URL}${search ? `?search=${search}` : ""}`
    );
    return response.json();
  },

  async sendEmail(emailData) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });
    return response.json();
  },

  async deleteEmail(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

  async toggleStar(id, method) {
    const response = await fetch(`${API_URL}/${id}/star`, {
      method,
    });
    return response.json();
  },

  async toggleArchive(id, method) {
    const response = await fetch(`${API_URL}/${id}/archive`, {
      method,
    });
    return response.json();
  },
};
