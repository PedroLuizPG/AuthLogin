import { auth, db } from "../../services/firebaseconnection";
import { getDoc, doc } from "firebase/firestore";
import { Header } from "../../components/header";
import Gif from "../../assets/garotinho.gif";
import { useEffect, useState } from "react";

interface UserProps {
  created: string;
  email: string;
  name: string;
  uid: string;
}

export function Home() {
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    async function getUser() {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, "users", user.uid);
        await getDoc(docRef).then((snap) => {
          if (snap.exists()) {
            setUser({
              created: snap.data()?.created,
              email: snap.data()?.email,
              name: snap.data()?.name,
              uid: snap.data()?.uid,
            });
          } else {
            console.log("Documento não encontrado");
          }
        });
      }
    }
    
    getUser();
  }, []);

  return (
    <div className="flex items-center flex-col  w-full ">
      <Header />

      <h1 className="text-3xl md:tetx-center text-center md:text-4xl text-white mt-18 mb-5">
        Welcome {user?.name}
      </h1>

      <img src={Gif} alt="gif" className="w-[400px] md:w-[500px]" />

      <h2 className="text-white text-2xl mt-4">Projeto para estudo 📚</h2>
    </div>
  );
}
