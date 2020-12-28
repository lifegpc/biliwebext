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
/// <reference path="ContextMenu.js" />
/// <reference path="i18n.js" />
/// <reference path="settings.js" />
/// <reference path="tabs.js" />
/// <reference path="str.js" />
var settings = {};
readSettings((info) => {
    settings = info;
    console.log("Settings: ", settings);
    createContextMenu();
})
console.log(i18nGetMessage("name"));
function createContextMenu() {
    /**@type {chromeContextMenusType} */
    var contexts = ["page", "link", "selection", "editable"];
    if (!chr) contexts.push("tab");
    var pageContextId = createContextMenuItem({
        "title": i18nGetMessage("openpage"), "contexts": contexts, "onclick": (info, tab) => {
            console.log(info);
            console.log(tab);
            if (info.hasOwnProperty("pageUrl")) {
                var page = "bili://" + encodeURIComponent(info['pageUrl']);
                openLinkInBackground(page, tab);
            }
        }
    }, () => {
        console.log('add page context menu');
        createLinkContextMenu();
    });
    if (pageContextId) console.log('page context id: ', pageContextId);
    var linkContextId;
    function createLinkContextMenu() {
        linkContextId = createContextMenuItem({
            "title": i18nGetMessage("openlink"), "contexts": ["link"], "onclick": (info, tab) => {
                console.log(info);
                console.log(tab);
                if (info.hasOwnProperty("linkUrl")) {
                    var page = "bili://" + encodeURIComponent(info['linkUrl']);
                    openLinkInBackground(page, tab);
                }
            }
        }, () => {
            console.log('add link context menu');
            createSelectionContextMenu();
        })
        if (linkContextId) console.log('link context id: ', linkContextId);
    }
    var selectionContextId;
    function createSelectionContextMenu() {
        selectionContextId = createContextMenuItem({
            "title": i18nGetMessage("opensel"), "contexts": ["selection"], "onclick": (info, tab) => {
                console.log(info);
                console.log(tab);
                if (info.hasOwnProperty("selectionText")) {
                    var page = "bili://" + encodeURIComponent(info['selectionText']);
                    openLinkInBackground(page);
                }
            }
        }, () => {
            console.log('add selection context menu');
            createPageContextWithPara();
        })
        if (selectionContextId) console.log('selection context id: ', selectionContextId);
    }
    var pageContextWithParaId;
    function createPageContextWithPara() {
        /**@type {chromeContextMenusType} */
        var contexts = ["page", "link", "selection", "editable"];
        if (!chr) contexts.push("tab");
        pageContextWithParaId = createContextMenuItem({
            "title": i18nGetMessage("openpage") + i18nGetMessage("withpa"), "contexts": contexts, "onclick": (info, tab) => {
                console.log(info);
                console.log(tab);
                if (info.hasOwnProperty("pageUrl")) {
                    var page = getExtURL("/page.html?p=" + encodeURIComponent(info['pageUrl']));
                    openLinkInBackground(page, tab);
                }
            }
        }, () => {
            console.log('add page context menu with para');
            createLinkContextMenuWithPara();
        })
        if (pageContextWithParaId) console.log('page context with para id: ', pageContextWithParaId);
    }
    var linkContextWithParaId;
    function createLinkContextMenuWithPara() {
        linkContextWithParaId = createContextMenuItem({
            "title": i18nGetMessage("openlink") + i18nGetMessage("withpa"), "contexts": ["link"], "onclick": (info, tab) => {
                console.log(info);
                console.log(tab);
                if (info.hasOwnProperty("linkUrl")) {
                    var page = getExtURL("/page.html?p=" + encodeURIComponent(info['linkUrl']));
                    openLinkInBackground(page, tab);
                }
            }
        }, () => {
            console.log('add link context menu with para');
            createSelectionContextMenuWithPara();
        })
        if (linkContextWithParaId) console.log('link context with para id: ', linkContextWithParaId);
    }
    var selectionContextWithParaId;
    function createSelectionContextMenuWithPara() {
        selectionContextWithParaId = createContextMenuItem({
            "title": i18nGetMessage("opensel") + i18nGetMessage("withpa"), "contexts": ["selection"], "onclick": (info, tab) => {
                console.log(info);
                console.log(tab);
                if (info.hasOwnProperty("selectionText")) {
                    var page = getExtURL("/page.html?p=" + encodeURIComponent(info['selectionText']));
                    openLinkInBackground(page);
                }
            }
        }, () => {
            console.log('add selection context menu with para');
        })
        if (selectionContextWithParaId) console.log('selection context with para id: ', selectionContextWithParaId);
    }
}
window['chrome']['runtime']['onMessage']['addListener']((request, sender, sendResponse) => {
    /**@type {Message}*/
    var r = request;
    if (r["event"] == "getSettings") {
        sendResponse(settings);
    } else if (r["event"] == "saveSettingsRequest") {
        sendResponse(1);
        var hash = r['hash'];
        saveSettings(new ExtensionSettings(r['settings']), () => {
            readSettings((info) => {
                settings = info;
                console.log("New settings: ", settings);
                sendMessage({ "event": "saveSettingsResult", "hash": hash, "result": true });
            })
        })
    }
})
