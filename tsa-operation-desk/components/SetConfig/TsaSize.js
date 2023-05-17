import TsaTooltip from '@tsa-operation-desk/components/TsaTooltip'
import TsaGloble from '@tsa-operation-desk/common/TsaGloble.js'
export default class TsaSize {
    render (item) {
        return `<div class="tsa-size">
                    <h3>控件大小</h3>
                    <ul class="size">
                        <li>
                            <span>X</span>
                            <p class="value">
                                <input type="number" id="id-TsaSize-width-${item.uuid}" value="${item.context.style.width}" @input="inputLimit(item, $event, 'width')" min="1">
                            </p>
                        </li>
                        <li class="related">
                            <img id="id-aspectRatio-${item.uuid}" src="${item.context.aspectRatio ? require('../../assets/images/related.png') : require('../../assets/images/relate.png')}" alt="">
                        </li>
                        <li>
                            <span>Y</span>
                            <p class="value">
                                <input type="number" id="id-TsaSize-height-${item.uuid}" value="${item.context.style.height}" @input="inputLimit(item, $event, 'height')" min="1">
                            </p>
                        </li>
                    </ul>
                </div>`
    }
    static init (operationID, item1) {
        let TsaSizeWidthId = document.querySelector(`#id-TsaSize-width-${item1.uuid}`)
        let TsaSizeHeightId = document.querySelector(`#id-TsaSize-height-${item1.uuid}`)
        TsaSizeWidthId.onchange = function (e) {
            var value = parseFloat(e.target.value)
            operationID.style.width = value * TsaGloble.scale + 'px'
            item1.context.style.width = value
        }
        TsaSizeHeightId.onchange = function (e) {
            var value = parseFloat(e.target.value)
            operationID.style.height = value * TsaGloble.scale + 'px'
            item1.context.style.height = value
        }
        new TsaTooltip(`#id-aspectRatio-${item1.uuid}` ,{
            message: '锁定宽高比'
        })
        document.querySelector(`#id-aspectRatio-${item1.uuid}`).onclick = function (e) {
            item1.context.aspectRatio = !item1.context.aspectRatio
            e.target.src = item1.context.aspectRatio ? require('../../assets/images/related.png') : require('../../assets/images/relate.png')
            document.querySelector(`#${item1.uuid}`).setAttribute('data-aspectRatio', item1.context.aspectRatio)
        }
    }
}