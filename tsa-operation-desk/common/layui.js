import '@tsa-operation-desk/layui/layui.js'
export default class LaiUiPlugin {
    static checkbox (checkboxId, callback) {
        layui.form.on('checkbox(' + checkboxId + ')', function (data) {
            callback && callback(data.elem.checked)
            // var value = data.value;   //获取选中的value值
        });
        layui.form.render("checkbox")
    }
    static select (selectid, item, callback) {
        layui.form.render("select");
        layui.form.on('select(' + selectid + ')', function(data){
            callback && callback(data.value)
        })
        
    }
}