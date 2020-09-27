/* eslint-disable */

import React, { Component, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';

import history from "../../store/history";
import * as userActions from '../../store/actions/userActions';
import * as alertActions from '../../store/actions/alertActions';

import cx from 'classnames';
import { Content } from 'carbon-components-react';
import { Grid, Row, Column } from 'carbon-components-react';
import { Button, FluidForm, TextInput, DatePicker, DatePickerInput } from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';


import UserServices from '../../apiServices/UserServices';

const EditMeals = (props) => {
    const [inputs, setInputs] = useState({
        meal_text: '',
        calories: '',
        date: '',
    });

    const LoggedUser = useSelector(state => state);

    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const { meal_text, calories, date, } = inputs;

    // reset login status
    useEffect(() => {
        console.log('object')
        getMeals()
    }, []);
    const getMeals = async () => {
        // console.log('props.match.params.id', props.match.params._id)
        try {
            const { data } = await UserServices.GetSingleMeals({ _id: props.match.params._id });
            console.log('data', data)
            if (data && data.status) {
                console.log('object', moment(data.data.date).format('MM/DD/YYYY'),)
                setInputs(inputs => ({
                    ...inputs,
                    meal_text: data.data.mealText,
                    calories: data.data.calories,
                    // mm/dd/yyyy
                    date: moment(data.data.date).format('MM/DD/YYYY'),
                }));
            } else {
                dispatch(alertActions.showToast({
                    status: true,
                    title: data.message,
                    kind: 'error'
                }));
            }
        } catch (error) {
            dispatch(alertActions.showToast({
                status: true,
                title: 'Something Went Wrong',
                kind: 'error'
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };
    const handleDateChange = (e) => {
        const [date] = e;
        setInputs(inputs => ({ ...inputs, date: moment(date).format('MM/DD/YYYY'), }));
    };
    const onhandleFocus = (e) => {
        dispatch(alertActions.hideToast())
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (meal_text && calories && date) {
            try {
                const { data } = await UserServices.UpdateSingleMeals({ ...inputs, _id: props.match.params._id });
                if (data && data.status) {
                    setSubmitted(false);
                    setInputs(inputs => ({
                        ...inputs,
                        meal_text: '',
                        calories: '',
                        date: '',
                    }));
                    history.push('/meal-list')
                } else {
                    // dispatch(alertActions.showToast({
                    //     status: true,
                    //     title: data.message,
                    //     kind: 'error'
                    // }));
                }
            } catch (error) {
                // dispatch(alertActions.showToast({
                //     status: true,
                //     title: 'Something Went Wrong',
                //     kind: 'error'
                // }));
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
                        <h2 style={{ margin: '0 0 30px' }}>Update Meal and Calories</h2>
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
                                                name: 'calories',
                                                _name: 'calories',
                                                placeholder: 'Enter Calories',

                                            })}
                                            value={calories || ''}
                                            invalid={submitted && !calories}

                                        />
                                    </FluidForm>
                                </Column>

                                <Column lg={12} style={{ marginTop: 8, marginBottom: 8 }}>
                                    <FluidForm>
                                        <DatePicker datePickerType="single"
                                            onChange={handleDateChange}>
                                            <DatePickerInput
                                                name='date'
                                                placeholder="mm/dd/yyyy"
                                                labelText=""
                                                id="date-picker-single"
                                                invalid={submitted && !date}
                                                value={date || ''}
                                            />
                                        </DatePicker>
                                    </FluidForm>
                                </Column>
                                <Column lg={12} style={{ marginTop: 8, marginBottom: 8 }}>
                                    <Button style={{ maxWidth: '100%', width: '100%', minHeight: '4rem' }} type="submit" className="some-class" {...buttonEvents}
                                        renderIcon={ArrowRight32} iconDescription="ArrowRight">
                                        Update
                                            </Button>
                                </Column>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default EditMeals
