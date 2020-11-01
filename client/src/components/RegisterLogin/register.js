import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Register extends Component {
    state = {
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    displayError = (errors) => (
        errors.map((error, index) => (
            <p key={index}>{error}</p>
        ))
    )

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    isFormValid = () => {
        // let isValid = true;
        // isValid = !fname.length || !lname.length || !email.length || !password.length || !confirmPassword.length && isValid;
        // isValid = password === confirmPassword ? true : false
        // if(!isValid){
        //     const error = { message: 'You have to input all fields'}
        //     const updatedErrors = this.state.errors.concat(error);
        //     this.setState({errors: updatedErrors });
        // }
        // console.log(isValid, fname.length);
        // // return isValid

        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = {message : 'Fill in all fields'};
            this.setState({errors: this.state.errors.concat(error)});
        } else if (!this.isPasswordValid(this.state)) {
            error = {message : 'Password invalid'};
            this.setState({errors: this.state.errors.concat(error)});
        } else {
            return true;
        }
    }

    isPasswordValid = ({password, confirmPassword}) => {
        if (password.length < 7 && confirmPassword < 7) {
            return false;
        } else if (password!== confirmPassword){
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty =({fname, lname, email, password, confirmPassword}) => {
            if (
            !fname.length ||
            !lname.length ||
            !email.length ||
            !password.length ||
            !confirmPassword.length 
            ) {
                return true;
            }
            
    }

    submitForm = (event) => {
        event.preventDefault();
        let formData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            firstname: this.state.fname,
            lastname: this.state.lname,
        }

        if(this.isFormValid(this.state)){
            this.setState({errors:[]})
            this.props.onRegisterUser(formData)
            .then(response => {
                if(response.payload.success){
                    this.props.history.push('/login');
                } else {
                    this.setState({errors: this.state.errors.concat('Failed attempt to send data to DB')})
                }
            })
            .catch(err => {
                this.setState({
                    errors: this.state.errors.concat(err)
                })
            })
        } else {
            console.error('Form is not valid');
        }
        
    }
    render() {
        return (
            <div className="container">
            <h1>Register</h1>
            <div className="row">
                <h5>Personal Information</h5>
                <form className="col s12">
                    <div className="row">

                         <div className="input-field col s12">
                            <input
                                name="fname"
                                id="fname" 
                                type="text" 
                                value={this.state.fname}
                                onChange={evt => this.handleChange(evt)}
                                className="validate"/>
                            <label htmlFor="fname">First Name</label>
                            <span 
                                className="helper-text"
                                data-errors="Invalid Invalid first name"
                                data-success=" "
                                />
                        </div>

                        <div className="input-field col s12">
                            <input
                                name="lname"
                                id="lname" 
                                type="text" 
                                value={this.state.lname}
                                onChange={evt => this.handleChange(evt)}
                                className="validate"/>
                            <label htmlFor="lname">Last Name</label>
                            <span 
                                className="helper-text"
                                data-errors="Invalid Invalid last name"
                                data-success=" "
                                />
                        </div>
                        
                        <div className="input-field col s12">
                            <input
                                name="email"
                                id="email" 
                                type="email" 
                                value={this.state.email}
                                onChange={evt => this.handleChange(evt)}
                                className="validate"/>
                            <label htmlFor="email">Email</label>
                            <span 
                                className="helper-text"
                                data-errors="Invalid email"
                                data-success=" "
                                />
                        </div>

                        <h5>Verify password</h5>
                        <div className="input-field col s12">
                            <input
                                name="password"
                                id="password" 
                                type="password"
                                value={this.state.password}
                                onChange={evt => this.handleChange(evt)}
                                className="validate"/>
                            <label htmlFor="password">Password</label>
                            <span 
                                className="helper-text"
                                data-errors="Invalid password"
                                data-success=" "
                                />
                        </div>

                        <div className="input-field col s12">
                            <input
                                name="confirmPassword"
                                id="confirmPassword" 
                                type="password"
                                value={this.state.confirmPassword}
                                onChange={evt => this.handleChange(evt)}
                                className="validate"/>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <span 
                                className="helper-text"
                                data-errors="Invalid confirmPassword"
                                data-success=" "
                                />
                        </div>
                        {(this.state.errors) && (
                            <>
                                {this.displayError(this.state.errors)}
                            </>

                        )}
                        <div className="row">
                            <div className="col s12">
                                <button 
                                    className="btn waves-effect waves-light red darken-3" 
                                    type="submit" 
                                    // name="action"
                                    onClick ={event =>this.submitForm(event)}
                                    >Create an account
                                </button>
                        
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        user : state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegisterUser : (data) => dispatch(actions.registerUser(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);