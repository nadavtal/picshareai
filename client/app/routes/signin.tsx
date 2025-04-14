import React, { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { authApiUrl } from "~/constants";
import logo from "~/assets/gadslogo.jpg"; // Adjust the path to your logo
export default function SignIn() {
  const navigate = useNavigate();
  const [error, submitAction, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      const email = formData.get("email") as string | null;
      const password = formData.get("password") as string | null;

      if (!email || !password) {
        return "Email and password are required.";
      }

      const error = await signin(email, password);
      if (error) {
        return error;
      }
      
      return null;
    },
    null,
  );

  const signin = async (email: string, password: string) => {
    const response = await fetch(authApiUrl + "signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response);
    if (response.ok) {
      const user = await response.json(); // Parse the response as JSON
      console.log(user); // Log the user object
      navigate(`/users/${user.id}/admin`); // Redirect to the user's page
      return null;
    }
    return await response.text();
  };

  return (
<div className="container">
    <img src={logo} alt="Logo" className="logo" />
      <h1>Sign in</h1>
      <form action={submitAction} className="form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="button">Sign In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}