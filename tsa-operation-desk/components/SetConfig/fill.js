export const fillConfigs = [ // 填充区域不传componentKey
    {
        label: '单行文本', // 文本
        areaType: 1, // 自动填充区域
        componentType: 1, // 单行文字
        width: 160,
        height: 15,
        icon: 'icon-wenbenshuru',
        borderColor: '#FBA749',
        defaultValue: '单行文本'
    },
    {
        label: '多行文本', // 多行文本
        areaType: 1, // 自动填充区域
        componentType: 2, // 多行文本
        width: 148,
        height: 40,
        icon: 'icon-duohangwenben',
        borderColor: '#00B9ED',
        defaultValue: '多行文字'
    },
    {
        label: '日期', // 时间
        areaType: 1, // 自动填充区域
        componentType: 5, // 日期
        width: 73,
        height: 15,
        icon: 'icon-calendar-v2-full',
        borderColor: '#7E9FFF',
        defaultValue: '日期'
    }
]
export default class FillComponents {
    static render (el) {
        let str = `<ul class="fill use-select">
                        ${fillConfigs.map(item => {
                            let str = `<li  style="border-color: ${item.borderColor}" data-areaType=${item.areaType} data-componentType=${item.componentType}>${item.label}</>`
                            return str;
                        }).join('') }
                        
                    </ul>`;
        return str;
    }
    static eventBind (el) {
        // console.log(el)
        
        
    }
}