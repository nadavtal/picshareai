import React, { useEffect, useState } from "react";
import { authApiUrl } from "~/constants";
import Camera from "~/user/Camera";
import type { Route } from "./+types/user";
import SignoutButton from "~/ui/SignoutButton";

export default function Admin({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  const [msg, setMsg] = useState<string>("");

  console.log({ params, matches });
  // Remove admin from the link
  const link = window.location.href.replace("/admin", "");
  console.log(link);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setMsg("Link copied to clipboard!");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={copyToClipboard}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#007BFF",
          color: "#fff",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Your Link
      </button>
      {msg && (
        <div
          style={{
            marginTop: "10px",
            color: "green",
            fontSize: "14px",
          }}
        >
          {msg}
        </div>
      )}
      <SignoutButton />
    </div>
  );
}