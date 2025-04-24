import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebaseconnection";
import { doc, getDoc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface UserProps {
  created: string;
  email: string;
  name: string;
  uid: string;
}

export function Header() {
  const [user, setUser] = useState<UserProps>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getIniciais = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const firstName = user?.name.split(" ")[0];

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

  async function handleLogout() {
    await signOut(auth).then(() => {
      alert("Deslogado com sucesso!");
    });
  }

  return (
    <header className="w-full h-auto items-center m-2 p-1">
      <nav className="w-full h-12 flex items-center justify-between px-3 rounded-md">
        <div className="flex gap-4 font-medium ">
          <Button
            onClick={handleOpen}
            disableRipple
            sx={{
              backgroundColor: "transparent",
            }}
          >
            <Stack direction="row" spacing={1}>
              <Chip
                sx={{ fontSize: 15, width: 120, height: 40, color: "white" }}
                avatar={
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontWeight: "bold",
                    }}
                  >
                    {getIniciais}
                  </Avatar>
                }
                label={firstName}
                variant="outlined"
              />
            </Stack>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Informações do Usuário
              </Typography>

              <Typography
                id="modal-modal-description"
                component="div"
                sx={{ mt: 2 }}
              >
                <div>
                  <p>Nome: {user?.name}</p>
                  <p>Email: {user?.email}</p>
                  <p>Id: {user?.uid}</p>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>

        <button
          className="border p-3 rounded-2xl bg-white text-black cursor-pointer"
          onClick={handleLogout}
        >
          <FiLogOut />
        </button>
      </nav>
    </header>
  );
}
