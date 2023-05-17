/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhangle
 * @Date: 2022-03-29 15:28:34
 * @LastEditors: zhangle
 * @LastEditTime: 2023-04-20 16:42:38
 */
let dateFormatList
export default dateFormatList = [
    'YYYY/MM/dd',
    'YYYY-MM-dd',
    'YYYYMMdd'
]

export const signRequestDateImage = {
    'YYYY/MM/dd': {
        width: 75,
        height: 17.5,
        image: require('../assets/images/signRequestDateImage1.png')
    },
    'YYYY-MM-dd': {
        width: 75,
        height: 17.5,
        image: require('../assets/images/signRequestDateImage2.png')
    },
    'YYYYMMdd': {
        width: 75,
        height: 17.5,
        image: require('../assets/images/signRequestDateImage3.png')
    }
}