import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
export default class TsaName {
    render ({ uuid, description }) {
        return `<div class="tsa-name" id="id-TsaName-${uuid}">
                    <h3>控件名称</h3>
                    <input type="text" id="id-TsaName-description-${uuid}" value="${description}" class="layui-input" maxlength="8" placeholder="请输入控件名称">
                </div>`
    }
    static init (item1) {
        // 填充组件控件名称修改同步title
        $(`#id-TsaName-description-${item1.uuid}`).on('input', function () {
            $(`.component-${item1.uuid} .collapseTitle p`).text($(this).val())
            item1.description = $(this).val()
        })
    }
}