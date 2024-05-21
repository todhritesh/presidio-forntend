

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate,  } from "react-router-dom"
import { client } from "@/config/api"
import { toast } from "react-toastify"
import Spinner from "@/app-components/Spinner"
import { useEffect, useState } from "react"
import { useAuthState } from "@/zustand/authStore"
import { setAccessTokenInLocalStorage } from "@/App"

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordRegex, { message: "Password must be a combination of alphanumeric and special symbols" })

})


function Login() {

    const [loading,setIsLoading] = useState(false)
    const navigate = useNavigate()

    const setAccessToken = useAuthState(state=>state.setAccessToken)
    const setIsAuthenticated = useAuthState(state=>state.setIsAuthenticated)
    const isAuthenticated = useAuthState(state=>state.isAuthenticated)

    useEffect(()=>{
        function checkAuth() {
            if(isAuthenticated){
                navigate("/")
            }
        }
        checkAuth()
    },[isAuthenticated])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email:"email@gmail.com",
            password:"pass@123"
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            setIsLoading(true)
            const res = await client.post("/auth/login",{
                email:values.email,
                password:values.password
            })
            toast.success("Logged in successfully")
            const token = res.data.accessToken
            const refreshToken = res.data.refreshToken
            setAccessTokenInLocalStorage(token)
            localStorage.setItem("refreshToken",refreshToken)
            setAccessToken(token)
            setIsAuthenticated(true)
            navigate("/")
        } catch(e:any) {
            toast.error(e?.response?.data?.message||"Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
            <div className="container flex mx-auto justify-center my-12 px-2">
                {loading && <Spinner/>}
                <div className="md:w-[400px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Password" {...field} />
                                        </FormControl>
                                        <FormDescription className="text-sm">
                                            Password must be a combination of alphabets, numbers, and symbols
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-1 items-center justify-between">
                                <Button className="px-8" type="submit">Login</Button>
                                <FormDescription>
                                    Don't have account? <Link to={"/register"} className="pl-2 underline" >Register</Link>
                                </FormDescription>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
    )
}

export default Login