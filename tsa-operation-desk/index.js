import './assets/css/common/common.scss'
import './assets/css/common/normalize.scss'
import './assets/css/tsaConfig/index.scss'
import './assets/css/tsaOperation/index.scss'
import './assets/iconfont/iconfont.css'
import './components/TsaDragResize/css/index.scss'

// import 'style/style.css'

import '@tsa-operation-desk/layui/layui.js'
// import 'layui'
console.log(layui)
let $ = layui.jquery

import '@tsa-operation-desk/layui/css/layui.css'
// import 'layui/dist/css/layui.css'
import '@tsa-operation-desk/assets/css/resetLayui/index.scss'
import TsaDragResize from './components/TsaDragResize/index'
import TabList from './components/SetConfig/tabList'
import FillComponents, { fillConfigs } from './components/SetConfig/fill'
import SignComponents, { signConfigs } from './components/SetConfig/sign'
import dateFormatList, { signRequestDateImage } from './config/dateFormatList'
import { fontSizeList, fontFamliyList } from './config/font'
import { changeWidthToFontCount, changeHeightToRows, generateUUID, getDataset } from '@tsa-operation-desk/common/utils'

import SingleLineText from './components/SetConfig/SingleLineText'
import MultilineText from './components/SetConfig/MultilineText'
import FillDate from './components/SetConfig/FillDate'

import SignatureName from './components/SetConfig/SignatureName'
import SignaturePicture from './components/SetConfig/SignaturePicture'
import SignDate from './components/SetConfig/SignDate'


import TsaTimeValue from './components/SetConfig/TsaTimeValue'

import 'lazysizes';
import TsaPosition from './components/SetConfig/TsaPosition'
import TsaSize from './components/SetConfig/TsaSize'
import TsaFontSetting from './components/SetConfig/TsaFontSetting'
import TsaTimeFormat from './components/SetConfig/TsaTimeFormat'

import LaiUiPlugin from './common/layui'
import CommonMixins from '@tsa-operation-desk/components/SetConfig/CommonMixins'
import FillMixins from './components/SetConfig/FillMixins'
import SignMixins from '@tsa-operation-desk/components/SetConfig/SignMixins'
import TsaName from './components/SetConfig/TsaName'
import TsaGloble from '@tsa-operation-desk/common/TsaGloble.js'
import TsaTooltip from '@tsa-operation-desk/components/TsaTooltip'
import CustomCheck from '@tsa-operation-desk/common/customCheck.js'
class TsaOperationDesk {
    constructor (options) {
        this.el = options.el
        this.templateId = options.templateId
        this.percentage = 100
        this.currentPage = 1
        this.pageNumber = options.pageNumber || options.data.length
        this.signatorys = []
        this.fillComponentsList = []
        this.signComponentsList = {}
        this.initComponents = [] // 存储原始的组件列表，用作后来的比对
        options.signatorys = options.signatorys || []
        options.signatorys.map(item => {
            this.signatorys.push({
                value: item,
            })
            this.signComponentsList[item] = {...{}, ...this.signComponentsList[item]}
            this.signComponentsList[item].uuid = generateUUID()
            this.signComponentsList[item].show = false
            this.signComponentsList[item].children = []
        })
        let componentsList = options.componentsList || []
        componentsList.map(item => {
            this.initComponents.push(item.id)
            item.orderly = new Date().getTime()
            if (item.areaType === 1) {
                this.fillComponentsList.push(item)
            } else {
                this.signComponentsList[item.componentKey].children.push(item)
            }
        })
        
        this.data = []
        options.document.map(item => {
            let obj = item
            obj.configs = []
            componentsList.map(item1 => {
                if (item1.context.position.pageNum === item.pageNo) {
                    item1.uuid = "id" + generateUUID()
                    item1.context.aspectRatio = false
                    obj.configs.push(item1)
                }
            })
            this.data.push(obj)
        })
        this.componentKey = null
        this.init()
    }
    init () {
        $(this.el).addClass('tsa-operation-desk')
        CustomCheck.init()
        this.operationInit()
        this.configInit()
        // 初始化通用的mixins
        CommonMixins.el = this.el
        CommonMixins.paggesData = this.data
        CommonMixins.init({ pageNumber: this.pageNumber })
        document.querySelector(this.el + " .addSign").setAttribute("data-component-key", this.signatorys[0].value)
    }
    operationInit () {
        let operationInitTemplate = `<div class="tsa-OperationDesk">
            <div class="tsa-OperationDesk-container">
                ${this.data.map((item, index) => {
                    return `<div class="container-image" id="container-image${index}" style="width: ${item.width}px; height: ${item.height}px">
                                ${index === 0 ? `<div class="templateId">模板ID:${this.templateId}</div>` : ''}
                                <img data-src="${item.ossPathStoreUrl}" class="lazyload"/>
                                ${item.configs.map((item1, index1) => {
                                    return `<div id="${item1.uuid}">
                                    
                                                ${item1.areaType === 1 && item1.componentType === 1 ? `<input id="dragChild-${item1.uuid}-input" value="${item1.context.fillText}" type="text" maxlength="${item1.context.style.maxCount}" placeholder="请输入"/>` : ''}
                                                ${item1.areaType === 1 && item1.componentType === 2 ? `<textarea id="dragChild-${item1.uuid}-textarea" value="${item1.context.fillText}" maxlength="${item1.context.style.maxCount}" placeholder="请输入"></textarea>` : ''}
                                                ${item1.areaType === 1 && item1.componentType === 5 ? `<span id="dragChild-${item1.uuid}-span">${item1.context.fillText}</span>` : ''}
                                                ${item1.areaType === 2 && item1.componentType === 3 ? `<img id="dragChild-${item1.uuid}-qm" src="${require('./assets/images/qm.jpeg')}" />` : ''}
                                                ${item1.areaType === 2 && item1.componentType === 4 ? `<img id="dragChild-${item1.uuid}-gz" src="${require('./assets/images/gz.jpeg')}" />` : ''}
                                                ${item1.areaType === 2 && item1.componentType === 5 ? `<img id="dragChild-${item1.uuid}-signDate" src=""/>` : ''}
                                            </div>`
                                }).join('')}
                            </div>`
                }).join('')}
            </div>
            <div class="PageTurning">
                <div class="scale">
                    <span class="iconfont icon-jianshao" @click="reducePercentage"></span>
                    <p class="percentage">${this.percentage}%</p>
                    <span class="iconfont icon-jiahao2fill" @click="addPercentage"></span>
                </div>
                <div class="page">
                    <a href="javascript:;" class="prev" @click="prev"> < </a>
                    <ul>
                        <li class="input">
                            <input type="text" class="currentPageClass" value="${this.currentPage}">
                        </li>
                        <li>
                            <p>/</p>
                        </li>
                        <li class="total">
                            <p>${this.pageNumber}</p>
                        </li>
                    </ul>
                    <a href="javascript:;" class="next" @click="next"> > </a>
                </div>
            </div>
            <div class="topOrBottom">
                <p class="iconfont icon-upbxiangshang up" data-class="up"></p>
                <p class="iconfont icon-upbxiangshang down" data-class="down"></p>
            </div>
            <div id="moveChunk" class="moveChunk"></div>
        </div>`
        var div = document.createElement('div')
        div.className = 'tsaOperation-container'
        div.innerHTML = operationInitTemplate
        document.querySelector(this.el).appendChild(div)
        div = null
    }
    configInit () {
        let configInitTemplate = `
            <div class="tsa-setConfig">
                ${TabList.render(this.el)}
                <div class="addSign">
                    <div class="left createRole">
                        <span class="iconfont icon-jiahao"></span>
                    </div>
                    <div class="right">
                        <p>点击创建签名角色</p>
                    </div>
                </div>
                <div class="drag-area">
                    ${FillComponents.render(this.el)}
                    ${SignComponents.render(this.el)}
                </div>
                <div class="component-container">
                    <div class="fill-components-container">
                        ${this.fillComponentsList.map(item => {
                            return `
                                <!-- 单行文本组件 -->
                                ${item.componentType === 1 ? `${new SingleLineText().render(item)}` : ''}
                                <!-- 多行文本 -->
                                ${item.componentType === 2 ? `${new MultilineText().render(item)}` : ''}
                                <!-- 日期组件的配置项 -->
                                ${item.componentType === 5 ? `${new FillDate().render(item)}` : ''}`
                        }).join('')}
                    </div>
                    <div class="sign-components-container">
                        ${Object.keys(this.signComponentsList).map(key => {
                            return  `
                                <div class="component" id="id-${this.signComponentsList[key].uuid}" data-component-key="${key}" style="display: ${this.signComponentsList[key].children.length === 0 ? "none" : "block"}">
                                    <div class="title collapseTitle">
                                        <img class="icon" src="${require("./assets/images/sanjiao.png")}">
                                        <p>${key}</p>
                                        <img class="delete" src="${require("./assets/images/shanchu.png")}">
                                    </div>
                                    <div class="content">
                                        ${this.signComponentsList[key].children.map(item1 => {
                                            return  `
                                                    <!-- 签名组件 -->
                                                    ${item1.componentType === 3 ? `${new SignatureName().render(item1, key)}` : ''}
                                                    <!-- 签章组件 -->
                                                    ${item1.componentType === 4 ? `${new SignaturePicture().render(item1, key)}` : ''}
                                                    <!-- 日期组件的配置项 -->
                                                    ${item1.componentType === 5 ? `${new SignDate().render(item1, key)}` : ''}
                                                    `
                                        }).join('')}
                                    </div>
                                </div>`
                        }).join('')}
                    </div>
                </div>
            </div>`
        let div = document.createElement('div')
        div.className = 'tsaConfig-container'
        div.innerHTML = configInitTemplate
        document.querySelector(this.el).appendChild(div)
        div = null
        TabList.init(this.el)
        FillComponents.eventBind(this.el)
        let that = this
        TsaGloble.scale = 1
        // 渲染拖拽组件配置
        this.data.map(item => {
            item.configs.map(item1 => {
                // console.log(item1)
                let operationID = document.getElementById(item1.uuid)
                // 拖动组件初始化
                this.dragResizeInit(item1)
                if (item1.componentType === 1) {
                    this.singleLineTextInt(operationID, item1)
                }
                if (item1.componentType === 2) {
                    this.multilineTextInit(operationID, item1)
                }
                if (item1.areaType === 1 && item1.componentType === 5) {
                    this.fillDateInit(operationID, item1)
                }
                if (item1.componentType === 3) {
                    this.signatureNameInit(operationID, item1)
                }
                if (item1.componentType === 4) {
                    this.signaturePictureInit(operationID, item1)
                }
                if (item1.areaType === 2 && item1.componentType === 5) {
                    this.signDateInit(operationID, item1)
                }
            })
            
        })
        // 尽量减少内存
        this.resetData()
        // 签署组件甲方乙方...批量删除
        $(`${this.el} .sign-components-container .title .delete`).each(function () {
            $(this).on('click', function (e) {
                var e = e || window.event
                e.stopPropagation()
                let parent = $(this).parent().parent()
                let componentKey = parent.attr('data-component-key')
                $(this).parent().next().empty() // 删除content下面的所有子元素
                that.signComponentsList[componentKey].show = false
                // 删除操作台的组件
                that.signComponentsList[componentKey].children.map(item1 => {
                    $(`#${item1.uuid}`).remove()
                })
                that.signComponentsList[componentKey].children = []
                parent.hide()
            })
        })
        // 点击添加角色按钮
        document.querySelector(this.el + " .createRole").onclick = () => {
            document.querySelector(this.el + " .drag-area .sign").style.display = "flex"
            Object.keys(this.signComponentsList).map(key => {
                this.signComponentsList[key].show = false
            })
            for (let key in this.signComponentsList) {
                if (this.signComponentsList[key].children.length === 0) {
                    this.signComponentsList[key].show = true
                    this.componentKey = key
                    $(`#id-${this.signComponentsList[key].uuid}`).siblings().children('.collapseTitle').children('.icon').removeClass('show')
                    $(`#id-${this.signComponentsList[key].uuid}`).siblings().children('.content').hide()
                    $(`#id-${this.signComponentsList[key].uuid}`).show()
                    $(`#id-${this.signComponentsList[key].uuid} .title`).children().eq(0).addClass('show')
                    $(`#id-${this.signComponentsList[key].uuid} .content`).show()
                    break
                }
            }
        }

        // ====================================================================================================================================
        // 配置区拖拽组件初始化
        this.configDrag()
        // ====================================================================================================================================
        // 跳转到第一页或者最后一页 start
        var tsaOperationDeskContainerEl = document.querySelector(this.el + ' .tsa-OperationDesk-container')
        for (var i = 0; i < document.querySelectorAll(this.el + ' .topOrBottom .iconfont').length; i++) {
            document.querySelectorAll(this.el + ' .topOrBottom .iconfont')[i].onclick = (e) => {
                if (getDataset(e.target).class === "up") {
                    tsaOperationDeskContainerEl.scrollTop = 0
                    document.querySelector('.currentPageClass').value = 1
                } else {
                    let scrollTop = 0
                    for (let i = 0; i < this.data.length; i++) {
                        scrollTop += this.data[i].height + 20
                    }
                    tsaOperationDeskContainerEl.scrollTop = scrollTop
                    document.querySelector('.currentPageClass').value = this.pageNumber
                }
                CommonMixins.changeCurrentPageStyle()
            }
        }
        // 跳转到第一页或者最后一页 end
        this.scaleDesk()
        this.collapseTitle()
    }
    configDrag () {
        // 初始拖拽添加功能
        let that = this
        let scale = this.percentage/100
        let initDragElements = document.querySelectorAll(this.el + ' .drag-area li')
        for (var i = 0; i < initDragElements.length; i++) {
            let initDragElement = initDragElements[i]
            let areaType = parseInt(getDataset(initDragElement).areatype)
            let componentType = parseInt(getDataset(initDragElement).componenttype)

            let currentObj = [ ...fillConfigs, ...signConfigs ].find(item => {
                return item.areaType === areaType && item.componentType === componentType
            })
            initDragElement.onmousedown = e => {
                e.stopPropagation()
                e.preventDefault()
                let width = currentObj.width * scale // 给滑块准备的 宽度
                let height = currentObj.height * scale // 给滑块准备的 高度
                let moveChunk = document.querySelector(this.el + ' #moveChunk')
                var { clientX, clientY } = e
                moveChunk.style.display = 'block'
                moveChunk.style.width = width + 'PX'
                moveChunk.style.height = height + 'PX'
                moveChunk.style.left = (clientX - width/2) + 'PX'
                moveChunk.style.top = (clientY - height/2) + 'PX'
                document.body.onmousemove = (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    let { clientX, clientY } = e;
                    moveChunk.style.left = (clientX - width/2) + 'PX'
                    moveChunk.style.top = (clientY - height/2) + 'PX'
                    moveChunk.style.borderColor = currentObj.borderColor
                }
                document.body.onmouseup = (e) => {
                    var coordinate = {}
                    this.data.map((key, index) => {
                        let id = `${this.el} #container-image${index}`
                        let { left, right, top, bottom } = document.querySelector(id).getBoundingClientRect();
                        coordinate[index+1] = {
                            axisX: [left, right],
                            axisY: [top, bottom]
                        }
                    })
                    let { clientX, clientY } = e;
                    let pageNum
                    for (let key in coordinate) {
                            let obj = coordinate[key]
                            if (clientX > obj.axisX[0] && clientX < obj.axisX[1] && clientY > obj.axisY[0] && clientY < obj.axisY[1]) {
                            pageNum = parseFloat(key)
                            break
                        }
                    }
                    if (pageNum) {
                        let index = pageNum - 1
                        let format = ''
                        switch (currentObj.componentType) {
                            case 5: // 日期格式对format赋值
                                format = dateFormatList[0]
                                break
                        }
                        if (currentObj.areaType === 2 && currentObj.componentType === 5) {
                            currentObj.width = signRequestDateImage[format].width
                            currentObj.height = signRequestDateImage[format].height
                        }
                        // 重置为false
                        let maxCount = 0
                        let rows = 2
                        // 默认字体大小是小四
                        let { fontSize, lineHeight } = fontSizeList['小四']
                        if (currentObj.componentType === 1) { // 单行文本
                            maxCount = changeWidthToFontCount(currentObj.width, fontSize)
                        }
                        if (currentObj.componentType === 2) { // 多行行文本
                            maxCount = changeWidthToFontCount(width, fontSize) * rows
                        }
                        let obj = {
                            "key": generateUUID(),
                            "orderly": new Date().getTime(), // 用时间戳排序
                            "componentKey": null,
                            "areaType": currentObj.areaType,
                            "componentType": currentObj.componentType,
                            "context": {
                                "aspectRatio": false,
                                "signature": {
                                    "location": "",
                                    "reason": ""
                                },
                                "fillText": "",
                                "defaultValue": currentObj.defaultValue,
                                "format": format,
                                'required': true,
                                "style": {
                                    "width": currentObj.width,
                                    "height": currentObj.height,
                                    lineHeight, 
                                    fontSize,
                                    "fontWeight": 'NORMAL',
                                    "textAlign": 'LEFT',
                                    "fontStyle": 'NORMAL',
                                    'fontFamily' : fontFamliyList[0].value,
                                    'textDecoration': 'NONE',
                                    rows,
                                    maxCount,
                                    "fontColor": {
                                        "red": 0,
                                        "green": 0,
                                        "blue": 0
                                    },
                                },
                                "position": {
                                    "x": parseFloat(((clientX - coordinate[pageNum].axisX[0] - width/2)/TsaGloble.scale).toFixed(1)),
                                    "y": parseFloat(((clientY - coordinate[pageNum].axisY[0] - height/2)/TsaGloble.scale).toFixed(1)),
                                    "pageNum": pageNum
                                },
                                "url": ""
                            },
                            "id": '',
                            "uuid": "id" + generateUUID(), // 提交时候记得删除
                            "description": ''
                        }
                        if (currentObj.areaType === 1) {
                            // that.fillArray.push(obj)
                            this.fillComponentsList.push(obj)
                            $(`${this.el} .fill-components-container`).append(`
                                <!-- 单行文本组件 -->
                                ${currentObj.componentType === 1 ? `${new SingleLineText().render(obj)}` : ''}
                                <!-- 多行文本 -->
                                ${currentObj.componentType === 2 ? `${new MultilineText().render(obj)}` : ''}
                                <!-- 日期组件的配置项 -->
                                ${currentObj.componentType === 5 ? `${new FillDate().render(obj)}` : ''}
                            `)

                        } else if (currentObj.areaType === 2) {
                            obj.componentKey = that.componentKey
                            $(`#id-${this.signComponentsList[this.componentKey].uuid} .content`).append(`
                                <!-- 签名组件 -->
                                ${currentObj.componentType === 3 ? `${new SignatureName().render(obj)}` : ''}
                                <!-- 签章组件 -->
                                ${currentObj.componentType === 4 ? `${new SignaturePicture().render(obj)}` : ''}
                                <!-- 日期组件的配置项 -->
                                ${currentObj.componentType === 5 ? `${new SignDate().render(obj)}` : ''}
                            `)
                            this.signComponentsList[this.componentKey].children.push(obj)
                        }
                        let div = document.createElement('div')
                        div.id = obj.uuid
                        if (obj.componentType === 1) {
                            div.innerHTML = `<input id="dragChild-${obj.uuid}-input" value="${obj.context.fillText}" type="text" maxlength="${obj.context.style.maxCount}" placeholder="请输入"/>`
                        }
                        if (obj.componentType === 2) {
                            div.innerHTML = `<textarea id="dragChild-${obj.uuid}-textarea" value="${obj.context.fillText}" maxlength="${obj.context.style.maxCount}" placeholder="请输入"></textarea>`
                        }
                        if (obj.areaType === 1 && obj.componentType === 5) {
                            div.innerHTML = `<span id="dragChild-${obj.uuid}-span">${obj.context.fillText || '日期'}</span>`
                        }
                        if (obj.componentType === 3) {
                            div.innerHTML = `<img id="dragChild-${obj.uuid}-qm" src="${require('./assets/images/qm.jpeg')}" />`
                        }
                        if (obj.componentType === 4) {
                            div.innerHTML = `<img id="dragChild-${obj.uuid}-gz" src="${require('./assets/images/gz.jpeg')}" />`
                        }
                        if (obj.areaType === 2 && obj.componentType === 5) {
                            div.innerHTML = `<img id="dragChild-${obj.uuid}-signDate" src=""/>`
                        }
                        let divId = `${this.el} #container-image${index}`
                        document.querySelector(divId).appendChild(div)
                        // 给新增的组件添加拖拽功能
                        this.dragResizeInit(obj)
                        this.componentScaleToUpdateStyle(obj)

                        if (obj.areaType === 1) {
                            FillMixins.updateStatus(obj)
                        }
                        if (obj.areaType === 2) {
                            SignMixins.updateStatus(obj)
                        }
                        let operationID = document.getElementById(`${obj.uuid}`)
                        if (obj.componentType === 1) {
                            this.singleLineTextInt(operationID, obj)
                        }
                        if (obj.componentType === 2) {
                            this.multilineTextInit(operationID, obj)
                        }
                        if (obj.areaType === 1 && obj.componentType === 5) {
                            this.fillDateInit(operationID, obj)
                        }
                        if (obj.componentType === 3) {
                            this.signatureNameInit(operationID, obj)
                        }
                        if (obj.componentType === 4) {
                            this.signaturePictureInit(operationID, obj)
                        }
                        if (obj.areaType === 2 && obj.componentType === 5) {
                            this.signDateInit(operationID, obj)
                        }
                    }
                    moveChunk.style.display = 'none'
                    document.body.onmouseup = null
                    document.body.onmousemove = null
                }
            }
            initDragElement = null

        }
        initDragElements = null // 清楚引用
    }
    scaleToUpdateStyle () {
        let scale = this.percentage / 100
        TsaGloble.scale = scale
        // 整体页面进行缩放
        this.data.map(item => {
            let width = item.width * TsaGloble.scale + 'px'
            let height = item.height * TsaGloble.scale + 'px'
            $(`${this.el} .container-image`).css('width', width).css('height', height)
        })
        // 整体的组件进行缩放
        this.componentsScaleToUpdateStyle()
        // 重新刷新一下配置区的拖拽组件
        this.configDrag()
        
    }
    componentsScaleToUpdateStyle () {
        let { componentsList } = this.getComponentsList()
        componentsList.map(item => {
            this.componentScaleToUpdateStyle(item)
        })
    }
    componentScaleToUpdateStyle (item) {
        let width = item.context.style.width * TsaGloble.scale + 'px'
        let height = item.context.style.height * TsaGloble.scale + 'px'
        let lineHeight = item.context.style.lineHeight * TsaGloble.scale + 'px'
        let fontSize = item.context.style.fontSize * TsaGloble.scale + 'px'
        let x = item.context.position.x  * TsaGloble.scale + 'px'
        let y = item.context.position.y  * TsaGloble.scale + 'px'
        $(`#${item.uuid}`).css('width', width).css('height', height).css('lineHeight', lineHeight).css('fontSize', fontSize).css('left', x).css('top', y)
    }
    scaleDesk () {
        document.querySelector(`${this.el} .PageTurning .icon-jianshao`).onclick = () => {
            if (this.percentage <= 50) return
            this.percentage -= 10
            document.querySelector(`${this.el} .percentage`).innerHTML = this.percentage + '%'
            this.scaleToUpdateStyle()
        }
        document.querySelector(`${this.el} .PageTurning .icon-jiahao2fill`).onclick = () => {
            if (this.percentage >= 200) return
            this.percentage += 10
            document.querySelector(`${this.el} .percentage`).innerHTML = this.percentage + '%'
            this.scaleToUpdateStyle()
        }
    }
    // 尽量减少内存
    resetData () {
        this.data.map(item => {
            item.configs = null
        })
    }
    dragResizeSticks (item1) {
        let sticks = []
        switch (item1.componentType) {
            case 1:
                sticks = ['mr']
                break
            case 2:
                sticks = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
                break
            case 3:
                sticks = ['tl', 'tr', 'br', 'bl']
                break
        }
        return sticks
    }
    dragResizeInit (item1) {
        let that = this
        let obj
        if (item1.areaType === 1) {
            obj = fillConfigs.find(item => {
                return item.componentType === item1.componentType
            })
        }
        if (item1.areaType === 2) {
            obj = signConfigs.find(item => {
                return item.componentType === item1.componentType
            })
        }
        let scale = this.percentage/100
        new TsaDragResize(`#${item1.uuid}`, {
            width: item1.context.style.width,
            height: item1.context.style.height,
            left: item1.context.position.x,
            top: item1.context.position.y,
            fontSize: item1.context.style.fontSize,
            fontFamily: item1.context.style.fontFamily,
            fontStyle: item1.context.style.fontStyle,
            fontWeight: item1.context.style.fontWeight,
            lineHeight: item1.context.style.lineHeight,
            textAlign: item1.context.style.textAlign,
            textDecoration: item1.context.style.textDecoration,
            borderColor: obj.borderColor,
            sticks: this.dragResizeSticks(item1),
            click: function (e) {
                $(`#${item1.uuid}`).addClass('active')
                $(`#${item1.uuid}`).siblings().removeClass('active')
                if (item1.areaType === 1) {
                    $(`${that.el} .tab`).find('li').eq(0).addClass('active')
                    $(`${that.el} .tab`).find('li').eq(1).removeClass('active')
                    $(`${that.el} .fill-components-container`).show()
                    $(`${that.el} .sign-components-container`).hide()

                    $(`${that.el} .fill-components-container .component`).each(function(){
                        $(this).find('.collapseTitle').children().eq(0).removeClass('show')
                        $(this).find('.content').hide()
                    })
                    $(`${that.el} .drag-area .fill`).show()
                    $(`${that.el} .addSign`).hide()
                    $(`${that.el} .drag-area .sign`).hide()
                    
                    $(`.component-${item1.uuid}`).children('.collapseTitle').children().eq(0).addClass('show')
                    $(`.component-${item1.uuid}`).children('.content').show()
                }
                if (item1.areaType === 2) {
                    $(`${that.el} .tab`).find('li').eq(1).addClass('active')
                    $(`${that.el} .tab`).find('li').eq(0).removeClass('active')
                    $(`${that.el} .fill-components-container`).hide()
                    $(`${that.el} .sign-components-container`).show()
                    //
                    let parent = $(`.component-${item1.uuid}`).parent().parent()
                    parent.find('.collapseTitle .icon').addClass('show')
                    parent.find('.content').show()

                    parent.siblings().find('.collapseTitle .icon').removeClass('show')
                    parent.siblings().find('.content').hide()
                    $(`${that.el} .drag-area .fill`).hide()
                    $(`${that.el} .addSign`).css('display', 'flex')
                    $(`${that.el} .drag-area .sign`).css('display', 'flex')

                    $(`.component-${item1.uuid}`).find(`#checkbox-${item1.uuid}`).prop("checked", true)
                    $(`.component-${item1.uuid}`).siblings().find(`.signCheckbox`).prop("checked", false)
                    layui.form.render("checkbox")
                    Object.keys(that.signComponentsList).map(key => {
                        that.signComponentsList[key].show = false
                        that.signComponentsList[key].children.map(item => {
                            if (item.uuid === item1.uuid) {
                                that.signComponentsList[key].show = true
                            }
                        })
                    })
                }
            },
            dragging: function ({ left, top, }) {
                item1.context.position.x = left
                item1.context.position.y = top
                $(`#id-TsaPosition-x-${item1.uuid}`).val(left)
                $(`#id-TsaPosition-y-${item1.uuid}`).val(top)
            },
            resize: function ({width, height, left, top}) {
                item1.context.style.width = width
                item1.context.style.height = height
                item1.context.position.x = left
                item1.context.position.y = top
                $(`#id-TsaSize-width-${item1.uuid}`).val(width)
                $(`#id-TsaSize-height-${item1.uuid}`).val(height)
                if (item1.componentType === 1) {
                    let maxCount = changeWidthToFontCount(width, item1.context.style.fontSize)
                    item1.context.style.maxCount = maxCount
                    $(`#id-TsaFontMaxCount-maxCount-${item1.uuid}`).val(maxCount)
                    $(`#dragChild-${item1.uuid}-input`).attr('maxlength', maxCount)
                }
                if (item1.componentType === 2) {
                    item1.context.style.rows = changeHeightToRows(item1.context.style.height, item1.context.style.lineHeight)
                    let maxCount = changeWidthToFontCount(item1.context.style.width, item1.context.style.fontSize) * item1.context.style.rows
                    item1.context.style.maxCount = item1.context.style.rows * maxCount
                    $(`#id-TsaFontMaxCount-rows-${item1.uuid}`).val(item1.context.style.rows)
                    $(`#id-TsaFontMaxCount-maxCount-${item1.uuid}`).val(maxCount)
                    $(`#dragChild-${item1.uuid}-textarea`).attr('maxlength', maxCount)
                }
                
            }
        })
        // 设置 input 监听
        if (item1.componentType === 1) {
            document.querySelector(`#dragChild-${item1.uuid}-input`).oninput = function (e) {
                item1.context.fillText = e.target.value
            }
        }
        // 设置 textarea 监听
        if (item1.componentType === 2) {
            document.querySelector(`#dragChild-${item1.uuid}-textarea`).oninput = function (e) {
                item1.context.fillText = e.target.value
            }
        }
        
    }
    // 单行文本组件初始化
    singleLineTextInt (operationID, item1) {
        $(`#dragChild-${item1.uuid}-input`).attr('placeholder', '单行文本')
        $(`#dragChild-${item1.uuid}-input`).val(item1.context.fillText)
        TsaName.init(item1)
        TsaPosition.init(operationID, item1)
        TsaSize.init(operationID, item1)
        TsaFontSetting.init(operationID, item1)
        SingleLineText.delete(item1, this.fillComponentsList)
        FillMixins.collapseTitle(item1, SingleLineText.name)
    }
    // 多行文本组件初始化
    multilineTextInit (operationID, item1) {
        $(`#dragChild-${item1.uuid}-textarea`).attr('placeholder', '多行文本')
        $(`#dragChild-${item1.uuid}-textarea`).val(item1.context.fillText)
        TsaName.init(item1)
        TsaPosition.init(operationID, item1)
        TsaSize.init(operationID, item1)
        TsaFontSetting.init(operationID, item1)
        MultilineText.delete(item1, this.fillComponentsList)
        FillMixins.collapseTitle(item1, MultilineText.name)
    }
    // 填充日期组件初始化
    fillDateInit (operationID, item1) {
        TsaName.init(item1)
        TsaPosition.init(operationID, item1)
        TsaFontSetting.init(operationID, item1)
        TsaTimeFormat.init(item1)
        TsaTimeValue.init(item1)
        FillDate.delete(item1, this.fillComponentsList)
        FillMixins.collapseTitle(item1, FillDate.name)
    }
    // 签名组件初始化
    signatureNameInit (operationID, item1) {
        LaiUiPlugin.checkbox(`checkbox-${item1.uuid}`, (value) => {
            if (value) {
                CommonMixins.scrollPosition(item1)
                SignMixins.updateStatus(item1)
            } else {
                SignMixins.resetStatus(item1, 1)
            }
        })
        TsaPosition.init(operationID, item1)
        TsaSize.init(operationID, item1)
        SignatureName.delete(item1, this.signComponentsList)
    }
    // 签章组件初始化
    signaturePictureInit (operationID, item1) {
        LaiUiPlugin.checkbox(`checkbox-${item1.uuid}`, (value) => {
            if (value) {
                CommonMixins.scrollPosition(item1)
                SignMixins.updateStatus(item1)
            } else {
                SignMixins.resetStatus(item1, 1)
            }
        })
        TsaPosition.init(operationID, item1)
        SignaturePicture.delete(item1, this.signComponentsList)
    }
    // 签名日期初始化
    signDateInit (operationID, item1) {
        LaiUiPlugin.checkbox(`checkbox-${item1.uuid}`, (value) => {
            if (value) {
                CommonMixins.scrollPosition(item1)
                SignMixins.updateStatus(item1)
            } else {
                SignMixins.resetStatus(item1, 1)
            }
        })
        TsaPosition.init(operationID, item1)
        TsaTimeFormat.init(item1, false)
        TsaTimeValue.init(item1)
        SignDate.delete(item1, this.signComponentsList)
    }
    collapseTitle () {
        let that = this
        $(`${this.el} .sign-components-container .collapseTitle`).on('click', function () {
            let componentKey = $(this).parent().attr('data-component-key')
            if (componentKey) { // 防止填充组件出问题
                let isSaveFalseArray = []
                Object.keys(that.signComponentsList).map(key => {
                    that.signComponentsList[key].children.map(item => {
                        // 重新清空所有的样式
                        SignMixins.resetStatus(item)
                    })
                    if (key == componentKey) {
                        that.signComponentsList[componentKey].show = !that.signComponentsList[componentKey].show
                        $(this).children().eq(0).toggleClass('show')
                        $(this).next().toggle()
                    } else {
                        $(this).parent().siblings().children('.collapseTitle').children('.icon').removeClass('show')
                        $(this).parent().siblings().children('.content').hide()
                        that.signComponentsList[key].show = false
                    }
                    if (that.signComponentsList[key].show === false) {
                        isSaveFalseArray.push(that.signComponentsList[key].uuid)
                    }
                })
                console.log(isSaveFalseArray.length)
                console.log(that.signatorys.length)
                if (isSaveFalseArray.length === that.signatorys.length) { // 全是false
                    that.componentKey = null
                    document.querySelector(that.el + " .drag-area .sign").style.display = "none"
                } else {
                    that.componentKey = componentKey
                    document.querySelector(that.el + " .drag-area .sign").style.display = "flex"
                }
            }
            
        })
    }
    // 获取所有的组件参数
    getComponentsList () {
        let signComponentsList = []
        Object.keys(this.signComponentsList).map(key => {
            this.signComponentsList[key].children.map(item => {
                signComponentsList.push(item)
            })
        })
        let componentsList = [ ...this.fillComponentsList, ...signComponentsList ]
        // 对componentsList进行排序
        componentsList.sort(function(a,b) {
            return a.orderly - b.orderly
        });
        // 对数据进行剔除字段处理
        let newComponentsList = JSON.parse(JSON.stringify(componentsList))
        newComponentsList.map(item => {
            item.key = null
            item.orderly = null
            item.context.aspectRatio = null
            item.context.defaultValue = null
            // item.uuid = null // 此处暂时不能手动清空，还要给缩放的函数componentScaleToUpdateStyle使用
        })
        return {
            templateId: this.templateId,
            componentsList: newComponentsList
        }
    }
    // 判断组件列表是否更改
    isComponentsListChanged () {
        let updateComponents = []
        let { componentsList } = this.getComponentsList()
        componentsList.map(item => {
            if (item.id) {
                updateComponents.push(item.id)
            } else {
                updateComponents.push(item.uuid)
            }
        })
        // 如果二者相同组件列表没有更改
        if (this.initComponents.sort().toString() === updateComponents.sort().toString()) {
            return false
        } else {
            return true
        }
    }
    destroy () {
        // 清空容器内部的dom
        $(this.el).empty()
        this.el = null
        this.templateId = null
        this.percentage = null
        this.currentPage = null
        this.pageNumber = null
        this.signatorys = null
        this.fillComponentsList = null
        this.signComponentsList = null
        this.initComponents = null// 存储原始的组件列表，用作后来的比对
        this.data = null
        this.componentKey = null
        TsaTooltip.destroy()
    }
}

// window.TsaOperationDesk = TsaOperationDesk
export default TsaOperationDesk