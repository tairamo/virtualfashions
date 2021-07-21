import axios from "../axios";

class UserService {
  // Update user
  static async updateUser(id, data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`;
    return await axios.put(endpoint, data);
  }

  // Fetch creators
  static async fetchCreators(page) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/creators?page=${page}`;
    return await axios.get(endpoint);
  }

  // Fetch users
  static async fetchUsers(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users`;
    return await axios.post(endpoint, data);
  }

  // Fetch user
  static async fetchUser(username) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`;
    return await axios.get(endpoint);
  }

  // Request support
  static async requestSupport(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/support`;
    return await axios.post(endpoint, data);
  }
}

export default UserService;
