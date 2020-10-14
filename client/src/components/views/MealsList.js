/* eslint-disable */
import React, { Component, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as alertActions from '../../store/actions/alertActions';
import history from "../../store/history";

import cx from 'classnames';
import { RadioButton, Content, OverflowMenuItem, OverflowMenu } from 'carbon-components-react';
import {
    default as DataTable,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableToolbar,
    TableToolbarAction,
    TableToolbarContent,
    TableToolbarSearch,
    TableToolbarMenu,
} from 'carbon-components-react';

import UserServices from '../../apiServices/UserServices';





const MealsList = () => {

    const [rows, setRows] = useState([]);

    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        // dispatch(userActions.logout());
        getMeals()
    }, []);

    const getMeals = async () => {
        try {
            const { data } = await UserServices.GetAllMeals();
            if (data && data.status) {
                setRows(data.data || [])
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
    }

    const deleteMeals = async (_id) => {
        try {
            const { data } = await UserServices.DeleteSingleMeals({ _id });
            console.log('data', data)
            if (data && data.status) {
                getMeals()
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
    }

    // const rows = [
    //     {
    //         id: 'a',
    //         name: 'Load Balancer 3',
    //         protocol: 'HTTP',
    //         port: 3000,
    //         rule: 'Round robin',
    //         attached_groups: 'Kevin’s VM Groups',
    //         status: 'Disabled',
    //         enabled: true,
    //     },
    // ];
    const headers = [
        {
            key: 'Status',
            header: 'Status',
        },
        {
            key: 'mealText',
            header: 'Meal Text',
        },
        {
            key: 'calories',
            header: 'Calories',
        },
        {
            key: 'date',
            header: 'Date',
        },
        {
            key: 'action',
            header: 'Action',
        },
    ];
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
                        <h2 style={{ margin: '0 0 30px' }}>Meals List</h2>
                        <Table style={{ width: '75em' }}>
                            <TableHead>
                                <TableRow>
                                    {headers.map((header) => (
                                        <TableHeader key={header.key}>{header.header}</TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell className="bx--table-column-menu">
                                            <RadioButton checked value={`standard`} id={`radio-${row._id}`}
                                                className={row.calories > 2000 ? 'custom-radio-red' : 'custom-radio-green'}
                                                labelText="" />
                                        </TableCell>

                                        {Object.keys(row)
                                            .filter((key) => key !== 'owner' && key !== '_id' && key !== '__v' && key !== 'updated_at' && key !== 'created_at')
                                            .map((key) => {
                                                return <TableCell key={key}>{row[key]}</TableCell>;
                                            })}
                                        <TableCell className="bx--table-column-menu">
                                            <OverflowMenu flipped>
                                                <OverflowMenuItem itemText="Delete" onClick={() => deleteMeals(row._id)}>Delete</OverflowMenuItem>
                                                <OverflowMenuItem itemText="Edit" onClick={() => history.push(`/update-meal/${row._id}`)} >Edit</OverflowMenuItem>
                                            </OverflowMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </div>
        </Content>
    )
}

export default MealsList
