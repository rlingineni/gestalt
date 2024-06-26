/**
 * The following is a 1-1 copy from https://git.io/JUPDI
 * https://github.com/feross/clipboard-copy
 */
export default function clipboardCopy(text: string): Promise<void> {
  // Use the Async Clipboard API when available. Requires a secure browsing
  // context (i.e. HTTPS)
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).catch(function clipboardError(err) {
      throw err !== undefined
        ? err
        : new DOMException('The request is not allowed', 'NotAllowedError');
    });
  }

  // ...Otherwise, use document.execCommand() fallback

  // Put the text to copy into a <span>
  const span = document.createElement('span');
  span.textContent = text;

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre';

  // Add the <span> to the page
  if (document.body) {
    document.body.appendChild(span);
  }

  // Make a selection object representing the range of text selected by the user
  const selection = window.getSelection();
  const range = window.document.createRange();
  // @ts-expect-error - TS2531 - Object is possibly 'null'.
  selection.removeAllRanges();
  range.selectNode(span);
  // @ts-expect-error - TS2531 - Object is possibly 'null'.
  selection.addRange(range);

  // Copy text to the clipboard
  let success = false;
  try {
    success = window.document.execCommand('copy');
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log('error', err);
  }

  // Cleanup
  // @ts-expect-error - TS2531 - Object is possibly 'null'.
  selection.removeAllRanges();
  window.document.body.removeChild(span);

  return success
    ? Promise.resolve()
    : Promise.reject(new DOMException('The request is not allowed', 'NotAllowedError'));
}
