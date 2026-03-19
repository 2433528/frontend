import { useState } from "react"


export const useForm = (initialForm={}) => {
    const [form, setForm]=useState(initialForm);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setForm({
            ...form,
            [name]:value
        });
    }

    const handleReset=()=>{
        setForm(initialForm);
    }

  return {
    ...form,
    form,
    handleChange,
    handleReset
  }
}
