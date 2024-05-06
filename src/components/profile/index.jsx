import React, { useEffect } from "react";
import ProfileDetails from "./ProfileDetails";
import { Tab, Table, Tabs } from "react-bootstrap";
import Button from "../Button";
import Axios from "./../../Axios";
import toast from "react-hot-toast";
function index({orderRequest, orders, show, setShow, user, setUser }) {
  useEffect(() => {
    orderRequest();
  }, []);
  const cancelOrder = async (id) => {
    const response = await Axios.post("/orders/cancel", { id });
    if (response.data.success) {
      toast.success(response.data.message);
      orderRequest();
    }
  };
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
                <Tab eventKey="orders" title="Orders">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>value</th>
                        <th>Status</th>
                        <th>Order By</th>
                        <th>Payment Method</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((el) => {
                        return (
                          <tr key={el.id}>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                              }}
                            >
                              <span>{el.id}</span>
                              <img
                                src={el.orderItems[0].images[0].name}
                                style={{ width: 50, height: 50 }}
                              />
                            </td>
                            <td>{el.orderItems[0].title}</td>
                            <td>{el.orderItems.length}</td>
                            <td>
                              {parseInt(el.order_value).toLocaleString(
                                "en-US",
                                {
                                  style: "currency",
                                  currency: "USD",
                                }
                              )}
                            </td>
                            <td>{el.status}</td>
                            <td>{el.user.name}</td>
                            <td>{el.payment_method}</td>
                            <td>
                              <Button
                                onClick={() => cancelOrder(el.id)}
                                variant="danger"
                                disabled={!["Pending"].includes(el.status)}
                                size="sm"
                              >
                                Cancel
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="reservation" title="Reservation"></Tab>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default index;
