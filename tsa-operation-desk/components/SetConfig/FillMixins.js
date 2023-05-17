import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
import CommonMixins from '@tsa-operation-desk/components/SetConfig/CommonMixins.js'
export default class FillMixins {
    static collapseTitle (item, name) {
        $(`#id-${name}-${item.uuid} .collapseTitle`).each(function() {
            $(this).on('click', function () {
                $(this).children().eq(0).toggleClass('show')
                $(this).next().toggle()
                $(`#${item.uuid}`).toggleClass('active')
                // 滚动到指定位置
                let pageNum = item.context.position.pageNum
                CommonMixins.scroll(pageNum - 1)
                $(this).parent().siblings().each(function() {
                    $(this).find('.collapseTitle').children().eq(0).removeClass('show')
                    $(this).find('.content').hide()
                })
            })
        })
    }
    // 向视图区添加class  active
    static updateStatus (item) {
        // 设置操作区的的样式
        $(`#${item.uuid}`).addClass('active')
        $(`#${item.uuid}`).siblings('.tsa-dragResize').removeClass('active')
        // 设置配置区的样式
        $(`.component-${item.uuid}`).children('.collapseTitle').children().eq(0).addClass('show')
        $(`.component-${item.uuid}`).children('.content').eq(0).show()

        $(`.component-${item.uuid}`).siblings().children('.collapseTitle').children('.icon').removeClass('show')
        $(`.component-${item.uuid}`).siblings().children('.content').hide()
    }
}

