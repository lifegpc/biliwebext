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
if (chr) {
    console.log('ContextMenu.js Chrome Ver');
    /**@param {chromeContextMenusProperties} createProperties 菜单项目选项*/
    function temp(createProperties, callback) {
        var contextMenus = window['chrome']['contextMenus'];
        return contextMenus.create(createProperties, callback);
    }
    var createContextMenuChrome = temp;
} else {
    console.log('ContextMenu.js FireFox Ver');
    function createContextMenuFirefox(createProperties, callback) {
        var menus = window['menus'];
        return menus.create(createProperties, callback);
    }
}
