import axios from "../axios";

class NiftyService {
  // Create nifty
  static async createNifty(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/niftys`;
    return await axios.post(endpoint, data);
  }

  // Update nifty
  static async updateNifty(id, data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/niftys/${id}`;
    return await axios.put(endpoint, data);
  }

  // Fetch created niftys
  static async fetchCreatdNiftys(userId, page) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/niftys/created?userId=${userId}&page=${page}`;
    return await axios.get(endpoint);
  }

  // Fetch collected niftys
  static async fetchCollectedNiftys(userId, page) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/niftys/collected?userId=${userId}&page=${page}`;
    return await axios.get(endpoint);
  }

  // Fetch nifty
  static async fetchNifty(username, id) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/niftys/fetch/${username}/${id}`;
    return await axios.get(endpoint);
  }

  // Fetch metadata
  static async fetchNiftyMetadata(id) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/niftys/${id}/metadata`;
    return await axios.get(endpoint);
  }

  // Search niftys
  static async searchNiftys(value) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/niftys/?search=${value}`;
    return await axios.get(endpoint);
  }
}

export default NiftyService;
