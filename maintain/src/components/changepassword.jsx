import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { PasswordInput, Button, Box, Text } from "@mantine/core";

function Demo() {
  const form = useForm({
    initialValues: {
      oldpassword: "",
      newpassword: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values) => {
    try {
      if (values.oldpassword === values.newpassword) {
        setErrorMessage("New password cannot be the same as the old password.");
        return;
      }

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQwZGE2MGUyYzc4MmU3NWY2MTA3YmMiLCJ1c2VyVHlwZSI6IkFkbWluIiwiZmlyc3ROYW1lIjoiTXVidXNocmEiLCJsYXN0TmFtZSI6IkNoYXVkaGFyeSIsImVtYWlsIjoibUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTA3VDExOjQ5OjUyLjk5MFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTA4VDA4OjE2OjE1Ljc4NloiLCJfX3YiOjAsInJlc2V0UGFzc3dvcmRFeHBpcmVzIjpudWxsLCJyZXNldFBhc3N3b3JkVG9rZW4iOm51bGwsImlhdCI6MTY5MTQ4MzMyM30.wV-C3uDRf2FZhk2TY-VO0ktJbnUl_U3jqGkKBctlZH8";

      const response = await fetch(
        "http://localhost:3000/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            oldPassword: values.oldpassword,
            newPassword: values.newpassword,
          }),
        }
      );

      if (response.ok) {
        const updateResponse = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newpassword: values.newpassword,
          }),
        });

        if (updateResponse.ok) {
          console.log("Password updated successfully");
        } else {
          const errorText = await updateResponse.text();
          setErrorMessage(errorText);
          console.error("Password update error:", errorText);
        }
      } else {
        setErrorMessage("Old password is incorrect.");
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <Box maxWidth={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="new1">
          <div className="heading">
            <Text>CHANGE PASSWORD</Text>
          </div>
          <div className="oldpassword">
            <PasswordInput
              label="Old Password"
              required
              placeholder="abc12345678"
              {...form.getInputProps("oldpassword")}
            />
          </div>

          <div className="newpassword">
            <PasswordInput
              label="New Password"
              required
              placeholder="abc12345678"
              {...form.getInputProps("newpassword")}
            />
          </div>

          <div className="button">
            <Button type="submit">Submit</Button>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </form>
    </Box>
  );
}

export default Demo;
