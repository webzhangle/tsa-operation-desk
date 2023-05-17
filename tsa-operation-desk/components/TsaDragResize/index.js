import TsaGloble from '@tsa-operation-desk/common/TsaGloble'
import { getDataset } from '@tsa-operation-desk/common/utils'
// 创建一个MoveClass构造函数
function TsaDragResize(id, options = {}) {
    // 绑定ele属性
    this.id = id
    this.ele = document.querySelector(id);
    this.ele.className = this.ele.className += ' tsa-dragResize'
    let scale = options.scale || 1
    this.ele.style.left = scale * (options.left || 0) + 'px';
    this.ele.style.top = scale * (options.top || 0) + 'px';
    this.ele.style.width = scale * (options.width || 100) + 'px';
    this.ele.style.height = scale * (options.height || 100) + 'px';
    this.ele.style.fontSize = scale * (options.fontSize || 14) + 'px';
    this.ele.style.fontFamily = options.fontFamily || 'SIM_SUN';
    this.ele.style.fontStyle = options.fontStyle || 'NORMAL';
    this.ele.style.fontWeight = options.fontWeight || 'NORMAL'
    this.ele.style.lineHeight = scale * (options.lineHeight || 15) + 'px';
    this.ele.style.textAlign = options.textAlign || 'LEFT'
    this.ele.style.textDecoration = options.textDecoration || 'NONE'
    this.ele.style.outline = options.borderColor ? `1px dashed ${options.borderColor}` : ''
    this.sticks = options.sticks || ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];
    this.draggingCallback = options.dragging
    this.resizeCallback = options.resize
    this.clickCallback = options.click
    this.minWidth = options.minWidth || 20
    this.minHeight = options.minHeight || 20
    this.scale = scale
    this.aspectRatio = options.aspectRatio || false // 是否等比缩放
    this.move();
    this.resize();
}
// 给MoveClass原型上绑定move方法
TsaDragResize.prototype.move = function () {
    this.ele.ondblclick = e => {
        var e = e || window.event;
        var obj = document.elementFromPoint(e.clientX, e.clientY);
        if (obj && obj.tagName && (obj.tagName.toLowerCase() === 'input' || obj.tagName.toLowerCase() === 'textarea')) {
            this.ele.setAttribute('notMove', 'true')
            e.target.style.cursor = 'text'
            obj.focus()
           return
        }
    }
    if (document.querySelector(`${this.id} input`)) {
        document.querySelector(`${this.id} input`).onblur = (e) => {
            this.ele.setAttribute('notMove', 'false')
            e.target.style.cursor = 'text'
        }
        document.querySelector(`${this.id} input`).onmouseover = (e) => {
            if (this.ele.getAttribute('notMove') === 'true') {
                e.target.style.cursor = 'text'
            } else {
                e.target.style.cursor = 'move'
            }
            
        }
        document.querySelector(`${this.id} input`).onmouseleave = (e) => {
            e.target.style.cursor = 'text'
        }
    }
    if (document.querySelector(`${this.id} textarea`)) {
        document.querySelector(`${this.id} textarea`).onblur = (e) => {
            this.ele.setAttribute('notMove', 'false')
            e.target.style.cursor = 'text'
        }
        document.querySelector(`${this.id} textarea`).onmouseover = (e) => {
            if (this.ele.getAttribute('notMove') === 'true') {
                e.target.style.cursor = 'text'
            } else {
                e.target.style.cursor = 'move'
            }
        }
        document.querySelector(`${this.id} textarea`).onmouseleave = (e) => {
            e.target.style.cursor = 'text'
        }
    }
    // ele的鼠标按下事件调用mousedown
    this.ele.onmousedown = e => {
        if (this.ele.getAttribute('notMove') === 'true') {
            return
        }
        // 获取事件对象
        var e = e || window.event;
        this.clickCallback && this.clickCallback(e)
            e.preventDefault()
            e.stopPropagation()
            // 鼠标按下时，鼠标相对于元素的x坐标
            var x = e.offsetX;
            // 鼠标按下时，鼠标相对于元素的y坐标
            var y = e.offsetY;
            // 鼠标按下移动时调用mousemove
            var parent = this.ele.offsetParent
            document.onmousemove = e => {
                e.preventDefault()
                e.stopPropagation()
                // 元素ele移动的距离l
                var l = e.pageX - parent.getBoundingClientRect().left - x;
                let left = Math.min(Math.max(l, 0) ,parent.getBoundingClientRect().width - this.ele.offsetWidth)
                // 元素ele移动的距离t
                var t = e.pageY - parent.getBoundingClientRect().top - y;
                let top = Math.min(Math.max(t, 0) ,parent.getBoundingClientRect().height - this.ele.offsetHeight)

                this.ele.style.left = left + "px";
                this.ele.style.top = top + "px";

                this.draggingCallback && this.draggingCallback({
                    left: parseInt(left/TsaGloble.scale),
                    top: parseInt(top/TsaGloble.scale)
                })
            }
            // 当鼠标弹起时，清空onmousemove与onmouseup
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        
    }
}
TsaDragResize.prototype.resize = function () {
    // this.sticks = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
    for (var i = 0; i < this.sticks.length; i++) {
        let stick = this.sticks[i]
        var sticksElement = document.createElement("div");
        sticksElement.className = "tsa-stick " + "tsa-stick-" + stick;
        sticksElement.onmousedown = e => {
            var e = e || window.event;
            // 阻止事件冒泡（针对父元素的move）
            e.preventDefault()
            e.stopPropagation();
            // 先获取鼠标距离屏幕的left与top值
            var clientXY = {
                x: e.pageX,
                y: e.pageY
            }
            // 获取鼠标按下时ele的宽高
            var eleWH = {
                width: this.ele.clientWidth,
                height: this.ele.clientHeight,
                left: this.ele.offsetLeft,
                top: this.ele.offsetTop,
            }
            let { aspectratio } = getDataset(this.ele)
            if (aspectratio && aspectratio === 'true') {
                aspectratio = true
            } else {
                aspectratio = false
            }
            document.onmousemove = e => {
                e.preventDefault()
                e.stopPropagation()
                let width = eleWH.width
                let height = eleWH.height
                let left = eleWH.left
                let top = eleWH.top
                let parent = this.ele.parentNode
                switch (stick) {
                    case 'tl':
                        var differY = aspectratio ? (e.pageX - clientXY.x) : (e.pageY - clientXY.y)
                        width = Math.max(eleWH.width - (e.pageX - clientXY.x), this.minWidth)
                        height = Math.max(eleWH.height - differY, this.minHeight)
                        left = eleWH.left + (e.pageX - clientXY.x)
                        top = eleWH.top + differY
                        // 设置left最大值
                        if (left > eleWH.left + eleWH.width - this.minWidth) {
                            left = eleWH.left + eleWH.width - this.minWidth
                        }
                        // 设置top最大值
                        if (top > eleWH.top + eleWH.height - this.minWidth) {
                            top = eleWH.top + eleWH.height - this.minWidth
                        }
                        // 如果width大于父元素的宽度则不能越界
                        if (width > eleWH.left + eleWH.width) {
                            width = eleWH.left + eleWH.width
                            left = 0
                        }
                        // 如果height大于父元素的宽度则不能越界
                        if (height > eleWH.top + eleWH.height) {
                            height = eleWH.top + eleWH.height
                            top = 0
                        }
                        this.ele.style.width = width + 'px'
                        this.ele.style.height = height + 'px'
                        this.ele.style.left = left + 'px'
                        this.ele.style.top = top + 'px'
                        break
                    case 'tm':
                        height = Math.max(eleWH.height + (clientXY.y - e.pageY), this.minHeight)
                        top = eleWH.top + (e.pageY - clientXY.y)
                        // 设置top最大值
                        if (top > eleWH.top + eleWH.height - this.minWidth) {
                            top = eleWH.top + eleWH.height - this.minWidth
                        }    
                        // 如果height大于父元素的宽度则不能越界
                        if (height > eleWH.top + eleWH.height) {
                            height = eleWH.top + eleWH.height
                            top = 0
                        }
                        this.ele.style.height = height + 'px'
                        this.ele.style.top = top + 'px'
                        break
                    case 'tr':
                        var differY = aspectratio ? (e.pageX - clientXY.x) : (clientXY.y - e.pageY)
                        width = Math.max(eleWH.width + (e.pageX - clientXY.x), this.minWidth)
                        height = Math.max(eleWH.height + differY, this.minHeight)
                        
                        top = eleWH.top - differY
                        // 设置top最大值
                        if (top > eleWH.top + eleWH.height - this.minWidth) {
                            top = eleWH.top + eleWH.height - this.minWidth
                        }
                        // 如果width大于父元素的宽度则不能越界
                        if (width > parent.offsetWidth - eleWH.left) {
                            width = parent.offsetWidth - eleWH.left
                        }
                        // 如果height大于父元素的宽度则不能越界
                        if (height > eleWH.top + eleWH.height) {
                            height = eleWH.top + eleWH.height
                            top = 0
                        }
                        this.ele.style.width = width + 'px'
                        this.ele.style.height = height + 'px'
                        this.ele.style.top = top + 'px'
                        break
                    case 'ml':
                        left = eleWH.left + (e.pageX - clientXY.x)
                        width = Math.max(eleWH.width - (e.pageX - clientXY.x), this.minWidth)
                        // 设置left最大值
                        if (left > eleWH.left + eleWH.width - this.minWidth) {
                            left = eleWH.left + eleWH.width - this.minWidth
                        }
                        // 如果width大于父元素的宽度则不能越界
                        var right = parent.offsetWidth - eleWH.width - eleWH.left
                        if (width > parent.offsetWidth - right) {
                            width = parent.offsetWidth - right
                            left = 0
                        }
                        this.ele.style.width = width + 'px'
                        this.ele.style.left = left + 'px'
                        break
                    case 'mr':
                        width = Math.max(eleWH.width + e.pageX - clientXY.x, this.minWidth)
                        // 如果width大于父元素的宽度则不能越界
                        if (width > parent.offsetWidth - this.ele.offsetLeft) {
                            width = parent.offsetWidth - this.ele.offsetLeft
                        }
                        this.ele.style.width = width + 'px'
                        break
                    case 'bm':
                        height = Math.max(eleWH.height + e.pageY - clientXY.y, this.minHeight)
                        // 如果height大于父元素的宽度则不能越界
                        if (height > parent.offsetHeight - eleWH.top) {
                            height = parent.offsetHeight - eleWH.top
                        }
                        this.ele.style.height = height + 'px'
                        break
                    case 'bl':
                        var differY = aspectratio ? (clientXY.x - e.pageX) : (e.pageY - clientXY.y)
                        width = Math.max(eleWH.width + (clientXY.x - e.pageX), this.minWidth)
                        height = Math.max(eleWH.height + differY, this.minHeight)
                        left = eleWH.left + (e.pageX - clientXY.x)
                        // 设置left最大值
                        if (left > eleWH.left + eleWH.width - this.minWidth) {
                            left = eleWH.left + eleWH.width - this.minWidth
                        }
                        // 如果width大于父元素的宽度则不能越界
                        var right = parent.offsetWidth - eleWH.width - eleWH.left
                        if (width > parent.offsetWidth - right) {
                            width = parent.offsetWidth - right
                            left = 0
                        }
                        // 如果height大于父元素的宽度则不能越界
                        if (height > parent.offsetHeight - eleWH.top) {
                            height = parent.offsetHeight - eleWH.top
                        }
                        this.ele.style.left = left + 'px'
                        this.ele.style.width = width + 'px'
                        this.ele.style.height = height + 'px'
                        break
                    case 'br':
                        var differY = aspectratio ? (e.pageX - clientXY.x) : (e.pageY - clientXY.y)
                        width = Math.max(eleWH.width + e.pageX - clientXY.x, this.minWidth)
                        height = Math.max(eleWH.height + differY, this.minHeight)
                        // 如果width大于父元素的宽度则不能越界
                        if (width > parent.offsetWidth - this.ele.offsetLeft) {
                            width = parent.offsetWidth - this.ele.offsetLeft
                        }
                        // 如果height大于父元素的宽度则不能越界
                        if (height > parent.offsetHeight - eleWH.top) {
                            height = parent.offsetHeight - eleWH.top
                        }
                        this.ele.style.width = width + 'px'
                        this.ele.style.height = height + 'px'
                        break
                }
                this.resizeCallback && this.resizeCallback({
                    left: parseInt(left/TsaGloble.scale),
                    top: parseInt(top/TsaGloble.scale),
                    width: parseInt(width/TsaGloble.scale),
                    height: parseInt(height/TsaGloble.scale),
                })
            }
            // 当鼠标弹起时，清空onmousemove与onmouseup
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
        this.ele.appendChild(sticksElement);
    }
}
export default TsaDragResize;