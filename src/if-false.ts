import { directive, AttributePart, Part } from 'lit-html'

/**
 * For AttributeParts, sets the attribute if the test evalutes to `true` and removes
 * the attribute if the test evaluates to `false`.
 *
 * For other part types, this directive is a no-op.
 *
 * Based on `ifDefined` from `lit-html`.
 */
export const ifFalse = directive((test: boolean, value: unknown) => (part: Part) => {
  if (test === true && part instanceof AttributePart) {
    part.committer.element.removeAttribute(part.committer.name)
  } else {
    part.setValue(value)
  }
})
