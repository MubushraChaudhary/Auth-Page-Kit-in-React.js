// import { MantineProvider, Text } from "@mantine/core";
// import Signup from "./components/signup";
// import Login from "./components/login";

// export default function App() {
//   return (
//     <MantineProvider withGlobalStyles withNormalizeCSS>
//       <Signup />
//       {/* <Login /> */}
//     </MantineProvider>
//   );
// }

import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Vehicle from "./components/vehicle";
import Forgetpassword from "./components/forgetpassword";
import Resetpassword from "./components/resetpassword";
import Getprofile from "./components/getprofile";
import Userprofile from "./components/userprofile";
import Updateprofile from "./components/updateprofile";
import Changepassword from "./components/changepassword";
import { MantineProvider } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <GoogleOAuthProvider clientId="554906809256-3coeho9e1k9tvfokjlvkj1ehrp6r1op9.apps.googleusercontent.com">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/vehicle">Vehicle</Link>
              </li>
              <li>
                <Link to="/forgetpassword">Forget Password</Link>
              </li>
              <li>
                <Link to="/userprofile">User Profile</Link>
              </li>{" "}
              <li>
                <Link to="/resetpassword">Reset Password</Link>
              </li>
              <li>
                <Link to="/changepassword">Change Password</Link>
              </li>
              <li>
                <Link to="/getprofile">Get Profile</Link>
              </li>
              <li>
                <Link to="/updateprofile">Update Profile</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vehicle" element={<Vehicle />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/resetpassword" element={<Resetpassword />} />
            <Route path="/userprofile" element={<Userprofile />} />
            <Route path="/changepassword" element={<Changepassword />} />
            <Route path="/getprofile" element={<Getprofile />} />
            <Route path="/updateprofile" element={<Updateprofile />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </GoogleOAuthProvider>
  );
}
