import axios from "../axios";

class SettingService {
  // Get eth price
  static async fetchETHPrice() {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/settings/ethPrice`;
    return await axios.get(endpoint);
  }
}

export default SettingService;
