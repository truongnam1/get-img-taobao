window.FileZip = (function() {
    this.CreateZip = async function(arrItem, elementStatus = null) {
        var zip = new JSZip();
        var img = zip.folder("images");
        console.log('add file');
        var arrAwait = [];
        var arrStrUrl = '';
        var count = 0;
        var lengthArr = arrItem.length;
        arrStrUrl = 'link: ' + window.location.href + '\n' + 'số lượng: ' + arrItem.length + '\n' + 'hi hi hi' + arrStrUrl + '\n' + arrStrUrl;
        console.log('element status ' + elementStatus);
        if (elementStatus) {

            updateStatusDl(elementStatus, count, lengthArr);
        }
        for (const url of arrItem) {
            arrStrUrl += url + '\n';
            arrAwait.push(
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
                        // console.log(response);
                    console.log(url);
                    if (elementStatus) {
                        updateStatusDl(elementStatus, ++count, lengthArr);
                    }
                    var fileBlob = new Blob([response.data]);
                    console.log(fileBlob);
                    img.file(new Date().getTime() + "-" + randomStr(10) + FileExt.getExt(url), fileBlob, { base64: true });
                })
            );
        }

        await Promise.all(arrAwait);
        await zip.file('data.txt', arrStrUrl);


        console.log('xong add file');
        return saveZip(zip);

    }

    function saveZip(zip) {
        console.log('tao zip');
        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                console.log('tai ve');

                saveAs(content, "fileanh-" + md5(window.location.href) + "-" + new Date().getTime() + ".zip");
            });
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

    this.updateStatusDl = function(element, count, lengthArr) {
        // $(element).val('đếm ' + count);
        var ele = document.querySelector(element);
        // console.log('cou');
        // console.log('đã tạo ' + count +'/' + lengthArr);
        console.log('element count ' + count);
        ele.innerHTML = 'đã tạo ' + count + '/' + lengthArr;
    }

    this.testA = function(n1, n2, n3 = 777) {
        console.log('n1 = ' + n1);
        console.log('n2 = ' + n2);
        console.log('n3 = ' + n3);

    }




    return {
        CreateZip: CreateZip,
        testA: testA
    }
}());