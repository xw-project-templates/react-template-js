
import zznhImage from "../img/zznh.png";

import "../css/index.css"

// 创建img元素

function component() {

    const element = document.createElement("div");
    element.style.width = 200 + "px";
    element.style.height = 200 + "px"
    // 创建一个img元素,设置src属性
    const imgEl = new Image();
    imgEl.src = zznhImage;
    element.appendChild(imgEl)

    // 创建一个i元素, 设置一个字体
    const iEl = document.createElement("i");
    iEl.className = "iconfont icon-ashbin why_icon";
    element.appendChild(iEl);

    return element
}

document.body.appendChild(component())

