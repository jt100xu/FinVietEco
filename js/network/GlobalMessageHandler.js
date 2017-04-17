import React from 'react';
import CmdType from './CmdType';
import App from 'FinVietEco/js/app';

export default class GlobalMessageHandler {

    constructor(props) {
    }

    _onSocketOpen() { }
    _onSocketMessage(e, callback) {
        try {
            let response = JSON.parse(e.data);
            if (response.cmdtype !== CmdType.ACK) {
                App.globalService._sendACK()
                if (typeof callback === 'function') callback(response)
            }
        } catch (e) {
            this._onMessageHanlderError(e)
            if (typeof callback === 'function') callback(null, e)
        }
    }
    _onSocketError(e) { }
    _onSocketClose(e) { }
    _onMessageHanlderError(e) {
        console.log(`GlobalMessageHandler ---> client message handle error: ${e}`);
    }
}