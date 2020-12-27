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
/// <reference path="str.js" />
/// <reference path="cml.js" />
/// <reference path="settingsClass.js" />
/// <reference path="error.js" />
/// <reference path="nc1.js" />
/**@type {ExtensionSettings}*/
var settings;
/**@type {boolean}*/
var ispopup;
/**@type {cml}*/
var cmli;
sendMessage({ "event": "getSettings" }, (response) => {
    settings = new ExtensionSettings(response);
    console.log("Settings: ", settings);
    cmli = new cml(settings.cml);
    getCurrentTab((tab) => {
        ispopup = tab == undefined ? true : false;
        console.log('is popup: ', ispopup);
        getCurrentURL(() => {
            console.log("Current URL: ", url);
            if (ispopup && url) newTabLink();
            if (url) addContent();
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
        if (uri.searchParams.get("p") != null) url = uri.searchParams.get("p");
        callback();
    }
}
/**@type {HTMLLinkElement}*/
var tablink;
/**
 * 新建新标签页打开链接
 * @param {boolean} first 是否是第1次调用
*/
function newTabLink(first = true) {
    /**@type {HTMLDivElement} */
    if (first) {
        var newtab = document.getElementById('newtab');
        newtab.style.display = null;
        tablink = document.createElement('a');
    }
    tablink.href = getExtURL("/page.html?p=" + encodeURIComponent(url));
    if (first) {
        tablink.innerText = i18nGetMessage("newtab");
        tablink.addEventListener('click', () => {
            createTab({ "url": tablink.href });
        })
        newtab.append(tablink);
        newtab.append(document.createElement('br'));
    }
}
function addContent() {
    document.getElementById('main').style.display = "inline-block";
    document.getElementById('inputl').innerText = i18nGetMessage("input");
    /**@type {HTMLInputElement}*/
    var input = document.getElementById('input');
    input.value = url;
    input.addEventListener('input', () => {
        if (input.value.length == 0) return;
        url = input.value;
        if (tablink) newTabLink(false);
    })
    document.getElementById('downmethodl').innerText = i18nGetMessage("downmethod");
    /**@type {HTMLInputElement}*/
    var downmethod = document.getElementById('downmethod');
    if (cmli.d) downmethod.value = cmli.d;
    downmethod.addEventListener('input', () => {
        if (downmethod.value.length) {
            var value = downmethod.valueAsNumber;
            cmli.d = value ? value : null;
        } else cmli.d = null;
        console.log(new cml(cmli));
    })
    document.getElementById('partnumberl').innerText = i18nGetMessage("partnumber");
    /**@type {HTMLInputElement}*/
    var partnumber = document.getElementById('partnumber');
    if (cmli.p) partnumber.value = cmli.p;
    partnumber.addEventListener('input', () => {
        if (partnumber.value.length) {
            if (!cmli.setP(partnumber.value)) {
                cmli.p = null;
                changeElementColorByError(partnumber, true);
            } else changeElementColorByError(partnumber, false);
        } else {
            cmli.p = null;
            changeElementColorByError(partnumber, false);
        }
        console.log(new cml(cmli));
    })
    document.getElementById('endownmaxql').innerText = i18nGetMessage("endownmaxq");
    document.getElementById('didownmaxql').innerText = i18nGetMessage("didownmaxq");
    dealWithnc1(cmli);
    document.getElementById('openlink').innerText = i18nGetMessage("open");
    document.getElementById('openlink').addEventListener('click', () => {
        console.log("command line object: ", cmli);
        var page = "bili://" + encodeURIComponent(url) + cmli.dump();
        console.log(page);
        if (!window.open(page)) {
            createTab({ "url": page })
        }
    })
}
