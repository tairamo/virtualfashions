import axios from "../axios";

class LeadService {
  // Fetch leads
  static async fetchLeads(page) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/leads/admin?page=${page}`;
    return await axios.get(endpoint);
  }
}

export default LeadService;
