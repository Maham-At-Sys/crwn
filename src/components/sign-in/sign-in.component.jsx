import React from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle, signInWithFacebook} from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                email: '',
                password: ''
            });
        } catch (error) {
            console.log(error);
        }

        this.setState({
            'email': '',
            'password': ''
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value 
        });
    }

    render () {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        label="Email"
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        required 
                    />
                    <FormInput 
                        name='password' 
                        type='password' 
                        label="Password"
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        required
                    />
                    <div className='buttons'>
                        <CustomButton type='submit' value='Submit Form'>Sign IN</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>
                    <div className='buttons'>
                        <CustomButton onClick={signInWithFacebook} isFacebookSignIn>Sign In with Facebook</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;