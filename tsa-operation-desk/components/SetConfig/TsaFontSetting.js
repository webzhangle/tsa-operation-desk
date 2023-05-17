import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
import TsaCheckbox from '../TsaCheckbox'
import { fontFamliyList, fontSizeList } from '../../config/font'
import LaiUiPlugin from '../../common/layui'
import TsaFontMaxCount from './TsaFontMaxCount'
import TsaFontMaxRows from './TsaFontMaxRows'
export const colorArray = ['0,0,0', '153,153,153', '255,0,0', '9,117,225', '255,192,0']
let fontSizeOption = []
import TsaGloble from '@tsa-operation-desk/common/TsaGloble'
export default class TsaFontSetting {
    constructor () {
        if (fontSizeOption.length === 0) {
            for(var key in fontSizeList){
                fontSizeOption.push({
                    value: fontSizeList[key].fontSize,
                    label: key
                })
            }
        }
    }
    render (item) {
        return `<div class="tsa-fontSetting" id="id-TsaFontSetting-${item.uuid}">
                    <h3>字体设置</h3>
                    <div class="fontSeting">
                        <div class="seting" :style="{marginBottom: showSettingField('fontFamily') ? '': '0'}">
                            <div class="layui-form">
                                <select id="id-TsaFontSetting-fontFamily-${item.uuid}" lay-filter="id-TsaFontSetting-fontFamily-${item.uuid}">
                                    ${fontFamliyList.map(item1 => {
                                        return `<option value="${item1.value}" ${item1.value === item.context.style.fontFamily ? 'selected' : ''}>${item1.label }</option>`
                                    }).join('')}
                                </select>
                            </div>
                            <div class="layui-form">
                                <select id="id-TsaFontSetting-fontSize-${item.uuid}" lay-filter="id-TsaFontSetting-fontSize-${item.uuid}">
                                    ${fontSizeOption.map(item1 => {
                                        return `<option value="${item1.value}" ${item1.value === item.context.style.fontSize ? 'selected' : ''}>${item1.label }</option>`
                                    }).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="otherSeting">
                            <div class="part">
                                <div class="tsa-ColorSelect">
                                    <div class="tsa-colorSelect-popper-class" id="id-TsaFontSetting-color-${item.uuid}">
                                        <div class="selectArea">
                                            ${colorArray.map(item2 => {
                                                let colors = item2.split(',')
                                                return `<div class="selectArea-item" data-background="${colors[0]},${colors[1]},${colors[2]}" style="background: rgb(${colors[0]}, ${colors[1]}, ${colors[2]})"></div>`
                                            }).join('')}
                                        </div>
                                        <div class="popper__arrow"></div>
                                        <ul>
                                            <li>
                                                <span class="iconfont icon-zitiyanse"></span>
                                                <p class="borderBottom"></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="part">
                                ${new TsaCheckbox({
                                    'id': `id-TsaFontSetting-fontStyle-${item.uuid}`,
                                    'value': `${item.context.style.fontStyle}`,
                                    'false-label': "NORMAL",
                                    'true-label': "OBLIQUE",
                                    slot: '<span class="iconfont icon-T-qingxie"></span>'
                                }).render()}
                            </div>
                            <div class="part">
                                ${new TsaCheckbox({
                                    'id': `id-TsaFontSetting-fontWeight-${item.uuid}`,
                                    'value': `${item.context.style.fontWeight}`,
                                    'false-label': "NORMAL",
                                    'true-label': "BOLD",
                                    slot: '<span class="iconfont icon-zitijiacu"></span>'
                                }).render()}
                            </div>
                            <div class="part">
                                ${new TsaCheckbox({
                                    'id': `id-TsaFontSetting-textDecoration-${item.uuid}`,
                                    'value': `${item.context.style.textDecoration}`,
                                    'false-label': "NONE",
                                    'true-label': "UNDERLINE",
                                    slot: '<span class="iconfont icon-zitixiahuaxian"></span>'
                                }).render()}
                            </div>
                        </div>
                    </div>
                </div>`
    }
    static init (operationID, item1) {
        // 字体类型
        let selectFontFamilyId = `id-TsaFontSetting-fontFamily-${item1.uuid}`
        LaiUiPlugin.select(selectFontFamilyId, item1, (value) => {
            item1.context.style.fontFamily = value
            document.querySelector(`#${item1.uuid}`).style.fontFamily = value
        })
        // 字体大小
        let selectFontSizeId = `id-TsaFontSetting-fontSize-${item1.uuid}`
        LaiUiPlugin.select(selectFontSizeId, item1, (value) => {
            let selectedItem = fontSizeOption.find(i => {
                return i.value == value
            })
            
            let { fontSize, lineHeight, width } = fontSizeList[selectedItem.label]
            item1.context.style.fontSize = fontSize
            document.querySelector(`#${item1.uuid}`).style.fontSize = item1.context.style.fontSize * TsaGloble.scale + 'px'
            item1.context.style.lineHeight = lineHeight
            document.querySelector(`#${item1.uuid}`).style.lineHeight = item1.context.style.lineHeight * TsaGloble.scale + 'px'
            if (item1.componentType === 1) {
                item1.context.style.height = lineHeight
                document.querySelector(`#${item1.uuid}`).style.height = item1.context.style.height * TsaGloble.scale + 'px'
                TsaFontMaxCount.update(item1)
                item1.context.fillText = item1.context.fillText.slice(0, item1.context.style.maxCount)
                document.querySelector(`#dragChild-${item1.uuid}-input`).value = item1.context.fillText
            }
            if (item1.componentType === 2) {
                item1.context.style.height = lineHeight
                document.querySelector(`#${item1.uuid}`).style.height = item1.context.style.height * TsaGloble.scale + 'px'
                TsaFontMaxRows.update(item1)
                TsaFontMaxCount.update(item1)
                item1.context.fillText = item1.context.fillText.slice(0, item1.context.style.maxCount)
                document.querySelector(`#dragChild-${item1.uuid}-textarea`).value = item1.context.fillText
            }
            if (item1.componentType === 5) { // 日期组件
                let format = item1.context.format
                item1.context.style.width = width.dateWidth[format]
                item1.context.style.height = lineHeight
                document.querySelector(`#${item1.uuid}`).style.width = item1.context.style.width * TsaGloble.scale + 'px'
                document.querySelector(`#${item1.uuid}`).style.height = item1.context.style.height * TsaGloble.scale + 'px'
            }
            
        })
        // 颜色
        let { red, green, blue } = item1.context.style.fontColor
        $(`#id-TsaFontSetting-color-${item1.uuid}`).find('.borderBottom').css('background-color', `rgb(${red}, ${green}, ${blue})`)
        operationID.style.color = `rgb(${red}, ${green}, ${blue})`
        $(`#id-TsaFontSetting-color-${item1.uuid}`).find('.selectArea-item').each(function(){
            $(this).on('click', function () {
                var background = $(this).attr('data-background')
                let colors = background.split(',')
                let red = colors[0]
                let green = colors[1]
                let blue = colors[2]
                item1.context.style.fontColor.red = red
                item1.context.style.fontColor.green = green
                item1.context.style.fontColor.blue = blue
                $(`#id-TsaFontSetting-color-${item1.uuid}`).find('.borderBottom').css('background-color', `rgb(${red}, ${green}, ${blue})`)
                operationID.style.color = `rgb(${red}, ${green}, ${blue})`
            })
        })
        
        // 是否倾斜
        let fontStyleId = document.querySelector(`#id-TsaFontSetting-fontStyle-${item1.uuid}`)
        fontStyleId.onchange = function (e) {
            var value = e.target.value
            // e.target.checked = !e.target.checked
            operationID.style.fontStyle = value
            item1.context.style.fontStyle = value
        }
        // 是否加粗
        let fontWeightId = document.querySelector(`#id-TsaFontSetting-fontWeight-${item1.uuid}`)
        fontWeightId.onchange = function (e) {
            var value = e.target.value
            operationID.style.fontWeight = value
            item1.context.style.fontWeight = value
        }
        // 是否加下划线
        let textDecorationId = document.querySelector(`#id-TsaFontSetting-textDecoration-${item1.uuid}`)
        textDecorationId.onchange = function (e) {
            var value = e.target.value
            operationID.style.textDecoration = value
            item1.context.style.textDecoration = value
        }
        // 对齐方式
        $(`#id-TsaAlign-${item1.uuid}`).find(`input[name=name-TsaAlign-${item1.uuid}]`).each(function () {
            if ($(this).val() === item1.context.style.textAlign) {
                $(this).click()
            }
            $(this).on('change', function () {
                let textAlign = $(this).val()
                item1.context.style.textAlign = textAlign
                operationID.style.textAlign = textAlign
            })
        })
    }
}