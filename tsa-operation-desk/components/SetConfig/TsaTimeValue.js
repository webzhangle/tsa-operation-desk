import dayjs from 'dayjs'
import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
import '@tsa-operation-desk/layui/layui.js'
import { signRequestDateImage } from '@tsa-operation-desk/config/dateFormatList'
export default class TsaTimeValue {
    render (item) {
        return `<div class="tsa-time-value" id="id-TsaTimeValue-${item.uuid}">
                    <h3>日期时间</h3>
                    <div class="dateValue">
                        <input type="text" class="layui-input" id="id-TsaTimeValue-fillText-${item.uuid}" placeholder="选择日期">
                    </div>
                </div>`
    }
    static timeStamp ({ fillText, format }) {
        return fillText ? dayjs(parseInt(fillText)).format(format.replace('dd', 'DD')) : ''
    }
    static init (item1) {
        let { fillText, format } = item1.context
        item1.context.onlyShowFillText = TsaTimeValue.timeStamp({ fillText, format })
        if (item1.areaType === 1) {
            $(`#dragChild-${item1.uuid}-span`).text(item1.context.onlyShowFillText || '日期')
            layui.laydate.render({
                elem: '#id-TsaTimeValue-fillText-' + item1.uuid, //指定元素
                format: item1.context.format.replace('YYYY', 'yyyy'),
                value: item1.context.onlyShowFillText,
                done: function(value, date, endDate) {
                    item1.context.onlyShowFillText = value
                    item1.context.fillText = dayjs(value).valueOf()
                    document.querySelector(`#dragChild-${item1.uuid}-span`).innerHTML = item1.context.onlyShowFillText
                }
            });
        }
        if (item1.areaType === 2) {
            $(`#dragChild-${item1.uuid}-signDate`).attr('src', signRequestDateImage[format].image)
            $(`#${item1.uuid}`).css('width', signRequestDateImage[format].width + 'px').css('height', signRequestDateImage[format].height + 'px')
        }
        
    }
    /**
     * @description: 
     * @param {*} value 格式化的值
     * @return {*}
     * @author: zhangle
     */    
    static formatReset (id, value, item1) {
        let newValue = value.replace('YYYY', 'yyyy')
        let parent = $(`#${id}`).parent()
        $(`#${id}`).remove()
        parent.append(`<input type="text" class="layui-input" id="${id}" placeholder="选择日期">`)
        let { fillText, format } = item1.context
        item1.context.onlyShowFillText = TsaTimeValue.timeStamp({ fillText, format })
        layui.laydate.render({
            elem: '#id-TsaTimeValue-fillText-' + item1.uuid, //指定元素
            format: newValue,
            value: item1.context.onlyShowFillText,
            done: function(value, date, endDate) {
                item1.context.onlyShowFillText = value
                item1.context.fillText = dayjs(value).valueOf()
                $(`#dragChild-${item1.uuid}-span`).text(item1.context.onlyShowFillText || '日期')
            }
        });
    }
}