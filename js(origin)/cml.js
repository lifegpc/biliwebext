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
/**
 * 命令行参数
 * @class
 * @constructor
 * @public
 */
class cml {
    /**
     * 构造函数
     * @param {object|undefined} data
     * @param {boolean} checkPass 是否不进行检查
     */
    constructor(data, checkPass = false) {
        Object.assign(this, data);
        if (!checkPass) {
            Object.getOwnPropertyNames(this).forEach((key) => {
                if (cmlparalist.indexOf(key) == -1) delete this[key];
            })
        }
        if (!this.hasOwnProperty("d"))
            /**@type {number?} 下载方法*/
            this["d"] = null;
        if (!this.hasOwnProperty("p"))
            /**@type {number?} P数*/
            this["p"] = null;
    }
    /**
     * 返回GET参数
     * @returns {string} GET字符串
     */
    dump() {
        var s = ""
        Object.getOwnPropertyNames(this).forEach((key) => {
            if (this[key]) {
                var temp = encodeURIComponent(key) + "=" + encodeURIComponent(this[key]);
                s = s == "" ? s + "?" + temp : s + "&" + temp;
            }
        })
        return s;
    }
}
var cmlparalist = Object.getOwnPropertyNames(new cml(undefined, true))
