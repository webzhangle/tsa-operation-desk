import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
export default class CommonMixins {
    static el = null
    static paggesData = []
    static init ({ pageNumber }) {
        // 设置当前输入框的交互内容
        document.querySelector(`${CommonMixins.el} .currentPageClass`).onchange = function (e) {
            e.target.value = e.target.value.replace(/[^\d]/g,'') || 1
            let value = parseInt(e.target.value)
            if (value > pageNumber) {
                value = pageNumber
            } else if (value === 0) {
                value = 1
            }
            document.querySelector('.currentPageClass').value = value
            CommonMixins.changeCurrentPageStyle()
            CommonMixins.scroll(value-1)
        }
        // 设置像左区域的内容
        document.querySelector(`${CommonMixins.el} .PageTurning .prev`).onclick = function () {
            let currentPage = parseInt(document.querySelector(`${CommonMixins.el} .currentPageClass`).value)
            if (currentPage <= 1) {
                currentPage = 1
            } else {
                currentPage = currentPage - 1
            }
            document.querySelector(`${CommonMixins.el} .currentPageClass`).value = currentPage
            CommonMixins.changeCurrentPageStyle()
            CommonMixins.scroll(currentPage - 1)
        }
        // 设置像右区域的内容
        document.querySelector(`${CommonMixins.el} .PageTurning .next`).onclick = function () {
            let currentPage = parseInt(document.querySelector(`${CommonMixins.el} .currentPageClass`).value)
            if (currentPage >= pageNumber) return
            currentPage++
            document.querySelector(`${CommonMixins.el} .currentPageClass`).value = currentPage
            CommonMixins.changeCurrentPageStyle()
            CommonMixins.scroll(currentPage - 1)
        }
        
    }
    static changeCurrentPageStyle () {
        document.querySelector('.currentPageClass').style.width = document.querySelector('.currentPageClass').value.length * 14  + 'px'
    }
    static scrollPosition (item) {
        let pageNum = item.context.position.pageNum - 1
        document.querySelector(`${CommonMixins.el} .currentPageClass`).value = item.context.position.pageNum
        CommonMixins.changeCurrentPageStyle()
        CommonMixins.scroll(pageNum)
    }
    static scroll (pageNum) {
        let scrollEl = document.querySelector(`${CommonMixins.el} .tsa-OperationDesk-container`)
        let scrollTop = 0
         CommonMixins.paggesData.map((page, index) => {
            if (index < pageNum) {
                scrollTop += page.height + 20
            }
        })
        scrollEl.scrollTop = scrollTop
    }
}