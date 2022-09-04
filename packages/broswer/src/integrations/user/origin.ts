// 访客来路的统计
// 用户来路方式
// 我们可以直接使用 window.performance.navigation.type 来获取用户在我们网页上的来路方式
// 该属性返回一个整数值，可能有以下4种情况

// 0: 点击链接、地址栏输入、表单提交、脚本操作等。
// 1: 点击重新加载按钮、location.reload。
// 2: 点击前进或后退按钮。
// 255: 任何其他来源。即非刷新/非前进后退、非点击链接/地址栏输入/表单提交/脚本操作等。

// 我们可以直接用 document.referrer 来获取用户在我们的网页上的前一个网页地址；但是需要注意的是，有几个场景我们获取到的值会是空

// 直接在地址栏中输入地址跳转
// 直接通过浏览器收藏夹打开
// 从https的网站直接进入一个http协议的网站


export interface OriginInformation {
    referrer: string;
    type: number | string;
  }

  export const getOriginInfo = (): OriginInformation => {
    return {
      referrer: document.referrer,
      type: window.performance?.navigation.type || '',
    };
  };