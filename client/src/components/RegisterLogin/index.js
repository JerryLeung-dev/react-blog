import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
// import { loginUser } from '../../store/actions/index';
import { Link } from 'react-router-dom';

class RegisterLogin extends Component {
    state = {
        email: "",
        password: "",
        errors: []
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    submitForm = evt => {
        evt.preventDefault();

        let formData = {
            email: this.state.email,
            password: this.state.password
        }

        if(this.isFormValid(this.state)){
            this.setState({errors:[]})
            this.props.onLoginUser(formData).then(response => {
                if(response.payload.loginSuccess) {
                    this.props.history.replace('/');
                }
            });
        } else {
            const error = 'Form is not valid';
            this.setState({errors: this.state.errors.concat(error)});
        }
        
        
    }

    isFormValid = ({email, password}) => email && password 

    displayError = (errors) => (
        errors.map((error, index) => (
            <p style={{color:"red"}} key={index}>{error}</p>
        ))
    )

    render() {
        
        return (
            <div className="container">
                <h1>Login</h1>
                <div className="row">
                    <form className="col s12">
                        <div className="row">

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
                            {(this.state.errors) && (
                                <>
                                    {this.displayError(this.state.errors)}
                                </>

                            )}
                            <div className="row">
                                <div className="col s12">
                                    <button 
                                        className="btn waves-effect waves-light blue darken-1" 
                                        type="submit" 
                                        name="action"
                                        onClick={evt => this.submitForm(evt)}>Submit
                                        {/* <i className="material-icons right">send</i> */}
                                    </button> &nbsp;&nbsp;
                                    <Link to="/register">
                                        <button 
                                            className="btn waves-effect waves-light red darken-1" 
                                            type="button">
                                            Sign up
                                            {/* <i className="material-icons right">send</i> */}
                                        </button>
                                    </Link>
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
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginUser : (data) => dispatch(actions.loginUser(data)),
        


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterLogin);