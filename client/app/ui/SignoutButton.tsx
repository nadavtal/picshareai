import React from "react";
import { useNavigate } from "react-router-dom";
import { authApiUrl } from "~/constants";

const SignoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const response = await fetch(authApiUrl + "signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/signin"); // Redirect to the sign-in page after signout
      } else {
        console.error("Signout failed");
      }
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  return (
    <button onClick={handleSignout}>Sign Out</button>
  );
};

export default SignoutButton;