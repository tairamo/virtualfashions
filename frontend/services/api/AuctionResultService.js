import axios from "../axios";

class ActionResultService {
  // Fetch auction result
  static async fetchAuctionResult(id) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auction-results/${id}`;
    return await axios.get(endpoint);
  }
}

export default ActionResultService;
