import React, { useActionState } from "react";
import { redirect } from "react-router";
import { useNavigate } from "react-router-dom";
import { authApiUrl } from "~/constants";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, submitAction, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      const email = formData.get("email") as string | null;
      const password = formData.get("password") as string | null;

      if (!email || !password) {
        return "Email and password are required.";
      }

      const error = await signup(email, password);
      if (error) {
        return error;
      }
      redirect("/");
      return null;
    },
    null,
  );

  const signup = async (email: string, password: string) => {
    // console.log({authApiUrl})
    alert(authApiUrl)
    const response = await fetch(authApiUrl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const user = await response.json(); // Parse the response as JSON
      console.log(user); // Log the user object
      navigate(`/users/${user.id}/admin`); 
      return null;
    }
    return await response.text();
  };

  return (
<div className="container">
  <h1 className="heading">Register</h1>
  <form action={submitAction} className="form">
    <div className="form-group">
      <label htmlFor="email" className="label">Email:</label>
      <input type="email" id="email" name="email" required className="input" />
    </div>
    <div className="form-group">
      <label htmlFor="password" className="label">Password:</label>
      <input type="password" id="password" name="password" required className="input" />
    </div>
    <button type="submit" className="button">Register</button>
  </form>
</div>
  );
}