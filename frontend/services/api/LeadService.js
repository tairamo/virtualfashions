import axios from "../axios";

class LeadService {
  // Create lead
  static async createLead(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/leads`;
    return await axios.post(endpoint, data);
  }
}

export default LeadService;
