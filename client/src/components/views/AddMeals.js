/* eslint-disable */

import React, { Component, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import history from "../../store/history";
import * as userActions from '../../store/actions/userActions';
import * as alertActions from '../../store/actions/alertActions';

import cx from 'classnames';
import { Content } from 'carbon-components-react';
import { Grid, Row, Column } from 'carbon-components-react';
import { Button, FluidForm, TextInput, DatePicker, DatePickerInput } from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';

const AddMeals = () => {
    const [inputs, setInputs] = useState({
        meal_text: '',
        calories: '',
        date: '',
        password: '',
    });

    const LoggedUser = useSelector(state => state);

    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const { meal_text, calories, date, password, } = inputs;

    // reset login status
    useEffect(() => {
        // dispatch(userActions.logout());
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('name.value', name.value)
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };
    const handleDateChange = (e) => {
        const [date] = e;
        setInputs(inputs => ({ ...inputs, date }));
    };
    const onhandleFocus = (e) => {
        dispatch(alertActions.hideToast())
    }

    const handleSubmit = (e) => {
        console.log('e', e)
        e.preventDefault();
        setSubmitted(true);
        if (meal_text && calories && date) {
            dispatch(userActions.addMeals(inputs));
            if (LoggedUser.UsersReducers && LoggedUser.UsersReducers.mealsOnAddSuccess) {
                history.push('/meal-list')
                setSubmitted(false);
                setInputs(inputs => ({
                    ...inputs,
                    meal_text: '',
                    calories: '',
                    date: '',
                }));
            }
        }
    }
    const inputProps = {
        FirstNameInputProps: ({ name, _name, placeholder, defaultValue }) => ({
            className: `${name.replace(/\s/g, '-').toLowerCase()}-class`,
            id: `${name.replace(/\s/g, '-').toLowerCase()}-input`,
            // defaultValue: '',
            labelText: `${name}`,
            name: `${_name.replace(/\s/g, '_').toLowerCase()}`,
            placeholder,
            light: false,
            disabled: false,
            hideLabel: false,
            invalid: false,
            invalidText: `Please enter valid ${name.toLowerCase()}`,
            // warn: false,
            // warnText: 'Warning state text (warnText) This will overwrite your current settings',
            // helperText: 'Optional help text',
            // inline: false,
            onFocus: (e) => {
                setSubmitted(false);
                // onhandleFocus()
            },
            // onClick: () => { },
            onChange: handleChange,
        }),
    };
    const buttonEvents = {
        className: 'submit-class',
        onClick: handleSubmit,
    };

    const style = {
        height: '100%',
        padding: '4rem'
    };
    style.margin = '0';
    style.width = '100%';
    const classNameFirstColumn = cx({
        'bx--col-lg-13': true,
        'bx--offset-lg-2': true,
    });
    return (
        <Content id="main-content" style={style}>
            <div className="bx--grid">
                <div className="bx--row">
                    <div className={classNameFirstColumn}>
                        <h2 style={{ margin: '0 0 30px' }}>Add Meal and Calories</h2>
                        <Grid >
                            <Row>
                                <Column lg={12} style={{ marginTop: 8, marginBottom: 8 }}>
                                    <FluidForm>
                                        <TextInput
                                            type='text'
                                            {...inputProps.FirstNameInputProps({
                                                name: 'Text',
                                                _name: 'meal_text',
                                                placeholder: 'Enter Text',
                                            })}
                                            value={meal_text || ''}
                                            invalid={submitted && !meal_text}
                                        />
                                    </FluidForm>
                                </Column>
                                <Column lg={12} style={{ marginTop: 8, marginBottom: 8 }}>
                                    <FluidForm>
                                        <TextInput
                                            type='number'
                                            {...inputProps.FirstNameInputProps({
                                                name: 'Calories',
                                                _name: 'Calories',
                                                placeholder: 'Enter Calories',

                                            })}
                                            value={calories || ''}
                                            invalid={submitted && !calories}

                                        />
                                    </FluidForm>
                                </Column>

                                <Column lg={12} style={{ marginTop: 8, marginBottom: 8 }}>
                                    <FluidForm>
                                        {/* <TextInput
                                            type='text'
                                            {...inputProps.FirstNameInputProps({
                                                name: 'date',
                                                _name: 'date',
                                                placeholder: 'john.doe@example.com',
                                            })}
                                            value={date || ''}
                                            invalid={submitted && !date}

                                        /> */}
                                        <DatePicker datePickerType="single"
                                            onChange={handleDateChange}>
                                            <DatePickerInput
                                                name='date'
                                                placeholder="mm/dd/yyyy"
                                                labelText=""
                                                id="date-picker-single"
                                                invalid={submitted && !date}

                                            />
                                        </DatePicker>
                                    </FluidForm>
                                </Column>
                                <Column lg={12} style={{ marginTop: 8, marginBottom: 8 }}>
                                    <Button style={{ maxWidth: '100%', width: '100%', minHeight: '4rem' }} type="submit" className="some-class" {...buttonEvents}
                                        renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                        Submit
                                            </Button>
                                </Column>

                                {/* <Column lg={6} style={{ marginTop: 8, marginBottom: 8 }}>
                                    <FluidForm>
                                        <TextInput.PasswordInput
                                            {...inputProps.FirstNameInputProps({
                                                name: 'Password',
                                                _name: 'Password',
                                                placeholder: '******'
                                            })}
                                            {...inputProps.PasswordInputProps()}
                                            value={password || ''}
                                            invalid={submitted && !password}
                                        />
                                    </FluidForm>
                                </Column> */}
                            </Row>
                        </Grid>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default AddMeals
