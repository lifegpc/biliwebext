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
/// <reference path="cws.js" />
/// <reference path="error.js" />
/// <reference path="nc1.js" />
/// <reference path="labelassoc.js" />
/// <reference path="simpleinput.js" />
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
    /**@type {HTMLInputElement} 使用aria2c时单个服务器最大连接数*/
    var armcser = document.getElementById('armcser');
    armcser.addEventListener('input', () => {
        if (armcser.value.length) {
            if (!cmli.setAx(armcser.valueAsNumber)) {
                cmli["ax"] = null;
                changeElementColorByError(armcser, true);
            } else changeElementColorByError(armcser, false);
        } else {
            cmli["ax"] = null;
            changeElementColorByError(armcser, false);
        }
        console.log(new cml(cmli));
    })
    /**@type {HTMLInputElement} 使用aria2c时单个文件最大连接数。*/
    var armcfi = document.getElementById('armcfi');
    armcfi.addEventListener('input', () => {
        if (armcfi.value.length) {
            if (!cmli.setAs(armcfi.valueAsNumber)) {
                cmli["as"] = null;
                changeElementColorByError(armcfi, true);
            } else changeElementColorByError(armcfi, false);
        } else {
            cmli["as"] = null;
            changeElementColorByError(armcfi, false);
        }
        console.log(new cml(cmli));
    })
    /**@type {HTMLInputElement} 使用aria2c时文件分片大小*/
    var arfisz = document.getElementById('arfisz');
    arfisz.addEventListener('input', () => {
        if (arfisz.value.length) {
            if (!cmli.setAk(arfisz.valueAsNumber)) {
                cmli["ak"] = null;
                changeElementColorByError(arfisz, true);
            } else changeElementColorByError(arfisz, false);
        } else {
            cmli["ak"] = null;
            changeElementColorByError(arfisz, false);
        }
        console.log(new cml(cmli));
    })
    /**@type {HTMLInputElement} 在使用aria2c时最大总体速度*/
    var armaxsp = document.getElementById('armaxsp');
    armaxsp.addEventListener('input', () => {
        if (armaxsp.value.length) {
            if (!cmli.setMs(armaxsp.value)) {
                cmli["ms"] = null;
                changeElementColorByError(armaxsp, true);
            } else changeElementColorByError(armaxsp, false);
        } else {
            cmli["ms"] = null;
            changeElementColorByError(armaxsp, false);
        }
        console.log(new cml(cmli));
    })
    /**@type {HTMLInputElement} 下载全弹幕时两次抓取之间的天数*/
    var jtint = document.getElementById('jtint');
    jtint.addEventListener('input', () => {
        if (jtint.value.length) {
            if (!cmli.setJt(jtint.value)) {
                cmli["jt"] = null;
                changeElementColorByError(jtint, true);
            } else changeElementColorByError(jtint, false);
        } else {
            cmli["jt"] = null;
            changeElementColorByError(jtint, false);
        }
        console.log(new cml(cmli));
    })
    /**@type {HTMLInputElement} 下载全弹幕时且视频为番剧时抓取起始日期的默认值*/
    var jtsdate = document.getElementById('jtsdate');
    jtsdate.addEventListener('input', () => {
        if (jtsdate.value.length) {
            if (!cmli.setJts(jtsdate.value)) {
                cmli["jts"] = null;
                changeElementColorByError(jtsdate, true);
            } else changeElementColorByError(jtsdate, false);
        } else {
            cmli["jts"] = null;
            changeElementColorByError(jtsdate, false);
        }
        console.log(new cml(cmli));
    })
    document.getElementById('endownmaxql').innerText = i18nGetMessage("endownmaxq");
    document.getElementById('didownmaxql').innerText = i18nGetMessage("didownmaxq");
    document.getElementById('encodownl').innerText = i18nGetMessage('encodown');
    document.getElementById('dicodownl').innerText = i18nGetMessage('dicodown');
    document.getElementById('enfilterl').innerText = i18nGetMessage('enfilter');
    document.getElementById('difilterl').innerText = i18nGetMessage('difilter');
    document.getElementById('endelulfl').innerText = i18nGetMessage('endelulf');
    document.getElementById('didelulfl').innerText = i18nGetMessage('didelulf');
    document.getElementById('enredownl').innerText = i18nGetMessage('enredown');
    document.getElementById('diredownl').innerText = i18nGetMessage('diredown');
    document.getElementById('overwril').innerText = i18nGetMessage('overwri');
    document.getElementById('noverwril').innerText = i18nGetMessage('noverwri');
    document.getElementById('useffl').innerText = i18nGetMessage('useff');
    document.getElementById('nuseffl').innerText = i18nGetMessage('nuseff');
    document.getElementById('prefermcl').innerText = i18nGetMessage('prefermc');
    document.getElementById('usearl').innerText = i18nGetMessage('usear');
    document.getElementById('nusearl').innerText = i18nGetMessage('nusear');
    document.getElementById('armcserl').innerText = i18nGetMessageWithReplace('armcser', { 'value': '1-16' });
    document.getElementById('armcfil').innerText = i18nGetMessageWithReplace('armcfi', { 'value': '1-*' });
    document.getElementById('arfiszl').innerText = i18nGetMessageWithReplace('arfisz', { 'value1': 'M', 'value2': '1-1024' })
    document.getElementById('arusebkl').innerText = i18nGetMessage('arusebk');
    document.getElementById('arnusebkl').innerText = i18nGetMessage('arnusebk');
    document.getElementById('arallocl').innerText = i18nGetMessage('aralloc');
    document.getElementById('enusevdl').innerText = i18nGetMessage('enusevd');
    document.getElementById('diusevdl').innerText = i18nGetMessage('diusevd');
    document.getElementById('enaddmetal').innerText = i18nGetMessage('enaddmeta');
    document.getElementById('diaddmetal').innerText = i18nGetMessage('diaddmeta');
    document.getElementById('armaxspl').innerText = i18nGetMessage('armaxsp');
    document.getElementById('enallpartl').innerText = i18nGetMessage('enallpart');
    document.getElementById('diallpartl').innerText = i18nGetMessage('diallpart');
    document.getElementById('httpprol').innerText = i18nGetMessage('httppro') + i18nGetMessage('noeffar');
    document.getElementById('httpsprol').innerText = i18nGetMessage('httpspro') + i18nGetMessage('noeffar');
    document.getElementById('jtintl').innerText = i18nGetMessageWithReplace('jtint', { 'value': '1-365' });
    document.getElementById('jtsdatel').innerText = i18nGetMessage('jtsdate');
    dealWithnc1(cmli);
    dealWithcws(cmli);
    dealWithSimpleInput(cmli);
    assocLabelWithCheckBox();
}
