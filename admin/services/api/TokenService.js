import axios from "../axios";

class TokenService {
  // Update token
  static async updateToken(id, data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/tokens/admin/${id}`;
    return await axios.put(endpoint, data, { withCredentials: true });
  }

  // Fetch tokens
  static async fetchTokens(page) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/tokens/admin/fetch?page=${page}`;
    return await axios.get(endpoint);
  }

  // Fetch token
  static async fetchToken(username, id) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/tokens/admin/fetch/${username}/${id}`;
    return await axios.get(endpoint);
  }

  // Fetch metadata
  static async fetchTokenMetadata(id) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/tokens/${id}/metadata`;
    return await axios.get(endpoint);
  }

  // Search tokens
  static async searchTokens(value) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/tokens/?search=${value}`;
    return await axios.get(endpoint);
  }

  // Fetch created tokens
  static async fetchCreatdTokens(userId, page) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/tokens/created?userId=${userId}&page=${page}`;
    return await axios.get(endpoint);
  }

  // Fetch collected tokens
  static async fetchCollectedTokens(userId, page) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/tokens/collected?userId=${userId}&page=${page}`;
    return await axios.get(endpoint);
  }

  // Send token verified mail
  static async sendTokenVerified(id) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/tokens/admin/verified/${id}`;
    return await axios.get(endpoint);
  }
}

export default TokenService;
