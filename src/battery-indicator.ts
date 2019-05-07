import { css, customElement, LitElement, property, svg, html, SVGTemplateResult, TemplateResult } from 'lit-element'

import { State } from './battery-state'
import { ifTrue } from './if-true'
import { percentageIsValid } from './percentage-is-valid'

@customElement('battery-indicator')
export class BatteryIndicator extends LitElement {
  @property({ type: Number }) percentage: number = 0;
  @property({ type: String }) state: State = undefined;
  @property({ type: Boolean, attribute: 'show-percentage' }) showPercentage: boolean = false;

  static get styles () {
    return css`
      :host {
        display: inline-block;
      }
      .charge {
        fill: var(--charge-fill, #000);
        fill-opacity: var(--charge-fill-opacity, 1.0);
      }
      .background {
        fill: var(--background-fill, #000);
        fill-opacity: var(--background-fill-opacity, 0.3);
      }
      .status {
        fill: var(--status-fill, #fff);
        fill-opacity: var(--status-fill-opacity, 1.0);
      }
    `
  }

  private getPercentage (): number {
    if ((this.state === undefined || this.state === 'charging') && percentageIsValid(this.percentage)) {
      return this.percentage
    }
    return 100
  }

  renderIndicator (): SVGTemplateResult {
    return svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48">
      <defs>
        <clipPath id="percentageClip">
          <path fill="none" d="M0 0h48v48H0z" transform="scale(${this.getPercentage() / 100}, 1)"/>
        </clipPath>
        <path
          id="batteryPath"
          d="M3.696 11.482a3.13 3.13 0 0 0-3.132 3.132V31.83a3.13 3.13 0 0 0 3.132 3.132H12.3v-.011h27.377a3.125 3.125 0 0 0 3.134-3.132V27.91h4.693v-9.387H42.81v-3.909a3.125 3.125 0 0 0-3.134-3.132H12.3z"/>
      </defs>
      <path d="M0 0h48v48H0z" fill="none"/>
      <use class="charge" href="#batteryPath" clip-path="url(#percentageClip)"/>
      <use class="background" href="#batteryPath"/>

      <path
        class="status"
        display="${ifTrue(this.state === 'charging', 'none')}"
        d="M23.306 13.023v8.63h3.139l-3.767 7.061h.01l-2.52 4.707v-8.629H17.03z"/>
      <path
        class="status"
        display="${ifTrue(this.state === 'alert', 'none')}"
        d="M24.004 33.443H19.47V28.91h4.533zM24.004 24.377H19.47V13.045h4.533z"/>
      <path
        class="status"
        display="${ifTrue(this.state === 'unknown', 'none')}"
        d="M23.366 33.443H19.47v-3.895h3.895zM26.133 22.66s-.779.86-1.373 1.455c-.994.994-1.702 2.347-1.702 3.28h-3.28c0-1.701.943-3.126 1.907-4.09l1.906-1.937a3.071 3.071 0 0 0-2.173-5.248 3.071 3.071 0 0 0-3.075 3.075h-3.075a6.155 6.155 0 0 1 6.15-6.15 6.155 6.155 0 0 1 6.15 6.15 4.854 4.854 0 0 1-1.435 3.465z"/>
    </svg>`
  }

  render (): TemplateResult {
    if (this.showPercentage) {
      return html`<span>${this.percentage}%</span> ${this.renderIndicator()}`
    }

    return this.renderIndicator()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'battery-indicator': BatteryIndicator
  }
}
