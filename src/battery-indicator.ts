import { LitElement, svg, customElement, property } from 'lit-element'

import { State } from './battery-state'
import { ifFalse } from './if-false'

@customElement('battery-indicator')
export class BatteryIndicator extends LitElement {
  @property({ type: Number }) percentage: number = 0;
  @property({ type: String }) state: State = undefined;

  protected percentageIsValid (): boolean {
    return !Number.isNaN(this.percentage) && this.percentage >= 0 && this.percentage <= 100
  }

  render () {
    const totalWidth = 48
    let width = totalWidth
    if ((this.state === undefined || this.state === 'charging') && this.percentageIsValid()) {
      width = totalWidth * (this.percentage / 100)
    }

    return svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
      <defs>
        <clipPath id="percentageClip">
          <path fill="none" d="M0 0h${width}v48H0z"/>
        </clipPath>
        <path id="batteryPath" d="M3.696 11.482a3.13 3.13 0 0 0-3.132 3.132V31.83a3.13 3.13 0 0 0 3.132 3.132H12.3v-.011h27.377a3.125 3.125 0 0 0 3.134-3.132V27.91h4.693v-9.387H42.81v-3.909a3.125 3.125 0 0 0-3.134-3.132H12.3z"/>
      </defs>
      <path d="M0 0h48v48H0z" fill="none"/>
      <use href="#batteryPath" clip-path="url(#percentageClip)"/>
      <use href="#batteryPath" fill="#000" fill-opacity="0.3"/>

      <path fill="#fff" display="${ifFalse(this.state === 'charging', 'none')}" d="M23.306 13.023v8.63h3.139l-3.767 7.061h.01l-2.52 4.707v-8.629H17.03z"/>
      <path fill="#fff" display="${ifFalse(this.state === 'alert', 'none')}" d="M24.004 33.443H19.47V28.91h4.533zM24.004 24.377H19.47V13.045h4.533z"/>
      <path fill="#fff" display="${ifFalse(this.state === 'unknown', 'none')}" d="M23.366 33.443H19.47v-3.895h3.895zM26.133 22.66s-.779.86-1.373 1.455c-.994.994-1.702 2.347-1.702 3.28h-3.28c0-1.701.943-3.126 1.907-4.09l1.906-1.937a3.071 3.071 0 0 0-2.173-5.248 3.071 3.071 0 0 0-3.075 3.075h-3.075a6.155 6.155 0 0 1 6.15-6.15 6.155 6.155 0 0 1 6.15 6.15 4.854 4.854 0 0 1-1.435 3.465z"/>
    </svg>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'battery-indicator': BatteryIndicator
  }
}
