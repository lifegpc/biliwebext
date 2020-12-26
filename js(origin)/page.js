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
/// <reference path="sendMessage.js" />
/// <reference path="i18n.js" />
/// <reference path="tabs.js" />
/**@type {ExtensionSettings}*/
var settings;
/**@type {boolean}*/
var ispopup;
sendMessage({ "event": "getSettings" }, (response) => {
    settings = response;
    console.log("Settings: ", settings);
    getCurrentTab((tab) => {
        ispopup = tab == undefined ? true : false;
        console.log('is popup: ', ispopup);
        getCurrentURL(() => {
            console.log("Current URL: ", url);
        })
    });
})
document.getElementById('title').innerText = i18nGetMessage("name");
/**@type {string} 地址*/
var url;
/**
 * 取得当前URL
 * @param {()=>void} callback 回调函数
 */
function getCurrentURL(callback) {
    if (ispopup) {
        getSelectedTab((tab) => {
            if (tab) {
                url = tab.url;
                if (tab.hasOwnProperty("width")) {
                    document.body.style.maxWidth = tab.width > 720 ? (tab.width / 2) + "px" : "360px";
                }
            }
            callback();
        })
    } else {
        var uri = new URL(window.location.href);
        if (uri.searchParams.get("p") != null) url = uri;
        callback();
    }
}
