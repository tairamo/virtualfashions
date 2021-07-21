import { isEmpty } from "lodash";
import axios from "../axios";

class AuthService {
  // Fetch auth user
  static async me(headers = {}) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/me`;
    let options = {};
    if (!isEmpty(headers)) options = { ...options, headers };
    return await axios.get(endpoint, options);
  }

  // Register
  static async register(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
    return await axios.post(endpoint, data);
  }

  // Login
  static async login(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
    return await axios.post(endpoint, data);
  }

  // Verify email
  static async verifyEmail(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`;
    return await axios.post(endpoint, data);
  }

  // Forgot password
  static async forgotPassword(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`;
    return await axios.post(endpoint, data);
  }

  // Reset password
  static async resetPassword(data) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`;
    return await axios.post(endpoint, data);
  }
}

export default AuthService;
