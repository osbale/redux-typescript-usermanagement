import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { add } from "./formSlice";
import { v4 as uuidv4 } from "uuid";

export const Gap = () => (
  <Box
    sx={{
      height: 20,
    }}
  ></Box>
);

const formFields = ["name", "lastname", "address", "email"];

export const Form = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<{
    [key: string]: string;
  }>({
    id: "",
    name: "",
    lastname: "",
    address: "",
    email: "",
  });

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(add({ ...form, id: uuidv4() }));
  };

  return (
    <Box component="form" m={4} onSubmit={onSubmit}>
      {formFields.map((field) => (
        <Box key={field}>
          <TextField
            value={form[field]}
            id="outlined-basic"
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            variant="outlined"
            onChange={onFormChange}
          />
          <br />
          <Gap />
        </Box>
      ))}
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};
