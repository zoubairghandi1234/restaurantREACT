import React, { useState } from "react";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { setCurrentUser, setCurrentUserToken } from "../../Axios";
import axios from "../../Axios";
import ButtonSpinner from "./../Button";
export default function ProfileDetails({ user, setUser, setShow }) {
  const [busy, setBusy] = useState(false);
  const logout = async () => {
    setBusy(true);
    const response = await axios.post("/logout");
    toast.success(response.data.message);
    setCurrentUser({});
    setCurrentUserToken(null);
    setUser({});
    setShow(false);
    setBusy(false);
  };
  return (
    <>
      <div>
        <Table bordered>
          <tbody>
            <tr>
              <th className="py-2">Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th className="py-2">Email Address</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th className="py-2">Phone Number</th>
              <td>{user.phone}</td>
            </tr>
          </tbody>
        </Table>
        <ButtonSpinner
          type="button"
          variant="danger"
          onClick={logout}
          busy={busy}
        >
          Logout
        </ButtonSpinner>
      </div>
    </>
  );
}
