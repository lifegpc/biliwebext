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
/// <reference path="define.js" />
/**
 * 将Label与CheckBox关联起来
 */
function assocLabelWithCheckBox() {
    var nc1list = document.getElementsByClassName('nc1');
    var cwslist = document.getElementsByClassName('cws');
    /**@type {HTMLInputElement[]}*/
    var nc1List = [];
    /**@type {HTMLInputElement[]}*/
    var cwsList = [];
    for (var i = 0; i < nc1list.length; i++) {
        nc1List.push(nc1list[i]);
    }
    for (var i = 0; i < cwslist.length; i++) {
        if (cwslist[i].localName == "input") {
            cwsList.push(cwslist[i]);
        } else if (cwslist[i].localName != 'select') {
            console.warn('This object\'s type is invalid: ', cwslist[i]);
        }
    }
    /**
     * 处理每一个元素
     * @param {HTMLInputElement} element 要处理的元素
     */
    function handle(element) {
        var id = element.id;
        if (id == "") {
            console.warn('This element do not have id: ', element);
            return;
        }
        var cla = element.classList;
        /**@type {string} 目标Label元素应有的id*/
        var targetid;
        if (cla.contains("nc1")) {
            targetid = id + "l";
        } else if (cla.contains("cws")) {
            targetid = id.substr(0, id.length - 1) + "l";
        } else {
            console.warn('This element do not have a vaild class: ', element);
            return;
        }
        /**@type {HTMLLabelElement?}*/
        var target = document.getElementById(targetid);
        if (target == null) {
            console.warn('Can not find element has id: ', targetid);
            return;
        }
        target.htmlFor = id;
    }
    nc1List.forEach(handle);
    cwsList.forEach(handle);
}
