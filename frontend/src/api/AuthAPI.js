import api from "./api";

class AuthAPI {
  // User Login
  static login(credentials) {
    return api.post("/auth/login", credentials);
  }

  // User Signup
  static signup(values) {
    return api.post("/auth/user/signup", values);
  }
}

export default AuthAPI;