import axios from "../axios";

class UserService {
  // Update user
  static async updateUser(id, data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`;
    return await axios.put(endpoint, data);
  }

  // Fetch creators
  static async fetchCreators() {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/creators`;
    return await axios.get(endpoint);
  }

  // Fetch users
  static async fetchUsers(page) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/admin/fetch?page=${page}`;
    return await axios.get(endpoint);
  }

  // Fetch user
  static async fetchUser(username) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`;
    return await axios.get(endpoint);
  }
}

export default UserService;
