import React from 'react';
import CmdType from './CmdType';
import GlobalLogicHandler from './GlobalLogicHandler';
import App from 'FinVietEco/js/app';

export default class GlobalMessageHandler {

    constructor(props) {
        this.handler = new GlobalLogicHandler();
    }

    _onSocketOpen() { }
    _onSocketMessage(e) {
        try {
            let response = JSON.parse(e.data);
            if (response.cmdtype !== CmdType.ACK) { App.globalService._sendACK() }
            switch (response.cmdtype) {
                case CmdType.SETUP:
                    this.handler._onSetup(response)
                    break;
            }
        } catch (e) {
            _onMessageHanlderError(e)
        }
    }
    _onSocketError(e) { }
    _onSocketClose(e) { }
    _onMessageHanlderError(e) {
        console.log(`GlobalMessageHandler ---> client message handle error: ${e}`);
    }
}