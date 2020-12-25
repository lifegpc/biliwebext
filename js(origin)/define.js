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
/**@define {boolean} 指定扩展类型*/
const chr = true;
/**
 * Chrome 静音原因
 * https://developer.chrome.com/docs/extensions/reference/tabs/#type-MutedInfoReason
 * @typedef {"user"|"capture"|"extension"} chromeMutedInfoReason
 */
/**
 * Chrome 静音信息
 * https://developer.chrome.com/docs/extensions/reference/tabs/#type-MutedInfo
 * @typedef {object} chromeMutedInfo
 * @prop {string?} extensionId 导致状态改变的扩展ID。
 * @prop {boolean} muted 是否被静音
 * @prop {chromeMutedInfoReason} reason 状态改变的原因。
 */
/**
 * Chrome 标签页状态
 * https://developer.chrome.com/docs/extensions/reference/tabs/#type-TabStatus
 * @typedef {"unloaded"|"loading"|"complete"} chromeTabStatus
 */
/**
 * Chrome 标签页对象
 * https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab
 * @typedef {object} chromeTab
 * @prop {boolean} active 标签是否被激活。不意味着窗口已被聚焦。
 * @prop {boolean?} audible 在过去几秒内是否在播放音频。
 * @prop {boolean} autoDiscardable 是否在RAM不足时自动丢弃内容。
 * @prop {boolean} discarded 该标签页目前是否被丢弃。
 * @prop {string?} favIconUrl 标签页图标URL。
 * @prop {number} groupId 标签页所在组ID。
 * @prop {number?} height 标签页高度，单位px。
 * @prop {boolean} highlighted 标签页是否高亮显示。
 * @prop {number?} id 标签页ID。
 * @prop {boolean} incognito 是否在隐身窗口中。
 * @prop {number} index 在该窗口中的索引。从0开始。
 * @prop {chromeMutedInfo?} mutedInfo 标签页的静音状态。
 * @prop {number?} openerTabId 打开该标签页的源标签页ID。
 * @prop {string?} pendingUrl 在提交前标签页导航到的URL。
 * @prop {boolean} pinned 标签页是否被固定。
 * @prop {boolean} selected 标签页是否被选中。
 * @prop {string?} sessionId 当使用Session API打开标签页时的唯一Session ID。
 * @prop {chromeTabStatus?} status 标签页加载状态。
 * @prop {string?} title 标签页标题。
 * @prop {string?} url 标签页最后一次提交URL。
 * @prop {number?} width 标签页宽度，单位px。
 * @prop {number} windowId 含有该标签页的窗口ID。
*/
/**
 * Chrome Context Menus 回调函数
 * @typedef {(info: object, tab: chromeTab) => void} chromeContextMenusCallback
 */
/**
 * Chrome Context Menus Context Type
 * https://developer.chrome.com/docs/extensions/reference/contextMenus/#type-ContextType
 * @typedef {"all"|"page"|"frame"|"selection"|"link"|"editable"|"image"|"video"|"audio"|"launcher"|"browser_action"|"page_action"|"action"} chromeContextMenusType
 */
/**
 * Chrome Context Menus Item Type
 * https://developer.chrome.com/docs/extensions/reference/contextMenus/#type-ItemType
 * @typedef {"normal"|"checkbox"|"radio"|"separator"} chromeContextMenusItemType
 */
/**
 * Chrome Context Menus 创建设置
 * https://developer.chrome.com/docs/extensions/reference/contextMenus/#method-create
 * @typedef {Object} chromeContextMenusProperties
 * @prop {boolean?} checked checkbox或者radio按钮的初始状态
 * @prop {chromeContextMenusType?} contexts 菜单选项类型，默认page
 * @prop {Array<string>?} documentUrlPatterns 匹配的URI链接。https://developer.chrome.com/docs/extensions/match_patterns/
 * @prop {boolean?} enabled 是否启用该菜单选项。默认是
 * @prop {string?} id 菜单选项id
 * @prop {chromeContextMenusCallback?} onclick 此菜单选项被单击时触发
 * @prop {any?} parentId 父菜单选项ID
 * @prop {Array<string>?} targetUrlPatterns 与documentUrlPatterns类似，但过滤的是元素标签。
 * @prop {string?} title 选项标题，除类型是separator外，必须有该参数。当类型是selection事，可以使用%s代表选中的文本。
 * @prop {chromeContextMenusItemType?} type 菜单选项类型。默认为normal。
 * @prop {boolean?} visible 选项是否可见。
*/
/**
 * 插件设置
 * @typedef {Object} ExtensionSettings
 * @prop {string} version 程序版本
 * @prop {object} cml 命令行相关参数设置
 */
