import React, { useState } from "react";
import { Box, Text, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

import "./stylelogin.css";

function Login() {
  const [authToken, setAuthToken] = useState(null);

  const handleLogin = async (values) => {
    const requestData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        requestData
      );

      console.log("Login response:", response.data);

      setAuthToken(response.data.token);
      localStorage.setItem("token", setAuthToken);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationRules: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleGoogleLoginSuccess = async (googleResponse) => {
    console.log("Successful signin");
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login failed:", error);
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleLogin)}>
        <div className="main">
          <div className="top">
            <Text>Login</Text>
          </div>
          <Text>Email</Text>
          <input
            type="text"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            required
            placeholder="abc123"
            {...form.getInputProps("password")}
          />
          <div className="last1">
            <Button type="submit">Login</Button>
          </div>
          <a href="http://localhost:5181/forgetpassword">Forgot Password?</a>

          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </div>
      </form>
    </Box>
  );
}

export default Login;
