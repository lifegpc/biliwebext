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
 * 修改背景颜色
 * @param {HTMLElement} element 网页元素
 * @param {boolean} isError 是否有错误
 */
function changeElementColorByError(element, isError) {
    if (isError) {
        if (!element.classList.contains("error")) element.classList.add(["error"]);
    } else {
        if (element.classList.contains("error")) element.classList.remove(["error"]);
    }
}
