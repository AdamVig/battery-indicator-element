import { css, customElement, html } from 'lit-element'

import { BatteryIndicator } from './battery-indicator'
import { percentageIsValid } from './percentage-is-valid'

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
    if (percentageIsValid(this.percentage)) {
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
