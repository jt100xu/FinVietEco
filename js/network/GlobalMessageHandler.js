import CmdType from './CmdType';
import { GLOBALSERVICE } from 'FinVietEco/js/network/GlobalService';
import EventBus from 'eventbusjs';

export default class GlobalMessageHandler {

    _onSocketOpen() {
        console.log(`GlobalMessageHandler ---> fire event handler for socket opened`);
        EventBus.dispatch('onSocketOpen')
    }

    _onSocketMessage(data) {
        try {
            let response = JSON.parse(data);
            if (response.cmdtype !== CmdType.ACK) {
                GLOBALSERVICE._sendACK()
                console.log(`GlobalMessageHandler ---> fire event handler for cmdtype:${response.cmdtype}`);
                EventBus.dispatch(`${response.cmdtype}`, this, response)
            }
        } catch (e) {
            console.error(`GlobalMessageHandler ---> client message handle error: ${e}`);
        }
    }

    _onSocketError(e) {
        console.error(`GlobalMessageHandler ---> fire event handler for socket error: ${e}`);
        EventBus.dispatch('onSocketError', this, e)
    }

    _onSocketClose(e) {
        console.log(`GlobalMessageHandler ---> fire event handler for socket close: ${e}`);
        EventBus.dispatch('onSocketClose', this, e)
    }
}