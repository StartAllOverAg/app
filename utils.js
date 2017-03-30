var utils = (function () {
    /**
     * [likeArray ������ת��Ϊ����]
     * @param  {[object]} list [Ҫת����������]
     * @return [Array]        [ת�����������]
     */
    function likeArray(list) {
        try { // ����һ
            return [].slice.call(list, 0); // �����ݣ�ie8- Ԫ�ؼ��Ϻͽڵ㼯�ϣ� ����call�����ı�slice�е�this
        } catch (e) { // ������ ����д��
            var arr = [];
            for (var i = 0; i < list.length; i++) { // ���������е�ÿһ�� ȡ�������ηŵ� arr�����������
                arr.push(list[i]);
            }
            return arr;
        }
    }

    /**
     * [toJson ��JSON�ַ���ת��ΪJSON����]
     * @return [object] [JSON����]
     */
    function toJson(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }

    /**
     *   ��ȡdocument�ĵ���һЩ��ģ����ʽ����ֵ ��ȡ������
     * @param attr �������� ��ֻ��һ�������ǻ�ȡ��
     * @param val  ���õ�����ֵ
     * @returns {val}
     */
    function win(attr, val) {
        if (typeof val === 'undefined') { // ����ڶ�������û�����ǻ�ȡֵ
            return document.documentElement[attr] || document.body[attr];
        }
        // ������� ����ֵ
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

    /**
     * offset ��ȡ��ǰԪ�ؾ���body��ƫ�ƺ���ƫ�Ƶľ���
     * @param ele
     * @returns {left: l,top:t}
     */
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var par = ele.offsetParent;
        while (par && par.nodeName.toUpperCase() != 'BODY'){
            l += par.clientLeft + par.offsetLeft;
            t += par.clientTop + par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    }

    /**
     * getCss ��ȡԪ����ʽ
     * @param ele (ָ��Ԫ��)
     * @param attr (��ʽ����)
     */
    function getCss(ele, attr) {
//        window.getComputedStyle
        var val;
        if("getComputedStyle" in window){ // ���window��������������Ǿ���
            val = window.getComputedStyle(ele, null)[attr];
        } else { //ie Low currentStyle
            //  oDiv.currentStyle.filter  "alpha(opacity=80)"
            if(attr === 'opacity'){ // ie8 low
                val =  ele.currentStyle.filter; // "alpha(opacity=80)"
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                // �ж�ie����û������͸���� ���û�� Ĭ�Ϸ���1
                val = reg.test(val)? (reg.exec(val)[1])/100 : 1; // ["alpha(opacity=80)", "80"]
            } else {
                val = ele.currentStyle[attr];
            }

        }
//           100px -100px -1.23px   12rem  1em  block
        // �Ѵ���λ��ȥ�� ��������ȡ���� ��ʹ���ַ������� ��ҲҪ��ȡ�������ڷ��� Ԥ�������ۼ�ʹ��
        var regs = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/;
        return regs.test(val)? parseFloat(val) : val;
    }

    /**
     * setCss ��Ԫ��������ʽ
     * @param ele   ��Ҫ���õ�Ԫ�أ�
     * @param attr  ��Ҫ���õ����ԣ�
     * @param val   ����ʽ����ֵ��
     */

    function setCss(ele, attr, val) {
        if (attr === 'opacity') { // ͸���ȴ���
            ele.style['opacity'] = val; // ���������
            ele.style['filter'] = 'alpha(opacity=' + val * 100 + ')'; // ie �Ͱ汾
            return;
        }
        if(attr === 'float'){
            ele.style.cssFloat = val; // �ϰ汾 ff
            ele.style.styleFloat = val; // ie �Ͱ汾
            return;
        }
        // �������Щ���� Ϊȷ�� ���ݽ�����ֵ �е�λ
        var reg = /^width|height|top|bottom|left|right|((margin|padding)(Top|Left|Bottom|Right)?)$/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val += 'px';
            }
        }
        ele.style[attr] = val;
    }

    return { // ��д�õķ��� �ŵ���������� ���ҷ��ص�����
        likeArray: likeArray,
        toJson: toJson,
        win: win,
        offset: offset,
        getCss: getCss,
        setCss: setCss
    }
})();
