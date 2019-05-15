export const coverageStar = (stars) =>  {
  const num = stars.toString().slice(0,1);
  const arr = [];
  for (let i = 1; i<= 5; i+=1) {
    if (i <= num) {
      arr.push(1);
    }
    else {
      arr.push(0);
    }
  }
  return arr;
}

// 封装 请求方法

export const http = (url, callBack) => {
  console.log('url:',url);
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'json',
    },
    success: (res) => {
      console.log('http-----res:', res);
      callBack(res.data);
    },
    fail: (err) => {
      console.log('err:', err);
    }
  });
}