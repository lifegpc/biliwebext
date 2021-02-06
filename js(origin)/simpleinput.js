/* (C) 2020-2021 lifegpc
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
/// <reference path="define.js"/>
/// <reference path="cml.js"/>
/**
 * Deal with simple input box.
 * @param {cml} cmli
 */
function dealWithSimpleInput(cmli) {
    /**@type {HTMLCollectionOf<HTMLInputElement>}*/
    var list = document.getElementsByClassName('simpleinput');
    /**@type {HTMLInputElement[]} */
    var list2 = [];
    for (var i = 0; i < list.length; i++) list2.push(list[i])
    list2.forEach((item) => {
        var key = item.getAttribute('mid');
        if (key == null || cmlparalist.indexOf(key) == -1) {
            if (key == null) console.warn('Can not find mid attribute: ', item);
            else console.warn('Can not find "', key, '" in cml: ', item);
            return;
        }
        if (cmli[key] != null) item.value = cmli[key];
        item.addEventListener('input', () => {
            cmli[key] = item.value.length ? item.value : null;
            console.log(new cml(cmli));
        })
    })
}
