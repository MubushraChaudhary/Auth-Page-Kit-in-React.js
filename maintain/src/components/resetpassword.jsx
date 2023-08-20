import React from "react";
import { TextInput, Button, PasswordInput, Box, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./resetpassword.css";

function Demo() {
  const form = useForm({
    initialValues: {
      email: "",
      resetPasswordToken: "",
      newPassword: "",
    },
    validate: {
      resetPasswordToken: (value) =>
        value.length === 6 ? null : "Invalid reset token",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          resetPasswordToken: values.resetPasswordToken,
          newPassword: values.newPassword,
        }),
      });

      if (response.ok) {
        // Password updated successfully
        console.log("Password updated successfully");
      } else {
        // Handle error cases
        const errorData = await response.json();
        console.error("Password update error:", errorData.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <Box maxW={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="new1">
          <div className="heading">
            <Text>RESET PASSWORD</Text>
          </div>
          <div className="email">
            <TextInput
              withAsterisk
              label="Email"
              required
              placeholder="your@gmail.com"
              {...form.getInputProps("email")}
            />
          </div>
          <div className="ResetPasswordToken">
            <TextInput
              withAsterisk
              label="Reset Password Token"
              required
              placeholder="123456"
              {...form.getInputProps("resetPasswordToken")}
            />
          </div>
          <div className="NewPassword">
            <PasswordInput
              label="New Password"
              required
              placeholder="abc123"
              {...form.getInputProps("newPassword")}
            />
          </div>
          <div className="button">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </Box>
  );
}

export default Demo;
