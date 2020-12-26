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
/**@type {ExtensionSettings}*/
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
    function createSelectionContextMenu()
    {
        selectionContextId = createContextMenuItem({"title": i18nGetMessage("opensel"), "contexts": ["selection"], "onclick": (info, tab) => {
            console.log(info);
            console.log(tab);
            if (info.hasOwnProperty("selectionText")) {
                var page = "bili://" + encodeURIComponent(info['selectionText']);
                openLinkInBackground(page);
            }
        }}, ()=>{
            console.log('add selection context menu');
        })
        if (selectionContextId) console.log('selection context id: ', selectionContextId);
    }
}
