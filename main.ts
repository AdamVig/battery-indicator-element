import { LitElement, html, css, customElement, property } from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

import battery20 from './img/battery-20.svg'
import battery30 from './img/battery-30.svg'
import batteryFull from './img/battery-full.svg'
import batteryChargingFull from './img/battery-charging-full.svg'

type State = 'charging'|'unknown'|'error'|undefined;

const tag = 'battery-status'

@customElement(tag)
export class BatteryStatus extends LitElement {
  @property({ type: Number }) percentage: Number = 0;
  @property({ type: String }) state: State = undefined;

  static get styles () {
    return css`
      svg {
        transform: rotate(90deg);
      }
    `
  }

  render () {
    return html`${this.percentage}% ${unsafeHTML(battery20)} ${unsafeHTML(battery30)} ${unsafeHTML(batteryFull)} ${unsafeHTML(batteryChargingFull)}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    tag: BatteryStatus
  }
}
