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
        d="M23.785 32.528h-4.11v-4.112h4.11zM23.785 24.305h-4.11V14.028h4.11z"/>
      <path
        class="status"
        display="${ifTrue(this.state === 'unknown', 'none')}"
        d="M23.178 32.38h-3.533v-3.532h3.533zM25.688 22.6s-.707.781-1.246 1.32c-.902.902-1.543 2.13-1.543 2.975h-2.975c0-1.543.855-2.835 1.73-3.709l1.728-1.757a2.785 2.785 0 0 0-1.97-4.76 2.785 2.785 0 0 0-2.79 2.79h-2.788c0-3.078 2.5-5.579 5.577-5.579 3.078 0 5.578 2.501 5.578 5.578a4.402 4.402 0 0 1-1.301 3.142z"/>
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
