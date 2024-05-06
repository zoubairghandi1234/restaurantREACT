import * as formik from "formik";
import Axios, { setCartItems } from "./../Axios";
import React, { useState } from "react";
import * as yup from "yup";
import {
  Button,
  CloseButton,
  Form,
  Modal,
  Offcanvas,
  Row,
  Stack,
} from "react-bootstrap";
import toast from "react-hot-toast";
import ButtonSpinner from "./Button";

export const Item = ({ title, image, price, id, removeItem }) => {
  return (
    <div className="d-flex gap-3 justify-content-between align-items-center">
      <img
        className="flex-shrink-0"
        style={{ width: "100px", borderRadius: "5px" }}
        src={image}
      />
      <div className="flex-grow-1">
        <p style={{ fontSize: "20px", margin: 0, fontWeight: 600 }}>{title}</p>
        <p style={{ fontSize: "16px", margin: 0, fontWeight: 500 }}>
          {parseInt(price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <CloseButton onClick={() => removeItem(id)} />
    </div>
  );
};

export default function Cart({
  canvasSidebar,
  handleCloseCanvasSidebar,
  items,
  setCart,
}) {
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);
  const removeItem = async (id) => {
    const response = await Axios.delete("/cart/" + id);
    if (response.data.success) {
      setCartItems(response.data?.content || []);
      setCart(response.data?.content || []);
      toast.success(response.data.message);
      return;
    }
  };
  const checkout = () => {
    setOpenCheckoutForm(true);
    handleCloseCanvasSidebar();
  };
  return (
    <>
      <CheckoutForm
        show={openCheckoutForm}
        setCart={setCart}
        setShow={setOpenCheckoutForm}
      />
      <Offcanvas
        placement="end"
        show={canvasSidebar}
        onHide={handleCloseCanvasSidebar}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <Stack gap={3}>
            {items.map((item) => (
              <Item
                id={item.id}
                key={item.id}
                title={item.title}
                image={item.images[0]}
                price={item.price}
                removeItem={removeItem}
              />
            ))}
            {items?.length === 0 && (
              <p style={{ textAlign: "center", color: "#333" }}>
                Cart is empty.
              </p>
            )}
          </Stack>
          <div>
            <p>
              Total:{" "}
              {sum(items).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <Button
              onClick={checkout}
              disabled={!items?.length}
              variant="primary"
              style={{ width: "100%" }}
            >
              Checkout
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

const validationSchema = yup.object().shape({
  city: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
  city: yup.string().required(),
  address: yup.string().required(),
});

const CheckoutForm = ({ show, setShow, setCart }) => {
  const { Formik } = formik;
  const orderPlace = async (data) => {
    const response = await Axios.post("/cart/order-place", data);
    if (!response.data.success) {
      toast.error(response.data.message);
    }
    if (response.data.success) {
      setCart([]);
      setShow(false);
      toast.success(response.data.message);
    }
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => setShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Delivery Address.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={orderPlace}
          validationSchema={validationSchema}
          initialValues={{
            city: "",
            name: "",
            email: "",
            address: "",
            payment_method: "",
          }}
        >
          {({ handleChange, handleSubmit, errors, values }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    placeholder="Enter your name."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter your email."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                    placeholder="Enter your address."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isInvalid={!!errors.city}
                    placeholder="Enter your city."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-3">
                  <span className="d-block" style={{ fontSize: 13 }}>
                    Payment Method
                  </span>
                  <Form.Label className="d-flex gap-2">
                    <Form.Check
                      name="payment_method"
                      value="cod"
                      onChange={handleChange}
                      isInvalid={!!errors.payment_method}
                    />
                    <span>COD</span>
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.payment_method}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <ButtonSpinner>Place Now</ButtonSpinner>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const sum = (items) => {
  let total = 0;
  for (let index = 0; index < items.length; index++) {
    total += parseInt(items[index].price);
  }
  return total;
};
