import { useState } from "react"


export const useForm = (initialForm={}) => {
    const [form, setForm]=useState(initialForm);

    const handleChange=(e)=>{
        const {name,type, checked, value}=e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const handleReset=()=>{
        setForm(initialForm);
    }

  return {
    ...form,
    form,
    handleChange,
    handleReset,
    setForm
  }
}
