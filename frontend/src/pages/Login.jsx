import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm"
import { getToken } from "../redux/thunks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import comunidad from "../assets/Comunidad.png"
import { Icono } from "../components/Icono";


export const Login = () => {

    const {handleChange,handleReset, username, password}=useForm({
        username:'',
        password:''
    });

    const [mostrarSpin, setMostrarSpin]=useState(false);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const resp=await dispatch(getToken(username, password, navigate));
        handleReset();
        if(resp){
            setMostrarSpin(true);
        }else{
            setMostrarSpin(false);
        }
    }

    return(
        <>
            <div className="flex flex-col w-full h-screen md:flex-row bg-linear-to-t from-transparent to-blue-200/80 items-center p-5 sm:p-20">
                <div className="w-full sm:w-1/2 flex flex-col justify-center items-center my-5 sm:p-20">
                    <h1 className="font-retro text-4xl sm:text-7xl text-blue-900">MiComunidapp</h1>
                    { (!mostrarSpin)?     
                    <form onSubmit={handleSubmit} className="bg-white w-full p-5 sm:p-15 rounded-lg flex flex-col mt-5 sm:mt-20 shadow-black shadow-2xl">
                        <label className="font-text sm:text-2xl font-semibold text-blue-900">Username:</label>
                        <input className="border border-stone-400 rounded-md p-2 outline-none focus:border-stone-600 font-text"
                            type="text"
                            placeholder="Indica tu DNI"
                            name="username"
                            value={username}
                            onChange={handleChange}
                        />
                        <br /><br />
                        <label className="font-text sm:text-2xl font-semibold text-blue-900">Password:</label>
                        <input className="border border-stone-400 rounded-md p-2 outline-none focus:border-stone-600 font-text"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        <br /><br />
                        <button type="submit" className="font-text bg-linear-to-bl from-blue-500 to-blue-900 text-white p-2 rounded-md  shadow-black shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">Entrar</button>
                    </form>
                    : <Icono name={'progress_activity'} className="icon-md animate-spin mt-15 text-blue-800"/>
                    }                               
                </div>
                <div>
                    <img src={comunidad} alt="" className="h-full w-full"/>
                </div>
            </div>
            <Footer/> 
        </>
    )

}
