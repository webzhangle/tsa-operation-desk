import TsaRadio from "../TsaRadio"
export default class TsaAlign {
    render (item) {
        return `<div class="tsa-Align" id="id-TsaAlign-${item.uuid}">
                    <h3>对齐方式</h3>
                    <div class="align">
                        ${new TsaRadio({
                            name: `name-TsaAlign-${item.uuid}`,
                            label: 'LEFT',
                            slot: '<span class="iconfont icon-zuoduiqi"></span>'
                        }).render()}
                        ${new TsaRadio({
                            name: `name-TsaAlign-${item.uuid}`,
                            label: 'CENTER',
                            slot: '<span class="iconfont icon-juzhongduiqi"></span>'
                        }).render()}
                        ${new TsaRadio({
                            name: `name-TsaAlign-${item.uuid}`,
                            label: 'RIGHT',
                            slot: '<span class="iconfont icon-youduiqi"></span>'
                        }).render()}

                    </div>
                </div>`
    }
}