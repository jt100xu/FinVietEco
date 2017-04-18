import React from 'react';
import CmdType from './CmdType';
import App from 'FinVietEco/js/app';
import EventBus from 'FinVietEco/js/EventBus';

export default class GlobalMessageHandler {
    constructor(props) {
        this.eventbus = new EventBus()
    }

    _onSocketOpen() { 
        console.log(`GlobalMessageHandler ---> fire event handler for socket opened`);
        this.eventbus._fire('onSocketOpen')
    }

    _onSocketMessage(data) {
        try {
            let response = JSON.parse(data);
            if (response.cmdtype !== CmdType.ACK) {
                App.globalService._sendACK()
                console.log(`GlobalMessageHandler ---> fire event handler for cmdtype:${response.cmdtype}`);
                this.eventbus._fire(`${response.cmdtype}`, response)
            }
        } catch (e) {
            console.error(`GlobalMessageHandler ---> client message handle error: ${e}`);            
        }
    }

    _onSocketError(e) { 
        console.error(`GlobalMessageHandler ---> fire event handler for socket error: ${e}`);
        this.eventbus._fire('onSocketError', e)
    }

    _onSocketClose(e) { 
        console.log(`GlobalMessageHandler ---> fire event handler for socket close: ${e}`);
        this.eventbus._fire('onSocketClose', e)
    }
    
    _getEventBus() {
        return this.eventbus;
    }
}