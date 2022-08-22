import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const defaultValue = {

    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday: ''
}

const Form = ({getAllUsers, updateInfo, setUpdateInfo, handleCloseForm}) => {

    useEffect(()=>{
        if(updateInfo){
        reset(updateInfo)
        }
    },[updateInfo])
    //console.log(updateInfo)
   const {register,reset,handleSubmit} = useForm()

   const createUser = data =>{
    const url =`https://users-crud1.herokuapp.com/users/`
    axios.post(url, data)
    .then(res => {
        console.log(res.data)
        getAllUsers()
        alert("User Created")
    })
    .catch(err =>{
        console.log(err)
        alert("User didn't created")})
     reset(defaultValue)
   }

   const updateUser =(data)=>{
     const url =`https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
     axios.patch(url,data)
     .then(res=>{
        console.log(res.data)
        getAllUsers()

    })
     .catch(err=>console.log(err))
    }

    const submit = data =>{
    if(updateInfo){
        if (window.confirm("Do you really want to update?")) {
            updateUser(data)
            setUpdateInfo()
          }else {
            handleCloseForm()
          }
       //update 
     }else{ 
     createUser(data)
     }
     reset(defaultValue)
     handleCloseForm()
     setUpdateInfo()
 }

    const closeReset = () =>{
        handleCloseForm()
        reset(defaultValue)
        setUpdateInfo()
    }

  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
        <div onClick={closeReset} className='form-x'><i className='bx bx-window-close'></i></div>
        <h2 className='form__title'>{updateInfo ? 'Update Info Users' : 'Create New User'}</h2>
        <ul className='form__list'>
            <li className='form__item'>
                <label htmlFor="name"><i className='bx bxs-user'></i></label>
                <input {...register("first_name")} type="text" id='name' placeholder='First Name'/>            
            </li>
            <li className='form__item'>
                <label htmlFor="lastname"><i className='bx bxs-user'></i></label>
                <input {...register("last_name")} type="text" id='lastname' placeholder='Last Name' />
            </li>
            <li className='form__item'>
                <label htmlFor="email"><i className='bx bxs-envelope'></i></label>
                <input {...register("email")} type="email" id='email' placeholder='Email' />
            </li>
            <li className='form__item'>
                <label htmlFor="password"><i className='bx bxs-lock-alt'></i></label>
                <input {...register("password")}type="password" id='password' placeholder='Password' />
            </li>
            <li className='form__item'>
                <label htmlFor="birthday"><i className='bx bxs-cake'></i></label>
                <input {...register("birthday")} type="date" id='birthday' placeholder='birthday' />
            </li>
        </ul>
        <button className='form__btn'> {updateInfo ? 'Update' : ' + Create'}</button>
    </form>
  )
}

export default Form