import { createBrowserRouter,  } from "react-router"
import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { Private } from "./routes/private"


const router = createBrowserRouter([
  {
    path: '/',
    element:<Private><Home/></Private> 
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

export {router}