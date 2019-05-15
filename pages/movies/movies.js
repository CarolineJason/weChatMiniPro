import  { coverageStar }  from '../../utils/utils.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {}, // 正在热映
    comingSoon: {}, // 即将热映
    top250: {}, // 热播榜 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const host = app.globalData.doubanBase;
    const inTheaters = `${host}/v2/movie/in_theaters?start=0&count=3`;  // 热映
    const comingSoon = `${host}/v2/movie/coming_soon?start=0&count=3`;  // 热映
    const top250Movie = `${host}/v2/movie/top250?start=0&count=3`; // top250

    this.getMoviesList(inTheaters, 'inTheaters', '正在热映');
    this.getMoviesList(comingSoon, 'comingSoon', '即将热映');
    this.getMoviesList(top250Movie, 'top250', '豆瓣Top250');
  },

  getMoviesList(url, setKey, categoryTitle) {
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'json',
      },
      success: (res) => {
        console.log('res:', res);
        this.processMovieData(res.data.subjects, setKey, categoryTitle);
      },
      fail: (err) =>  {
        console.log('err:',err);
      }
    });
  },

  processMovieData(data, setKey, categoryTitle) {
    // console.log('data:',data);
    // console.log('setKey:', setKey);
    const movies = [];
    data && data.forEach((item) => {
      if (item.title.length > 6) {
        item.title = item.title.slice(0,6) + '...';
      }

      const temp = {
        stars: coverageStar(item.rating.stars),
        title: item.title,
        movieId: item.id,
        average: item.rating.average,
        coverageUrl: item.images.large,
      }
      movies.push(temp);
      const readyData = {};
      readyData[setKey] = {
        movies,
        categoryTitle,
      }
      // console.log('readyData:', readyData);

      this.setData({
        ...readyData,
      });
      // console.log('this.data:', this.data);
    });
  },

  // 更多
  onTapMore(event){
    const category = event.currentTarget.dataset.categorytitle;
    // console.log(event.currentTarget.dataset.categorytitle);
    wx.navigateTo({
      url: `./movie-more/movie-more?category=${category}`,
    })
  }
})