import axios from "../axios";

class ActionService {
  // Create auction
  static async createAuction(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auctions`;
    return await axios.post(endpoint, data);
  }

  // Fetch auctions
  static async fetchAuctions(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auctions/fetch`;
    return await axios.post(endpoint, data);
  }
}

export default ActionService;
