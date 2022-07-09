// import img from "./a.png"
// import css from "./a.css"

import data from "./data"
console.log(data);

function add(x, y) {
    return x+y;
}

console.log(add(1,2));

/*
* 开发环境下打包：
*    webpack ./src/index.js -o ./build --mode development
* 生产环境下打包：
*    webpack ./src/index.js -o ./build --mode production
*
* 生产环境下打包会压缩文件，而开发环境下打包不会
* 但二者都：
*    css\图片文件打包失败
*    js\json文件打包成功
* */