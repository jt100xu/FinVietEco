import React from 'react';
import { NavigationActions, Navigator } from 'react-navigation'

export default class GlobalLogicHandler {

    constructor(props) {
    }

    _onSetup(response) {
        switch (response.result) {
            case 3:
                //agent not found
                alert(response.message)
                break;
            case 20002:
                //agent invited
                break;
        }
    }
}