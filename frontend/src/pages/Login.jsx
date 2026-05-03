import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm"
import { getToken } from "../redux/thunks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";


export const Login = () => {

    const {handleChange,handleReset, username, password}=useForm({
        username:'',
        password:''
    });

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(getToken(username, password, navigate));
        handleReset();
    }

    return(
        <>
            <div className="bg-[url(./assets/Fondo.png)] bg-cover w-screen h-screen flex flex-col justify-center items-center">
                <h1 className="font-retro text-5xl md:text-8xl text-blue-800 font-bold shadow-2xs shadow-blue-900 mt-10">MiComunidapp</h1>            
                <form onSubmit={handleSubmit} className="bg-white p-5 md:p-15 rounded-lg flex flex-col mt-20 shadow-black shadow-2xl border-2 border-blue-800">
                    <label className="font-text text-2xl font-bold text-blue-900">Username:</label>
                    <input className="border border-stone-400 rounded-md p-2 outline-none focus:border-stone-600 shadow-black shadow-2xl font-text"
                        type="text"
                        placeholder="Indica tu DNI"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                    <br /><br />
                    <label className="font-text text-2xl font-bold text-blue-900">Password:</label>
                    <input className="border border-stone-400 rounded-md p-2 outline-none focus:border-stone-600 shadow-black shadow-2xl font-text"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <br /><br />
                    <button type="submit" className="font-text bg-linear-to-bl from-blue-500 to-blue-900 text-white p-2 rounded-md  shadow-black shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">Enviar</button>
                </form> 
                <Footer/>              
            </div>
        </>
    )

}
