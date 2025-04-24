import { Input } from "../../components/input";
import { Link, useNavigate } from "react-router";
import { BsArrowRightCircle } from "react-icons/bs";
import { FormEvent, useState } from "react";
import { auth, db } from "../../services/firebaseconnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, senha);

      const user = auth.currentUser;
      //console.log(user);

      if (user) {
        const docRef = await setDoc(doc(db, "users", user.uid), {
          uid: user?.uid,
          email: user?.email,
          name: nome,
          created: new Date(),
        });

        console.log(docRef);
        console.log("Banco criado com sucesso!");
      }

      alert("Usuario cadastrado com sucesso");
    } catch (e) {
      console.log(e);
    }

    navigate("/login");
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="md:border p-5  md:bg-gray-600  w-[500px] rounded-xl flex flex-col items-center">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-5 text-center">
          Criar Conta
        </h1>

        <form className="w-100 max-w-xl px-1 " onSubmit={handleRegister}>
          <label className="block text-sm/6 font-medium text-white">Nome</label>
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            type="text"
          />
          <label className="block text-sm/6 font-medium text-white">
            Email
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            type="email"
          />

          <label className="block text-sm/6 font-medium text-white">
            Senha
          </label>
          <Input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            type="password"
          />

          <button className="w-full h-9 rounded-2xl flex items-center justify-center p-5 bg-sky-500 text-white border-0 font-bold hover:bg-sky-950 cursor-pointer mt-2">
            Cadastrar
          </button>
        </form>

        <hr className="w-100 mt-7 md:text-black text-white " />

        <p className="mt-5 font-extralight md:text-black text-white">
          Já tem uma conta?
        </p>
        <Link to={"/login"}>
          <div className="flex items-center justify-center gap-2">
            <p className="border-b font-light text-white">Login</p>
            <BsArrowRightCircle size={20} color="white" />
          </div>
        </Link>
      </div>
    </div>
  );
}
