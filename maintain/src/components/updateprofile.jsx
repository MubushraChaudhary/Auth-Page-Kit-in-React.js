import React, { useState, useEffect } from "react";
import { Text, Button, Box, TextInput } from "@mantine/core";
import "./updateprofile.css";
function UpdateProfile() {
  const [profileData, setProfileData] = useState(null);
  const [updatedProfileData, setUpdatedProfileData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQwZGE2MGUyYzc4MmU3NWY2MTA3YmMiLCJ1c2VyVHlwZSI6IkFkbWluIiwiZmlyc3ROYW1lIjoiTXVidXNocmEiLCJsYXN0TmFtZSI6IkNoYXVkaGFyeSIsImVtYWlsIjoibUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTA3VDExOjQ5OjUyLjk5MFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTA4VDA4OjE2OjE1Ljc4NloiLCJfX3YiOjAsInJlc2V0UGFzc3dvcmRFeHBpcmVzIjpudWxsLCJyZXNldFBhc3N3b3JkVG9rZW4iOm51bGwsImlhdCI6MTY5MTQ4MzMyM30.wV-C3uDRf2FZhk2TY-VO0ktJbnUl_U3jqGkKBctlZH8";
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://localhost:3000/auth/get-profile", {
          method: "GET",
          headers: {
            Authorization: token,
          },
         
        });

        if (response.ok) {
          const profile = await response.json();
          setProfileData(profile);
          setUpdatedProfileData(profile);
        } else {
          const errorText = await response.text();
          setErrorMessage(errorText);
          console.error("Profile fetch error:", errorText);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    }

    fetchProfile();
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/auth/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(updatedProfileData),
        }
      );

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfileData(updatedProfile);
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
        console.error("Profile update error:", errorText);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <Box maxWidth={300} mx="auto">
      <div className="profile">
        <div className="heading">
          <Text>UPDATE PROFILE</Text>
        </div>
        {profileData && (
          <div className="profile-data">
            {/* <Text>User Type: {profileData.userType}</Text>
            <Text>Email: {profileData.email || ""}</Text> */}
            <TextInput
              name="firstName"
              label="First Name:"
              value={updatedProfileData.firstName || ""}
              onChange={handleInputChange}
              placeholder="Update First Name"
            />
            <TextInput
              name="lastName"
              label="Last Name:"
              value={updatedProfileData.lastName || ""}
              onChange={handleInputChange}
              placeholder="Update Last Name"
            />
            <Button onClick={handleUpdateProfile}>Update Profile</Button>
          </div>
        )}
        {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
      </div>
    </Box>
  );
}

export default UpdateProfile;
