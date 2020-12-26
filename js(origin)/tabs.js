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
 * 创建标签页
 * @param {tabCreateProperties} createProperties Tab创建参数
 * @param {(tab: chromeTab)=>void} callback 回调函数
 */
function createTab(createProperties, callback = (tab) => { }) {
    var create = window['chrome']['tabs']['create'];
    create(createProperties, callback);
}
/**
 * 在背景页打开页面
 * @param {string} url 要打开的链接
 * @param {chromeTab} tab 菜单的标签页
 */
function openLinkInBackground(url, tab) {
    console.log(url);
    if (!window.open(url)) {
        /**@type {tabCreateProperties} */
        var prop = { "url": url }
        if (tab.hasOwnProperty("id")) {
            prop['openerTabId'] = tab['id'];
        }
        console.log(prop);
        createTab(prop);
    }
}
