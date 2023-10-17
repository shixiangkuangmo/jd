# 京东试用

使用方法：将jd文件夹整个下载后，上传到青龙即可

京东试用脚本完善版，增加了青龙支持、多用户支持、ck检测、日志记录、优化多请求等

目前自动申请手机、电脑相关商品

青龙环境变量名称：jd_ck

格式：pt_key@pt_pin

例如:pt_key=123,pt_pin=456

格式就是：123@456

多用户请用#分割，例如：123@456#789@1011

青龙创建两个任务：

1.

[![1.jpg](https://pic.ziyuan.wang/2023/10/17/guest_194bddcda2846_IP13.113.193.135_UPTIME1697509393.jpg)](https://pic.ziyuan.wang/2023/10/17/guest_194bddcda2846_IP13.113.193.135_UPTIME1697509393.jpg)



2.

[![1.jpg](https://pic.ziyuan.wang/2023/10/17/guest_319f47d8b9f27_IP13.113.193.135_UPTIME1697509464.jpg)](https://pic.ziyuan.wang/2023/10/17/guest_319f47d8b9f27_IP13.113.193.135_UPTIME1697509464.jpg)

2023-10-17 11：04：00

删除我的推送信息

推送变量：
1.push_token，为你的push_plus token
2.push_user, 为你的群组编码，不填只推送自己

新增过滤变量：
jd_filter,#号隔开
例如：手机卡#流量卡

2023-10-17 11：45：00
新增最每次运行大申请次数：
变量名：jd_try_maxlength,默认24次

2023-10-17 15：18：00
试用商品每次取最新的24(?)个

请重新下载

一键拉库：ql repo https://github.com/shixiangkuangmo/jd.git