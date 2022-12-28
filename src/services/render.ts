import {renderFile} from 'pug';
import {AccessFile} from '../modules/file';
import {GetRenderConfigs} from '../modules/configs';
import {HttpErrorCodes, HttpErrorTypes, ThrowHttpError} from '../modules/error';
import hexToRgba from 'hex-to-rgba';
const renderConfigs = GetRenderConfigs();
import moment from 'moment';
import MD from 'markdown-it';
const md = new MD();

function markdown(content: string) {
  return md.render(content || '');
}

function format(type: string, time: Date | number) {
  type = type || 'YYYY/MM/DD HH:mm:ss';
  time = new Date(time) || new Date();
  return moment(time).format(type);
}

function timeFormat(time: Date | number) {
  const type = 'YYYY/MM/DD HH:mm:ss';
  return format(type, time);
}

function briefTime(toc: Date) {
  const now = new Date();
  const nowNumber = now.getTime();
  const time = new Date(toc);
  const timeNumber = time.getTime();
  // 1h
  if (nowNumber - timeNumber <= 60 * 60 * 1000) {
    return '刚刚';
  }
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const oneDayNumber = 24 * 60 * 60 * 1000;
  const t = new Date(
    year.toString() +
      '-' +
      month.toString() +
      '-' +
      day.toString() +
      ' 00:00:00',
  ).getTime();
  if (timeNumber >= t) return '今天';
  if (timeNumber >= t - oneDayNumber) return '昨天';
  if (timeNumber >= t - 2 * oneDayNumber) return '前天';
  if (timeNumber >= t - 30 * oneDayNumber) return '近期';
  return '较早';
}

function fromNow(time: Date | number, type: unknown) {
  const now = Math.floor(Date.now() / 1000);
  time = new Date(time);
  time = Math.floor(time.getTime() / 1000);
  //type用于是否显示分秒，true显示分秒，false显示刚刚
  if (type) {
    // 分
    const just = Math.floor((now - time) / 60);
    if (just < 60) {
      return '刚刚';
    }
  }
  // 秒
  if (now - time < 60) {
    return (now - time).toString() + '秒前';
  }
  // 分
  const m = Math.floor((now - time) / 60);
  if (m < 60) {
    return m.toString() + '分' + ((now - time) % 60).toString() + '秒前';
  }
  // 时
  const h = Math.floor(m / 60);
  if (h < 24) {
    return h.toString() + '时' + (m % 60).toString() + '分前';
  }
  const d = Math.floor(h / 24);
  if (d < 30) {
    return d.toString() + '天' + (h % 24).toString() + '时前';
  }
  const month = Math.floor(d / 30);
  if (month < 12) {
    return month.toString() + '个月' + (d % 30).toString() + '天前';
  }
  return (
    Math.floor(month / 12).toString() +
    '年' +
    (month % 12).toString() +
    '个月前'
  );
}

/**
 * 换行转换
 */
function LineFeedConversion(str: string) {
  str = str.replace(new RegExp('\\n', 'gm'), '<br/>');
  str = str.replace(new RegExp('\\s', 'gm'), '&nbsp;');
  return str;
}

function cutContent(str: string, num: number) {
  if (!num) num = 20;
  const strNum = str.length;
  if (strNum < num) {
    return str;
  } else {
    str = str.substr(0, num);
    str += '......';
    return str;
  }
}

function numToFloatTwo(str: number) {
  return (str / 100).toFixed(2);
}

function getProvinceCity(str: string) {
  const addressArr: string[] = str.split('/');
  let province = '';
  let city = '';
  if (addressArr[0]) {
    province = addressArr[0];
  }
  if (addressArr[1]) {
    city = addressArr[1];
    const cityIndex = city.indexOf('&');
    if (cityIndex > -1) {
      city = city.substr(0, cityIndex);
    }
  }
  return province + '/' + city;
}

function getOriginLevel(index: number) {
  const indexString = index.toString();
  const obj: {[propName: string]: string} = {
    '0': '不声明',
    '1': '普通转载',
    '2': '获授权转载',
    '3': '受权发表(包括投稿)',
    '4': '发表人参与原创(翻译)',
    '5': '发表人是合作者之一',
    '6': '发表人本人原创',
  };
  if (!indexString) {
    return obj;
  } else {
    for (const i in obj) {
      if (i === indexString) {
        return obj[i];
      }
    }
  }
}

export async function RenderPug(
  filePath: string,
  remoteState: unknown,
  data: unknown,
) {
  if (!(await AccessFile(filePath))) {
    ThrowHttpError(
      HttpErrorCodes.BadGateway,
      HttpErrorTypes.ERR_INVALID_PUG_FILE_PATH,
    );
  }
  const includedModules = {};
  return renderFile(filePath, {
    remoteState,
    data,
    cache: renderConfigs.cache,
    isIncluded(name: string) {
      return isIncluded(includedModules, name);
    },
    objToStr,
    briefNumber,
    format,
    fromNow,
    numToFloatTwo,
    LineFeedConversion,
    getOriginLevel,
    cutContent,
    getProvinceCity,
    hexToRgba,
    timeFormat,
    markdown,
    markdown_safe: markdown,
    anonymousInfo: {
      username: '匿名用户',
      avatar: '/default/default_anonymous_user_avatar.jpg',
    },
    tools: {
      timeFormat,
      format,
      fromNow,
      briefTime,
    },

    pretty: true,
  });
}

function isIncluded(data: {[propName: string]: boolean}, name: string) {
  if (data[name]) return true;
  data[name] = true;
  return false;
}

function objToStr(obj: object) {
  return encodeURIComponent(JSON.stringify(obj));
}
function briefNumber(number: number) {
  if (number < 10000) {
    return number;
  } else {
    return (number / 10000).toFixed(1) + '万';
  }
}
