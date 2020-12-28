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
        if (!this.hasOwnProperty("ym") || (this["ym"] != null && typeof (this["ym"]) != "string" && this["ym"] != ""))
            /**@type {string?} 默认下载最高画质。*/
            this["ym"] = null;
        if (!this.hasOwnProperty("nm") || (this["nm"] != null && typeof (this["nm"]) != "string" && this["nm"] != ""))
            /**@type {string?} 禁用默认下载最高画质。*/
            this["nm"] = null;
        if (!this.hasOwnProperty("yac") || (this["yac"] != null && typeof (this["yac"]) != "string" && this["yac"] != ""))
            /**@type {string?} 启用继续下载功能。*/
            this["yac"] = null;
        if (!this.hasOwnProperty("nac") || (this["nac"] != null && typeof (this["nac"]) != "string" && this["nac"] != ""))
            /**@type {string?} 禁用继续下载功能。*/
            this["nac"] = null;
        if (!this.hasOwnProperty("ydm") || (this["ydm"] != null && typeof (this["ydm"]) != "string" && this["ydm"] != ""))
            /**@type {string?} 启用弹幕过滤。*/
            this["ydm"] = null;
        if (!this.hasOwnProperty("ndm") || (this["ndm"] != null && typeof (this["ndm"]) != "string" && this["ndm"] != ""))
            /**@type {string?} 禁用弹幕过滤。*/
            this["ndm"] = null;
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
}
const cmlparalist = Object.getOwnPropertyNames(new cml(undefined, true));
