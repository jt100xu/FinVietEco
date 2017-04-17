import React from 'react';
import GlobalMessageHandler from './GlobalMessageHandler'
import CmdType from './CmdType'

export default class GlobalService {

    constructor(props) {
        let url = 'wss://test.finviet.com.vn:3878';
        this.ws = new WebSocket(url);
        this.handler = new GlobalMessageHandler();
        this.ws.onopen = () => {
            console.log(`GlobalService ---> client connected to ${url}`);
            this.handler._onSocketOpen()
        };
        this.ws.onerror = (e) => {
            console.error(`GlobalService ---> client error: ${e}`);
            this.handler._onSocketError(e)
        };
        this.ws.onclose = (e) => {
            console.log(`GlobalService ---> client disconnect: ${e}`);
            this.handler._onSocketClose(e)
        };
    }

    _isConnected() {
        return this.ws.readyState === WebSocket.OPEN;
    }

    _send(message, callback) {
        if (message !== null) {
            let jsonString = JSON.stringify(message);
            console.log(`GlobalService ---> client send: ${jsonString}`);
            this.ws.send(jsonString)
            this.ws.onmessage = (e) => {
                console.log(`GlobalService ---> client receive: ${e.data}`);
                this.handler._onSocketMessage(e, callback)
            };
        } else {
            console.error(`GlobalService ---> client send null message`);
        }
    }

    _sendACK() {
        this._send({ cmdtype: CmdType.ACK });
    }

    _sendSetup(initiator, callback) {
        this._send({ cmdtype: CmdType.SETUP, initiator: initiator }, callback);
    }

    _sendOTPConfirm(initiator, otp, callback) {
        this._send({ cmdtype: CmdType.OTP_CONFIRM, initiator: initiator, otp: otp }, callback);
    }

    _sendTopup(initiator, token, amount, reqid, recipient, pin, callback) {
        this._send({ cmdtype: CmdType.TOPUP, initiator: initiator, token: token, amount: amount, reqid: reqid, recipient: recipient, pin: pin }, callback);
    }

    _sendTransfer(initiator, token, amount, reqid, to, pin, callback) {
        this._send({ cmdtype: CmdType.TRANSFER, initiator: initiator, token: token, amount: amount, reqid: reqid, "to": to }, callback);
    }

    _sendReqForMoney(initiator, token, amount, reqid, to, pin, callback) {
        this._send({ cmdtype: CmdType.REQ_FOR_MONEY, initiator: initiator, token: token, amount: amount, reqid: reqid, "to": to, pin: pin }, callback);
    }

    /**
     * 
     * @param {*} initiator 
     * @param {*} token 
     * @param {*} reqid 
     * @param {*} lastsync : dd/mm/yyyy
     */
    _sendSyncTrans(initiator, token, reqid, lastsync, callback) {
        this._send({ cmdtype: CmdType.SYNC_TRANS, initiator: initiator, token: token, reqid: reqid, lastsync: lastsync }, callback);
    }

    /**
     * 
     * @param {*} initiator 
     * @param {*} token 
     * @param {*} reqid 
     * @param {*} lastsync : dd/mm/yyyy
     */
    _sendSyncNoti(initiator, token, reqid, lastsync, callback) {
        this._send({ cmdtype: CmdType.SYNC_NOTI, initiator: initiator, token: token, reqid: reqid, lastsync: lastsync }, callback);
    }

    _sendPostPaid(initiator, token, amount, reqid, recipient, callback) {
        this._send({ cmdtype: CmdType.POST_PAID, initiator: initiator, token: token, amount: amount, reqid: reqid, recipient: recipient }, callback);
    }

    _sendInviteAgent(initiator, token, reqid, agent, callback) {
        // agent: {"reference":"0909090909","agent_type":"1","agent_label":"TĐL"}
        this._send({ cmdtype: CmdType.INVITE_AGENT, initiator: initiator, token: token, reqid: reqid, agent: agent }, callback);
    }

    _sendBuyCard(initiator, token, amount, reqid, card, callback) {
        //card: {"cardtype":"10000","providercode":"vte","quantity":"1"}
        this._send({ cmdtype: CmdType.BUY_CARD, initiator: initiator, token: token, amount: amount, reqid: reqid, "card": card }, callback);
    }

    _sendChangePass(initiator, token, reqid, pin, new_pin, callback) {
        this._send({ cmdtype: CmdType.CHANGE_PASS, initiator: initiator, token: token, reqid: reqid, pin: pin, "new_pin": new_pin }, callback);
    }

    _sendAgentInfo(callback) {
        this._send({ cmdtype: CmdType.AGENT_INFO, initiator: initiator, token: token, reqid: reqid }, callback);
    }

    _sendSubmitLoan(initiator, token, reqid, loan, callback) {
        //loan: {amount:"10000"}
        this._send({ cmdtype: CmdType.SUBMIT_LOAN, initiator: initiator, token: token, reqid: reqid, "loan": loan }, callback);
    }

    /**
     * 
     * @param {*} initiator 
     * @param {*} token 
     * @param {*} reqid 
     * @param {*} lastsync : dd/mm/yyyy
     */
    _sendSubAgent(initiator, token, reqid, lastsync, callback) {
        this._send({ cmdtype: CmdType.SUB_AGENT, initiator: initiator, token: token, reqid: reqid, lastsync: lastsync }, callback);
    }

    /**
     * 
     * @param {*} initiator 
     * @param {*} token 
     * @param {*} reqid 
     * @param {*} fromdate : ms
     * @param {*} todate : ms
     */
    _sendSubReport(initiator, token, reqid, fromdate, todate, callback) {
        this._send({ cmdtype: CmdType.SUB_REPORT, initiator: initiator, token: token, reqid: reqid, fromdate: fromdate, todate: todate }, callback);
    }

    _sendBuyLotto(initiator, token, reqid, amount, recipient, pin, lotto, callback) {
        // lotto: {"ticket":{"price":"10000","isauto":true,"lottoco":"HCM","code":"94","date":1491359858073,"letterid":"2","batchid":"2"}}
        this._send({ cmdtype: CmdType.BUY_LOTTO, initiator: initiator, token: token, reqid: reqid, amount: amount, recipient: recipient, pin: pin, lotto: lotto }, callback)
    }

    _sendLottoResult(initiator, token, reqid, lottery, callback) {
        //lottery {"lottoco":"LA","lottodate":1483117200000}
        this._send({ cmdtype: CmdType.LOTTO_RESULT, initiator: initiator, token: token, reqid: reqid, lottery: lottery }, callback)
    }

    _sendHello(initiator, token, reqid, callback) {
        this._send({ cmdtype: CmdType.HELLO, initiator: initiator, token: token, reqid: reqid }, callback)
    }

    _sendRegister(initiator, token, reqid, pin, agent, callback) {
        // agent: {"reference":"01668139700",pin:"123123"}
        this._send({ cmdtype: CmdType.HELLO, initiator: initiator, token: token, reqid: reqid, agent: agent }, callback)
    }
}