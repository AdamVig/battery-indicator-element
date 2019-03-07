import { LitElement, html, css, customElement, property } from 'lit-element'

type State = 'charging'|'unknown'|'error'|undefined;

@customElement('battery-status')
class BatteryStatus extends LitElement {
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
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
    `
  }
}

if (customElements.get('battery-status') === undefined) {
  customElements.define('battery-status', BatteryStatus)
}
