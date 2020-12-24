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
if (chr) {
    var pageContextId = createContextMenuChrome({
        "title": "Use bili to open this page", "onclick": (info, tab) => {
            console.log(info);
            console.log(tab);
        }
    }, () => {
        console.log('add page context menu');
    });
    if (pageContextId) console.log('page context id: ', pageContextId);
}
