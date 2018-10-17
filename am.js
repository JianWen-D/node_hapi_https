/**
 * GRS interaction abstraction
 */

const axios = require("axios");
// const {services: { am }} = require("config");
const md5 = require("md5");

class AMService {
  constructor() {
    // this.baseUrl = am.url;
    // this.appId = am.app_id;
  }

  /**
   * Fetch consumer details from GRS
   * @param {String} id
   * @returns {Promise}
   */
  getConsumer() {
    const am = {
      apiKey: 'f6aiYZBbf51ca2974c4748878fb6740fe19757',
      apiSecret: '02906d781fc7f6054d25ee14be0c86d8'
    }
    const nowTime = new Date().getTime()
    const orgData = `apiKey=${am.apiKey}&data={memberId=110000005376&tenantId=10002}&timestamp=${nowTime}${am.apiSecret}`;
    console.log('sig加密前')
    console.log(orgData)
    console.log('sig加密后')
    console.log(md5(orgData))
    const pathStr = {
      "sig": md5(orgData),
      "apiKey": am.apiKey,
      "data": {"tenantId":"10002","memberId":"110000005376"},
      "timestamp": nowTime
    };
    console.log('请求体')
    console.log(pathStr)
    console.log('结果')
    // return this._request('get', `/rest/app/${ this.appId }/consumer/${ id }`);
    // return this._request('post', `/AM/user/OLAY/WECHAT/queryMember`);
    // var data = {"userId": id}
    // var data = { "bindId": id, "bindType": type };
    return this._request("post", "https://testgateway.shenghuojia.com:5443/mediator/serviceInvoke/am.account.queryProfile", pathStr);
  }
  //http://10.101.99.31:8080/AM/user/OLAY/WECHAT/queryMember

  async _request(method, path, body) {
    const options = {
      method,
      json: true,
      url: `${path}`,
      data: {}
    };

    if (method !== "get" && body) {
      options.data = body;
    }

    return (await axios(options)).data;
  }
}

module.exports = new AMService();
