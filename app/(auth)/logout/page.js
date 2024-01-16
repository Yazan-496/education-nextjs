"use client"
import Cookies from "js-cookie";
import {useRouter} from "next/navigation"
import Loading from "./loading";

export default function Logout() {
    const router = useRouter()
    Cookies.remove('user')
    Cookies.remove('token')
    if (typeof window !== "undefined" ){
        localStorage.removeItem('USER_DATA')
    }
    // router.refresh()
    router.replace("/signin")
    return (
        <Loading />
  )
}
