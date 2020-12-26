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
 * 获取当前版本
 * @returns {string} 当前版本
 */
function getCurrentVersion() {
    var getManifest = window['chrome']['runtime']['getManifest'];
    return getManifest()['version'];
}
/**
 * 解析版本
 * @param {string} ver
 * @returns {Array<number>} 版本数组，长度固定为4
 * @throws {parseVersionError}
 */
function parseVersion(ver) {
    var verlist = ver.split('.', 4);
    /**@type {Array<number>}*/
    var v = [];
    verlist.forEach((value) => {
        var p = parseInt(value, 10);
        if (!isNaN(p)) v.push(p);
        else throw new parseVersionError("Invalid version: " + ver);
    })
    while (v.length < 4) v.push(0);
    return v;
}
/**
 * 比较版本
 * @param {Array<number>} ver1 版本1 
 * @param {Array<number>} ver2 版本2
 * @param {number} i 比较版本的索引
 * @returns {number} 前面版本大1，后面版本大-1，一样0
 */
function compareVersion(ver1, ver2, i = 0) {
    if (i == 4) return 0
    return ver1[i] == ver2[i] ? compareVersion(ver1, ver2, ++i) : ver1[i] > ver2[i] ? 1 : -1;
}
/**
 * 检查设置
 * @param {Object} obj 
 * @param {(info:ExtensionSettings)=>void} f 
 */
function dealWithSettings(obj, f) {
    var o = obj;
    var currentVer = getCurrentVersion();
    if (!o.hasOwnProperty("version")) return resetSettings(() => {
        readSettings(f, true);
    })
    var sever = o.version;
    try {
        var curver = parseVersion(currentVer);
        var ver = parseVersion(sever);
    } catch (e) {
        if (e instanceof parseVersionError) {
            return resetSettings(() => {
                readSettings(f, true);
            })
        } else throw e;
    }
    if (compareVersion(curver, ver) < 1) return resetSettings(() => {
        readSettings(f, true);
    })
    f(o);
}
/**
 * 从sync区读取设置
 * @param {(info:ExtensionSettings)=>void} f 回调函数
 * @param {boolean} passCheck 跳过检查设置
 */
function readSettings(f, passCheck = false) {
    var sync = window['chrome']['storage']['sync'];
    sync.get((obj) => { passCheck ? f(obj) : dealWithSettings(obj, f) });
}
/**
 * 保存设置
 * @param {ExtensionSettings} obj 设置 
 * @param {()=>void} f 回调函数
 * @param {boolean} passCheck 跳过检查设置
 */
function saveSettings(obj, f, passCheck = false) {
    var sync = window['chrome']['storage']['sync'];
    return passCheck ? sync.set(obj, f) : dealWithSettings(obj, (info) => {
        sync.set(info, f);
    });
}
/**
 * 重置设置
 * @param {()=>void} f 回调函数
 */
function resetSettings(f) {
    /**@type {ExtensionSettings}*/
    var obj = { "version": getCurrentVersion(), "cml": {} };
    saveSettings(obj, f, true);
} 
