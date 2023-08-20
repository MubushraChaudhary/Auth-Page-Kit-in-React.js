import { useForm } from "@mantine/form";
import { NumberInput, TextInput, Button, Box, Select } from "@mantine/core";
import "./vehicle.css";

export default function AddVehicle() {
  const form = useForm({
    initialValues: {
      vehicleTitle: "",
      floorCompany: "",
      vehicleType: "",
      condition: "",
      VIN: "",
      state: "",
      vehiclePurchasePrice: 0,
      vehicleRetailPrice: 0,
      make: "",
      model: "",
      auctionCompany: "",
      year: 0,
    },
    validate: {
      vehiclePurchasePrice: (value) =>
        value < 0 ? "Enter a valid amount" : null,
      vehicleRetailPrice: (value) =>
        value < 0 ? "Enter a valid amount" : null,
    },
  });

  const handleAddVehicle = (values) => {};

  return (
    <Box maw={320} mx="auto">
      <div className="new">
      <form onSubmit={form.onSubmit((values) => handleAddVehicle(values))}>
        <TextInput
          label="vehicleTitle"
          placeholder="VehicleTitle"
          {...form.getInputProps("vehicleTitle")}
        />
        <TextInput
          label="floorCompany"
          placeholder="floorCompany"
          {...form.getInputProps("floorCompany")}
        />
        <TextInput
          label="vehicleType"
          placeholder="VehicleType"
          {...form.getInputProps("vehicleType")}
        />
        <Select
          label="Car condition"
          placeholder="Pick one"
          data={[
            { value: "New", label: "New" },
            { value: "Used", label: "Used" },
          ]}
          {...form.getInputProps("condition")}
        />
        <TextInput
          label="VIN"
          placeholder="VIN"
          {...form.getInputProps("VIN")}
        />
        <TextInput
          label="state"
          placeholder="state"
          {...form.getInputProps("state")}
        />
        <NumberInput
          mt="sm"
          label="vehiclePurchasePrice"
          placeholder="vehiclePurchasePrice"
          min={0}
          max={100000000000000}
          {...form.getInputProps("vehiclePurchasePrice")}
        />
        <NumberInput
          mt="sm"
          label="vehicleRetailPrice"
          placeholder="vehicleRetailPrice"
          min={0}
          max={99999999999999}
          {...form.getInputProps("vehicleRetailPrice")}
        />
        <TextInput
          mt="sm"
          label="make"
          placeholder="make"
          {...form.getInputProps("make")}
        />
        <TextInput
          mt="sm"
          label="model"
          placeholder="model"
          {...form.getInputProps("model")}
        />
        <TextInput
          mt="sm"
          label="auctionCompany"
          placeholder="auctionCompany"
          {...form.getInputProps("auctionCompany")}
        />
        <NumberInput
          mt="sm"
          label="year"
          placeholder="year"
          min={1900}
          max={2024}
          {...form.getInputProps("year")}
        />
        <Button type="submit" mt="sm">
          Submit
        </Button>
       
      </form>
      </div>
    </Box>
  );
}
