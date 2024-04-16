import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../../api/AuthAPI";
import { useAuthStore } from "../../store/useAuthStore";
import { errorMessage, successMessage } from "../../utils/Alert";
import { Link, useNavigate } from "react-router-dom";
import { USER_ROLES } from "../../constants/roles";

const Login = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errors.email = "Email is invalid";
    }

    if (!password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (password.length < 6) {
      // Example: Minimum length check
      isValid = false;
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return isValid;
  };

  const redirectToDashboard = (res) => {
    if (res.data.user.role === USER_ROLES.USER_MANAGER) {
      navigate("/user-manager");
    } else if (res.data.user.role === USER_ROLES.DISTRIBUTOR_MANAGER) {
      navigate("/distributor-manager");
    } else if (res.data.user.role === USER_ROLES.INVENTORY_MANAGER) {
      navigate("/inventory-manager");
    } else if (res.data.user.role === USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR) {
      navigate("/supplier-chain-supervisor");
    } else if (res.data.user.role === USER_ROLES.EXPORT_MANAGER) {
      navigate("/export-manager");
    } else if (res.data.user.role === USER_ROLES.DONATION_MANAGER) {
      navigate("/donation-manager");
    } else if (res.data.user.role === USER_ROLES.SHOWROOM_AND_SALES_MANAGER) {
      navigate("/showroom-and-sales-manager");
    } else if (res.data.user.role === USER_ROLES.DISTRIBUTORS) {
      navigate("/distributors");
    } else {
      navigate("/");
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: AuthAPI.login,
    onSuccess: (res) => {
      // Set user data to global state
      login(res.data.user, res.data.token);
      successMessage("Success", res.data.message, () => {
        redirectToDashboard(res);
      });
    },
    onError: (err) => {
      errorMessage("Error", err.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({ email, password });
    }
  };

  return (
    <>
      <br />
      <div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h1 className="card-header text-center">Login</h1>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </form>
                {/* don't have an account */}
                <div className="mt-3 text-center">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-decoration-none">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
