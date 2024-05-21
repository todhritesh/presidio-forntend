import Spinner from "@/app-components/Spinner";
import privateClient from "@/config/api";
import { useAuthState } from "@/zustand/authStore";
import { useProfileState } from "@/zustand/profileStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoutes() {

    const [loading,setLoading] = useState(true)

    const setUserId = useProfileState(state=>state.setUserId)

    useEffect(()=>{

      async function getProfle() {
        try {
          const {data} = await privateClient.post("/auth/get-profile")
        console.log(data)
        setUserId(data._id)
        } catch(e) {
          console.log("in proteched routes")
        } finally{
          setLoading(false)
        }
      }

      getProfle()

    },[])

    const isAuthenticated = useAuthState(state=>state.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return loading ? <Spinner/> : <Outlet/>
  
}

export default ProtectedRoutes