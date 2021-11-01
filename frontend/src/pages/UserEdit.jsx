import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Alert } from '../cmps/UtilCmps/Alert'
import { FormInput } from '../cmps/UtilCmps/FormInput'
import { Loader } from '../cmps/UtilCmps/Loader'
import { handleFile, useForm, } from '../services/customHooks'
import { userService } from '../services/user.service'
import { updateUser, userMsg } from '../store/actions/user.actions'

export const UserEdit = ({ history }) => {
    const { loggedInUser } = useSelector(state => state.userModule)
    const [alertMsg, setAlertMsg] = useState('')
    const dispatch = useDispatch()
    const [user, handleChange, setUser] = useForm({
        fullname: '', username: '', newPassword: '', confirmPassword: ''
    })
    const [imgPreview, setImgPreview] = useState('')

    useEffect(async () => {
        if (!loggedInUser) {
            dispatch(userMsg('Please Log-in'))
            setTimeout(() => {
                dispatch(userMsg(''))
            }, 2500);
            return history.push('/login')

        }
        const user = await userService.getById(loggedInUser._id)
        setUser({ ...user, newPassword: '', confirmPassword: '' })
        setImgPreview(user.imgUrl)
    }, [])

    const uploadImg = async (ev) => {
        const fileEv = ev.target.files[0]
        const file = handleFile(fileEv, setImgPreview)
        console.log('file:', file);
    }
    const onUpdateUser = (ev) => {
        ev.preventDefault();
        console.log(user);
        if (user.newPassword.length > 0 || user.confirmPassword.length > 0) {
            if (user.newPassword !== user.confirmPassword) {
                setAlertMsg('Password dont match')
            } else {
                setUpdateUser()
            }
        } else {
            setUpdateUser()
        }

    }
    const setUpdateUser = async (ev) => {
        const newUser = { ...user }
        newUser.imgUrl = imgPreview
        console.log('newUser', newUser);
        await dispatch(updateUser(newUser));
        history.push('/profile')
        setTimeout(() => {
            dispatch(userMsg(''));
        }, 2500)
    }
    if (!loggedInUser) return <Loader />
    return (
        <section className="container flex justify-center align-center user-edit">
            <div className="user-edit-info flex column align-center">
                <h1>Edit Profile</h1>
                <label className="img-upload">
                    <img src={imgPreview} alt="user" />
                    <input
                        id="fileInput"
                        type="file"
                        name="imgUrl"
                        onChange={uploadImg}
                        value={''}
                        className="img-input"
                        accept="image/png, image/jpeg"
                    />
                </label>
                <p>Click on the image to change your avatar</p>
                <form onSubmit={onUpdateUser} className="user-edit-form">
                    <FormInput type="text" value={user.fullname} name="fullname" label='Fullname' handleChange={handleChange} />
                    <FormInput type="text" value={user.username} name="username" label='Username' handleChange={handleChange} />
                    {alertMsg && <Alert msg={alertMsg} />}
                    <FormInput type="password" value={user.newPassword} name="newPassword" label='New password' handleChange={handleChange} />
                    <FormInput type="password" value={user.confirmPassword} name="confirmPassword" label='Confirm password' handleChange={handleChange} />
                    <p>Leave password fields blank to keep your old password</p>
                    <button className="btn btn-primary" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </section>
    )
}
