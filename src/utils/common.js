export default {
    objectCopy: function (data) {
        return JSON.parse(JSON.stringify(data));
    },
    isObject: (params) =>
        Object.prototype.toString.call(params) === "[object Object]",
    isArray: (params) =>
        Object.prototype.toString.call(params) === "[object Array]",
    isFunction: (params) =>
        Object.prototype.toString.call(params) === "[object Function]",
    toSizeText: (size) => {
        let num = 0;
        let unit = "";
        if (size / 1024 < 1000) {
            num = size / 1024;
            unit = "KB";
        } else if (size / 1024 / 1024 < 1000) {
            num = size / 1024 / 1024;
            unit = "MB";
        } else {
            num = size / 1024 / 1024 / 1024;
            unit = "GB";
        }
        num = Math.floor(num * 100) / 100;
        return `${num}${unit}`;
    },
    // 获取localStorage的已存容量
    getLocalSurplus: () => {
        if (!window.localStorage) {
            console.log("浏览器不支持localStorage");
        }
        var size = 0;
        for (let item in window.localStorage) {
            if (window.localStorage.hasOwnProperty(item)) {
                size += window.localStorage.getItem(item).length;
            }
        }

        if (parseInt((size / 1024).toFixed(2)) > 4000) {
            window.localStorage.clear();
        }
        console.log("当前localStorage已存容量为" + (size / 1024).toFixed(2) + "KB");
    },
    // 点击链接下载文件
    downloadFile: (link, name) => {
        let a_link = document.createElement("a");
        fetch(link)
            .then((res) => res.blob())
            .then((blob) => {
                a_link.href = URL.createObjectURL(blob);
                a_link.download = name;
                document.body.appendChild(a_link);
                a_link.click();
            });
    },
    // 下载blob二进制流文件
    downBlobFile: (data, title, type = "application/vnd.ms-excel") => {
        let blob = new Blob([data], {
            type,
        });
        let link = document.createElement("a");
        link.innerHTML = title;
        link.download = title;
        link.href = URL.createObjectURL(blob);
        link.click();
    },
    parseFormatNum: (number) => {
        if (!number) return;
        const a = number.toString().split("");
        let v = a.reverse();
        let vn = "";
        for (let i = 0; i < v.length; i++) {
            vn += v[i] + ((i + 1) % 3 == 0 && i + 1 != v.length ? "," : "");
        }
        return vn.split("").reverse().join("");
    },
    getQueryString: (h, name) => {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = h.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },
    openNewWindow: (url) => {
        // let a = document.createElement('a')
        // a.setAttribute('href',window.location.href.split("#")[0] + "#" + url)
        // a.setAttribute('target','_blank')
        // a.setAttribute('id','js_a')
        // if (document.getElementById('js_a')) {
        //   document.body.removeChild(document.getElementById('js_a'))
        // }
        // document.body.appendChild(a)
        // a.click()
        window.open(window.location.href.split("#")[0] + "#" + url);
    },
    // 获取地址栏搜索参数 search 格式，如： ?deal_status=2
    getParams: (search) => {
        let result = {};
        let searchParamsStr = search.split("?")[1];
        if (searchParamsStr) {
            let searchParams = searchParamsStr.split("&");
            searchParams.forEach((elem) => {
                let arr = elem.split("=");
                let key = arr[0];
                let value = arr[1];
                if (key) {
                    result[key] = decodeURIComponent(value);
                }
            });
        }
        return result;
    },
    // 生成一个唯一随机数
    createRandom: () => {
        return (
            new Date().getTime() +
            "_" +
            parseInt(Math.random() * 10000) +
            "_" +
            parseInt(Math.random() * 10000)
        );
    },
    // 输入框输入整数处理
    integerHandle: (value) => {
        if (isNaN(parseInt(value))) {
            return "";
        } else {
            return parseInt(value);
        }
    },
    // 判断时间段是否包含
    validationTime: function (obj) {
        if (obj.start_date2 && obj.end_date2) {
            let start_date = new Date(obj.start_date.replace(/-/g, "/")).getTime();
            let end_date = new Date(obj.end_date.replace(/-/g, "/")).getTime();
            let start_date2 = new Date(obj.start_date2.replace(/-/g, "/")).getTime();
            let end_date2 = new Date(obj.end_date2.replace(/-/g, "/")).getTime();
            if (
                start_date <= start_date2 &&
                end_date2 <= end_date &&
                start_date2 <= start_date &&
                end_date <= end_date2
            ) {
                return false;
            }
        }
        return true;
    },
    // 开始时间不可以大于结束时间
    validationTime2: function (obj) {
        if (obj.start_date && obj.end_date) {
            let start_date = new Date(obj.start_date.replace(/-/g, "/")).getTime();
            let end_date = new Date(obj.end_date.replace(/-/g, "/")).getTime();
            if (start_date > end_date) {
                return false;
            }
        }
        if (obj.start_date2 && obj.end_date2) {
            let start_date2 = new Date(obj.start_date2.replace(/-/g, "/")).getTime();
            let end_date2 = new Date(obj.end_date2.replace(/-/g, "/")).getTime();
            if (start_date2 > end_date2) {
                return false;
            }
        }
        return true;
    },

    // 各种正则表达式
    regular: {
        zh: /[\u4e00-\u9fa5]/g, // 匹配到中文
        zhBlank: /[\u4e00-\u9fa5]|\s/g, // 匹配到中文+空格,
        ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, //ip地址
        ipPort:
            /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])){0,1}$/, // iP/ip+端口
        isNum: /^[0-9]*$/,
        isPhone:
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, //手机号
        isFloat: /^\d+(?=\.{0,1}\d+$|$)/,
        isName: /(^[A-Z][a-z]*(\s[A-Z][a-z]*)*$)|(^(?:[\u4e00-\u9fa5·]{2,16})$)/, // 姓名
        isPhoneLandline:
            /(^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$)|(^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$)/, // 座机和移动
        isEmoji://表情
            /[\s+\u20e3\u203c\u2049\u2122\u2139\u231a\u2b1b\u2b1c\u2b50\u3030\u303d\u3297\u2b55\u3299\u231b\u2328\u23cf\u23e9\u24c2\u25aa\u25ab\u25B6\u25c0\u2b06\u{1F22F}\u{1F250}\u{1F251}\u{1FAC0}\u{1FAC1}\u{1FAC2}\u{1F17E}\u{1F17F}\u{1F18E}\u{1F201}\u{1F202}\u{1F21A}\u{1F171}\u{1F170}\u{1F004}\u{1F0CF}\u{a9}\u{ae}\u200d\u2934\u2935\uFFFD\u2B05\u2B07]|[\u{2194}-\u{21AA}]|[\u{23EA}-\u{23FA}]|[\u{25FB}-\u{25FE}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F191}-\u{1F19A}]|[\u{1F1E6}-\u{1F1FF}]|[\u{1F232}-\u{1F23A}]|[\u{1F300}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F7E0}-\u{1F7EB}]|[\u{1FA70}-\u{1FA74}]|[\u{1FA78}-\u{1FA86}]|[\u{1FA90}-\u{1FAA8}]|[\u{1FAB0}-\u{1FAB6}]|[\u{1F900}-\u{1F9FF}]|[\u{1FAD0}-\u{1FAD6}]|[\u{E0020}-\u{E007F}]/giu,
    },

    // 校验字段名称
    filedValidator: (message) => {
        return ({ getFieldValue }) => ({
            validator(_, value) {
                if (/^[a-zA-Z_]/.test(value) && !/[^a-zA-Z0-9_]/g.test(value)) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error(message));
            },
        });
    },

    // 不能有中文
    noZhValidator: (message) => {
        return () => ({
            validator(_, value) {
                if (!/[\u4e00-\u9fa5]/g.test(value)) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error(message));
            },
        });
    },

    // 绑定名称生成
    createName: (arr, id) => {
        let text = [];
        let ids = id ? id.split(",") : "";
        arr.forEach(function (item) {
            item.children.forEach(function (item2) {
                if (ids.includes(item2.value)) {
                    text.push(item.text + "-" + item2.text);
                }
            });
        });
        return text.join(",");
    },

    // input输入框的字符禁用
    handleKeyPress: (event) => {
        const forbiddenCharacters = ["-", "+", ".", "e", "E"];
        if (forbiddenCharacters.indexOf(event.key) !== -1) {
            event.preventDefault();
        }
    },

    // input输入框去空格
    handleKeyBlank: (e) => {
        if (e.target.value.indexOf(" ") !== -1) {
            e.target.value = e.target.value.replace(/\s+/g, "");
        }
    },
    // 获取当前日期
    getDate: () => {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var day = date.getDay();
        var weeks = new Array(
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六"
        );
        var week = weeks[day];
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        let dateInfo = {
            date: currentdate,
            week: week,
        };

        return dateInfo;
    },
    // 获取正则
    getPattern: (type) => {
        switch (type) {
            case "noSpecialCharacter":
                return /^[\u4E00-\u9FA5A-Za-z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]+$/; // 无特殊字符
            case "tel":
                return /(^0\d{2,3}\-\d{7,8}$)|(^1[3|4|5|6|7|8|9][0-9]{9}$)/; // 手机
            case "numberandletter":
                return /^\/[A-Za-z0-9]+$/; // 英文、数字
            case "emial":
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // 邮箱
            case "user_name":
                return /^(?:[\u4e00-\u9fa5·]{2,16})$/; // 姓名
            case "number":
                return /^\d+$/; // 纯数字
            case "id_card":
                return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证号
            case "other1":
                return /^[\u4E00-\u9FA5A-Za-z().（）]+$/; // 文本字母+ .()
            case "other2":
                return /^[\u4E00-\u9FA5A-Za-z0-9]+$/; // 文本字母数字
        }
    },
    // 密码字符串，保留大小写字母、数字、特殊字符
    pwdString: (str) =>
        str.replace(
            /([^A-Za-z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])/g,
            ""
        ),

    // 获取文件后缀名
    getSuffix: (fileName) =>
        fileName ? fileName.substring(fileName.lastIndexOf(".") + 1) : fileName,

    // 是否为图片
    isImage: (fileName) => {
        let suffix = fileName
            ? fileName.substring(fileName.lastIndexOf(".") + 1)
            : fileName;

        return ["png", "jpg", "jpeg"].includes(suffix);
    },

    // 删除字符串空格
    removeSpace: (str) => str.replace(/(^\s*)|(\s*$)/g, ""),

    // 可通过onlineOffice预览的文件
    isOnlineOfficeFileType: (fileName) => {
        let suffix = fileName
            ? fileName.substring(fileName.lastIndexOf(".") + 1)
            : fileName;
        let supportedTypes = ["pdf", "doc", "docx", "xls", "xlsx", "pptx", "ppt"];

        return supportedTypes.includes(suffix);
    },

    genID: (length) => {
        return Number(
            Math.random().toString().substr(3, length) + Date.now()
        ).toString(36);
    },
};
