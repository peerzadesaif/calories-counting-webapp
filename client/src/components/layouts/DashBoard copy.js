/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/actions/userActions';
import { Grid, Row, Column, } from 'carbon-components-react';
import cx from 'classnames';
import history from "../../store/history";

import {
    Content,
    Header,
    HeaderMenuButton,
    HeaderName,
    HeaderContainer,
    SkipToContent,
    SideNav,
    SideNavItems,
    SideNavLink,

} from 'carbon-components-react';
import AddMeals from '../views/AddMeals';
import MealsList from '../views/MealsList';
import EditMeals from '../views/EditMeals';

import { Fade16 } from '@carbon/icons-react';




const DashBoard = () => {
    const dispatch = useDispatch();

    const handleOnLogout = () => {
        console.log('Logout')
        dispatch(userActions.logout());
    }
    return (
        // <div>
        //     <Grid style={{ height: '100vh', paddingLeft: 0 }}>
        //         <Row style={{ height: '100vh', textAlign: 'center', padding: 100 }}>
        //             <Column lg={12} >
        //                 <h1>WELCOME TO DASHBOARD</h1>
        //                 <h4 onClick={handleOnLogout}>Log out</h4>
        //             </Column>
        //         </Row>
        //     </Grid>
        // </div>
        <React.Fragment>
            <HeaderContainer
                render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                    <React.Fragment>
                        <Header aria-label="Calories.io Platform Name">
                            <SkipToContent />
                            <HeaderMenuButton
                                aria-label="Open menu"
                                onClick={onClickSideNavExpand}
                                isActive={isSideNavExpanded}
                            />
                            <HeaderName href="#" prefix="Calories.io">
                                [Platform]
                            </HeaderName>
                            <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                                <SideNavItems>
                                    <SideNavLink
                                        aria-current={window.location.pathname === '/meal-list' ? 'page' : undefined}
                                        renderIcon={Fade16} onClick={() => history.push('/meal-list')}>
                                        Meals
                                    </SideNavLink>
                                    <SideNavLink
                                        aria-current={window.location.pathname === '/add-meal' ? 'page' : undefined}
                                        renderIcon={Fade16} onClick={() => history.push('/add-meal')}>
                                        Add Meals
                                    </SideNavLink>

                                    <SideNavLink
                                        renderIcon={Fade16} onClick={() => handleOnLogout()}>
                                        Log Out
                                    </SideNavLink>


                                </SideNavItems>
                            </SideNav>
                        </Header>
                        {/* <StoryContent /> */}
                        <Switch>
                            <Route exact path="/add-meal" component={AddMeals} />
                            <Route exact path="/meal-list" component={MealsList} />
                            <Route exact path="/update-meal/:_id" render={(props) => <EditMeals {...props} />} />

                            <Redirect from="*" to="/meal-list" />

                        </Switch>

                    </React.Fragment>
                )}
            />
        </React.Fragment>
    )
}

export default DashBoard
