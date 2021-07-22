import axios from "../axios";

class ActionService {
  // Create auction
  static async createAuction(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auctions`;
    return await axios.post(endpoint, data);
  }

  // Fetch auctions
  static async fetchAuctions(page) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auctions/fetch?page=${page}`;
    return await axios.get(endpoint);
  }

  // Claim auction token
  static async claimAuctionToken(id, data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auctions/${id}/claim`;
    return await axios.put(endpoint, data, { withCredentials: true });
  }
}

export default ActionService;
