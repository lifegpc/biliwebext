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
/// <reference path="cml.js" />
/// <reference path="settingsClass.js" />
/// <reference path="error.js" />
/// <reference path="nc1.js" />
/// <reference path="cmlpage.js" />
document.getElementById('title').innerText = i18nGetMessage('name') + ' - ' + i18nGetMessage('settpage');
/**@type {ExtensionSettings}*/
var settings;
/**@type {number}*/
var hash;
sendMessage({ "event": "getSettings" }, (response) => {
    settings = new ExtensionSettings(response);
    console.log("Settings: ", settings);
    document.getElementById('main').style.display = null;
    addContent();
})
function addContent() {
    addCmlPage(settings["cml"]);
    var save = document.getElementById('save');
    save.innerText = i18nGetMessage('savesett');
    save.addEventListener('click', () => {
        hash = generateMessageHash();
        sendMessage({ "event": "saveSettingsRequest", "hash": hash, "settings": settings });
    })
}
window['chrome']['runtime']['onMessage']['addListener']((request, sender, sendResponse) => {
    /**@type {Message}*/
    var r = request;
    if (r["event"] == "saveSettingsResult") {
        if (hash && r["hash"] == hash && r["result"]) {
            alert(i18nGetMessage("saveok"));
            sendResponse(1);
        }
    }
})
