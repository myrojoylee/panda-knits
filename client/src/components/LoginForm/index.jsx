import { useState } from "react";
import { useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Form, Button, Alert } from "react-bootstrap";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  // function Login(props) {
  //   const [formState, setFormState] = useState({ email: "", password: "" });
  //   const [login, { error }] = useMutation(LOGIN_USER);

  //   const handleFormSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       const mutationResponse = await login({
  //         variables: { email: formState.email, password: formState.password },
  //       });
  //       const token = mutationResponse.data.login.token;
  //       Auth.login(token);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const handleChange = (event) => {
  //     const { name, value } = event.target;

  //     setFormState({
  //       ...formState,
  //       [name]: value,
  //     });
  //   };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;

//   return (
//     <div className="login-signup">
//       <Link to="/signup">← Go to Signup</Link>

//       <h2>Login</h2>
//       <form onSubmit={handleFormSubmit}>
//         <div className="flex-row space-between my-2">
//           <label htmlFor="email">Email address:</label>
//           <input
//             placeholder="youremail@test.com"
//             name="email"
//             type="email"
//             id="email"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="flex-row space-between my-2">
//           <label htmlFor="pwd">Password:</label>
//           <input
//             placeholder="******"
//             name="password"
//             type="password"
//             id="pwd"
//             onChange={handleChange}
//           />
//         </div>
//         {error ? (
//           <div>
//             <p className="error-text">The provided credentials are incorrect</p>
//           </div>
//         ) : null}
//         <div className="flex-row flex-end">
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
