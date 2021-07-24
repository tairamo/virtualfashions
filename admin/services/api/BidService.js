import axios from "../axios";

class BidService {
  // Create Bid
  static async createBid(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/bids`;
    return await axios.post(endpoint, data, { withCredentials: true });
  }

  // Fetch Bids
  static async fetchBids() {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/bids/`;
    return await axios.get(endpoint);
  }
}

export default BidService;
