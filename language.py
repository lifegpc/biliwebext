# (C) 2020 lifegpc
# This file is part of biliwebext.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
from polib import pofile
from os.path import exists
from typing import Dict, List
from json import load, dump
from os import mkdir
import sys


LanDict = Dict[str, str]
LanList = List[List[str]]


def getdict(sn: str, lan: str, sn2: str = "webext") -> LanDict:
    """获取翻译词典
    sn 资源名称
    lan 语言代码"""
    if lan == "en":
        fn = f"Language/{sn2}.{sn}.pot"
    else:
        fn = f"Language/{sn2}.{sn}.{lan}.po"
    if not exists(fn):
        print(f'Can not find the language resource file:"{fn}"')
        fn = f'Language/{sn2}.{sn}.pot'
        if not exists(fn):
            print(f'Can not find the language resource file:"{fn}"')
            return -1
    po = pofile(fn, encoding='utf8')
    r = {}
    for i in po.translated_entries():
        r[i.msgctxt] = i.msgstr
    for i in po.untranslated_entries():
        r[i.msgctxt] = i.msgid
    return r


class main():
    _language_list = [('en', 'en'), ('ja', 'ja'), ('zh_CN', 'zh')]
    _temp_dict = {}

    def __init__(self):
        pass

    def run(self):
        with open('language.json', 'r', encoding='utf8') as f:
            obj: LanList = load(f)
        for self._lan, self._lan2 in self._language_list:
            self._out = {}
            for i in obj:
                self._out[i[1]] = {"message": self._getStrLabel(i[0])}
            self._dumpFile()

    def _getStrLabel(self, s: str):
        l = s.split(' ')
        if len(l) != 2:
            raise ValueError(f"{s} is an invalid string.")
        l2 = l[0].split('.', 2)
        if len(l2) == 1:
            sn2 = 'webext'
        else:
            sn2 = l2[0]
        sn = l2[1] if len(l2) > 1 else l2[0]
        key = f"{self._lan}.{sn2}.{sn}"
        if key not in self._temp_dict:
            self._temp_dict[key] = getdict(sn, self._lan, sn2)
        return self._temp_dict[key][l[1]]

    def _dumpFile(self):
        if not exists('Temp'):
            mkdir('Temp')
        if not exists('Temp/_locales'):
            mkdir('Temp/_locales')
        if not exists(f'Temp/_locales/{self._lan2}'):
            mkdir(f'Temp/_locales/{self._lan2}')
        with open(f'Temp/_locales/{self._lan2}/messages.json', 'w', encoding='utf8') as f:
            dump(self._out, f, ensure_ascii=False)


if __name__ == "__main__":
    m = main()
    m.run()
