import axios from 'axios'
import React from 'react'

const UsersList = ({user,getAllUsers, setUpdateInfo,handleOpenForm}) => {

    const deleteUser = ()=>{
        const URL = `https://users-crud1.herokuapp.com/users/${user.id}`
        axios.delete(URL)
         .then(res=>getAllUsers())
         .catch(err=>console.log(err))
    }

    const handleUpdate = ()=>{
        setUpdateInfo(user)
        handleOpenForm()/////////////REVISARTEL USETR
    }
  return (
    <article className='users'>
       <h2 className="user__name">{user["first_name"]} {' '} {user["last_name"]}</h2>
       <div className='users__content'>
        <ul className="users__list">
            <li className="">
            <img src="mail.svg" alt="user" /> :   <span className="">{user.email}</span>
            </li>
            <li className="">
            <img src="birthday.svg" alt="user" /> :   
            <span className=""> {user.birthday}</span>
            </li>
        </ul>
        <div className="users__buttons" >
            <button onClick={deleteUser} className="users__buttons-delete"> <img src="trash.svg" alt="user" /> </button>
            <button onClick={handleUpdate} className="users__buttons-edit"> <img src="edit.svg" alt="user" /> </button>
        </div>
       </div>
    </article>
  )
}

export default UsersList
