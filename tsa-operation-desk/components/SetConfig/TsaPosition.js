import TsaGloble from '@tsa-operation-desk/common/TsaGloble.js'
export default class TsaPosition {
    render (item) {
        return `<div class="tsa-position" id="id-TsaPosition-${item.uuid}">
                    <h3>控件坐标<span>拖拽签名区控件到需签署位置</span>
                        <slot name="delete" />
                    </h3>
                    <ul class="position">
                        <li>
                            <span>X</span>
                            <p class="value">
                                <input type="number" id="id-TsaPosition-x-${item.uuid}" value="${item.context.position.x}" min="0">
                            </p>
                        </li>
                        <li>
                            <span>Y</span>
                            <p class="value">
                                <input type="number" id="id-TsaPosition-y-${item.uuid}" value="${item.context.position.y}" min="1">
                            </p>
                        </li>
                    </ul>
                </div>`
    }
    // 计算
    static init (operationID, item1) {
        let TsaPositionXId = document.querySelector(`#id-TsaPosition-x-${item1.uuid}`)
        let TsaPositionYId = document.querySelector(`#id-TsaPosition-y-${item1.uuid}`)
        TsaPositionXId.onchange = function (e) {
            var value = parseFloat(e.target.value)
            operationID.style.left = value * TsaGloble.scale + 'px'
            item1.context.position.x = value
        }
        TsaPositionYId.onchange = function (e) {
            var value = parseFloat(e.target.value)
            operationID.style.top = value * TsaGloble.scale + 'px'
            item1.context.position.y = value
        }
    }
}