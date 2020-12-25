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
from getopt import getopt
import sys
from typing import List
from os.path import exists
from os import listdir, remove, system, mkdir
from requests import Session
from platform import system as systemname
from re import search


def ph():
    print("prepare.py [-u] [-c] [-j <java location>] [--chrome/--firefox] [file list]")

def gopt(args: List[str]):
    re = getopt(args, 'h?ucj:', ['help', 'chrome', 'firefox'])
    rr = re[0]
    r = {}
    h = False
    for i in rr:
        if i[0] == '-h' or i[0] == '-?' or i[0] == '--help':
            h = True
        if i[0] == '-u':
            r['u'] = True
        if i[0] == '-c':
            r['c'] = True
        if i[0] == '-j' and not 'j' in r:
            r['j'] = i[1]
        if i[0] == '--chrome' and not 'ch' in r:
            r['ch'] = True
        if i[0] == '--firefox' and not 'ch' in r:
            r['ch'] = False
    if h:
        ph()
        exit()
    return r, re[1]


class main:
    _r: Session = None
    _upa: bool = False
    _onlyc: bool = False
    _java: str = "java"
    _chrome: bool = True

    def __init__(self, ip: dict, fl: List[str]):
        if 'u' in ip:
            self._upa = True
        if 'c' in ip:
            self._onlyc = True
        if 'j' in ip:
            self._java = ip['j']
        if 'ch' in ip:
            self._chrome = ip['ch']
        if not exists('js(origin)/'):
            raise FileNotFoundError('js(origin)/')
        if len(fl) == 0:
            fl = listdir('js(origin)/')
            if 'define.js' in fl:
                fl.remove('define.js')
        self._r = Session()
        if not self._onlyc:
            if not self._check_java():
                raise FileNotFoundError('Can not find java.')
            tag = self._get_compiler_tag()
            self._check(
                'compiler.jar', f"https://repo1.maven.org/maven2/com/google/javascript/closure-compiler/{tag}/closure-compiler-{tag}.jar", tag)
            tag = self._get_tag(
                'https://api.github.com/repos/dankogai/js-base64/tags')
        else:
            if not self._check_java():
                raise FileNotFoundError('Can not find java.')
            if not exists('compiler.jar'):
                raise FileNotFoundError('compiler.jar')
        for fn in fl:
            fn2 = f'js(origin)/{fn}'
            if not exists(fn2):
                raise FileNotFoundError(fn2)
        self._com_javascript(fl)

    def _check(self, fn: str, uri: str, tag: str = ""):
        if exists(fn) and self._upa:
            remove(fn)
        if not exists(fn):
            if tag == "":
                print(f'INFO: {uri} -> {fn}')
            else:
                print(f'INFO: {uri} -> {fn} (Tag: {tag})')
            self._get_file(uri, fn)

    def _check_with_com(self, fn: str, uri: str, tag: str):
        if exists(fn) and self._upa:
            remove(fn)
        if not exists(fn):
            if tag == "":
                print(f'INFO: {uri} -> {fn}')
            else:
                print(f'INFO: {uri} -> {fn} (Tag: {tag})')
            fn2 = f"{fn}.tmp"
            self._get_file(uri, fn2)
            if system(f'{self._java} -jar compiler.jar --js "{fn2}" --js_output_file "{fn}"') != 0:
                raise Exception('Error in compiler.')
            remove(fn2)

    def _get_tag(self, uri: str) -> str:
        re = self._r.get(uri)
        re = re.json()
        return re[0]['name']

    def _get_compiler_tag(self) -> str:
        re = self._r.head(
            'https://mvnrepository.com/artifact/com.google.javascript/closure-compiler/latest')
        uri = re.headers['Location']
        rs = search(
            r'^https://mvnrepository\.com/artifact/com\.google\.javascript/closure-compiler/(.+)', uri)
        return rs.groups()[0]

    def _get_file(self, uri: str, fn: str):
        re = self._r.get(uri, stream=True)
        with open(fn, 'ab') as f:
            for c in re.iter_content(1024):
                if c:
                    f.write(c)

    def _check_java(self) -> bool:
        sn = systemname()
        s = " 2>&0 1>&0"
        if sn == "Linux":
            s = " > /dev/null 2>&1"
        if system(f"{self._java} -h{s}") == 0:
            return True
        return False

    def _com_javascript(self, fl: List[str]):
        print(f'INFO: compiler')
        chrome = 'true' if self._chrome else 'false'
        jsf = ' --js "js(origin)/define.js"'
        for fn in fl:
            jsf = jsf + f' --js "js(origin)/{fn}"'
        if system(f'{self._java} -jar compiler.jar{jsf} --compilation_level ADVANCED_OPTIMIZATIONS -D chr={chrome} --js_output_file "js/{fn}" --create_source_map "js/{fn}.map"') != 0:
            raise Exception('Error in compiler.')


if __name__ == "__main__":
    if len(sys.argv) == 1:
        main({}, [])
    else:
        ip, fl = gopt(sys.argv[1:])
        main(ip, fl)
