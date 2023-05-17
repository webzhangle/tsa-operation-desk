import TsaID from './TsaID'
import TsaName from './TsaName'
import TsaPosition from './TsaPosition'
import TsaSize from './TsaSize'
import TsaFontSetting from './TsaFontSetting'
import TsaFontMaxCount from './TsaFontMaxCount'
import TsaFontMaxRows from './TsaFontMaxRows'
import TsaAlign from './TsaAlign'
import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
export default class MultilineText {
    render (item) {
        return `<div class="component component-${item.uuid}" style="margin-bottom: 24PX;" id="id-MultilineText-${item.uuid}">
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
                            ${new TsaSize().render(item)}
                        </div>
                        <div class="item-content">
                            ${new TsaFontSetting().render(item)}
                        </div>
                        <div class="item-content">
                            ${new TsaFontMaxCount().render(item)}
                        </div>
                        <div class="item-content">
                            ${new TsaFontMaxRows().render(item)}
                        </div>
                        <div class="item-content">
                            ${ new TsaAlign().render(item)}
                        </div>
                    </div>
                </div>`
    }
    static name = 'MultilineText'
    static delete (item, fillComponentsList) {
        $(`#id-MultilineText-${item.uuid} .delete`).each(function () {
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