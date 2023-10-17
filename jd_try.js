/**
 * 京东试用， 只是一个DEMO
 */
const sendNotify = require('./sendNotify.js');
const axios = require("axios");
const querystring = require("querystring");
const { h5st } = require("./h5st3.1"); // 好像不是强校验
const { jsToken } = require("./jsToken"); // 原先扒的，好像不是不校验
const { table } = require("table");
const CryptoJS = require("crypto-js");
const { getBaseCookie } = require("./baseCookie"); // 不生成基础Cookie请求会直接暴毙
const { log } = require("console");
let tabData = [];
let bhArr = [];
let logObj = {};
let activeData = [];
let pt_key = "";
let pt_pin = "";
let cookie = `pt_key=${pt_key}; pt_pin=${pt_pin};${getBaseCookie()}`,
  uuid = "0326636623568363-6366565616634613",
  area = "15_1158_46343_59377",
  userAgent = "",
  baseUrl = "https://api.m.jd.com/client.action",
  baseHeaders = {
    Cookie: cookie,
    Origin: "https://prodev.m.jd.com",
    Referer: "https://prodev.m.jd.com/mall/active/3C751WNneAUaZ8Lw8xYN7cbSE8gm/index.html?ids=501188849%2C501197994&tttparams=gH3GMeyJhZGRyZXNzSWQiOjI3NDc0NTQ0MzksImRMYXQiOjAsImRMbmciOjAsImdMYXQiOiIyOS44MDY0NzQiLCJnTG5nIjoiMTIxLjU0MDQ3IiwiZ3BzX2FyZWEiOiIwXzBfMF8wIiwibGF0IjowLCJsbmciOjAsIm1vZGVsIjoiU00tRzk5ODAiLCJwb3NMYXQiOiIyOS44MDY0NzQiLCJwb3NMbmciOiIxMjEuNTQwNDciLCJwcnN0YXRlIjoiMCIsInVlbXBzIjoiMC0wLTIiLCJ1bl9hcmVhIjoiMTVfMTE1OF80NjM0M181OTM3Ny5J9&preventPV=1&forceCurrentView=1;",
    "User-Agent": userAgent,
  };

/**
 * 获取试用TAB页信息
 */
async function getTryTabs() {
  try {
    const { status, data } = await axios({
      url: baseUrl,
      method: "POST",
      headers: baseHeaders,
      data: querystring.stringify({
        ext: '{"prstate": 0}',
        appid: "newtry",
        functionId: "try_TabSpecTabs",
        uuid: uuid,
        clientVersion: "12.1.0",
        client: "wh5",
        osVersion: "13",
        area: area,
        networkType: "UNKNOWN",
        body: '{"tabIds":[212,221,222,223,229,225,224,226,234,227,228],"version":2,"previewTime":""}',
      }),
    });

    if (status === 200 && data && data.data && data.data.tabList) {
      // console.log("获取试用TAB页信息正常");
      // printTable(data.data.tabList, {
      //   tabId: "试用类型ID",
      //   tabName: "试用类型名称",
      // });
      tabData = data.data.tabList;
    } else {
      console.log("获取试用TAB页信息失败");
    }
  }
  catch (e) {
    console.log(e, 123);
  }
}

/**
 * 获取试用列表
 * @param {*} tabId 试用类型ID
 */
async function getNewTryList(tabId) {
  try {
    var requestBody = {
      functionId: "try_SpecFeedList",
      body: `{"tabId":"${tabId}","page":2,"version":2,"source":"default","client":"app"}`,
      appid: "newtry",
      area: area,
      uuid: uuid,
    };
    var h5stResult = h5st(requestBody);
    var jsTokenResult = await jsToken();

    if (h5stResult && h5stResult.h5st && jsTokenResult && jsTokenResult.token) {
      console.log("获取参数成功");
      const { status, data } = await axios({
        url: baseUrl,
        method: "POST",
        headers: baseHeaders,
        data: querystring.stringify(
          Object.assign(requestBody, {
            h5st: h5stResult.h5st,
            "x-api-eid-token": jsTokenResult.token,
          })
        ),
      });

      if (status === 200 && data && data.data && data.data.feedList) {
        // console.log("获取试用列表信息正常");
        // printTable(data.data.feedList, {
        //   trialActivityId: "试用活动ID",
        //   brandName: "品牌",
        //   sku: "商品ID",
        //   skuImg: "商品图片",
        //   skuTitle: "商品名称",
        //   trialPrice: "试用价格",
        //   jdPrice: "原始价格",
        //   applyNum: "已申请人数",
        //   supplyNum: "提供数量",
        // });
        for(let i=0;i<data.data.feedList.length;i++){
          let item = data.data.feedList[i];
          if(item["skuTitle"].indexOf("流量卡")>-1 || item["skuTitle"].indexOf("手机卡")>-1){
            continue;
          }else{
            activeData.push(item);
          }
        }
      } else {
        console.log("获取试用列表信息失败");
      }
    } else {
      console.log("获取参数失败");
    }
  }
  catch (e) {
    console.log(e, 456);
  }
}

async function tryApply(u, item, bh,a,b) {
  console.log(`第${b}个用户，第${a}个商品开始申请！`);
  try {
    var requestBody = {
      functionId: "try_apply",
      body: `{"activityId":${item.trialActivityId.toString()}}`,
      appid: "newtry",
      area: area,
      uuid: uuid,
    };
    var h5stResult = h5st(requestBody);
    var jsTokenResult = await jsToken();

    if (h5stResult && h5stResult.h5st && jsTokenResult && jsTokenResult.token) {
      console.log("获取参数成功");
      const joylog = CryptoJS.MD5(`{"activityId":${item.trialActivityId.toString()}}`, "newtryundefinedundefinedtry_applyundefined").toString().concat("*").concat(undefined); // 一个简易的，不通用的log

      console.log(joylog);
      const { status, data } = await axios({
        url: baseUrl,
        method: "POST",
        headers: bh,
        data: querystring.stringify(
          Object.assign(requestBody, {
            h5st: h5stResult.h5st,
            "x-api-eid-token": jsTokenResult.token,
            joylog: joylog,
          })
        ),
      });
      if (status === 200 && data) {
        logObj[u] ? logObj[u].push(`${item.skuTitle} ${data.message}`) : logObj[u] = [`${item.skuTitle} ${data.message}`];
      } else {
        console.log("请求出错");
        logObj[u] ? logObj[u].push(`${item.skuTitle} 请求出错`) : logObj[u] = [`${item.skuTitle} 请求出错`];
      }
    } else {
      logObj[u] ? logObj[u].push(`${item.skuTitle} 获取参数失败`) : logObj[u] = [`${item.skuTitle} 获取参数失败`];
      console.log("获取参数失败");
    }
  }
  catch (e) {
    logObj[u] ? logObj[u].push(`${item.skuTitle} ${e.response.status}`) : logObj[u] = [`${item.skuTitle} ${e.response.status}`]
  }
}

function generateTable(data, options) {
  if (options) {
    // 如果提供了第二个参数
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
      // 数据是包含对象的数组
      const columnNames = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))));

      // 转换名称
      const formatColumnsNames = columnNames.map((columnName) => options[columnName]);

      const tableData = [formatColumnsNames];

      data.forEach((obj) => {
        const rowData = columnNames.map((column) => obj[column] || "");
        tableData.push(rowData);
      });

      // 过滤掉不需要打印的列
      const filteredColumnNames = columnNames.filter((column) => options[column] !== undefined);
      const filteredData = tableData.map((row) => {
        return row.filter((_, index) => filteredColumnNames.includes(columnNames[index]));
      });

      const config = {
        columns: {},
      };

      filteredColumnNames.forEach((columnName, index) => {
        const columnWidth = Math.max(...filteredData.map((row) => row[index].toString().length));
        config.columns[index] = { width: columnWidth + 2 }; // +2 for padding
      });

      return table(filteredData, config);
    } else if (Array.isArray(data)) {
      // 数据是纯数组
      const count = options.count || data.length; // 默认为数据的长度
      const tableData = data.slice(0, count).map((item) => [item.toString()]);

      const config = {
        columns: {
          0: { alignment: "left", width: 20 },
        },
      };

      return table(tableData, config);
    }
  } else {
    // 检查数据类型
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
      // 数据是包含对象的数组
      const columnNames = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))));
      const tableData = [columnNames];
      data.forEach((obj) => {
        const rowData = columnNames.map((column) => obj[column] || "");
        tableData.push(rowData);
      });

      const config = {
        columns: {},
      };

      columnNames.forEach((columnName, index) => {
        const columnWidth = Math.max(...tableData.map((row) => row[index].toString().length));
        config.columns[index] = { width: columnWidth + 2 }; // +2 for padding
      });

      return table(tableData, config);
    } else if (Array.isArray(data)) {
      // 数据是纯数组
      const tableData = data.map((item) => [item.toString()]);

      const config = {
        columns: {
          0: { alignment: "left", width: 20 },
        },
      };

      return table(tableData, config);
    } else {
      return "Unsupported data format";
    }
  }
}

/**
 * 用表格的方式打印 Array 数据
 *
 * @param {*} data 将要打印的 Array 数据
 * @param {*} options 字段映射
 */
function printTable(data, options) {
  console.log(generateTable(data, options));
}
function watchLogs(v, n) {
  let sum = 0;
  let values = Object.values(v);
  for (let i = 0; i < values.length; i++) {
    sum += values[i].length;
  }
  if (sum != n) {
    setTimeout(() => {
      watchLogs(logObj, n);
    }, 1000)
  } else {
    console.log(logObj);
    let keys = Object.keys(logObj);
    let str = "京东试用通知：\n";
    for (let i = 0; i < keys.length; i++) {
      str += "用户：" + keys[i] + "：\n";
      str += logObj[keys[i]].join("，\n") + "\n\n";
    }
    let len = Math.round(str.length / 800);
    for (let j = 0; j < len; j++) {
      setTimeout(() => {
        sendNotify.sendNotify("京东试用:", str.slice(j * 8000, (j + 1) * 8000), '\n\n本通知 By：食翔狂魔', { PUSH_PLUS_TOKEN: process.env["push_token"] || "", PUSH_PLUS_USER: process.env["push_user"] || "" });
      }, j * 4000)
    }
  }
}
async function main() {
  try {
    //await getTryTabs();
    // for (let i = 0; i < tabData.length; i++) {
    //   await getNewTryList(tabData[i]["tabId"]);
    // }
    await getNewTryList("221");//手机
    await getNewTryList("222");//电脑
    /*
    trialActivityId: 活动id,
    trialPrice: 试用价格,
    jdPrice: 原始价格,
    supplyNum: 提供数量,
    applyNum: 已申请人数,
    skuTitle:物品名称
    */
    console.log(`共获取到${activeData.length}个商品！`);
    let strusers = process.env["jd_ck"] || "";
    let users = strusers.split("#");
    if (users.length == 1 && users[0] == "") {
      print("无用户");
      return;
    }
    let time = 0;
    for (let j = 0; j < users.length; j++) {
      let item = users[j].split("@");
      cookie = `pt_key=${item[0]}; pt_pin=${item[1]};${getBaseCookie()}`;
      baseHeaders["Cookie"] = cookie;
      bhArr[j] = baseHeaders;
      for (let i = 0; i < activeData.length; i++) {
        time = time + 10; 
        (function (a,time,b) {
          setTimeout(function () {
            tryApply(users[b].split("@")[1], activeData[a], bhArr[b],a,b);
          }, time*1000);
        }(i,time,j));
      }
    }
    watchLogs(logObj, users.length * activeData.length);
  } catch (e) {
    console.log(e, 123);
  }
}

main();
