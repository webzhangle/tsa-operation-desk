export default class TsaID {
    constructor () {
    }
    render ({id}) {
        return `<div class="tsa-id">
                    <h3>控件ID</h3>
                    <input type="text" value="${id}" class="layui-input layui-disabled" placeholder="请输入控件ID" disabled>
                </div>`
    }
}