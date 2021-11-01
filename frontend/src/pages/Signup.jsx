import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert } from '../cmps/UtilCmps/Alert'
import { FormInput } from '../cmps/UtilCmps/FormInput'
import { Loader } from '../cmps/UtilCmps/Loader'
import { useForm } from '../services/customHooks'
import { signup, userMsg } from '../store/actions/user.actions'

export const Signup = ({ history }) => {
    const [signUpUser, handleChange, setSignUpUser] = useForm({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const { loggedInUser } = useSelector(state => state.userModule)
    const [alertMsg, setAlertMsg] = useState('')
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (loggedInUser) history.push(`/`)
    }, [])

    const doSignup = async ev => {
        ev.preventDefault()
        const { username, password, fullname, confirmPassword } = signUpUser
        if (!username || !password || !fullname) {
            return setAlertMsg('All inputs are required')
        }
        if (password !== confirmPassword) return setAlertMsg('Password do not match')
        try {
            const signupCreds = { username, password, fullname }
            setIsLoading(true)
            await dispatch(signup(signupCreds))
            dispatch(userMsg('Signup Succeded, Wellcome to GameKeys.'))
            setTimeout(() => {
                dispatch(userMsg(''))
            }, 2000);
            setIsLoading(false)
            history.push(`/`)
        } catch (err) {
            dispatch(userMsg('Signup failed, try again.'))
        }
    }

    return (
        <div className="login-container">
            {isLoading && <Loader />}
            <form className="login-signup space-around align-center flex container mb-20" onSubmit={doSignup}>
                <div className="flex column">
                    <p className="login-title"> SIGN UP</p>
                    {alertMsg && <Alert msg={alertMsg} />}
                    <FormInput type="text" name="fullname"
                        value={signUpUser.fullname}
                        handleChange={handleChange}
                        label="Fullname"
                    />
                    <FormInput type="text" name="username"
                        value={signUpUser.username}
                        handleChange={handleChange}
                        label="Username"
                    />
                    <FormInput type="password" name="password"
                        value={signUpUser.password}
                        handleChange={handleChange}
                        label="Password"
                    />
                    <FormInput type="password" name="confirmPassword"
                        value={signUpUser.confirmPassword}
                        handleChange={handleChange}
                        label="Confirm password"
                    />
                    <button className="btn-primary" type="submit">Sign Up</button>
                </div>
                <Link to="/login"><button className="btn-primary"
                >Back to login</button></Link>
            </form>
        </div>
    )
}
