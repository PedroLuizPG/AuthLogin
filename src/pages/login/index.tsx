import { Input } from "../../components/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import { auth, db } from "../../services/firebaseconnection";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputSenha, setInputSenha] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (inputEmail === "" || inputSenha === "") {
      alert("Preencha os campos!");
      return;
    }

    await signInWithEmailAndPassword(auth, inputEmail, inputSenha)
      .then(() => {
        navigate("/", { replace: true });

        setInputSenha("");
      })
      .catch((err) => console.log("Error" + err));
  }

  async function loginGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      if (user) {
        const docRef = await setDoc(doc(db, "users", user.uid), {
          uid: user?.uid,
          email: user?.email,
          name: user?.displayName,
          created: new Date(),
        });

        console.log(docRef);
        console.log("Banco criado com sucesso!");
      }

      // IdP data available using getAdditionalUserInfo(result)
      // ...
      navigate("/", { replace: true });
    } catch (err) {
      console.log("Error", err);
    }
  }

  function loginGitHub() {
    const provider2 = new GithubAuthProvider();

    signInWithPopup(auth, provider2)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigate("/", { replace: true });

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className=" w-full min-h-screen  flex flex-col items-center justify-center">
      <div className=" md:border p-5  md:bg-gray-600  md:w-[500px] md:rounded-xl flex flex-col items-center">
        <h1 className="text-2xl text-white md:text-3xl font-bold mb-5 text-center">
          Login
        </h1>

        <form className="w-70 md:w-100 max-w-xl px-1 " onSubmit={handleSubmit}>
          <label className="block text-sm/6 font-medium text-white">
            Email
          </label>

          <Input
            placeholder="Digite seu email"
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
          <label className="block text-sm/6 font-medium text-white">
            Senha
          </label>
          <Input
            placeholder="Digite sua senha"
            type="password"
            value={inputSenha}
            onChange={(e) => setInputSenha(e.target.value)}
          />

          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center  gap-1">
              <input type="checkbox" className="w-4 h-4 accent-blue-500  " />
              <label className="text-neutral-400">Lembrar senha</label>
            </div>
            <a className="border-b text-white md:text-black">
              Esqueceu sua senha
            </a>
          </div>

          <button className="w-full h-9 rounded-2xl flex items-center justify-center p-5 bg-sky-500 text-white border-0 font-bold hover:bg-sky-950 cursor-pointer">
            Login
          </button>
          <p className="text-center my-3 font-light text-white md:text-black">
            Ainda não tem conta?
            <span className="text-white border-b ml-2">
              <Link to={"/register"}>Criar Conta</Link>
            </span>
          </p>
        </form>
        <hr className="w-70 md:w-100 mb-3 border-white md:border-black" />
        <div>
          <span className="font-medium text-white md:text-black">Ou</span>
        </div>

        <div className="md:w-100 md:max-w-xl w-full mt-3 flex flex-col md:flex-row gap-4 items-center justify-center">
          <button
            onClick={loginGoogle}
            className="w-70 h-9 rounded-3xl flex items-center justify-center p-5 bg-white text-black  font-bold text-[13px] border-0 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <FcGoogle />
              Entre com o Google
            </div>
          </button>

          <button
            onClick={loginGitHub}
            className="w-70 h-9 rounded-3xl flex items-center justify-center p-5 bg-black text-white  font-bold text-[13px] border-0 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <FaGithub />
              Entre com o GitHub
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
