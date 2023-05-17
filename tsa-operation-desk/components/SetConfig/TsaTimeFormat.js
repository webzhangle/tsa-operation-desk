import '@tsa-operation-desk/layui/layui.js'
import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
import TsaTimeValue from './TsaTimeValue'
import { signRequestDateImage } from '@tsa-operation-desk/config/dateFormatList'
export const dateFormatList = [
    'YYYY/MM/dd',
    'YYYY-MM-dd',
    'YYYYMMdd'
]
export default class TsaTimeFormat {
    render (item) {
        return `<div class="tsa-time-format" id="id-TsaTimeFormat-${item.uuid}">
                    <h3>时间格式</h3>
                    <div class="dateFormat">
                        <div class="layui-form">
                            <select id="id-TsaTimeFormat-format-${item.uuid}" lay-filter="id-TsaTimeFormat-format-${item.uuid}">
                                ${dateFormatList.map(item1 => {
                                    return `<option value="${item1}" ${item1 === item.context.format ? 'selected' : ''}>${item1}</option>`
                                }).join('')}
                            </select>
                        </div>
                    </div>
                </div>`
    }
    static init (item1, isRelated) {
        layui.form.render("select");
        let selectid = `id-TsaTimeFormat-format-${item1.uuid}`
        layui.form.on('select(' + selectid + ')', function(data){
            item1.context.format = data.value
            if (item1.areaType === 1) {
                if (isRelated === false) return
                let id = `id-TsaTimeValue-fillText-${item1.uuid}`
                TsaTimeValue.formatReset(id, data.value, item1)
                $(`#dragChild-${item1.uuid}-span`).text(item1.context.onlyShowFillText || '日期')
            }
            if (item1.areaType === 2) {
                let format = item1.context.format
                $(`#dragChild-${item1.uuid}-signDate`).attr('src', signRequestDateImage[format].image)
                $(`#${item1.uuid}`).css('width', signRequestDateImage[format].width + 'px').css('height', signRequestDateImage[format].height + 'px')
            }
        })
    }
}