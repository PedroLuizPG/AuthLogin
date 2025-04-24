import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebaseconnection";
import { getDoc, doc } from "firebase/firestore";
import { Navigate } from "react-router";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): any {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        //console.log(user.uid)

        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);

        const userData = {
          uid: user?.uid,
          email: user?.email,
          nome: snap.data()?.name,
          criado: snap.data()?.created,
        };

        // console.log(userData);
        localStorage.setItem("@firebaseLogin", JSON.stringify(userData));

        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
}
