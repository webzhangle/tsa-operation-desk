import { changeWidthToFontCount } from '../../common/utils'
export default class TsaFontMaxCount {
    render (item) {
        return `<div class="tsa-fontMaxCount" id="id-TsaFontMaxCount-${item.uuid}">
                    <h3>最多字数</h3>
                    <input type="text" value="${item.context.style.maxCount}" id="id-TsaFontMaxCount-maxCount-${item.uuid}" class="layui-input layui-disabled" placeholder="请输入内容" disabled>
                </div>`
    }
    static update (item) {
        let rows = 1
        if (item.componentType === 2) {
            rows = item.context.style.rows
        }
        item.context.style.maxCount = changeWidthToFontCount(item.context.style.width, item.context.style.fontSize) * rows
        document.querySelector(`#id-TsaFontMaxCount-maxCount-${item.uuid}`).value = item.context.style.maxCount
        if (item.componentType === 1) {
            document.querySelector(`#dragChild-${item.uuid}-input`).setAttribute('maxlength', item.context.style.maxCount)
        }
        if (item.componentType === 2) {
            document.querySelector(`#dragChild-${item.uuid}-textarea`).setAttribute('maxlength', item.context.style.maxCount)
        }
    }
}