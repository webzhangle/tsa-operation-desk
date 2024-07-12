import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
export default class TsaTooltip {
    constructor (id, options = {}) {
        this.id = id.replace('#', '')
        this.message = options.message || ''
        let div = document.createElement('div')
        div.className = 'tsa-tooltip-container'
        div.innerHTML = this.render()
        document.body.appendChild(div)
        div = null
        let that = this
        document.querySelector(`#${that.id}`).onmouseover = function (e) {
            let currentEl = document.querySelector(`#tooltip-${this.id}`)
            currentEl.style.display = 'flex'
            let width = currentEl.clientWidth
            let height = currentEl.clientHeight
            // 鼠标按下时，鼠标相对于元素的x坐标
            var x = e.offsetX;
            // 鼠标按下时，鼠标相对于元素的y坐标
            var y = e.offsetY;
            let left = e.pageX - x - width/2 + this.offsetWidth/2
            let top = e.pageY - y - height - 10
            currentEl.style.left = left + 'px'
            currentEl.style.top = top + 'px'
            currentEl = null
        }
        document.querySelector(`#${that.id}`).onmouseleave = function (e) {
            document.querySelector(`#tooltip-${that.id}`).style.display = 'none'
        }
    }
    render () {
        return  `<div class="tsa-tooltip" id="tooltip-${this.id}">
                    ${this.message}
                    <div class="popper__arrow"></div>
                </div>`
    }
    static destroy () {
        $("body .tsa-tooltip-container").remove()
    }
}