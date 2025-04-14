import React, { useEffect, useState } from "react";
import { authApiUrl } from "~/constants";
import Camera from "~/user/Camera";
import type { Route } from "./+types/user";

export default function UserComponent({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  const [user, setUser] = useState<any>({
    id: params.id,
    email: "nadavtalalmagor@gmail.com"
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(authApiUrl + params.id);
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getUser();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User: {user.email}</h1>
      <Camera user={user}/>
    </div>
  );
}