export default class CustomCheck {
    static init () {
        if (document.getElementsByName('CustomCheckScriptName').length === 0) {
            var script = document.createElement('script')
            script.setAttribute('name', 'CustomCheckScriptName')
            script.innerHTML = `
            function tsaGetDataset(ele) {
                if(ele.dataset){
                    return ele.dataset;
                }else{
                    var attrs = ele.attributes,//元素的属性集合
                        dataset = {},
                        name,
                        matchStr;
                    for(var i = 0;i<attrs.length;i++){
                        //是否是data- 开头
                        matchStr = attrs[i].name.match(/^data-(.+)/);
                        if(matchStr){
                            //data-auto-play 转成驼峰写法 autoPlay
                            name = matchStr[1].replace(/-([\da-z])/gi,function(all,letter){
                                return letter.toUpperCase();
                            });
                            dataset[name] = attrs[i].value;
                        }
                    }
                    return dataset;
                }
            }
            function tsaCommonCheckboxChange (e) {
                if (e.getAttribute('checkedStatus') != 'true') {
                    e.parentNode.className = 'is-checked'
                    var trueLabel = tsaGetDataset(e).trueLabel
                    if (e.dataset.trueLabel === 'null') {
                        e.value = true
                    } else {
                        e.value = e.dataset.trueLabel
                    }
                    e.setAttribute('checkedStatus', 'true')
                } else {
                    e.parentNode.className = ''
                    var falseLabel = tsaGetDataset(e).falseLabel
                    if (falseLabel === 'null') {
                        e.value = false
                    } else {
                        e.value = falseLabel
                    }
                    e.setAttribute('checkedStatus', 'false')
                }
            }
            function tsaCommonRadioChange (e) {
                var inputs = document.getElementsByName(e.name)
                for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i]
                    if (input.checked) {
                        input.parentNode.className = 'is-checked'
                    } else {
                        input.parentNode.className = ''
                    }
                }
            }
            `
            document.body.appendChild(script)
            script = null
        }
        
    }
} 