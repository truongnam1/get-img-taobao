let div = `
<div id="containerGetImg">
        <div class="img-ext-item" id="ext-control">
            <div class="img-ext-item-control">
                <button id="getImgTopLeft">Get trái trên</button>
                <button id="getImgTop">Get trên</button>
                <button id="getImgBottom">Get dưới</button>

            </div>
            <div class="img-ext-item-control">
                <button id="DlImgTopLeft">Tải trái trên</button>
                <button id="DlImgTop">Tải trên</button>
                <button id="DlImgBottom">Tải dưới</button>
            </div>
        </div>
        <div class="img-ext-item" id="ext-view">
            <div class="img-ext-item_view">
                <span class="label">ảnh trái trên</span>
                <span class="img-ext-item-view" id="amountTopLeft">0</span>
                <span class="hide" id="statusDlTopLeft"></span>
            </div>
            <div class="img-ext-item_view">
                <span class="label">ảnh trên</span>
                <span class="img-ext-item-view" id="amountTop">0</span>
                <span class="hide" id="statusDlTop"></span>

            </div>
            <div class="img-ext-item_view">
                <span class="label">ảnh dưới</span>
                <span class="img-ext-item-view" id="amountBottom">0</span>
                <span class="hide" id="statusDlBottom"></span>
            </div>
        </div>
    </div>
`;

document.body.innerHTML += div;


var arrItemTop = [];
var arrItemBottom = [];
var arrItemTopLeft = [];
// ............

$("#getImgTop").on('click', function() {
    arrItemTop = getImgTaoBaoTop();
    setAmount("#amountTop", arrItemTop);

});
$("#getImgBottom").on("click", function() {
    arrItemBottom = getImgTaoBaoBottom();
    setAmount("#amountBottom", arrItemBottom);

});

$("#getImgTopLeft").on("click", function() {
    arrItemTopLeft = getImgTaoBaoTopLeft();
    setAmount("#amountTopLeft", arrItemTopLeft);

});

function setAmount(element, arrItem, duration = 200) {
    document.querySelector(element).innerHTML = 0;
    setTimeout(function() {
        document.querySelector(element).innerHTML = arrItem.length
    }, duration);
    console.log('set amount');
}

//tải trên
$("#DlImgTop").on("click", async function() {
    if (arrItemTop.length > 0) {
        await DownloadTB.statDownload("#statusDlTop");

        if (arrItemTop.length >= 3) {
            // await FileZip.CreateZip(arrItemTop);
            await FileZip.CreateZip(arrItemTop, "#statusDlTop");


        } else {
            arrItemTop.forEach(item => {
                // download(item);
                DownloadTB.download(item);

            });
        }
        await DownloadTB.endDownload("#statusDlTop");


    } else {
        alert("khong co j de tai het");
    }
});

//tải dưới
$("#DlImgBottom").on("click", async function() {
    if (arrItemBottom.length > 0) {
        await DownloadTB.statDownload("#statusDlBottom");
        if (arrItemBottom.length >= 3) {
            console.log('trên 3 ảnh');
            // await FileZip.CreateZip(arrItemBottom);
            await FileZip.CreateZip(arrItemBottom, "#statusDlBottom");

        } else {
            console.log('ít hơn 3 ảnh');
            arrItemBottom.forEach(item => {
                // download(item);
                DownloadTB.download(item);
            });
        }
        await DownloadTB.endDownload("#statusDlBottom");

    } else {
        alert("khong co j de tai het");
    }
});

//tải trên trái
$("#DlImgTopLeft").on("click", async function() {
    if (arrItemTopLeft.length > 0) {
        await DownloadTB.statDownload("#statusDlTopLeft");

        if (arrItemTopLeft.length >= 3) {
            await FileZip.CreateZip(arrItemTopLeft, "#statusDlTopLeft");
        } else {
            arrItemTopLeft.forEach(item => {
                // download(item);
                DownloadTB.download(item);

            });
        }
        await DownloadTB.endDownload("#statusDlTopLeft");

    } else {
        alert("khong co j de tai het");
    }
});

function getImgTaoBaoTop() {

    var listLi = document.querySelectorAll(".J_TSaleProp.tb-img li a");
    var arrUrlImage = [];
    var strUrlImage = "";
    console.log(listLi);
    listLi.forEach(element => {
        console.log('element: ' + element)
        var item = element.getAttribute('style');
        console.log('item: ' + item);
        if (item) {

            var start = item.indexOf("//");
            var end = item.indexOf(')');
            item = item.substr(start + 2, end - start - 2);

            item = FileExt.removeExt(item);
            // console.log("https://" + item)
            arrUrlImage.push("https://" + item);
            strUrlImage += "https://" + item + "\n";
        }


    });
    console.log(strUrlImage)
    return arrUrlImage;
}

function getImgTaoBaoBottom() {
    var listLi = document.querySelectorAll("#description img");
    var arrUrlImage = [];
    var strUrlImage = "";
    console.log(listLi);
    listLi.forEach(element => {
        var item = element.getAttribute('src');
        // console.log(element);
        if (item) {
            if (item.indexOf("http") == -1) {
                item = element.getAttribute("data-ks-lazyload");
            }

            item = FileExt.removeExt(item);
            arrUrlImage.push(item);
            // strUrlImage += item + '\n';
        }
    });
    // console.log(strUrlImage);
    console.log(arrUrlImage);
    return arrUrlImage;
}

function getImgTaoBaoTopLeft() {
    var listLi = document.querySelectorAll("#J_UlThumb img");
    var arrUrlImage = [];
    var strUrlImage = "";
    console.log(listLi);
    listLi.forEach(element => {
        var item = element.getAttribute('src');

        if (item.indexOf("//") == 0) {
            item = "https:" + item;
        }

        item = FileExt.removeExt(item);
        // console.log("https://" + item)
        arrUrlImage.push(item);
        strUrlImage += item + "\n";


    });
    console.log(strUrlImage);
    console.log(arrUrlImage);

    return arrUrlImage;
}

function getBlobFile(url) {
    axios({
            url: url,
            method: 'GET',
            header: {
                "access-control-allow-origin": "*",
                // 'Access-Control-Allow-Origin': 'http://localhost:5500',
                'Access-Control-Allow-Credentials': 'true'
            },
            responseType: 'blob'
        })
        .then((response) => {
            console.log(response.data.type)

            var fileBlob = new Blob([response.data]);
            console.log(fileBlob);

            return fileBlob;
        })
}

function download(urlDl) {
    console.log("url:" + urlDl);
    axios({
            url: urlDl,
            method: 'GET',
            header: {
                "access-control-allow-origin": "*",
                // 'Access-Control-Allow-Origin': 'http://localhost:5500',
                'Access-Control-Allow-Credentials': 'true'
            },
            responseType: 'blob'
        })
        .then((response) => {
            // console.log([response.data])
            // console.log(response.data)
            console.log(response.data.type)
                // console.log(response)
            var fileBlob = new Blob([response.data]);
            // const url = window.URL.createObjectURL(new Blob([response.data]), { "type": response.data.type });
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', "");
            // document.body.appendChild(link);
            // link.click();
            saveAs(fileBlob, "fileanh-" + new Date().getTime() + FileExt.getExt(urlDl));
            console.log(url)
            console.log("ok")

        })


}

function randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}