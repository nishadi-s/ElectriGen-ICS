import { useState } from "react";
import AuthAPI from "../../api/AuthAPI";
import Swal from "sweetalert2"; // Import SweetAlert
import Navbar_Pay from "../../components/Navbar-uvi"; // Corrected import
import background_user from "../img/background_user.jpg"; // Import background image

const roles = [
  "Inventory Manager",
  "Distributor Manager",
  "Showroom Manager",
  "Donation Manager",
  "Export Manager",
  "Supplier Manager",
  "User Manager",
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    role: "",
    age: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Confirm Password must match Password";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await AuthAPI.signup(formData);
        const { data } = response;
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
        }).then(() => {
          // Redirect or handle success
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar_Pay>
        <div className="signup-header">
          <h2>User Signup</h2>
        </div>
        <div className="signup-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="">Select Role</option>
                {roles.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Signup"}
            </button>
          </form>
        </div>
      </Navbar_Pay>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-image: url('${background_user}');
          background-size: cover;
          background-position: center;
        }
        .signup-header {
          text-align: left;
  width: 100vw;
  padding: 17px 20px;
  background-color: #233066;
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 30px;
  margin-top: -20px;
  margin-left: -20px;
  border-radius: 0px 10px 0px 10 px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        }
        
        .signup-container {
          max-width: 500px;
          padding: 40px;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.7);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          margin: auto;
        }
        
        .form-group {
          margin-bottom: 30px;
        }
        
        label {
          display: block;
          font-weight: bold;
        }
        
        input,
        select {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        
        select {
          appearance: none;
          padding: 10px;
        }
        
        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 5px;
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .signup-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 0 0 10px 10px;
          background-color: rgba(255, 255, 255, 0.7);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }
        
        
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
};

export default Signup;

/*import { useState } from "react";
import AuthAPI from "../../api/AuthAPI";
import Swal from "sweetalert2"; // Import SweetAlert
///import "../../../src/user.css"; // Import CSS file
import Navbar_Pay from "../../components/Navbar-uvi"; // Corrected import

const roles = [
  'Inventory Manager',
  'Distributor Manager',
  'Showroom Manager',
  'Donation Manager',
  'Export Manager',
  'Supplier Manager',
  'User Manager'
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    role: "",
    age: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Confirm Password must match Password";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await AuthAPI.signup(formData);
        const { data } = response;
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
        }).then(() => {
          // Redirect or handle success
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Navbar_Pay> 
      <div className="signup-container">
        <h2>User Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              {roles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>{roleOption}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Signup"}</button>
        </form>
      </div>
    </Navbar_Pay>
  );
};

export default Signup;*/

/*import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../../api/AuthAPI";
import { errorMessage, successMessage } from "../../utils/Alert";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography, Link, Grid, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import Navbar_Pay from "../../components/Navbar-uvi";
import Swal from "sweetalert2"; // Import SweetAlert

const roles = [
  'Inventory Manager',
  'Distributor Manager',
  'Showroom Manager',
  'Donation Manager',
  'Export Manager',
  'Supplier Manager',
  'User Manager'
];

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!name) {
      isValid = false;
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      isValid = false;
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!email) {
      isValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      isValid = false;
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      isValid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      isValid = false;
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword.length < 6) {
      isValid = false;
      newErrors.confirmPassword = "Confirm Password must be at least 6 characters";
    } else if (confirmPassword !== password) {
      isValid = false;
      newErrors.confirmPassword = "Confirm Password must match with Password";
    }

    setErrors(newErrors);
    return isValid;
  };

  const redirectToSalary = () => {
    navigate("/salary-details");
  };

  const { mutate } = useMutation({
    mutationFn: AuthAPI.signup,
    onSuccess: (res) => {
      successMessage("Success", res.data.message, redirectToSalary);
    },
    onError: (err) => {
      errorMessage("Error", err.response.data.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await AuthAPI.signup({ name, email, password, phoneNumber, address, role, age, dateOfBirth });

        const { data } = response;
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
        }).then(() => {
          navigate("/salary-details");
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Navbar_Pay>
      <Grid container justifyContent="center" mt={4}>
        <Grid item xs={12} sm={8} md={6}>
          <Card className="signup-card">
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                User Signup
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
                <TextField
                  id="phoneNumber"
                  label="Phone Number"
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextField
                  id="address"
                  label="Address"
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.role}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    id="role"
                    labelId="role-label"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Role"
                  >
                    {roles.map((roleOption) => (
                      <MenuItem key={roleOption} value={roleOption}>
                        {roleOption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="age"
                  label="Age"
                  type="number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <TextField
                  id="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Signup"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Navbar_Pay>
  );
};

export default Signup;
*/
