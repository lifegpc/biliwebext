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
 * @param {string} messageName 消息名称
 * @param {Array<string>?} substitutions 子消息
 * @param {{"escapeLt": boolean?}?} options 是否escape <等
 * @returns {string} 经过翻译的消息
 */
function i18nGetMessage(messageName, substitutions = [], options = null) {
    var getMessage = window['chrome']['i18n']['getMessage'];
    return chr ? getMessage(messageName, substitutions, options) : getMessage(messageName, substitutions);
}
/**
 * 将消息中的内容替换
 * @param {string} messageName 消息名称
 * @param {Object.<string, string>} mapdata 存储要替换的键值对
 * @param {Array<string>?} substitutions 子消息
 * @param {{"escapeLt": boolean?}?} options 是否escape <等
 * @returns {string} 经过翻译的消息
 */
function i18nGetMessageWithReplace(messageName, mapdata, substitutions = [], options = null) {
    var str = i18nGetMessage(messageName, substitutions, options);
    Object.getOwnPropertyNames(mapdata).forEach((key) => {
        var key2 = "<" + key + ">";
        var matched = false;
        while (str.search(key2) > -1) {
            matched = true;
            str = str.replace(key2, mapdata[key]);
        }
        if (!matched) {
            console.warn('Can not find key ', key, ' in message ', messageName);
        }
    })
    return str;
}
/**
 * 返回UI语言
 * @returns {string} UI语言
 */
function i18nGetUILanguage() {
    var get = window['chrome']['i18n']['getUILanguage'];
    return get();
}
