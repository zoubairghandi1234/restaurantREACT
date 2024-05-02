import React, { useState } from "react";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
function Modal({ isOpen, setOpen }) {
  const [currentForm, setCurrentForm] = useState(false)
  return (
    <>
      {isOpen && (
        <div className="modal-container-raw">
          {currentForm ? (<RegisterForm setOpen={setOpen} setCurrentForm={setCurrentForm} />):(<LoginForm setOpen={setOpen} setCurrentForm={setCurrentForm} />)}
        </div>
      )}
    </>
  );
}

export default Modal;
