import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const defaultValue = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: ""
  }

const UsersForm = ({getAllUsers, updateInfo, setUpdateInfo, handleCloseForm}) => {

    useEffect(() => {
      if(updateInfo){
        reset(updateInfo)
      }
    }, [updateInfo])
    

    const createUser = (data)=>{
        const URL = 'https://users-crud1.herokuapp.com/users/'
        axios.post(URL,data)
         .then(res=>getAllUsers())
         .catch(err=>console.log(err))
    }

    const updateUser = data =>{
        const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
        axios.patch(URL,data)
         .then(res=>{
            console.log(res.data);
            getAllUsers()
         })
         .catch(err=>console.log(err))
    }



    const {register, reset, handleSubmit} = useForm()

    const submit = data => {
        if(updateInfo){
            updateUser(data)
            setUpdateInfo()
        }else {
            createUser(data)
        }
        reset(defaultValue)
        handleCloseForm()
    }
  return (
    <form  onSubmit={handleSubmit(submit)} className='form'>
        <div onClick={handleCloseForm} className='form__x'>x</div>
        <h2 className='form__title'>{updateInfo? 'Edit User':'New User'}</h2>
        <ul className='form__list'>
            <li className='form__item'>
                <label htmlFor="name"> <img src="user.svg" alt="user" /> </label>
                <input {...register('first_name')} type="text" id = 'name' placeholder='Name' />
            </li>
            <li className='form__item'>
                <label htmlFor="lastname"> <img src="lastname.svg" alt="user" /> </label>
                <input {...register('last_name')}  type="text" id = 'lastname' placeholder='Last Name'/>
            </li>
            <li className='form__item'>
                <label htmlFor="email"> <img src="mail.svg" alt="email" /> </label>
                <input {...register('email')} type="email" id = 'email' placeholder='Email'/>
            </li>
            <li className='form__item'>
                <label htmlFor="birthday">  <img src="birthday.svg" alt="user" />  </label>
                <input {...register('birthday')} type="date" id = 'birthday' />
            </li>
            <li className='form__item'>
                <label htmlFor="password"> <img src="key.svg" alt="user" /> </label>
                <input {...register('password')} type="password" id = 'password' placeholder='Password' />
            </li>
        </ul>
        <button className='form__btn'>{updateInfo? 'Update': 'Create'}</button>
    </form>
)
}

export default UsersForm
