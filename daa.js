(function () {
    var oUls = document.getElementsByTagName('ul');
    var container = document.getElementById('container');
    // 获取到所有 container的图片
    var oImgs = container.getElementsByTagName('img');
    // 将ul集合 转化为 数组
    var oUlArr = utils.likeArray(oUls);
    var data;
    // 请求数据
    var xhr = new XMLHttpRequest;
    // 避免缓存数据 通过随机数 会每次都发送一个新的请求 问号后面查询字符串 有些时候后台会根据 问号后面查询字符串参数 做处理 判断
    xhr.open('get', 'data.txt?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        // 200 201 202 都代表请求成功  通过正则匹配 只要是2开头的三位数 都是请求ok
        if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
            data = utils.toJson(this.responseText); // 将数据转化为JSON对象
            bindData();
        }
    };
    xhr.send(null);
    // 绑定数据 有多少个对象 就创建多少个li
    function bindData() {
        for (var i = 0; i < 50; i++) {
            // 获取0-7之间随机整数 Math.round(Math.random()*（7-0）+0);
            // 作为获取数据的索引
            var ind = Math.round(Math.random()*7);
            var curData = data[ind];

            // 创建li
            var oLi = document.createElement('li');
            // 创建a
            var oa = document.createElement('a');
            oa.href = 'javascript:;';
            oa.innerHTML = '采集';
            oLi.appendChild(oa);
            // 创建 img
            var oImg = document.createElement('img');
            //给图片设置随机高 200 - 350
            oImg.style.height = Math.round(Math.random() * 150 + 200) + 'px';

            // 将图片数据绑定到 每一个img的html属性上
            oImg.setAttribute('data-real', curData.src);

            oLi.appendChild(oImg);
            // 创建 p
            var op = document.createElement('p');
            op.innerHTML = curData.title;
            oLi.appendChild(op);
            oUlArr.sort(function (a, b) {
                return a.offsetHeight - b.offsetHeight;
            });
            // 排完序后 集合中第一个 是高度 最小
            // 将当前这一轮创建好的 li img 放到 排序后 第一项 也就是 高度最小的那个ul里
            oUlArr[0].appendChild(oLi);
        }
    }
    delayImgs();
    window.onscroll = function () {
        delayImgs();
    };
    // 延迟加载图片
    function delayImgs() {
        winH = utils.win('clientHeight');
        for(var i = 0; i < oImgs.length; i++){
            checkImg(oImgs[i]); // 遍历每一个图片 检测是够符合加载标准
        }
    }
    // 检测图片
    var winH;
    function checkImg(img) {
        var sTop = utils.win('scrollTop');
        var imgHeight = img.offsetHeight; // 自身高度
        var imgTop = utils.offset(img).top; // img上偏移
        if(winH+sTop >= imgHeight + imgTop){
            var imgSrc = img.getAttribute('data-real');
            // 检测资源有效性
            var Img = document.createElement('img');
            Img.src = imgSrc;
            Img.onload = function () {
                img.src = imgSrc;
                Img = null;
                fedeImg(img)
            }
        }
    }
    function fadeImg(img){

    }
})();


