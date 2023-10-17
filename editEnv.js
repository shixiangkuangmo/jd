const axios = require("axios")
//修改环境变量的方法，参数1：环境变量名；参数2：环境变量的新值
async function setEnvVar(envName, ck, title = "") {
  let msg = "";
  let token = "";
  try {
    let resdata = await axios.post('http://ip:端口/api/user/login', {
      "username": "xxx",
      "password": "xxx"
    });
    if (resdata.data.code == 200) {
      token = resdata.data.data.token;
      let ckinfo = await axios.get("http://ip:端口/api/envs?searchValue=" + envName, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      if (ckinfo.data.code == 200) {
        let data = ckinfo.data.data[0];
        let arr = data.value.split("#");
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == ck) {
            arr.splice(i, 1);
            break;
          }
        }
        let obj = {
          id: data.id,
          name: envName,
          remarks: data.remarks,
          value: arr.join("#")
        }

        let res = await axios.put("http://ip:端口/api/envs", obj, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        msg = "ck失效" + title + "，pt_pin: " + ck.split("@")[1] + ", 请重新提交。";
      } else {
        msg = "登录失败";
      }

    } else {
      msg = resdata.data.message;
    }
  }
  catch (e) {
    msg = "删除ck报错";
  }
  console.log(msg, 132456)
  return msg;
}
exports.setEnvVar = setEnvVar;
