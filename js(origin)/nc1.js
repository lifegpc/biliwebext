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
 * 处理多选一
 * @param {cml} cli 
 */
function dealWithnc1(cli) {
    /**@type {HTMLCollectionOf<HTMLInputElement>} */
    var list = document.getElementsByClassName('nc1');
    var list2 = [];
    /**@type {Object.<string, HTMLInputElement[]>} */
    var map = {};
    for (var i = 0; i < list.length; i++) {
        var a = list[i].getAttribute('group');
        if (a == null) {
            console.warn('Can not find group attribute: ', list[i]);
            continue;
        }
        if (list2.indexOf(a) > -1) {
            map[a].push(list[i]);
        } else {
            list2.push(a);
            map[a] = [list[i]];
        }
    }
    list2.forEach((key) => {
        var hlist = map[key];
        hlist.forEach((value) => {
            var mid = value.getAttribute('mid');
            if (mid == null || cmlparalist.indexOf(mid) == -1) {
                if (mid == null) console.warn('Can not find mid attribute: ', value);
                else console.warn('Can not find "', mid, '" in cml: ', value);
                return;
            }
            value.addEventListener('input', () => {
                if (value.checked) {
                    cli[mid] = "";
                    hlist.forEach((value2) => {
                        if (value == value2) return;
                        var mid = value2.getAttribute('mid');
                        if (mid == null || cmlparalist.indexOf(mid) == -1) {
                            if (mid == null) console.warn('Can not find mid attribute: ', value2);
                            else console.warn('Can not find "', mid, '" in cml: ', value2);
                            return;
                        }
                        value2.checked = false;
                        cli[mid] = null;
                    })
                } else cli[mid] = null;
                console.log(new cml(cli));
            })
            if (cli[mid] != null) value.checked = true;
        })
    })
}
