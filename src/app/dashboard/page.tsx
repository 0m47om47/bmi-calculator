"use client";

import { set } from "mongoose";
import { useState } from "react";

export default function DashboardPage(){
    const[height, setHeight] = useState("");
    const[weight,setWeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);
    const[category,setCatogry]=useState("");
    const calculateBMI =()=>{
        const h=Number(height)/100;
        const w=Number(weight);
        if(!h || !w){
            alert("Fill the both height and weight");
            return;
        }
        const result=w/(h*h);
        const bmiValue=Number(result.toFixed(2));
        setBmi(bmiValue);
        if(bmiValue <18.5){
            setCatogry("Underweight");
        }
        else if(bmiValue<25){
            setCatogry("Normal");
        }
        else if(bmiValue<30){
            setCatogry("Overweight");
        }
        else{
            setCatogry("Obese");
        }
    };
    return(
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center ">BMI Calculator</h1>
                <input 
                type="number"
                 placeholder="Height (cm)" className="w-full boder p-2 mb-3 rounded"
                value={height}
                onChange={(e)=> setHeight(e.target.value)}
                />
                <input
                type="number"
                placeholder="Weight (kg)"
                className="w-full border p-2 mb-3 rounded"
                value={weight}
                onChange={(e)=>setWeight(e.target.value)}
                />
                <button
                 type="button"
                onClick={calculateBMI}>Calculate BMI</button>
                {bmi && (
                    <p className="mt-4 text-center text-lg font-semibold">YOUR BMI: {bmi}</p>
                )}
                {category &&(
                    <p className="p-2 text-center text-gray-700">category : {category}</p>
                )

                }
            </div>
        </div>
    )
}