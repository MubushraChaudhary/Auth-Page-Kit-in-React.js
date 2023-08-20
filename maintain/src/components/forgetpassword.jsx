import React, { useState } from "react";
import { TextInput, Button, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import "./forgetpassword.css";

function Demo() {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleVerifyEmail = async () => {
    if (isVerifying) {
      return;
    }

    try {
      setIsVerifying(true);

      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        {
          email: form.values.email,
        }
      );

      if (response.data.message === "Email verified") {
        setVerificationStatus("Email verified!");
      } else {
        setVerificationStatus("Email verification failed.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      console.log("Error response:", error.response);
      console.log("Request:", error.request);
      setVerificationStatus("Error verifying email.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form>
        <div className="one">
          <div className="two">
            <h2>Forget Password</h2>
          </div>
          <div className="three">
            <div className="emailbox">
              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />
            </div>

            <div className="button-container">
              <Button
                type="button"
                onClick={handleVerifyEmail}
                disabled={isVerifying}
              >
                Verify Email
              </Button>
            </div>
            {verificationStatus}
          </div>
        </div>
      </form>
    </Box>
  );
}

export default Demo;
