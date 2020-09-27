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
import { ArrowRight32, ArrowLeft16, CheckmarkFilled16 } from '@carbon/icons-react';
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
    });

    const [resetLinkSuccess, setResetLinkSuccess] = useState(false);
    const LoggedUser = useSelector(state => state);



    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const { email } = inputs;

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

        setSubmitted(true);
        if (email) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.resetPassword({ email }));
            setTimeout(() => {
                console.log('LoggedUser.resetPassword', LoggedUser.UsersReducers.resetPassword)
                if (LoggedUser.UsersReducers && LoggedUser.UsersReducers.resetPassword) {
                    setResetLinkSuccess(true);
                    setTimeout(() => {
                        setSubmitted(false);
                    }, 200)
                }
            }, 200)

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
                                                <h3>Trouble logging in</h3>
                                                <p style={{ fontSize: 13 }}>
                                                    Reset your account password
                                                     </p>
                                            </div>
                                        </Column>
                                    </Row>
                                </Grid>
                                <Grid>
                                    <Row>
                                        {resetLinkSuccess ? (<Column lg={12} style={{ marginTop: 8 }}>

                                            <div style={{ display: 'flex', }}>
                                                <a className="p-cursor">
                                                    <CheckmarkFilled16 style={{ marginTop: 2 }} />
                                                </a>
                                                &nbsp;
                                                <p style={{ fontSize: 13, }}>Reset link sent!</p>
                                            </div>
                                            <h4>
                                                We have sent you a rest link. Please check your inbox
                                            </h4>

                                        </Column>) : (<Column lg={12} style={{ marginTop: 8 }}>
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
                                        </Column>)}
                                        <Column lg={12} >
                                            {!resetLinkSuccess ? (<Button style={{ maxWidth: '100%', width: '100%' }} type="submit" className="some-class" {...buttonEvents}
                                                renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                                Continue
                                            </Button>) : undefined
                                            }
                                            <div>
                                                <a className="p-cursor" onClick={() => history.push('/login')} style={{ float: 'left', paddingTop: 25 }}>Go Back to Log in</a>
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
