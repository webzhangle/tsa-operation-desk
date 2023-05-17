/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangle
 * @Date: 2022-03-15 10:17:36
 * @LastEditors: zhangle
 * @LastEditTime: 2023-05-10 13:45:23
 */
// 一行时候的个数
export const changeWidthToFontCount = (width, fontSize) => {
    return Math.floor(width/fontSize)
}
export const changeHeightToRows = (height, fontSize) => {
    let ratio = height/fontSize 
    return ratio < 1 ? 1 : Math.floor(height/fontSize)
}
/**
 * @description: 
 * @param {*} pdfHeight 单个pdf页面的高度 需要还原
 * @param {*} componentHeight 组件高度 固定
 * @param {*} serverY 后台的Y坐标 固定
 * @param {*} percentage 百分比
 * @return {*}
 * @author: zhangle
 */               
export const serverHeightChangeClientHeight = (pdfHeight, componentHeight, serverY) => {
    let y = pdfHeight - componentHeight - serverY
    if (y < 0) {
        y = 0
    }
    return parseFloat((y).toFixed(2))
}

/**
 * 生成UUID
 * @returns {string}
 */
export const generateUUID = () => {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
};

export const getDataset = (ele) => {
    if(ele.dataset){
        return ele.dataset;
    }else{
        var attrs = ele.attributes,//元素的属性集合
            dataset = {},
            name,
            matchStr;

        for(var i = 0;i<attrs.length;i++){
            //是否是data- 开头
            matchStr = attrs[i].name.match(/^data-(.+)/);
            if(matchStr){
                //data-auto-play 转成驼峰写法 autoPlay
                name = matchStr[1].replace(/-([\da-z])/gi,function(all,letter){
                    return letter.toUpperCase();
                });
                dataset[name] = attrs[i].value;
            }
        }
        return dataset;
    }
}