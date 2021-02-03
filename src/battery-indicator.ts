import { css, customElement, LitElement, property, svg, SVGTemplateResult } from 'lit-element';

import { State } from './battery-state';
import { ifTrue } from './if-true';
import { percentageIsValid } from './percentage-is-valid';

@customElement('battery-indicator')
export class BatteryIndicator extends LitElement {
	@property({ type: Number }) percentage = 0;
	@property({ type: String }) state: State = undefined;
	@property({ type: Boolean, attribute: 'show-percentage' })
	showPercentage = false;

	static get styles() {
		return css`
			.percentage {
				font-size: 16px;
				fill: var(--percentage-color, #000);
			}
			.charge {
				fill: var(--charge-fill, #000);
				fill-opacity: var(--charge-fill-opacity, 1);
			}
			.background {
				fill: var(--background-fill, #000);
				fill-opacity: var(--background-fill-opacity, 0.3);
			}
			.status {
				fill: var(--status-fill, #fff);
				fill-opacity: var(--status-fill-opacity, 1);
			}
		`;
	}

	private getPercentage(): number {
		if (
			(this.state === undefined || this.state === 'charging') &&
			percentageIsValid(this.percentage)
		) {
			return this.percentage;
		}
		return 100;
	}

	private buildTitle(): string {
		return `Battery Charge${this.showPercentage === true ? ` ${this.getPercentage()}%` : ''}`;
	}

	render(): SVGTemplateResult {
		const textWidthPx = 38;
		return svg`
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 ${this.showPercentage ? 48 + textWidthPx : 48} 24"
      aria-labelledby="title">
      <title id="title">${this.buildTitle()}</title>
      <defs>
        <clipPath id="percentageClip">
          <path fill="none" d="M0 0h48v48H0z" transform="scale(${this.getPercentage() / 100}, 1)"/>
        </clipPath>
        <path
          id="batteryPath"
          d="M43.18 20.78v-3.992h4.797V7.195h-4.796V3.202A3.193 3.193 0 0 0 39.979 0H3.202A3.201 3.201 0 0 0 0 3.202v17.59a3.201 3.201 0 0 0 3.202 3.203h36.777a3.211 3.211 0 0 0 3.202-3.214z"/>
      </defs>
      <path d="M0 0h24v48H0z" fill="none"/>
      <text
        class="percentage"
        x="0"
        y="18"
        display="${ifTrue(this.showPercentage, 'none')}">${this.percentage}%</text>
      <g transform="translate(${ifTrue(!this.showPercentage, textWidthPx)}, 0)">
        <use class="background" href="#batteryPath"/>
        <use class="charge" href="#batteryPath" clip-path="url(#percentageClip)"/>

        <path
          class="status"
          display="${ifTrue(this.state === 'charging', 'none')}"
          d="M22.722 2.75v7.827h2.846l-3.415 6.404h.008l-2.285 4.269v-7.827H17.03z"/>
        <path
          class="status"
          display="${ifTrue(this.state === 'alert', 'none')}"
          d="M23.785 21.25h-4.11v-4.111h4.11zm0-8.222h-4.11V2.75h4.11z"/>
        <path
          class="status"
          display="${ifTrue(this.state === 'unknown', 'none')}"
          d="M23.178 21.25h-3.533v-3.533h3.533zM25.688 11.47s-.707.781-1.246 1.32c-.902.902-1.543 2.13-1.543 2.975h-2.975c0-1.543.855-2.835 1.73-3.71l1.728-1.756a2.785 2.785 0 0 0-1.97-4.76 2.785 2.785 0 0 0-2.79 2.789h-2.788c0-3.077 2.5-5.578 5.577-5.578 3.078 0 5.578 2.5 5.578 5.578a4.402 4.402 0 0 1-1.301 3.142z"/>
      </g>
    </svg>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'battery-indicator': BatteryIndicator;
	}
}
