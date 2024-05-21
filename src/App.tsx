import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Register from "./screens/Register"
import Login from "./screens/Login"
import ProtectedRoutes from "./screens/ProtectedRoutes"
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import Dashboard from "./screens/Dashboard"
import privateClient from "./config/api"
import { useAuthState } from "./zustand/authStore"
import Spinner from "./app-components/Spinner"
import Seller from "./screens/Seller"
import Buyer from "./screens/Buyer"
import ViewMyPost from "./screens/ViewMyPosts"
import EditProperty from "./screens/EditProperty"
import ViewPropertyDetails from "./screens/ViewPropertyDetails"


export function getAccessTokenFromLocalStorage() {
  if (localStorage.getItem("accessToken")) {
    return localStorage.getItem("accessToken")
  }
  return null
}

export function setAccessTokenInLocalStorage(token: string) {
  return localStorage.setItem("accessToken", JSON.stringify(token))
}



function App() {
  const location = useLocation()
  const setAccessToken = useAuthState(state => state.setAccessToken)
  const setIsAuthenticated = useAuthState(state => state.setIsAuthenticated)
  const navigate = useNavigate()
  const [isChecking, setIsChecking] = useState(false)

  // useEffect(()=>{
  //   (function checkApi () {
  //     axios.get("https://presidio-backend-o6rp.onrender.com/api/test").then(res=>{
  //       console.log(res.data)
  //     })
  //   })()
  // },[])

  useEffect(() => {

    async function handleChecking() {
      setIsChecking(true)
      try {
        if (!getAccessTokenFromLocalStorage()) {
          navigate('/login')
          return;
        }
        const response = await privateClient.post("/auth/check")
        setAccessToken(getAccessTokenFromLocalStorage() as string)
        setIsAuthenticated(true)
        navigate(location.pathname)
        toast.success("Logged in successfully")
      } catch (e) {
        toast.error("Something went wrong, Please login again")
        navigate('/login')
      } finally {
        setIsChecking(false)
      }
    }

    handleChecking()

  }, [])
  return (
    <div className="px-2">
      {
        isChecking && <Spinner />
      }
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />} >
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit-property" element={<EditProperty />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/my-post" element={<ViewMyPost />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/view-details" element={<ViewPropertyDetails />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App