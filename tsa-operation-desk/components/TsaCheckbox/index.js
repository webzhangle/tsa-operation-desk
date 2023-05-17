export default class TsaCheckbox {
    constructor (options) {
        this.id = options.id
        this.value = options.value
        this.slot = options.slot
        this['true-label'] = options['true-label'] || null
        this['false-label'] = options['false-label'] || null
    }
    render () {
        let selected = this.value === this['true-label'] ? true : false
        return `<div class="tsa-checkbox" id="${this.id}">
                    <label class="${selected ? 'is-checked' :''}">
                        <input type="checkbox" name="" checkedStatus="${selected}" data-true-label="${this['true-label']}" data-false-label="${this['false-label']}" value="${this.value}" onchange="tsaCommonCheckboxChange(this)">
                        ${this.slot}
                    </label>
                </div>`
    }
    
}