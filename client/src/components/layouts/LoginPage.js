/* eslint-disable */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import * as Cookies from "js-cookie";

import history from "../../store/history";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import * as userActions from '../../store/actions/userActions';
import * as alertActions from '../../store/actions/alertActions';

import { Grid, Row, Column } from 'carbon-components-react';
import { Form, FluidForm, TextInput, FormGroup, Button, Checkbox } from 'carbon-components-react';
import { ArrowRight32, ArrowLeft16 } from '@carbon/icons-react';

import LeftComponent from '../common/LeftComponent';


export const Fluid = (TextInputProps) => (
    <FluidForm >
        <TextInput
            type='text'
            labelText='Text input label'
            {...TextInputProps}
        />
    </FluidForm>

);

const LoginPage = props => {

    const [inputs, setInputs] = useState({
        email: '',
        company: '',
        password: '',
        login_type: ''
    });
    const LoggedUser = useSelector(state => state.UsersReducers);

    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const { email, company, password, login_type } = inputs;

    // reset login status
    useEffect(() => {
        // dispatch(userActions.logout());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }


    const handleSubmit = async (e) => {
        setSubmitted(false);
        e.preventDefault();
        if (email && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login({ email, password }, from));
            setTimeout(() => {
                // if(LoggedUser && LoggedUser)
                if (Cookies.get("CLCNWAHASH")) {
                    setSubmitted(false);
                }
            }, 300)

        }
    }

    const DemoContent = ({ children }) => {
        return (
            <div className="outside">
                <div className="inside">{children}</div>
            </div>
        );
    };

    const inputProps = {
        FirstNameInputProps: ({ name, _name, placeholder }) => ({
            className: `${name.replace(/\s/g, '-').toLowerCase()}-class`,
            id: `${name.replace(/\s/g, '-').toLowerCase()}-input`,
            labelText: `${name}`,
            name: `${_name.replace(/\s/g, '_').toLowerCase()}`,
            placeholder,
            light: false,
            disabled: false,
            hideLabel: false,
            invalid: false,
            invalidText: `Please enter valid ${name.toLowerCase()}`,
            onFocus: () => {
                setSubmitted(false);
                dispatch(alertActions.hideToast())
            },
            onClick: () => { },
            onChange: handleChange,
        }),
        PasswordInputProps: () => ({
            tooltipPosition: 'bottom',
            tooltipAlignment: 'center',
            hidePasswordLabel: 'Hide password',
            showPasswordLabel: 'Show password',
        }),
    };

    const buttonEvents = {
        className: 'submit-class',
        onClick: handleSubmit,
    };

    return (
        <React.Fragment>
            {/* LoginPage */}
            <div style={{ height: '100vh' }}>
                <Grid style={{ height: '100vh', paddingLeft: 0 }}>
                    <Row style={{ height: '100vh' }}>
                        <Column sm={0} md={2} lg={3} style={{ background: '#000000', color: '#FFFFFF' }}>
                            <LeftComponent />
                        </Column>
                        <Column lg={6} style={{ margin: '0 auto' }}>
                            <div style={{ padding: 90, paddingLeft: 125, padddingRight: 125 }}>
                                <Grid>
                                    <Row>
                                        <Column>
                                            <div style={{ marginBottom: 70 }}>
                                                <h4 className="custom-font" >Calories.io</h4>
                                            </div>
                                            <div style={{ marginBottom: 70 }}>
                                                <h3>Log In</h3>
                                                <p style={{ fontSize: 13 }}>
                                                    Don't have an account? <a className="p-cursor" onClick={() => history.push('/register')}>Register Now</a></p>
                                            </div>
                                        </Column>
                                    </Row>
                                </Grid>
                                <Grid>
                                    <Row>
                                        <Column lg={12} style={{ marginTop: 8 }}>
                                            <div style={{ display: 'flex', }}>
                                                <p style={{ fontSize: 13, }}>Enter your email Id</p>
                                            </div>
                                            <FluidForm>
                                                <TextInput
                                                    type='text'
                                                    {...inputProps.FirstNameInputProps({
                                                        name: 'Email',
                                                        _name: 'Email',

                                                        placeholder: 'john.doe@example.com'
                                                    })}
                                                    value={email || ''}
                                                    invalid={submitted && !email}
                                                />
                                            </FluidForm>
                                        </Column>
                                        <Column lg={12} style={{ marginTop: 8 }}>
                                            <FluidForm>
                                                <TextInput.PasswordInput
                                                    {...inputProps.FirstNameInputProps({
                                                        name: 'password',
                                                        _name: 'password',
                                                        placeholder: 'Doe'
                                                    })}
                                                    value={password || ''}
                                                    invalid={submitted && !password}
                                                />
                                            </FluidForm>
                                        </Column>
                                        <Column lg={12} >
                                            <Button style={{ maxWidth: '100%', width: '100%' }} type="submit" className="some-class" {...buttonEvents}
                                                renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                                Continue
                                            </Button>
                                            <div>
                                                <a style={{ float: 'left', paddingTop: 17, color: '#000000' }}>
                                                    <Checkbox labelText="Remember Me" id="checkbox-label-1" />
                                                </a>
                                                <a className="p-cursor" onClick={() => history.push('/reset-password')} style={{ float: 'right', paddingTop: 25 }}>Forgot Password?</a>

                                            </div>
                                        </Column>
                                    </Row>
                                </Grid>
                                <div style={{ textAlign: 'center', position: 'absolute', bottom: 25, left: '53%' }}>

                                    <p style={{ fontSize: 12, }}> &copy; Copyright Calories.io 2020; All rights reserved. </p>
                                </div>
                            </div>
                        </Column>
                    </Row>

                </Grid>
            </div>
        </React.Fragment>
    )
}

LoginPage.propTypes = {

}

export default LoginPage
