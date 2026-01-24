"use client";
import { useState } from"react";
export default function LoginPage(){
    const [form,setForm] = useState({
        email:"",password:"",
    });
    const handlelogin = async()=> {
        console.log("login data", form);
        const res= await fetch("/api/auth/login",
            {
               method:"post",
               headers:{"Content-Type":"application/json"},
               body:JSON.stringify(form), 
            }
        );
        const data=await res.json();
        alert(data.message || data.error);
    };
    return(
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <input
                type="text"
                placeholder="User-email"
                className="w-full border p-2 mb-3 rounded"
                onChange={(e)=>setForm({...form,email:e.target.value})}
                />
                <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 mb-3 rounded"
                onChange={(e)=>setForm({...form,password:e.target.value})}
                />
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={handlelogin}>Login</button>
            </div>
        </div>
    )
}