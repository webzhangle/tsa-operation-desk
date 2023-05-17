import { changeHeightToRows } from '../../common/utils'
export default class TsaFontMaxRows {
    render (item) {
        return `<div class="tsa-fontMaxRows" id="id-TsaFontMaxCount-${item.uuid}">
                    <h3>最大行数</h3>
                    <input type="text" value="${item.context.style.rows}" id="id-TsaFontMaxCount-rows-${item.uuid}" class="layui-input layui-disabled" placeholder="请输入内容" disabled>
                </div>`
    }
    static update (item) {
        item.context.style.rows = changeHeightToRows(item.context.style.height, item.context.style.lineHeight)
        document.querySelector(`#id-TsaFontMaxCount-rows-${item.uuid}`).value = item.context.style.rows
    }
}