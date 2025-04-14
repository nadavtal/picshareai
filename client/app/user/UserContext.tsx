// import React, { createContext, useContext, useState, useEffect } from "react";
// import { authApiUrl } from "~/constants";

// interface User {
//   id: string;
//   email: string;
//   // Add other user properties as needed
// }

// interface UserProviderProps {
//   children: ReactNode;
// }

// const UserContext = createContext<User | null>(null);

// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await fetch(authApiUrl + "current-user", {
//         credentials: "include",
//       });
//       if (response.ok) {
//         const user = await response.json();
//         setUser(user);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={user}>
//       {/* {children} */}
//     </UserContext.Provider>
//   );
// };

// // export const useUser = (): User | null => useContext(UserContext);