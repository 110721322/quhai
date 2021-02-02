// component/cityList/cityList.js
let util = require("../../utils/util.js");
let common = require("../../utils/common.js");
let QQMapWX = require('../../utils/qqMapSdk.js');
const stringUtils = require("../../utils/stringUtils.js");

const app = getApp();
Component({

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   * 
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    boxTop: '',
    barTop: '',
    list: [],
    searchWord: [],
    listCur: [],
    listCurID: '',
    listArr: {},
    locCity: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //地址解析
    sureAdress(e){
      const pages = getCurrentPages();
      let prePage = pages[pages.length - 2];
      prePage.setData({
        latitude: e.currentTarget.dataset.local.lat,
        longitude: e.currentTarget.dataset.local.lng,
        location: e.currentTarget.dataset.title
      })
      wx.navigateBack({
        delta: 1
      })
      // QQMapWX.geocoder({
      //   address: '北京市海淀区彩和坊路海淀西大街74号',
      //   success: function (res) {
      //     console.log(res)
          
      //   },
      //   fail: function (res) {

      //   }
      // })
    },
    //关键字输入提示
    getSuggestion(e){
      console.log(e);
      let that = this;
      const pages = getCurrentPages();
      let prePage = pages[pages.length - 2];
      QQMapWX.getSuggestion({
        keyword: e.detail.value,
        region: '杭州',
        success: function (res) {
          console.log(res)
          that.setData({
            searchList: res.data
          })

        },
        fail: function (res) {

        }
      })
    },
    selectCity(e) {
      const pages = getCurrentPages();
      //上级页面
      let prePage = pages[pages.length - 2];
      let latitude = e.currentTarget.dataset.latitude;
      let longitude = e.currentTarget.dataset.longitude;
      let location = {};
      location.lng = longitude;
      location.lat = latitude;
      prePage.setData({
        lnglat: location
      })
      wx.navigateBack({
        delta: 1
      })
    },
    onBack() {
      wx.navigateBack({
        delta: 1
      })
    },
    //获取文字信息
    getCur(e) {

      this.setData({
        hidden: false,
        listCur: this.data.list[e.target.id],
      })
    },

    setCur(e) {
      this.setData({
        hidden: true,
        listCur: this.data.listCur
      })
    },
    //滑动选择Item
    tMove(e) {
      let y = e.touches[0].clientY,
        offsettop = this.data.boxTop,
        that = this;
      //判断选择区域,只有在选择区才会生效
      if (y > offsettop) {
        let num = parseInt((y - offsettop) / 20);
        this.setData({
          listCur: that.data.list[num]
        })
      };
    },

    //触发全部开始选择
    tStart() {
      this.setData({
        hidden: false
      })
    },

    //触发结束选择
    tEnd() {
      this.setData({
        hidden: true,
        listCurID: this.data.listCur
      })
    },
    reposit() {
      let that = this;
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          that.getLocal(latitude, longitude)
        }
      });
    },
    getLocal: function (lat, lng) {
      let that = this;
      QQMapWX.reverseGeocoder({
        location: {
          latitude: lat,
          longitude: lng
        },
        success: function (res) {
          console.log(res)
          let city = res.result.address_reference.town.title;
          that.setData({
            location: stringUtils.isBlank(city) ? "杭州" : city.substr(0, 4),
            latitude: lat,
            longitude: lng
          })
        },
        fail: function (res) {

        }
      })
    },
    indexSelect(e) {
      let that = this;
      let barHeight = this.data.barHeight;
      let list = this.data.list;
      let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
      for (let i = 0; i < list.length; i++) {
        if (scrollY < i + 1) {
          that.setData({
            listCur: list[i],
            movableY: i * 20
          })
          return false
        }
      }
    },
    setCityList(list) {
      let pinyin, p, city = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ];
      for (var i = 0; i < list.length; i++) {
        p = list[i].pinyin[0];
        pinyin = p.substr(0, 1)
        switch (pinyin) {
          case 'a':
            city[0].push(list[i])
            break;
          case 'b':
            city[1].push(list[i])
            break;
          case 'c':
            city[2].push(list[i])
            break;
          case 'd':
            city[3].push(list[i])
            break;
          case 'e':
            city[4].push(list[i])
            break;
          case 'f':
            city[5].push(list[i])
            break;
          case 'g':
            city[6].push(list[i])
            break;
          case 'h':
            city[7].push(list[i])
            break;
          case 'i':
            city[8].push(list[i])
            break;
          case 'j':
            city[9].push(list[i])
            break;
          case 'k':
            city[10].push(list[i])
            break;
          case 'l':
            city[11].push(list[i])
            break;
          case 'm':
            city[12].push(list[i])
            break;
          case 'n':
            city[13].push(list[i])
            break;
          case 'o':
            city[14].push(list[i])
            break;
          case 'p':
            city[15].push(list[i])
            break;
          case 'q':
            city[16].push(list[i])
            break;
          case 'r':
            city[17].push(list[i])
            break;
          case 's':
            city[18].push(list[i])
            break;
          case 't':
            city[19].push(list[i])
            break;
          case 'u':
            city[20].push(list[i])
            break;
          case 'v':
            city[21].push(list[i])
            break;
          case 'w':
            city[22].push(list[i])
            break;
          case 'x':
            city[23].push(list[i])
            break;
          case 'y':
            city[24].push(list[i])
            break;
          case 'z':
            city[25].push(list[i])
            break;
        }
      }
      this.setData({
        listArr: city
      })
    }
  },

  ready() {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.getLocal(latitude, longitude)
      }
    });
    common.showLoading({});
    let that = this;
    let cityIndexes = util.cityIndexes();
    that.setData({
      list: cityIndexes
    })

    QQMapWX.getCityList(1, function (res) {
      util.sortChinese(res)
      that.setCityList(res)
      that.setData({
        searchWord: res
      })
      wx.hideLoading()
    })

    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
      if (res != null) {
        that.setData({
          boxTop: res.top
        })
      }
    });

    wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
      if (res != null) {
        that.setData({
          barTop: res.top
        })
      }
    });

  }

})