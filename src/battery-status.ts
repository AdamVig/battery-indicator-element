import { css, customElement, html } from 'lit-element'

import { BatteryIndicator } from './battery-indicator'

@customElement('battery-status')
export class BatteryStatus extends BatteryIndicator {
  static get styles () {
    return css`
      :host {
        display: flex;
      }
      p {
        display: inline-block;
        margin-right: 5px;
      }
    `
  }

  render () {
    if (super.percentageIsValid()) {
      return html`
        <p>${this.percentage}%</p>
        ${super.render()}
      `
    } else {
      return super.render()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'battery-status': BatteryStatus
  }
}
