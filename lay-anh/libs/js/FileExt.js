window.FileExt = (function() {
    function getExt(url) {
        // var url = 'https://123.jpg';
        var arrItemUrl = url.split('/');
        var posDot = arrItemUrl[arrItemUrl.length - 1].lastIndexOf('.');
        // console.log('pos dot: ' + posDot);
        // console.log('url: ' + arrItemUrl[arrItemUrl.length - 1]);

        if (posDot >= 0) {
            return arrItemUrl[arrItemUrl.length - 1].substr(posDot, url.length - posDot);

        }

        alert('lỗi không lấy được đuôi');
        return 'noext';


    }

    function removeExt(url) {
        console.log('url extRomove: ' + url);
        var arrExt = ['.jpg', '.png', '.jpeg', '.webp', '.gif'];
        var arrPosExtFirst = [];

        for (const ext of arrExt) {
            if (url.indexOf(ext) >= 0) {
                arrPosExtFirst.push([ext, url.indexOf(ext)]);
            }
        }

        let indexExt = arrPosExtFirst.reduce(function(indexMin, extItem, currentIndex, arr) {
            if (extItem[1] >= 0 && arr[indexMin][1] > extItem[1]) {
                return currentIndex;
            }
            return indexMin;
        }, 0);

        let posLast = arrPosExtFirst[indexExt][1] + arrPosExtFirst[indexExt][0].length;
        // console.log('last ext: ' + arrPosExtFirst[indexExt][0]);
        let urlNew = url.substr(0, posLast);
        return urlNew;
    }

    return {
        getExt: getExt,
        removeExt: removeExt
    }
}());