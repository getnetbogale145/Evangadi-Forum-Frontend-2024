import React, { useContext, useRef, useState } from 'react'
import AuthStyle from './classes.module.css'
import { SignContext } from '../State/State';
import { stateType } from "../../Utility/reducer";
import axios from '../../Utility/axios'

import { ThreeDots } from 'react-loader-spinner'


function Reset() {
    const [isAnimating, setIsAnimating] = useState(true);
    const [{ signstate }, dispatch] = useContext(SignContext);
    const [sentResetMessage, setSentResetMessage] = useState(true)
    const [process, setProcess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const resetEmail = useRef(null)

    const handleReset = async (e) => {
        e.preventDefault();

        const resetEmailValue = resetEmail.current.value;

        if (!resetEmailValue) {
            resetEmail.current.style.border = '0.5px solid red';
            return;
        }

        try {
            setProcess(true)
            await axios.post('/users/reset', {
                email: resetEmailValue
            })

            setSentResetMessage(false)
            dispatch({ type: stateType.UPDATE })

        } catch (error) {
            console.log(error)
            setProcess(false)
            if (error?.response?.data === 'Email not found or error updating user') {
                setErrorMessage('Email not found or not registered with this email address.')
            } else {
                setErrorMessage('Something went wrong. Please try again.')
            }
        }
    }

    return (
        <div className={AuthStyle.form_container}>
            <div className={`${isAnimating ? AuthStyle.slidein : ''}`}>

                {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{errorMessage}</p>}

                {sentResetMessage ? (
                    <form action="" onSubmit={handleReset}>
                        <div className={AuthStyle.reset_title}>Reset Password</div>
                        <div className={AuthStyle.reset_instuction}>
                            Please enter your email address below, and we'll send you further instructions via email.
                        </div>

                        <div>
                            <input type="email" name="" id="" placeholder='Email Address' ref={resetEmail} />
                        </div>

                        {process && (
                            <ThreeDots
                                visible={true}
                                height="40"
                                width="40"
                                color="#516CF0"
                                radius="6"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass={AuthStyle.ThreeDotsCenter}
                            />
                        )}

                        <div className={AuthStyle.reset_button}>
                            <button type='submit'>Reset Password</button>
                        </div>

                        <div className={AuthStyle.reset_redirect_link} onClick={() => dispatch({ type: stateType.SIGN_IN })}>
                            Already have an account?
                            <span className={AuthStyle.reset_redirect_link} onClick={() => dispatch({ type: stateType.SIGN_UP })} style={{ marginLeft: "50px" }}>
                                Don’t have an account?
                            </span>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p className={`${AuthStyle.reset_title} ${AuthStyle.reset_message}`}>
                            A reset link has been sent to your email address:
                            <span>
                                <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noopener noreferrer">
                                    {resetEmail.current.value}
                                </a>
                            </span>. 
                            Please check your email to proceed with resetting your password.
                        </p>

                        <div className={AuthStyle.reset_container}>
                           
                        </div>
                        <a href="https://mail.google.com/mail/u/0/#inbox" target='_blank' className={AuthStyle.reset_goto_link}>
                            Go to your email
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Reset




