import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
import '@tsa-operation-desk/layui/layui.js'
export default class SignMixins {
    // 向视图区添加class 给特定的  active
    static updateStatus (item) {
        // 设置操作区的的样式
        $(`#${item.uuid}`).addClass('active')
        // 设置配置区的样式（当前层级）
        $(`.component-${item.uuid}`).find(`#checkbox-${item.uuid}`).prop("checked", true)
        SignMixins.resetStatus(item)
    }
    static resetStatus (item, str) {
        // 全部样式清除
        if (str === 1) {
            // 设置操作区的的样式
            $(`#${item.uuid}`).removeClass('active')
            // 设置配置区的样式（当前层级）
            $(`.component-${item.uuid}`).find(`#checkbox-${item.uuid}`).prop("checked", false)
        }
        // 设置操作区的的样式
        $(`#${item.uuid}`).siblings('.tsa-dragResize').removeClass('active')
        // 设置配置区的样式（当前层级）
        $(`.component-${item.uuid}`).siblings().find(`.signCheckbox`).prop("checked", false)
        // 设置父级配置区的样式（当前层级）
        $(`.component-${item.uuid}`).parent().parent().siblings().find(`.signCheckbox`).prop("checked", false)
        layui.form.render("checkbox")
    }
}