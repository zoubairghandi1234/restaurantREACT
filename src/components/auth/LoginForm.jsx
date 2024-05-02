import React from "react";
import { Button } from "react-bootstrap";
import Checkbox from "react-bootstrap/FormCheckInput";
import Form from "react-bootstrap/Form";
function LoginForm({ setOpen, setCurrentForm }) {
  return (
    <div className="modal-raw">
      <div className="modal-header-raw">
        <h2>Login Form</h2>
      </div>
      <div className="modal-body-raw">
        <div>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control id="name" type="text" placeholder="Enter your name." />
        </div>
        <div className="mt-2">
          <Form.Label htmlFor="password">Name</Form.Label>
          <Form.Control id="password" type="password" placeholder="Enter your name." />
        </div>
        <div className="d-flex justify-content-between py-3">
          <a href="" className="text-decoration-none text-secondary">
            Forgot Password
          </a>
          <label className="flex gap-1">
            <Checkbox />
            <span>Remember me</span>
          </label>
        </div>
        <div className="d-grid gap-2 font-primary">
          <Button variant="primary">Login</Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
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
      </div>
    </div>
  );
}

export default LoginForm;
