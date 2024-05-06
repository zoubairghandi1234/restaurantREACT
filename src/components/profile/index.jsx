import React from "react";
import ProfileDetails from "./ProfileDetails";
import { Tab, Tabs } from "react-bootstrap";
import Cart from "../Cart";

function index({ show, setShow, user, setUser }) {
  return (
    <>
      {show && (
        <div className="modal-container-raw">
          <div className="modal-raw" style={{ width: "50%" }}>
            <div className="modal-header-raw d-flex justify-content-between align-items-center">
              <h2>Profile</h2>
              <span className="text-white" onClick={() => setShow(false)}>
                Close
              </span>
            </div>
            <div className="modal-body-raw">
              <Tabs
                defaultActiveKey="index"
                id="fill-tab-example"
                className="mb-3"
                fill
              >
                <Tab eventKey="index" title="Profile">
                  <ProfileDetails
                    user={user}
                    setUser={setUser}
                    setShow={setShow}
                  />
                </Tab>
                <Tab eventKey="orders" title="My Orders And History">
                  <div>
                    <Item
                      title="Hello"
                      image="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
                      price={20}
                    />
                    <Item
                      title="Hello"
                      image="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
                      price={20}
                    />
                    <Item
                      title="Hello"
                      image="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
                      price={20}
                    />
                    <Item
                      title="Hello"
                      image="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
                      price={20}
                    />
                  </div>
                </Tab>
                <Tab eventKey="reservation" title="Reservation">

                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default index;

const Item = ({ title, image, price }) => {
  return (
    <div className="d-flex gap-3 w-full bg-white py-2 px-2 rounded justify-content-between align-items-center my-2">
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
    </div>
  );
};
