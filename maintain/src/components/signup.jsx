import { Box, Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./getprofile.css";
import axios from "axios";

function Signup() {
  const handleSignup = async (values) => {
    const sending={
      userType:values.userType,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    }
    try{
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      
    
          sending
    );
       
      
    if(!
      response.ok){
        throw new Error("failed")
      }

const responding=await response.json;
console.log(responding)

    console.log(response);
    }catch (error) {
      console.error("An error occurred:", error);
    }}
  

  const form = useForm({
    initialValues: {
      userType: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // zipcode: "",
      // Phoneno: "",
      termsOfService: false,
    },

    validate: {
      

      firstName: (value) =>
        /^[A-Za-z\s]+$/.test(value) && value.length >= 2 && value.length <= 50
          ? null
          : "Invalid firstName",

      lastName: (value) =>
        /^[A-Za-z\s]+$/.test(value) && value.length >= 2 && value.length <= 50
          ? null
          : "Invalid lastName",

      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),

      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(value)
          ? null
          : "Invalid password. It must be at least 4 characters long and contain at least one letter and one digit.",

      confirmPassword: (value, data) =>
        value === data.password ? null : "Passwords do not match",

      
    },
  });
  return (
    <div className="new">
      <Box maw={300} mx="auto">
        <form onSubmit={form.onSubmit(handleSignup )}>
          {" "}
          
          
          <TextInput
            withAsterisk
            label="userType"
            placeholder="Customer"
            {...form.getInputProps("userType")}
          />
          <TextInput
            withAsterisk
            label="First Name"
            placeholder="Joseph"
            {...form.getInputProps("firstName")}
          />

          <TextInput
            withAsterisk
            label="last Name"
            placeholder=" Alosyious"
            {...form.getInputProps("lastName")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Password"
            placeholder="abc123"
            {...form.getInputProps("password")}
          />
          <TextInput
            withAsterisk
            label="Confirm Password"
            placeholder="abc123456"
            {...form.getInputProps("confirmPassword")}
          />
          {/* <TextInput
            withAsterisk
            label="Zip Code"
            placeholder="12345"
            {...form.getInputProps("zipcode")}
          />
          <TextInput
            withAsterisk
            label="Phone Number"
            placeholder="0303-1234567"
            {...form.getInputProps("Phoneno")}
          /> */}
          <Checkbox
            mt="md"
            label="I agree to Signup"
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
          <Group position="right" mt="md">
            <Button type="submit">Sign Up</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default Signup;
