
import '@tsa-operation-desk/layui/layui.js'
let $ = layui.jquery
let tabList = [
    {
        name: '合同内容填充设置',
        value: 1,
        active: true
    },
    {
        name: '签名区设置',
        value: 2,
        active: false
    }
]
export default class TabList {
    static render (el) {
        let str = `<div class="tab">
                        <ul id="tabId">
                            ${ tabList.map((item, index) => {
                                let str = `<li data-index="${index}" class="${item.active ? 'active' : 'nomal'}">${item.name}</li>`
                                return str;
                            }).join('') }
                        </ul>
                    </div>`
        return str;
    }
    static init (el) {
        $(`${el} .tab li`).each(function() {
            $(this).on('click', function () {
                $(this).addClass('active')
                $(this).siblings().removeClass('active')
                let addSignElQuerySelector = el + " .addSign"
                let addSignEl = document.querySelector(addSignElQuerySelector)
                let fillElQuerySelector = el + " .fill"
                let fillEl = document.querySelector(fillElQuerySelector)
                let signElQuerySelector = el + " .sign"
                let signEl = document.querySelector(signElQuerySelector)
                let fillComponentsEl = document.querySelector(el + " .fill-components-container")
                let signComponentsEL = document.querySelector(el + " .sign-components-container")
                let dataIndex = $(this).attr('data-index')
                
                $(`${el} .tsa-OperationDesk-container`).find('.container-image .tsa-dragResize').removeClass('active')

                $(`${el} .fill-components-container .component`).each(function () {
                    $(this).find('.collapseTitle .icon').removeClass('show')
                    $(this).find('.content').hide()
                })

                $(`${el} .sign-components-container .component`).each(function () {
                    $(this).find('.collapseTitle .icon').removeClass('show')
                    $(this).find('.content').hide()
                    $(this).find('.content').find(`.signCheckbox`).prop("checked", false)
                    layui.form.render("checkbox")
                })

                switch (dataIndex) {
                    case '0':
                        addSignEl.style.display = "none"
                        fillEl.style.display = "flex"
                        signEl.style.display = "none"
                        fillComponentsEl.style.display = "block"
                        signComponentsEL.style.display = "none"
                        break
                    case '1':
                        addSignEl.style.display = "flex"
                        fillEl.style.display = "none"
                        signEl.style.display = "none"
                        fillComponentsEl.style.display = "none"
                        signComponentsEL.style.display = "block"
                        break
                }
            })
        })
    }
}