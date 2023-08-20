import React, { useState, useEffect } from "react";
import { Text, Button, Box } from "@mantine/core";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQwZGE2MGUyYzc4MmU3NWY2MTA3YmMiLCJ1c2VyVHlwZSI6IkFkbWluIiwiZmlyc3ROYW1lIjoiTXVidXNocmEiLCJsYXN0TmFtZSI6IkNoYXVkaGFyeSIsImVtYWlsIjoibUBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTA3VDExOjQ5OjUyLjk5MFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTA4VDA4OjE2OjE1Ljc4NloiLCJfX3YiOjAsInJlc2V0UGFzc3dvcmRFeHBpcmVzIjpudWxsLCJyZXNldFBhc3N3b3JkVG9rZW4iOm51bGwsImlhdCI6MTY5MTQ4MzMyM30.wV-C3uDRf2FZhk2TY-VO0ktJbnUl_U3jqGkKBctlZH8";

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

  return (
    <Box maw={300} mx="auto">
      <div className="profile">
        <div className="heading">
          <Text>USER PROFILE</Text>
        </div>
        {profileData && (
          <div className="profile-data">
            
            <Text>First Name: {profileData.firstName}</Text>
            <Text>Last Name {profileData.lastName}</Text>
            <Text>Email: {profileData.email}</Text>
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </Box>
  );
}

export default Profile;
