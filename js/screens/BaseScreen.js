import React from 'react';
import App from 'FinVietEco/js/app';
import LAF from 'FinVietEco/js/LAF';
import { NavigationActions } from 'react-navigation';

export default class BaseScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    _navigateToTop(routeName, params) {
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName, params })]
        })
        this.props.navigation.dispatch(actionToDispatch)
    }

    _navigateTo(routeName, params) {
        this.props.navigation.navigate(routeName, params)
    }
}