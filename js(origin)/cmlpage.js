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
/// <reference path="i18n.js" />
/// <reference path="cml.js" />
/// <reference path="error.js" />
/// <reference path="nc1.js" />
/**
 * 命令行设置页面准备
 * @param {cml} cmli 命令行设置
 */
function addCmlPage(cmli) {
    document.getElementById('downmethodl').innerText = i18nGetMessage("downmethod");
    /**@type {HTMLInputElement}*/
    var downmethod = document.getElementById('downmethod');
    if (cmli.d != null) downmethod.value = cmli.d;
    downmethod.addEventListener('input', () => {
        if (downmethod.value.length) {
            var value = downmethod.valueAsNumber;
            cmli.d = value ? value : null;
        } else cmli.d = null;
        console.log(new cml(cmli));
    })
    document.getElementById('partnumberl').innerText = i18nGetMessage("partnumber");
    /**@type {HTMLInputElement}*/
    var partnumber = document.getElementById('partnumber');
    if (cmli.p != null) partnumber.value = cmli.p;
    partnumber.addEventListener('input', () => {
        if (partnumber.value.length) {
            if (!cmli.setP(partnumber.value)) {
                cmli.p = null;
                changeElementColorByError(partnumber, true);
            } else changeElementColorByError(partnumber, false);
        } else {
            cmli.p = null;
            changeElementColorByError(partnumber, false);
        }
        console.log(new cml(cmli));
    })
    document.getElementById('endownmaxql').innerText = i18nGetMessage("endownmaxq");
    document.getElementById('didownmaxql').innerText = i18nGetMessage("didownmaxq");
    document.getElementById('encodownl').innerText = i18nGetMessage('encodown');
    document.getElementById('dicodownl').innerText = i18nGetMessage('dicodown');
    document.getElementById('enfilterl').innerText = i18nGetMessage('enfilter');
    document.getElementById('difilterl').innerText = i18nGetMessage('difilter');
    dealWithnc1(cmli);
}
