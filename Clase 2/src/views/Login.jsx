import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Logo from "../assets/logo.png";
import { ShowPasswordButton } from "../components/ShowPasswordButton";
import { emailRegex } from "../helpers/emailRegex";
import axios from "axios";
import { setToken } from "../helpers/setToken";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    const formData = Object.fromEntries(new FormData(event.target))

    try {
      const res = await axios.post(`${BASE_URL}/login`, formData)
      const data = res.data
      setToken(data)
   
   } catch (error) {
    console.log(error);

     if (error.response.status == 401) {
      return alert(error.response.data.message)
     }

     let errorMessage = ""
     error.response.data.errors.map(i => errorMessage += `${i.msg} \n`)
     alert(errorMessage)
   }
  };

  return (
    <>
      <section className="container vh-100 mt-5 w-100 d-flex justify-content-center">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="text-center d-flex align-items-center my-3 pb-3 border border-light border-0 border-bottom">
            <img src={Logo} className="img-fluid w-25" alt="" />
            <div className="ms-4 text-start">
              <h1 className="display-5 fw-semibold">Rolling Store</h1>
              <h4>Login</h4>
            </div>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              pattern={emailRegex}
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingrese un email valido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Label>Contraseña</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <ShowPasswordButton
              state={showPassword}
              setState={setShowPassword}
            />
            <Form.Control.Feedback type="invalid">
              Ingrese una contraseña
            </Form.Control.Feedback>
          </InputGroup>
          <Button variant="primary" type="submit">
            Ingresar
          </Button>
        </Form>
      </section>
    </>
  );
};
