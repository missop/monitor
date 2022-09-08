# `broswer`

> TODO: description

## Usage

```
const broswer = require('broswer');

// TODO: DEMONSTRATE API
```

## sdk如何使用
业界有几种方式：
1. 直接引入 例如友盟
    <script async type="text/javascript" src="https://v1.cnzz.com/z_stat.php?id=1278052687&web_id=1278052687"></script>
2. script脚本  ✅    考虑到缩小项目接入成本，我们先支持这种自动上报的方式     这一块嵌入脚本是在后台进行生成的
pid：项目Id
<script>
    !(function(c,b,d,a){c[a]||(c[a]={});c[a].config={pid:"exolberd56@ba27fb03cb43f75",appType:"web",imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",sendResource:true,enableLinkTrace:true,behavior:true};
    with(b)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
    })(window,document,"https://retcode.alicdn.com/retcode/bl.js","__bl");
  </script>
3. 代码入口引入 Sentry
```js
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",

  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  release: "my-project-name@2.3.12",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

});
```

## sdk的主要配置
首先一个是对于用户行为监控的拆分，例如我现在将它拆分为：
1. 用户基础信息
userId接口去取meta信息,没有userId就去取deviceId，nickname

2. 用户切换页面行为记录
hash记录不了上一条，onhashchange，docuemnt。referrer，选择或者判断，

3. 用户点击行为记录
记录class、id、文案，点击次数

4. 记录pv，uv，用户来路信息

5. 用户停留时间记录
页面的生命周期，一开始进来记录一下，然后操作

6. ajax请求
axios、ajax、fetch插件
返回值，请求值，RTT时间，错误吗

将这6个功能点全部做成可插拔的方式

## sdk的原则
1. 不能阻塞业务的加载，先加载业务代码，再加载sdk
时间差，先把他们上报的数据储存到一个队列看没有要上报的数据
加载队列的js
perfma。log 有么有send能力，如果没有先放到队列里面
2. 异常隔离，我们的sdk报错不能影响到业务

由于我们是内核+插件的形式，我们可以对每一个插件进行try catch，将错误收纳起来并进行上报得到sdk的错误信息
当出现异常后，中止 SDK 的运行，并移除所有的监听；
3. 断网情况数据不能丢失，先保存在localStoage，等待网络连接成功后上报并清除该localStorage，不能存太多

## 上报策略的选择
三种方式sendBeacon、Image1*1GIF、Ajax（XMLHttpRequest 和 fetch）
Image和sendBeacon都只能向服务端提供有限的数据，并且可以保证页面卸载时持续传输，两者之中我们选择sendBeacon

当不支持sendBeacon，或者传输数据过多时我们采用ajax

另外日志不是采集之后立即上报，是达到用户设置的最大存储上限才上报
beforeUnload
visibilitychange

## nodejs对于平台数据的加工
IP地址只能在服务端获取，所以对于我们上报的数据，nodejs还需要进行加工

nodejs es（方便搜索） mysql/pg

nodejs还要为后台可视化提供数据支持

定时清理

## 唯一id的生成策略
pv_id记录当前用户pv，刷新就没有了，一次访问的路径ID；页面刷新之后怎么处理；新Tab url下面带上一个参数
uv怎么算，根据pv_id和uid或者IP根据天来进行过滤
uid：根据userId生成的id，每个项目的userId获取方式不一样，这里怎么处理？游客模式下怎么处理呢？根据uid通过某种运算应该能够得到userId
sid：会话级id，存储在sessinStorage，可以不要
jserror
环境判断如果是内部则不上报

## 平台可视化
前期可以先利用较少成本接入 Grafana 和 Kibana 搭建前端监控平台的基础能力。


## 问题记录
node服务端我们不太熟悉
另外一个是uid的生成

只要有自定义监控，我们就可以在Sentry上面进行二次开发

没有登录的时候可以设置设备指纹：
https://www.dingxiang-inc.com/business/fingerprint?utm_source=baidu1sem&utm_medium=%E4%BA%A7%E5%93%81%E8%AF%8D-%E8%AE%BE%E5%A4%87%E6%8C%87%E7%BA%B9&utm_campaign=%E4%BA%A7%E5%93%81%E8%AF%8D-%E8%AE%BE%E5%A4%87%E6%8C%87%E7%BA%B9-js&utm_term=fingerprintjs&e_matchtype=1&e_creative=59283455536&e_adposition=cl1&e_pagenum=1&e_keywordid=449431701007&bd_vid=7858254267825137347


https://github.com/fingerprintjs/fingerprintjs

## 接下来怎么做
// 简单版本优先加载的
// Core的职责
// 1. 实现存储队列
// 2. log方法，判断是否有send能力，没有该能力则将数据存储到存储队列
// 3. id的补充
// webSdk extends Core
// webSdk实现Sentry未实现的功能，初始化Sentry
用户基础信息，怎么添加到Sentry的上报内容中去??