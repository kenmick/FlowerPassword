const app = getApp()
var md5 = require('../../utils/md5.min.js');

// define const conform to flower password
const STR1 = 'snow';
const STR2 = 'kise';
const STR3 = 'sunlovesnow1990090127xykab';
const BUTTON_VALUE_SHOW = '显示';
const BUTTON_VALUE_HIDE = '隐藏';

Page({
  data: {
    buttonValue: BUTTON_VALUE_SHOW,
    isPassword: true
  },
  setKeyword: function (e) {
    this.data.keyword = e.detail.value;
  },
  setCode: function (e) {
    this.data.code = e.detail.value;
  },
  generatePwd: function () {
    var keyword = this.data.keyword;
    var code = this.data.code;
    if (this.isValid(keyword) && this.isValid(code)) {
      var md5one = md5(keyword, code);
      var md5two = md5(md5one, STR1);
      var md5three = md5(md5one, STR2);
      var rule = md5three.split('')
      var source = md5two.split('')
      // convert to upper case
      for (var i = 0; i < 32; i++) {
        if (isNaN(source[i])) {
          if (STR3.search(rule[i]) > -1) {
            source[i] = source[i].toUpperCase();
          }
        }
      }
      var pwd32 = source.join('');
      var firstChar = pwd32.slice(0, 1);
      // make sure first char is not a number
      if (isNaN(firstChar)) {
        var pwd = pwd32.slice(0, 16);
      } else {
        var pwd = 'K' + pwd32.slice(1, 16);
      }
      this.setData({
        pwdValue: pwd
      });
      wx.setClipboardData({
        data: pwd
      });
    } else {
      wx.showToast({
        title: '记忆密码或区分代号不能为空',
        icon: 'none',
        duration: 1500
      });
    }
  },
  toggleShowPwd: function () {
    var isPassword = !this.data.isPassword;
    this.setData({
      isPassword: isPassword,
      buttonValue: isPassword ? BUTTON_VALUE_SHOW : BUTTON_VALUE_HIDE
    });
  },
  isValid: function (item) {
    return item !== undefined && item !== '';
  }
})
