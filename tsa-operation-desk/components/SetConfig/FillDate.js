import TsaID from './TsaID'
import TsaName from './TsaName'
import TsaPosition from './TsaPosition'
import TsaFontSetting from './TsaFontSetting'
import TsaTimeFormat from './TsaTimeFormat'
import TsaTimeValue from './TsaTimeValue'
import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
export default class FillDate {
    render (item) {
        return `<div class="component component-${item.uuid}" style="margin-bottom: 24PX;" id="id-FillDate-${item.uuid}">
                    <div class="title collapseTitle">
                        <img class="icon" src="${require("../../assets/images/sanjiao.png")}" alt="">
                        <p>${item.description}</p>
                        <img class="delete" @click.stop="deleteItem(item, index)" src="${require("../../assets/images/shanchu.png")}" alt="">
                    </div>
                    <div class="content">
                        <div class="item-content" style="display: ${item.id ? 'block' : 'none'}">
                            ${new TsaID().render(item)}
                        </div>
                        <div class="item-content">
                            ${new TsaName().render(item)}
                        </div>
                        <div class="item-content">
                            ${new TsaPosition().render(item)}
                        </div>
                        <div class="item-content">
                            ${new TsaFontSetting().render(item)}
                        </div>
                        <div class="item-content">
                            ${new TsaTimeFormat().render(item)}
                        </div>
                        <div class="item-content">
                            ${new TsaTimeValue().render(item)}
                        </div>
                    </div>
                </div>`
    }
    static name = 'FillDate'
    static delete (item, fillComponentsList) {
        $(`#id-FillDate-${item.uuid} .delete`).each(function () {
            $(this).on('click', function () {
                $(this).parent().parent().remove()
                $(`#${item.uuid}`).remove()
                let index = fillComponentsList.findIndex(({ uuid }) => {
                    return uuid === item.uuid
                })
                fillComponentsList.splice(index, 1)
            })
        })
    }
}