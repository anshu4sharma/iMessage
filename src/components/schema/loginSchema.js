import * as yup from "yup";

let loginSchema = yup.object().shape({
  email: yup.string().email().required("Please enter you email"),
  password: yup
    .string()
    .min(5, "Password must be at least of 5 characters.")
    .required("Please enter you password"),
});

export default loginSchema;
