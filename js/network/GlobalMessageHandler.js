import React from 'react';
import CmdType from './CmdType';
import GlobalLogicHandler from './GlobalLogicHandler';

export default class GlobalMessageHandler {

    constructor(props) {
        super(props)

        var handler = new GlobalLogicHandler();
    }

    _onOpen() { }
    _onMessage(e) {
        try {
            let response = e.json()
            switch (response.cmdType) {
            }
        } catch (e) {
            console.error(`GlobalMessageHandler ---> client error: ${e}`);
        }
    }
    _onError(e) { }
    _onClose(e) { }
}