import { css, customElement, html } from 'lit-element'

import { BatteryIndicator } from './battery-indicator'

@customElement('battery-status')
export class BatteryStatus extends BatteryIndicator {
  static get styles () {
    return css`
      span {
        line-height: 24px;
      }
      svg {
        vertical-align: top;
      }
    `
  }

  render () {
    if (super.percentageIsValid()) {
      return html`<span>${this.percentage}%</span> ${super.render()}`
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
