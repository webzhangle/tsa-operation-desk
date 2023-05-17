export default class TsaRadio {
    constructor (options) {
        this.name = options.name
        this.label = options.label
        this.slot = options.slot
        this.label = options.label
    }
    render () {
        return `<div class="tsa-radio">
                    <label>
                        <input type="radio" name="${this.name}" data-label="${this.label}" id="" value="${this.label}" onchange="tsaCommonRadioChange(this)">
                        ${this.slot}
                    </label>
                </div>`
    }
}