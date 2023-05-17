export const signConfigs = [ // 
    {
        componentKey: '',
        areaType: 2, // 签署区域
        componentType: 3, // 签署
        label: '签名', // 签名
        width: 100,
        height: 50,
        icon: require('../../assets/images/dianziqianmingx@2x.png'),
        borderColor: '#FC8737',
        defaultValue: require('../../assets/images/qm.jpeg')
    },
    {
        componentKey: '',
        areaType: 2, // 盖章区域
        componentType: 4, // 盖章
        label: '签章', // 签章
        // width: 119.05,
        // height: 119.05,
        width: 119.05,
        height: 119.05,
        icon: require('../../assets/images/gaizhang@2x.png'),
        borderColor: '#FC8737',
        defaultValue: require('../../assets/images/gz.jpeg')
    },
    {
        componentKey: '',
        areaType: 2, // 自动填充区域（带componentKey）
        componentType: 5, // 日期
        label: '日期', // 时间
        width: 71,
        height: 15,
        icon: require('../../assets/images/riqi@2x.png'),
        borderColor: '#FC8737',
        defaultValue: '日期'
    }
]
export default class SignComponents {
    static render () {
        let str = `<ul class="sign use-select" v-show="areaTypeIndex === 2 && componentKey">
                        ${signConfigs.map(item => {
                            return `<li data-areaType=${item.areaType} data-componentType=${item.componentType}>
                                        <img src="${item.icon}" />
                                        <p>${item.label}</p>
                                    </li>`
                        }).join('')}
                    </ul>`
        return str;
    }
}