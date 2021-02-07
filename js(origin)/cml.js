/* (C) 2020 lifegpc
 This file is part of biliwebext.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.*/
/// <reference path="define.js" />
/// <reference path="string.js" />
/**
 * 设置P数并进行检查
 * @param {string|undefined} s 输入
 * @returns {boolean} 输入是否有效
 */
function checkP(s) {
    if (s == undefined) return false;
    if (!s.length) return false;
    /**
     * 判断是否合法
     * @param {string} s 输入
     * @returns {boolean}
     */
    function check(s) {
        var list = s.split(',');
        var isVaild = true;
        list.forEach((value) => {
            if (!isVaild) return;
            if (stringIsNumber(value)) return;
            var m = value.match(/^([0-9]+)-([0-9]+)$/);
            if (m && parseInt(m[1]) < parseInt(m[2])) return;
            isVaild = false;
        })
        return isVaild;
    }
    if (["a", "b"].indexOf(s) > -1 || check(s)) {
        return true;
    }
    return false;
}
/**
 * 检查偏好编码是否出错
 * @param {string|undefined} s 输入
 * @returns {boolean} 输入是否有效
 */
function checkMc(s) {
    if (s == undefined) return false;
    if (!s.length) return false;
    if (["avc", "hev"].indexOf(s) > -1) return true;
    return false;
}
/**
 * 检查使用aria2c时单个服务器最大连接数
 * @param {number|undefined} i 输入
 * @returns {boolean} 输入是否有效
 */
function checkAx(i) {
    if (i == undefined) return false;
    var a = Math.floor(i);
    if (a >= 1 && a <= 16) return true;
    return false;
}
/**
 * 使用aria2c时单个文件最大连接数
 * @param {number|undefined} n 输入
 * @returns {boolean} 输入是否有效 
 */
function checkAs(n) {
    if (n == undefined) return false;
    var a = Math.floor(n);
    if (a >= 1) return true;
    return false;
}
/**
 * 使用aria2c时文件分片大小
 * @param {number|undefined} n 输入
 * @returns {boolean} 输入是否有效 
 */
function checkAk(n) {
    if (n == undefined) return false;
    var a = Math.floor(n);
    if (a >= 1 && a <= 1024) return true;
    return false;
}
/**
 * 使用aria2c下载时文件预分配方式
 * @param {string|undefined} s 输入
 * @returns {boolean} 输入是否有效
 */
function checkFa(s) {
    if (s == undefined) return false;
    if (!s.length) return false;
    if (["none", "prealloc", "trunc", "falloc"].indexOf(s) > -1) return true;
    return false;
}
/**
 * 在使用aria2c时最大总体速度
 * @param {string|undefined} s 输入
 * @returns {boolean} 输入是否有效 
 */
function checkMs(s) {
    if (s == undefined || !s.length) return false;
    if (s.match(/^[0-9]+([KM])?$/)) return true;
    return false;
}
/**
 * 下载全弹幕时两次抓取之间的天数
 * @param {string|undefined} s 输入
 * @returns {boolean} 输入是否有效
 */
function checkJt(s) {
    if (s == undefined || !s.length) return false;
    if (s == "a" || s == "b") return true;
    if (stringIsNumber(s)) {
        var i = parseInt(s);
        if (i >= 1 && i <= 365) return true;
    }
    return false;
}
/**
 * 下载全弹幕时且视频为番剧时抓取起始日期的默认值
 * @param {string|undefined} s 输入
 * @returns {boolean} 输入是否有效
 */
function checkJts(s) {
    if (s == undefined || !s.length) return false;
    var re = s.match(/^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/);
    if (re) {
        var year = parseInt(re[1]);
        var month = parseInt(re[2]) - 1;
        var day = parseInt(re[3]);
        var date = new Date(year, month, day);
        if (year == date.getFullYear() && month == date.getMonth() && day == date.getDate()) return true;
    }
    return false;
}
/**
 * 按索引选择画质
 * @param {number|undefined} s 输入
 * @returns {boolean} 输入是否有效
 */
function checkV(s) {
    return s == undefined || Math.floor(s) < 1 ? false : true;
}
/**
 * 下载文件夹位置
 * @param {string|undefined} s 输入
 * @returns {boolean} 输入是否有效 
 */
function checkO(s) {
    if (s == undefined || !s.length || s.match(/[\*\?"<>|]/)) return false;
    return true;
}
/**
 * 解析收藏夹时若未指定收藏夹ID，解析列表中指定序号的收藏夹
 * @param {string|undefined} s 输入
 * @returns {boolean} 输入是否有效
 */
function checkAfp(s) {
    if (s == undefined || !s.length) return false;
    if (s == "a" || (stringIsNumber(s) && parseInt(s) > 0)) return true;
    return false;
}
/**支持语言列表*/
var lanlist = ['en', 'ja', 'zh_CN'];
/**支持语言名称*/
var lanname = { 'en': 'English', 'ja': '日本語', 'zh_CN': '中文（中国）' };
/**
 * 根据输入选择适当的语言
 * @param {string} s 输入
 * @returns {string} 输出 
 */
function getLan(s) {
    if (!s.length) return 'en';
    /**@type {Object.<string, string>}*/
    var obj = {};
    lanlist.forEach((v) => {
        obj[v.toLowerCase()] = v;
        if (v.length > 2) obj[v.toLowerCase().substr(0, 2)] = v;
    });
    var temp = s.toLowerCase();
    if (obj.hasOwnProperty(temp)) return obj[temp];
    if (s.length > 2 && obj.hasOwnProperty(temp.substr(0, 2))) return obj[temp.substr(0, 2)];
    return 'en';
}
/**
 * 设置程序语言
 * @param {string|undefined} s 输入
 * @returns {boolean} 输入是否有效
 */
function checkLan(s) {
    if (s == undefined || !s.length) return false;
    if (lanlist.indexOf(s) > -1) return true;
    return false;
}
/**
 * 命令行参数
 * @class
 * @constructor
 * @public
 */
class cml {
    /**
     * 构造函数
     * @param {object} data
     * @param {boolean} checkPass 是否不进行检查
     */
    constructor(data = {}, checkPass = false) {
        Object.assign(this, data);
        if (!checkPass) {
            Object.getOwnPropertyNames(this).forEach((key) => {
                if (cmlparalist.indexOf(key) == -1) delete this[key];
            })
        }
        if (!this.hasOwnProperty("d") || (this["d"] != null && typeof (this["d"]) != "number"))
            /**@type {number?} 下载方法*/
            this["d"] = null;
        if (!this.hasOwnProperty("p") || this["p"] != null) {
            var str = this["p"];
            if (typeof (this["p"]) != "string" || !checkP(str))
                /**@type {string?} P数*/
                this["p"] = null;
        }
        if (!this.hasOwnProperty("ym") || (this["ym"] != null && this["ym"] !== ""))
            /**@type {string?} 默认下载最高画质。*/
            this["ym"] = null;
        if (!this.hasOwnProperty("nm") || (this["nm"] != null && this["nm"] !== ""))
            /**@type {string?} 禁用默认下载最高画质。*/
            this["nm"] = null;
        if (!this.hasOwnProperty("yac") || (this["yac"] != null && this["yac"] !== ""))
            /**@type {string?} 启用继续下载功能。*/
            this["yac"] = null;
        if (!this.hasOwnProperty("nac") || (this["nac"] != null && this["nac"] !== ""))
            /**@type {string?} 禁用继续下载功能。*/
            this["nac"] = null;
        if (!this.hasOwnProperty("ydm") || (this["ydm"] != null && this["ydm"] !== ""))
            /**@type {string?} 启用弹幕过滤。*/
            this["ydm"] = null;
        if (!this.hasOwnProperty("ndm") || (this["ndm"] != null && this["ndm"] !== ""))
            /**@type {string?} 禁用弹幕过滤。*/
            this["ndm"] = null;
        if (!this.hasOwnProperty("yad") || (this["yad"] != null && this["yad"] !== ""))
            /**@type {string?} 在合并完成后删除无用文件。*/
            this["yad"] = null;
        if (!this.hasOwnProperty("nad") || (this["nad"] != null && this["nad"] !== ""))
            /**@type {string?} 禁用在合并完成后删除无用文件。*/
            this["nad"] = null;
        if (!this.hasOwnProperty("yr") || (this["yr"] != null && this["yr"] !== ""))
            /**@type {string?} 在下载失败后重新下载。*/
            this["yr"] = null;
        if (!this.hasOwnProperty("nr") || (this["nr"] != null && this["nr"] !== ""))
            /**@type {string?} 禁用在下载失败后重新下载。*/
            this["nr"] = null;
        if (!this.hasOwnProperty("y") || (this["y"] != null && this["y"] !== ""))
            /**@type {string?} 覆盖所有重复文件*/
            this["y"] = null;
        if (!this.hasOwnProperty("n") || (this["n"] != null && this["n"] !== ""))
            /**@type {string?} 不覆盖重复文件*/
            this["n"] = null;
        if (!this.hasOwnProperty("yf") || (this["yf"] != null && this["yf"] !== ""))
            /**@type {string?} 使用ffmpeg*/
            this["yf"] = null;
        if (!this.hasOwnProperty("nf") || (this["nf"] != null && this["nf"] !== ""))
            /**@type {string?} 不使用ffmpeg*/
            this["nf"] = null;
        if (!this.hasOwnProperty("mc") || this["mc"] != null) {
            var str = this["mc"];
            if (typeof (this["mc"]) != "string" || !checkMc(str))
                /**@type {string?} 默认下载最高画质时偏好的视频编码*/
                this["mc"] = null;
        }
        if (!this.hasOwnProperty("ar") || (this["ar"] != null && this["ar"] !== ""))
            /**@type {string?} 使用aria2c下载*/
            this["ar"] = null;
        if (!this.hasOwnProperty("nar") || (this["nar"] != null && this["nar"] !== ""))
            /**@type {string?} 不使用aria2c下载*/
            this["nar"] = null;
        if (!this.hasOwnProperty("ax") || this["ax"] != null) {
            var num = this["ax"];
            if (typeof (this["ax"]) != "number" || !checkAx(num))
                /**@type {number?} 使用aria2c时单个服务器最大连接数*/
                this["ax"] = null;
        }
        if (!this.hasOwnProperty("as") || this["as"] != null) {
            var num = this["as"];
            if (typeof (this["as"]) != "number" || !checkAs(num))
                /**@type {number?} 使用aria2c时单个文件最大连接数。*/
                this["as"] = null;
        }
        if (!this.hasOwnProperty("ak") || this["ak"] != null) {
            var num = this["ak"];
            if (typeof (this["ak"]) != "number" || !checkAk(num))
                /**@type {number?} 使用aria2c时文件分片大小*/
                this["ak"] = null;
        }
        if (!this.hasOwnProperty("ab") || (this["ab"] != null && this["ab"] !== ""))
            /**@type {string?} 在使用aria2c下载时使用备用网址*/
            this["ab"] = null;
        if (!this.hasOwnProperty("nab") || (this["nab"] != null && this["nab"] !== ""))
            /**@type {string?} 在使用aria2c下载时不使用备用网址*/
            this["nab"] = null;
        if (!this.hasOwnProperty("fa") || this["fa"] != null) {
            var str = this["fa"];
            if (typeof (this["fa"]) != "string" || !checkFa(str))
                /**@type {string?} 使用aria2c下载时文件预分配方式*/
                this["fa"] = null;
        }
        if (!this.hasOwnProperty("ysv") || (this["ysv"] != null && this["ysv"] !== ""))
            /**@type {string?} 在文件名中输出视频画质信息*/
            this["ysv"] = null;
        if (!this.hasOwnProperty("nsv") || (this["nsv"] != null && this["nsv"] !== ""))
            /**@type {string?} 不在文件名中输出视频画质信息*/
            this["nsv"] = null;
        if (!this.hasOwnProperty("yma") || (this["yma"] != null && this["yma"] !== ""))
            /**@type {string?} 强制增加视频元数据（这会使视频被转码，转码不会影响画质）*/
            this["yma"] = null;
        if (!this.hasOwnProperty("nma") || (this["nma"] != null && this["nma"] !== ""))
            /**@type {string?} 不强制增加视频元数据*/
            this["nma"] = null;
        if (!this.hasOwnProperty("ms") || this["ms"] != null) {
            var str = this["ms"];
            if (typeof (this["ms"]) != "string" || !checkMs(str))
                /**@type {string?} 在使用aria2c时最大总体速度*/
                this["ms"] = null;
        }
        if (!this.hasOwnProperty("yda") || (this["yda"] != null && this["yda"] !== ""))
            /**@type {string?} 当输入收藏夹/频道/投稿链接时自动下载每一个视频的所有分P*/
            this["yda"] = null;
        if (!this.hasOwnProperty("nda") || (this["nda"] != null && this["nda"] !== ""))
            /**@type {string?} 当输入收藏夹/频道/投稿链接时不自动下载每一个视频的所有分P*/
            this["nda"] = null;
        if (!this.hasOwnProperty("httpproxy") || (this["httpproxy"] != null && typeof (this["httpproxy"]) != "string"))
            /**@type {string?} 使用HTTP代理（该设置不会影响aria2c）*/
            this["httpproxy"] = null;
        if (!this.hasOwnProperty("httpsproxy") || (this["httpsproxy"] != null && typeof (this["httpsproxy"]) != "string"))
            /**@type {string?} 使用HTTPS代理（该设置不会影响aria2c）*/
            this["httpsproxy"] = null;
        if (!this.hasOwnProperty("jt") || this["jt"] != null) {
            var str = this["jt"];
            if (typeof (this["jt"]) != "string" || !checkJt(str))
                /**@type {string?} 下载全弹幕时两次抓取之间的天数*/
                this["jt"] = null;
        }
        if (!this.hasOwnProperty("jts") || this["jts"] != null) {
            var str = this["jts"];
            if (typeof (this["jts"]) != "string" || !checkJts(str))
                /**@type {string?} 下载全弹幕时且视频为番剧时抓取起始日期的默认值*/
                this["jts"] = null;
        }
        if (!this.hasOwnProperty("F") || (this["F"] != null && this["F"] !== ""))
            /**@type {string?} 视频下载时仅显示画质但不下载（不受静默模式影响）*/
            this["F"] = null;
        if (!this.hasOwnProperty("v") || this["v"] != null) {
            var num = this["v"];
            if (typeof (this["v"]) != "number" || !checkV(num))
                /**@type {number?} 按索引选择画质*/
                this["v"] = null;
        }
        if (!this.hasOwnProperty("a") || this["a"] != null) {
            var num = this["a"];
            if (typeof (this["a"]) != "number" || !checkV(num))
                /**@type {number?} 按索引选择音质*/
                this["a"] = null;
        }
        if (!this.hasOwnProperty("o") || this["o"] != null) {
            var str = this["o"];
            if (typeof (this["o"]) != "string" || !checkO(str))
                /**@type {string?} 下载文件夹位置*/
                this["o"] = null;
        }
        if (!this.hasOwnProperty("af") || (this["af"] != null && this["af"] !== ""))
            /**@type {string?} 解析收藏夹时若未指定收藏夹ID，自动解析为默认收藏夹*/
            this["af"] = null;
        if (!this.hasOwnProperty("naf") || (this["naf"] != null && this["naf"] !== ""))
            /**@type {string?} 解析收藏夹时若未指定收藏夹ID，返回收藏夹列表以选择一个ID*/
            this["naf"] = null;
        if (!this.hasOwnProperty("afp") || this["afp"] != null) {
            var str = this["afp"];
            if (typeof (this["afp"]) != "string" || !checkAfp(str))
                /**@type {string?} 解析收藏夹时若未指定收藏夹ID，解析列表中指定序号的收藏夹*/
                this["afp"] = null;
        }
        if (!this.hasOwnProperty("s") || (this["s"] != null && this["s"] !== ""))
            /**@type {string?} 启用静默模式，仅显示版权声明和错误信息和进度信息*/
            this["s"] = null;
        if (!this.hasOwnProperty("slt") || (this["slt"] != null && this["slt"] !== ""))
            /**@type {string?} 下载小视频时，放入文件名中的描述长度可以超过20字*/
            this["slt"] = null;
        if (!this.hasOwnProperty("nslt") || (this["nslt"] != null && this["nslt"] !== ""))
            /**@type {string?} 下载小视频时，放入文件名中的描述长度无法超过20字，超出部分将被丢弃*/
            this["nslt"] = null;
        if (!this.hasOwnProperty("te") || (this["te"] != null && this["te"] !== ""))
            /**@type {string?} requests使用环境变量中的代理设置*/
            this["te"] = null;
        if (!this.hasOwnProperty("nte") || (this["nte"] != null && this["nte"] !== ""))
            /**@type {string?} requests不使用环境变量中的代理设置*/
            this["nte"] = null;
        if (!this.hasOwnProperty("bd") || (this["bd"] != null && this["bd"] !== ""))
            /**@type {string?} 合并完成后删除无用文件时保留字幕文件*/
            this["bd"] = null;
        if (!this.hasOwnProperty("nbd") || (this["nbd"] != null && this["nbd"] !== ""))
            /**@type {string?} 合并完成后删除无用文件时删除字幕文件*/
            this["nbd"] = null;
        if (!this.hasOwnProperty("cad") || (this["cad"] != null && this["cad"] !== ""))
            /**@type {string?} 使用aria2c时关闭异步DNS*/
            this["cad"] = null;
        if (!this.hasOwnProperty("ncad") || (this["ncad"] != null && this["ncad"] !== ""))
            /**@type {string?} 使用aria2c时启用异步DNS*/
            this["ncad"] = null;
        if (!this.hasOwnProperty("lrh") || (this["lrh"] != null && this["lrh"] !== ""))
            /**@type {string?} 直播回放简介写入元数据时将HTML转换为普通文本*/
            this["lrh"] = null;
        if (!this.hasOwnProperty("nlrh") || (this["nlrh"] != null && this["nlrh"] !== ""))
            /**@type {string?} 直播回放简介写入元数据时不将HTML转换为普通文本*/
            this["nlrh"] = null;
        if (!this.hasOwnProperty("ahttpproxy") || (this["ahttpproxy"] != null && typeof (this["ahttpproxy"]) != "string"))
            /**@type {string?} 指定aria2c使用的http代理*/
            this["ahttpproxy"] = null;
        if (!this.hasOwnProperty("ahttpsproxy") || (this["ahttpsproxy"] != null && typeof (this["ahttpsproxy"]) != "string"))
            /**@type {string?} 指定aria2c使用的https代理*/
            this["ahttpsproxy"] = null;
        if (!this.hasOwnProperty('lan') || this["lan"] != null) {
            var str = this["lan"];
            if (typeof (this["lan"]) != "string" || !checkLan(str))
                /**@type {string?} 设置程序语言*/
                this["lan"] = null;
        }
        if (!this.hasOwnProperty("bp") || (this["bp"] != null && this["bp"] !== ""))
            /**@type {string?} 合并完成后删除无用文件时保留封面图片*/
            this["bp"] = null;
        if (!this.hasOwnProperty("nbp") || (this["nbp"] != null && this["nbp"] !== ""))
            /**@type {string?} 合并完成后删除无用文件时删除封面图片*/
            this["nbp"] = null;
        if (!this.hasOwnProperty("in") || (this["in"] != null && this["in"] !== ""))
            /**@type {string?} 将AV/BV号等放入文件名*/
            this["in"] = null;
        if (!this.hasOwnProperty("nin") || (this["nin"] != null && this["nin"] !== ""))
            /**@type {string?} 不将AV/BV号等放入文件名*/
            this["nin"] = null;
        if (!this.hasOwnProperty("mt") || (this["mt"] != null && this["mt"] !== ""))
            /**@type {string?} 在有多个输入的时候启用多线程*/
            this["mt"] = null;
        if (!this.hasOwnProperty("nmt") || (this["nmt"] != null && this["nmt"] !== ""))
            /**@type {string?} 在有多个输入的时候禁用多线程*/
            this["nmt"] = null;
    }
    /**
     * 返回GET参数
     * @returns {string} GET字符串
     */
    dump() {
        var s = ""
        Object.getOwnPropertyNames(this).forEach((key) => {
            if (this[key] != null) {
                var temp = encodeURIComponent(key) + "=" + encodeURIComponent(this[key]);
                s = s == "" ? s + "?" + temp : s + "&" + temp;
            }
        })
        return s;
    }
    /**
     * 设置P数并进行检查
     * @param {string} s 输入
     * @returns {boolean} 输入是否有效
     */
    setP(s) {
        var isVaild = checkP(s);
        if (isVaild) this["p"] = s;
        return isVaild;
    }
    /**
     * 设置偏好编码并进行检查
     * @param {string} s 输入
     * @returns {boolean} 输入是否有效 
     */
    setMc(s) {
        var isVaild = checkMc(s);
        if (isVaild) this["mc"] = s;
        return isVaild;
    }
    /**
     * 设置使用aria2c时单个服务器最大连接数并进行检查
     * @param {number} n 输入
     * @returns {boolean} 输入是否有效 
     */
    setAx(n) {
        var isVaild = checkAx(n);
        if (isVaild) this["ax"] = Math.floor(n);
        return isVaild;
    }
    /**
     * 设置使用aria2c时单个文件最大连接数并进行检查
     * @param {number} n 输入
     * @returns {boolean} 输入是否有效 
     */
    setAs(n) {
        var isVaild = checkAs(n);
        if (isVaild) this["as"] = Math.floor(n);
        return isVaild;
    }
    /**
     * 设置使用aria2c时文件分片大小并进行检查
     * @param {number} n 输入
     * @returns {boolean} 输入是否有效
     */
    setAk(n) {
        var isVaild = checkAk(n);
        if (isVaild) this["ak"] = Math.floor(n);
        return isVaild;
    }
    /**
     * 设置使用aria2c下载时文件预分配方式并进行检查
     * @param {string} s 输入
     * @returns {boolean} 输入是否有效
     */
    setFa(s) {
        var isValid = checkFa(s);
        if (isValid) this["fa"] = s;
        return isValid;
    }
    /**
     * 设置在使用aria2c时最大总体速度
     * @param {string} s 输入
     * @returns {boolean} 输入是否有效
     */
    setMs(s) {
        var isVaild = checkMs(s);
        if (isVaild) this["ms"] = s;
        return isVaild;
    }
    /**
     * 设置下载全弹幕时两次抓取之间的天数
     * @param {string} s 输入
     * @returns {boolean} 输入是否有效
     */
    setJt(s) {
        var isVaild = checkJt(s);
        if (isVaild) this["jt"] = s;
        return isVaild;
    }
    /**
     * 设置下载全弹幕时且视频为番剧时抓取起始日期的默认值
     * @param {string} s 输入
     * @returns {boolean} 输入是否有效
     */
    setJts(s) {
        var isVaild = checkJts(s);
        if (isVaild) this["jts"] = s;
        return isVaild;
    }
    /**
     * 设置按索引选择画质
     * @param {number} n 输入
     * @returns {boolean} 输入是否有效 
     */
    setV(n) {
        var isVaild = checkV(n);
        if (isVaild) this["v"] = Math.floor(n);
        return isVaild;
    }
    /**
     * 设置按索引选择音质
     * @param {number} n 输入
     * @returns {boolean} 输入是否有效 
     */
    setA(n) {
        var isVaild = checkV(n);
        if (isVaild) this["a"] = Math.floor(n);
        return isVaild;
    }
    /**
     * 设置下载文件夹位置
     * @param {string} s 输入
     * @returns {boolean} 输入是否有效
     */
    setO(s) {
        var isVaild = checkO(s);
        if (isVaild) this["o"] = s;
        return isVaild;
    }
    /**
     * 设置解析收藏夹时若未指定收藏夹ID，解析列表中指定序号的收藏夹
     * @param {string} s 输入
     * @returns {boolean} 输入是否有效
     */
    setAfp(s) {
        var isVaild = checkAfp(s);
        if (isVaild) this["afp"] = s;
        return isVaild;
    }
    /**
     * 设置程序语言
     * @param {string} s 输入
     * @returns {boolean} 输入是否有效
     */
    setLan(s) {
        var lan = getLan(s);
        var isVaild = checkLan(lan);
        if (isVaild) this["lan"] = lan;
        return isVaild;
    }
}
const cmlparalist = Object.getOwnPropertyNames(new cml(undefined, true));
