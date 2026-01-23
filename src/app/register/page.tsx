"use client";
import { useState } from "react";
export default function RegisterPage(){
    const [form,setForm] =useState({
        name:"",email:"",password:"",
    });
    return(
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">register</h1>
                <input 
                type="text"
                placeholder="name"
                className="w-full border p-2 mb-3 rounded"
                onClick={(e) =>setForm({...form,name:e.target.value})}
                />
            </div>
        </div>
    );
}