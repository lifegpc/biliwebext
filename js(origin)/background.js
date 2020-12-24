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
