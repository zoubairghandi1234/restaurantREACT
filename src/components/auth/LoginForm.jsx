import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ButtonWithSpinner from "../Button"
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import Axios, {
  setCurrentUser,
  setCurrentUserToken,
} from "./../../Axios/index";
import toast from "react-hot-toast";
function LoginForm({ setOpen, setCurrentForm, setUser }) {
  const { Formik } = formik;
  const [busy, setBusy] = useState(false)
  const submit = async (data) => {
    setBusy(true)
    const response = await Axios.post("/auth/login", data);
    if (response.data.success) {
      toast.success(response.data.message);
      const token = response.data.content.user.accessToken;
      delete response.data.content.user.accessToken;
      setCurrentUserToken(token);
      setCurrentUser(response.data.content.user);
      setUser(response.data.content.user);
      setBusy(false)
      return setOpen(false);
    }
    
    if (!response.data.success) {
      toast.error(response.data.message);
      setBusy(false)
    }
  };
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  return (
    <>
      <div className="modal-raw">
        <div className="modal-header-raw">
          <h2>Login Form</h2>
        </div>
        <div className="modal-body-raw">
          <Formik
            validationSchema={schema}
            onSubmit={submit}
            initialValues={{
              email: "",
              password: "",
              rememeberMe: false,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      required
                      autoComplete="off"
                      placeholder="Enter your email address."
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      required
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
                    required
                    name="rememeberMe"
                    label="Remember me"
                    onChange={handleChange}
                    feedbackType="invalid"
                    id="validationFormik0"
                  />
                </Form.Group>
                <Col className="d-grid gap-2">
                  <ButtonWithSpinner busy={busy}>
                    <span>Login</span>
                  </ButtonWithSpinner>
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

export default LoginForm;
