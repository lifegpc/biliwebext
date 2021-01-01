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
 * Deal with Checkbox with Select
 * @param {cml} cmli
 */
function dealWithcws(cmli) {
    /**
     * 写入数据
     * @param {string} key 写入到cml的key
     * @param {string} value 值
     */
    function setValue(key, value) {
        if (key == "mc") cmli.setMc(value);
        else if (key == "fa") cmli.setFa(value)
        else cmli[key] = value;
    }
    var list = document.getElementsByClassName('cws');
    /**@type {string[]} */
    var list2 = [];
    /**@type {Object.<string, HTMLInputElement>} */
    var map = {};
    /**@type {Object.<string, HTMLSelectElement>} */
    var map2 = {};
    for (var i = 0; i < list.length; i++) {
        var a = list[i].getAttribute('group');
        if (a == null) {
            console.warn('Can not find group attribute: ', list[i]);
            continue;
        }
        if (["select", "input"].indexOf(list[i].localName) == -1) continue;
        if (list2.indexOf(a) == -1) list2.push(a);
        if (!map.hasOwnProperty(a) && list[i].localName == "input") map[a] = list[i];
        else if (list[i].localName == "input") {
            console.warn('Have multiply element in group: ', list[i]);
        }
        if (!map2.hasOwnProperty(a) && list[i].localName == "select") map2[a] = list[i];
        else if (list[i].localName == "select") {
            console.warn('Have multiply element in group: ', list[i]);
        }
    }
    list2.forEach((key) => {
        if (!map.hasOwnProperty(key) || !map2.hasOwnProperty(key)) {
            console.warn('This key do not have enough element: ', key);
            return;
        }
        var input = map[key];
        var select = map2[key];
        input.checked ? select.disabled = false : select.disabled = true;
        input.addEventListener('input', () => {
            if (input.checked) {
                select.disabled = false;
                setValue(key, select.value);
            } else {
                select.disabled = true;
                cmli[key] = null;
            }
            console.log(new cml(cmli));
        });
        select.addEventListener('input', () => {
            setValue(key, select.value);
            console.log(new cml(cmli));
        })
    })
}
