import TsaPosition from './TsaPosition'
import TsaTimeFormat from './TsaTimeFormat'
import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
export default class SignDate {
    render (item, key) {
        return `<div style="margin-bottom: 24PX;" class="component-${item.uuid}" id="id-SignDate-${item.uuid}" data-component-key="${key}">
                    <div class="name">
                        <div class="layui-form">
                            <input type="checkbox" class="signCheckbox" name="" title="日期" lay-skin="primary" lay-filter="checkbox-${item.uuid}" id="checkbox-${item.uuid}">
                        </div>
                        <img class="delete" @click.stop="deleteItem(item, index)" src="${require("../../assets/images/shanchu.png")}" alt="">
                    </div>
                    <div class="item-content">
                        ${new TsaPosition().render(item)}
                    </div>
                    <div class="item-content">
                        ${new TsaTimeFormat().render(item)}
                    </div>
                </div>`
    }
    static delete (item, signComponentsList) {
        $(`#id-SignDate-${item.uuid} .delete`).each(function () {
            $(this).on('click', function () {
                let parent = $(this).parent().parent()
                parent.remove()
                $(`#${item.uuid}`).remove()
                let componentKey = parent.attr('data-component-key')
                let index = signComponentsList[componentKey].children.findIndex(({ uuid }) => {
                    return uuid === item.uuid
                })
                signComponentsList[componentKey].children.splice(index, 1)
            })
        })
    }
}