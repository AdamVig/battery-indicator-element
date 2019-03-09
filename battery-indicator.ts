import { LitElement, html, css, customElement, property } from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

import { State } from './battery-state'
import battery20 from './img/battery-20.svg'
import battery30 from './img/battery-30.svg'
import battery50 from './img/battery-50.svg'
import battery60 from './img/battery-60.svg'
import battery80 from './img/battery-80.svg'
import battery90 from './img/battery-90.svg'
import battery100 from './img/battery-100.svg'
import batteryCharging20 from './img/battery-charging-20.svg'
import batteryCharging30 from './img/battery-charging-30.svg'
import batteryCharging50 from './img/battery-charging-50.svg'
import batteryCharging60 from './img/battery-charging-60.svg'
import batteryCharging80 from './img/battery-charging-80.svg'
import batteryCharging90 from './img/battery-charging-90.svg'
import batteryCharging100 from './img/battery-charging-100.svg'
import batteryUnknown from './img/battery-unknown.svg'
import batteryAlert from './img/battery-alert.svg'

@customElement('battery-indicator')
export class BatteryIndicator extends LitElement {
  @property({ type: Number }) percentage: number = 0;
  @property({ type: String }) state: State = undefined;

  static get styles () {
    return css`
      svg {
        vertical-align: top;
      }
    `
  }

  private static readonly iconPercentages: number[] = [
    20,
    30,
    50,
    60,
    80,
    90,
    100
  ]

  private static readonly normalIcons: {[key: number]: string} = {
    20: battery20,
    30: battery30,
    50: battery50,
    60: battery60,
    80: battery80,
    90: battery90,
    100: battery100
  }

  private static readonly chargingIcons: {[key: number]: string} = {
    20: batteryCharging20,
    30: batteryCharging30,
    50: batteryCharging50,
    60: batteryCharging60,
    80: batteryCharging80,
    90: batteryCharging90,
    100: batteryCharging100
  }

  private getIcon (): string {
    if (this.state === 'alert') {
      return batteryAlert
    } else if (this.state === 'unknown' || !this.percentageIsValid()) {
      return batteryUnknown
    } else if (this.state === 'charging') {
      return BatteryIndicator.chargingIcons[this.getNearestPercentage()]
    } else {
      return BatteryIndicator.normalIcons[this.getNearestPercentage()]
    }
  }

  protected percentageIsValid (): boolean {
    return !Number.isNaN(this.percentage) && this.percentage >= 0 && this.percentage <= 100
  }

  private getNearestPercentage () {
    return BatteryIndicator.iconPercentages
      .reduce((prev, curr) => Math.abs(curr - this.percentage) < Math.abs(prev - this.percentage) ? curr : prev)
  }

  render () {
    return html`${unsafeHTML(this.getIcon())}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'battery-indicator': BatteryIndicator
  }
}
