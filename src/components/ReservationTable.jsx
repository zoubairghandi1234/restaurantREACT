import React, { useEffect, useState } from "react";
import * as formik from "formik";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import Axios from "./../Axios";
import ButtonSpinner from "./Button";
import * as yup from "yup";
import toast from "react-hot-toast";

const validation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required(),
  booking_date: yup.string().required(),
  booking_time: yup.string().required(),
  no_adults: yup.string().required(),
  no_child: yup.string().required(),
  table: yup.string().required(),
});

export default function ReservationTable({ show, hide, bookingRequest}) {
  const { Formik } = formik;
  const [tables, setTables] = useState([]);
  useEffect(() => {
    const request = async () => {
      const response = await Axios.get("/tables");
      if (response.data.success) {
        setTables(response.data.content);
      }
    };
    request();
  }, []);
  const submit = async (data) => {
    const response = await Axios.post("/tables", data);
    if (response.data.success) {
      hide(false);
      toast.success(response.data.message);
      bookingRequest()
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <>
      {show && (
        <div className="modal-container-raw">
          <div className="modal-raw" style={{ width: "40%" }}>
            <div className="modal-header-raw">
              <h2>Table Reservation Form</h2>
            </div>
            <div className="modal-body-raw">
              <Formik
                onSubmit={submit}
                validationSchema={validation}
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  booking_date: "",
                  booking_time: "",
                  no_adults: "",
                  no_child: "",
                  table: "",
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Col>
                      <InputGroup size="sm">
                        <InputGroup.Text>Table</InputGroup.Text>
                        <Form.Select
                          name="table"
                          onChange={handleChange}
                          isInvalid={!!errors.table}
                        >
                          <option>Select Table</option>
                          {tables.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.table_no}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.table}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup size="sm" className="mt-3">
                        <InputGroup.Text>Name</InputGroup.Text>
                        <Form.Control
                          name="name"
                          onChange={handleChange}
                          value={values.name}
                          isInvalid={!!errors.name}
                          placeholder="Enter your name."
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup size="sm" className="mt-3">
                        <InputGroup.Text>Email Address</InputGroup.Text>
                        <Form.Control
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                          isInvalid={!!errors.email}
                          placeholder="Enter your email."
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup size="sm" className="mt-3">
                        <InputGroup.Text>Phone Number</InputGroup.Text>
                        <Form.Control
                          name="phone"
                          onChange={handleChange}
                          isInvalid={!!errors.phone}
                          value={values.phone}
                          placeholder="Enter your phone."
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup size="sm" className="mt-3">
                        <InputGroup.Text>Booking Date</InputGroup.Text>
                        <Form.Control
                          name="booking_date"
                          type="date"
                          onChange={handleChange}
                          isInvalid={!!errors.booking_date}
                          value={values.booking_date}
                          placeholder="Enter your booking date."
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.booking_date}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup size="sm" className="mt-3">
                        <InputGroup.Text>Booking Time</InputGroup.Text>
                        <Form.Control
                          type="time"
                          name="booking_time"
                          onChange={handleChange}
                          isInvalid={!!errors.booking_time}
                          value={values.booking_time}
                          placeholder="Enter your booking time."
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.booking_time}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup size="sm" className="mt-3">
                        <InputGroup.Text>No Adults</InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="no_adults"
                          onChange={handleChange}
                          isInvalid={!!errors.no_adults}
                          value={values.no_adults}
                          placeholder="Enter your booking no adults."
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.no_adults}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup size="sm" className="mt-3">
                        <InputGroup.Text>No Child</InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="no_child"
                          isInvalid={!!errors.no_child}
                          onChange={handleChange}
                          value={values.no_child}
                          placeholder="Enter your booking no child."
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.no_child}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    <div className="mt-3">
                      <ButtonSpinner style={{ marginTop: 20 }} type="submit">
                        Confirm
                      </ButtonSpinner>
                      <Button
                        variant="outline-danger"
                        onClick={() => hide(false)}
                        style={{ width: "100%", marginTop: 10 }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
