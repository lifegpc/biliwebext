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
