import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
function RegisterForm({ setOpen, setCurrentForm }) {
  return (
    <div className="modal-raw">
      <div className="modal-header-raw">
        <h2>Register Form</h2>
      </div>
      <div className="modal-body-raw">
        <div>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control id="name" type="text" placeholder="Enter your name." />
        </div>
        <div className="mt-1">
          <Form.Label htmlFor="email">Name</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter your e-mail address."
          />
        </div>
        <div className="mt-1">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Enter your password."
          />
        </div>
        <div className="mt-1">
          <Form.Label htmlFor="phone">Phone No</Form.Label>
          <Form.Control
            id="phone"
            type="phone"
            placeholder="Enter your phone."
          />
        </div>
        <div className="d-grid gap-2 mt-4 font-primary">
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
              onClick={() => setCurrentForm(false)}
            >
              register now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
