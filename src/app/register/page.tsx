"use client";
import { useState } from "react";
export default function RegisterPage(){
    const [form,setForm] =useState({
        name:"",email:"",password:"",
    });
    const handleRegister = async () => {
        console.log("form ka data",form);
        const res = await fetch ("/api/auth/register",{
            method:"post",
            headers:{ "Content-type": "application/json"},
            body:JSON.stringify(form),
        });
        const data = await res.json();
        alert(data.message || data.error);
    };
    return(
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                <input 
                type="text"
                placeholder="name"
                className="w-full border p-2 mb-3 rounded"
                onChange={(e) =>setForm({...form, name:e.target.value })}
                />
                <input type="email"
                placeholder="Email"
                className="w-full rounded border p-2 mb-3"
                onChange={(e)=> setForm({...form, email: e.target.value})}
                />
                <input type="password"
                placeholder="password"
                className="w-full border p-2 mb-3 rounded" 
                onChange={(e)=> setForm({...form, password: e.target.value})}/>
                <button type="button" onClick={handleRegister}className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
            </div>
        </div>
    );
}