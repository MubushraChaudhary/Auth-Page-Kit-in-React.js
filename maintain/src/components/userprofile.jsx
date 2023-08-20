import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Select, Image } from "@mantine/core";
import "./userprofile.css";
import UserImage from "../assets/user.jpg";

export default function AddUser() {
  const form = useForm({
    initialValues: {
      Name: "",
      City: "",
      Date_of_Birth: "",
      Email: "",
      Education: "",
      Phone_Number: "",
      Skill_Set: "",
    },
    validate: {
      Name: (value) => (!value.trim() ? "Name is required" : null),
      Date_of_Birth: (value) =>
        !value.trim() ? "Date of Birth is required" : null,
      Email: (value) =>
        !value.trim()
          ? "Email is required"
          : !/\S+@\S+\.\S+/.test(value)
          ? "Enter a valid email address"
          : null,
      City: (value) => (!value.trim() ? "Enter Your City Name" : null),
      Education: (value) => (!value.trim() ? "Education is required" : null),
      Phone_Number: (value) =>
        /^\d{11}$/.test(value)
          ? null
          : "Invalid phone number. It must be 11-digit number.",
      Skill_Set: (value) => (!value.trim() ? "Skill Set is required" : null),
    },
  });

  const userprofile = (values) => {};

  return (
    <Box maw={320} mx="auto">
      <div className="User">
        <Image
          src={UserImage}
          className="TopRightImage"
          width={50}
          height={50}
        />
        {/* <Image src={user.jpg} /> */}

        <form onSubmit={form.onSubmit((values) => userprofile(values))}>
          <TextInput
            label="Name"
            placeholder="Mubushra Chaudhary"
            {...form.getInputProps("Name")}
          />
          <TextInput
            label="Date Of Birth"
            placeholder="31st-07-2001"
            {...form.getInputProps("Date_of_Birth")}
          />
          <TextInput
            label="Email"
            placeholder="mubushra@gmail.com"
            {...form.getInputProps("Email")}
          />
          <TextInput
            label="City"
            placeholder="Rawal-pindi"
            {...form.getInputProps("City")}
          />

          <Select
            label=" Education"
            placeholder="Choose From Follwing"
            data={[
              { value: "BS Computer Science" },
              { value: "MS Computer Science" },
            ]}
            {...form.getInputProps("Education")}
          />

          <TextInput
            label="Phone Number"
            placeholder="0303-5604103"
            {...form.getInputProps("Phone_Number")}
          />

          <TextInput
            label=" Skill Set:"
            placeholder="Web Development, UI/UX Design"
            {...form.getInputProps("Skill_Set")}
          />

          <Button type="Submit Data" mt="sm">
            Submit
          </Button>
        </form>
      </div>
    </Box>
  );
}
