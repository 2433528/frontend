import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm"
import { getToken } from "../redux/thunks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
            <div className="page">
                <div className="card_page">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Username:</label>
                        <input
                            type="text"
                            placeholder="Indica tu DNI"
                            name="username"
                            value={username}
                            onChange={handleChange}
                        />
                        <br /><br />
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        <br /><br />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </>
    )

}
