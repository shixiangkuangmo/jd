const axios = require('axios').default;

const sendNotify = require('./sendNotify.js');
let sendmsg = "京东CK通知：\n";
const ee = require("./editEnv")
const { getBaseCookie } = require("./baseCookie");
async function chekCk(ck) {
  let item = ck.split("@");
  try {
    cookie = `pt_key=${item[0]}; pt_pin=${item[1]};${getBaseCookie()}`;
    let result = await axios({
      "method": "get",
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": cookie,
        "User-Agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Referer": "https://h5.m.jd.com/"
      },
      "dataType": "json",
      "timeout": 5 * 1000
    })
    return {islogin:result.data.islogin,pin:item[1]};
  }
  catch (e) {
    return {islogin:e.message};
  }
}
async function autoCheck(ckname, title) {
  let ck = process.env[ckname];
  console.log(ck,ckname);
  if (!ck)
    return "空ck";
  let ckArr = ck.split("#");
  for (let i = 0; i < ckArr.length; i++) {
    let isValid = await chekCk(ckArr[i])
    console.log(isValid);
    if(isValid["islogin"] != '1'){
      let a = await ee.setEnvVar(ckname,ckArr[i],title);
      sendmsg += `用户 ${isValid["pin"]}，ck失效，请重新提交！\n`
    }else{
      sendmsg += `用户 ${isValid["pin"]}，ck有效！\n`
    }
  }
  if (sendmsg.length)
    sendNotify.sendNotify(title, sendmsg,'\n\n本通知 By：食翔狂魔', { PUSH_PLUS_TOKEN: "c1d90c1822f74a748b67480ca9b67c74", PUSH_PLUS_USER: "jd001" });
  return "ok";
}
autoCheck("jd_ck","京东通知")