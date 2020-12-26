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
/// <reference path="cml.js" />
/**
 * 插件设置
 * @class
 * @constructor
 * @public
 */
class ExtensionSettings {
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
        if (!this.hasOwnProperty("version") || typeof (this["version"]) != "string")
            /**@type {string} 程序版本*/
            this["version"] = "1.0.0";
        if (!this.hasOwnProperty("cml"))
            /**@type {cml} 命令行相关参数设置*/
            this["cml"] = new cml();
        else if (typeof (this["cml"]) != "object" || !this["cml"] instanceof cml)
            this["cml"] = new cml(this["cml"]);
    }
}
