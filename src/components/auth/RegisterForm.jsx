import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import Axios from "./../../Axios";
import toast from "react-hot-toast";
import ButtonSpinner from "../Button";

const validationSchema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().required().email(),
  phone: yup.string().required(),
  password: yup.string().required(),
});

function RegisterForm({ setOpen, setCurrentForm }) {
  const { Formik } = formik;
  const [serverErrors, setServerErrors] = useState([]);
  const [busy, setBusy] = useState(false)
  const register = async (data) => {
    setBusy(true)
    setServerErrors([]);
    const response = await Axios.post("/auth/register", data);
    if (!response.data.success) {
      toast.error(response.data.message);
      if (response.data.errors) {
        setServerErrors(response.data.errors);
      }
    }
    if (response.data.success) {
      toast.success(response.data.message);
      setCurrentForm(false);
    }
    setBusy(false)
  };
  const getErrors = (propertyName) => {
    if (serverErrors.hasOwnProperty(propertyName)) {
      return serverErrors[propertyName][0];
    }
    return null;
  };
  return (
    <>
      <div className="modal-raw">
        <div className="modal-header-raw">
          <h2>Register Form</h2>
        </div>
        <div className="modal-body-raw">
          <Formik
            validationSchema={validationSchema}
            onSubmit={register}
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              rememeberMe: false,
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group className="mb-1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      autoComplete="off"
                      placeholder="Enter your name."
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email || getErrors("email")}
                      autoComplete="off"
                      placeholder="Enter your email address."
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {getErrors("email")}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone || getErrors("email")}
                      autoComplete="off"
                      placeholder="Enter your phone number."
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {getErrors("phone")}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      autoComplete="off"
                      placeholder="Enter your password."
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Check
                    name="rememeberMe"
                    label="Remember me"
                    onChange={handleChange}
                    feedbackType="invalid"
                    id="validationFormik0"
                  />
                </Form.Group>
                <Col className="d-grid gap-2">
                  <ButtonSpinner busy={busy}>Register</ButtonSpinner>
                  <Button
                    type="button"
                    variant="secondary"
                    className="d-block"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </Button>
                </Col>
                <div className="mt-3 text-center">
                  <p className="text-secondary">
                    If you don't have account?{" "}
                    <span
                      className="text-primary cursor-pointer"
                      onClick={() => setCurrentForm(true)}
                    >
                      register now
                    </span>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
