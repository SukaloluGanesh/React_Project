import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Account } from "@toolpad/core/Account";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase"; 

export default function AccountDemoSignedIn() {
  const [session, setSession] = React.useState(null);
  const navigate = useNavigate(); 


  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession({
          user: {
            name: user.displayName || "User",
            email: user.email,
            image: user.photoURL || "https://via.placeholder.com/150",
          },
        });
      } else {
        setSession(null);
        navigate("/login"); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

 
  const authentication = React.useMemo(() => ({
    signIn: async () => {
      console.log("Use Firebase Authentication methods to sign in");
    },
    signOut: async () => {
      await signOut(auth);
    },
  }), []);

  return (
    <AppProvider authentication={authentication} session={session}>
   
      <Account />
     
    </AppProvider>
  );
}
