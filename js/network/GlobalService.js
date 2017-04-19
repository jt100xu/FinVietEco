import React from 'react';
import GlobalMessageHandler from './GlobalMessageHandler'
import CmdType from './CmdType'
import App from 'FinVietEco/js/app';

export default class GlobalService {

    _send(message) {
        if (message !== null) {
            let jsonString = JSON.stringify(message);
            console.log(`GlobalService ---> client send: ${jsonString}`);
            try {
                App.socket.send(jsonString)
            } catch (e) {
                console.error(`GlobalService ---> client send fail`);
            }
        } else {
            console.error(`GlobalService ---> client send null message`);
        }
    }

    _sendACK() {
        this._send({ cmdtype: CmdType.ACK });
    }

    _sendSetup(initiator) {
        this._send({ cmdtype: CmdType.SETUP, initiator: initiator });
    }

    _sendOTPConfirm(initiator, otp) {
        this._send({ cmdtype: CmdType.OTP_CONFIRM, initiator: initiator, otp: otp });
    }

    _sendTopup(initiator, token, amount, reqid, recipient, pin) {
        this._send({ cmdtype: CmdType.TOPUP, initiator: initiator, token: token, amount: amount, reqid: reqid, recipient: recipient, pin: pin });
    }

    _sendTransfer(initiator, token, amount, reqid, to, pin) {
        this._send({ cmdtype: CmdType.TRANSFER, initiator: initiator, token: token, amount: amount, reqid: reqid, "to": to });
    }

    _sendReqForMoney(initiator, token, amount, reqid, to, pin) {
        this._send({ cmdtype: CmdType.REQ_FOR_MONEY, initiator: initiator, token: token, amount: amount, reqid: reqid, "to": to, pin: pin });
    }

    /**
     * 
     * @param {*} initiator 
     * @param {*} token 
     * @param {*} reqid 
     * @param {*} lastsync : dd/mm/yyyy
     */
    _sendSyncTrans(initiator, token, reqid, lastsync) {
        this._send({ cmdtype: CmdType.SYNC_TRANS, initiator: initiator, token: token, reqid: reqid, lastsync: lastsync });
    }

    /**
     * 
     * @param {*} initiator 
     * @param {*} token 
     * @param {*} reqid 
     * @param {*} lastsync : dd/mm/yyyy
     */
    _sendSyncNoti(initiator, token, reqid, lastsync) {
        this._send({ cmdtype: CmdType.SYNC_NOTI, initiator: initiator, token: token, reqid: reqid, lastsync: lastsync });
    }

    _sendPostPaid(initiator, token, amount, reqid, recipient) {
        this._send({ cmdtype: CmdType.POST_PAID, initiator: initiator, token: token, amount: amount, reqid: reqid, recipient: recipient });
    }

    _sendInviteAgent(initiator, token, reqid, agent) {
        // agent: {"reference":"0909090909","agent_type":"1","agent_label":"TĐL"}
        this._send({ cmdtype: CmdType.INVITE_AGENT, initiator: initiator, token: token, reqid: reqid, agent: agent });
    }

    _sendBuyCard(initiator, token, amount, reqid, card) {
        //card: {"cardtype":"10000","providercode":"vte","quantity":"1"}
        this._send({ cmdtype: CmdType.BUY_CARD, initiator: initiator, token: token, amount: amount, reqid: reqid, "card": card });
    }

    _sendChangePass(initiator, token, reqid, pin, new_pin) {
        this._send({ cmdtype: CmdType.CHANGE_PASS, initiator: initiator, token: token, reqid: reqid, pin: pin, "new_pin": new_pin });
    }

    _sendAgentInfo(initiator, token, reqid) {
        this._send({ cmdtype: CmdType.AGENT_INFO, initiator: initiator, token: token, reqid: reqid });
    }

    _sendSubmitLoan(initiator, token, reqid, loan) {
        //loan: {amount:"10000"}
        this._send({ cmdtype: CmdType.SUBMIT_LOAN, initiator: initiator, token: token, reqid: reqid, "loan": loan });
    }

    /**
     * 
     * @param {*} initiator 
     * @param {*} token 
     * @param {*} reqid 
     * @param {*} lastsync : dd/mm/yyyy
     */
    _sendSubAgent(initiator, token, reqid, lastsync) {
        this._send({ cmdtype: CmdType.SUB_AGENT, initiator: initiator, token: token, reqid: reqid, lastsync: lastsync });
    }

    /**
     * 
     * @param {*} initiator 
     * @param {*} token 
     * @param {*} reqid 
     * @param {*} fromdate : ms
     * @param {*} todate : ms
     */
    _sendSubReport(initiator, token, reqid, fromdate, todate) {
        this._send({ cmdtype: CmdType.SUB_REPORT, initiator: initiator, token: token, reqid: reqid, fromdate: fromdate, todate: todate });
    }

    _sendBuyLotto(initiator, token, reqid, amount, recipient, pin, lotto) {
        // lotto: {"ticket":{"price":"10000","isauto":true,"lottoco":"HCM","code":"94","date":1491359858073,"letterid":"2","batchid":"2"}}
        this._send({ cmdtype: CmdType.BUY_LOTTO, initiator: initiator, token: token, reqid: reqid, amount: amount, recipient: recipient, pin: pin, lotto: lotto })
    }

    _sendLottoResult(initiator, token, reqid, lottery) {
        //lottery {"lottoco":"LA","lottodate":1483117200000}
        this._send({ cmdtype: CmdType.LOTTO_RESULT, initiator: initiator, token: token, reqid: reqid, lottery: lottery })
    }

    _sendHello(initiator, token, reqid) {
        this._send({ cmdtype: CmdType.HELLO, initiator: initiator, token: token, reqid: reqid })
    }

    _sendRegister(initiator, token, reqid, pin, agent) {
        // agent: {"reference":"01668139700",pin:"123123"}
        this._send({ cmdtype: CmdType.HELLO, initiator: initiator, token: token, reqid: reqid, agent: agent })
    }

    _getDownloadUrl(initiator, token, filename) {
        return 'http://app.finviet.com.vn:3000/download?initiator=' + initiator + '&token=' + token + '&filename=' + filename;
    }
}
GlobalService.SERVER = 'ws://app.finviet.com.vn:3979';