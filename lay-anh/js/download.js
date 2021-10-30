window.DownloadTB = (function() {
    async function statDownload(element) {
        var ele = await document.querySelector(element);
        await ele.classList.remove("hide");
        var str = 'đang đóng gói';

        ele.innerHTML = str;
    }

    async function endDownload(element) {
        console.log('bat dau end download');
        var ele = await document.querySelector(element);
        var str = 'đã xong';
        ele.innerHTML = str;

        setTimeout(function() {
            console.log('timeout end download');

            ele.classList.add('hide');
        }, 3000);
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
                console.log(response.data.type)
                    // console.log(response)
                var fileBlob = new Blob([response.data], { type: response.data.type });
                saveAs(fileBlob, "fileanh-" + new Date().getTime() + FileExt.getExt(urlDl));
                // console.log(url)
                console.log("download ok")

            })


    }

    return {
        statDownload: statDownload,
        endDownload: endDownload,
        download: download
    }
}());