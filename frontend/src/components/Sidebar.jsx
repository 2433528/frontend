import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icono } from './Icono';
import { ComunidadesList } from './ComunidadesList';
import { getRefresh, getRoles } from '../redux/thunks';
import { cambiarEstado } from '../redux/menuSlice';

export const Sidebar = ({children}) => {
    const nombre=useSelector((state)=>state.auth.user.nombre);
    const abierto=useSelector((state)=>state.auth.menu);
    const {is_authenticated, is_loading, user}=useSelector((state)=>state.auth);
    const roles=useSelector((state)=>state.auth.roles_list);  

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [rolGestion, setRolGestion]=useState([]);
    const [rolDist, setRolDist]=useState([]);
    //const [isGestor, setIsGestor] = useState(false);

    useEffect(()=>{
        if(user?.user_id){
        dispatch(getRoles());
        return;
        }

        // if(!is_authenticated && !is_loading){
        // dispatch(getRefresh(navigate));
        // }

    }, [user?.user_id, is_authenticated, is_loading]);

    useEffect(()=>{
        setRolGestion(()=>roles.filter((item)=>item.rol === 'gestor'));
        setRolDist(()=>roles.filter((item)=>item.rol !== 'gestor'));
    }, [roles]);

    // const changeChecked=(e)=>{
    //     setIsGestor(e.target.checked);
    // }

  return (
    <>
        <div className={`bg-blue-900 block h-full`}>            
                <div className='flex items-center'>
                    <h1 onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}));
                        navigate('/inicio');}} className="w-full h-24 font-retro text-2xl sm:text-4xl box-border p-6 text-white hover:cursor-pointer bg-blue-950">
                        MiComunidapp 
                    </h1>
                    <Icono name={'close'} className={`cursor-pointer text-white ocultar bg-blue-950 h-24 p-6`} onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(cambiarEstado({estado:false}))
                    }}/>
                </div>
            <div className='flex flex-col'>                
                <p className="bg-blue-900 p-3 -mt-0.5 font-text font-bold text-2xl text-white whitespace-nowrap">👋 Hola {nombre}</p>                     
                    <ComunidadesList rolGestion={rolGestion} rolDist={rolDist}/>                        
            </div>                     
        </div>
    </>
  )
}
