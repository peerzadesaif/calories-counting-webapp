/* eslint-disable */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/actions/userActions';
import { Grid, Row, Column } from 'carbon-components-react';

const DashBoard = () => {
    const dispatch = useDispatch();

    const handleOnLogout = () => {
        dispatch(userActions.logout());
    }
    return (
        <div>
            <Grid style={{ height: '100vh', paddingLeft: 0 }}>
                <Row style={{ height: '100vh', textAlign: 'center', padding: 100 }}>
                    <Column lg={12} >
                        <h1>WELCOME TO DASHBOARD</h1>
                        <h4 onClick={handleOnLogout}>Log out</h4>
                    </Column>
                </Row>
            </Grid>
        </div>
    )
}

export default DashBoard
