import React from 'react'
import axios from 'axios'

const CardUsers = ({ user, getAllUsers, setUpdateInfo, handleOpenForm}) => {

    //console.log(user)
    const deleteUsers = () => {
        const url =`https://users-crud1.herokuapp.com/users/${user.id}/`
        axios.delete(url)
            .then(res =>{
            getAllUsers()
        })
        .catch(err => console.log(err))
        .reset(defaultValue)
    }

    const handleUpdate= () => {
        handleOpenForm()
        setUpdateInfo(user)
    }

    return (
        <article className='card'>
            <h2 className='card__title'>{`${user.first_name} ${user.last_name}`}</h2>
            <hr className='card__hr' />
            <ul className='card__list'>
                <li className='card__item'>Email:  <span className='card__span'>{user.email}</span></li>
                <li className='card__item'>Birthday:  <span className='card__span'>{user.birthday}</span></li>
                <li className='card__item'>Password:  <span className='card__span'>{user.password}</span></li>
            </ul>
            <div className='card__footer'>
                <button onClick={deleteUsers} className='card__btn'><i className='bx bx-trash'></i></button>
                <button onClick={handleUpdate} className='card__btn'><i className='bx bx-pencil'></i></button>
            </div>
        </article>
    )
}

export default CardUsers