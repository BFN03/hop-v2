/**
 * Býr til element með nafni og bætir við öðrum elementum eða texta nóðum.
 * @param {string} name Nafn á elementi
 * @param {Object} attributes Attribútar fyrir elementið
 * @param  {...string | HTMLElement} children Hugsanleg börn: önnur element eða strengir
 * @returns {HTMLElement} Elementi með gefnum börnum
 */
export function el(name, attributes = {}, ...children) {
  const e = document.createElement(name);

  for (const [key, value] of Object.entries(attributes)) {
    e.setAttribute(key, value);
  }

  for (const child of children) {
    if (!child) {
      console.warn('Child is null', name, attributes);
      // eslint-disable-next-line no-continue
      continue;
    }

    if (typeof child === 'string' || typeof child === 'number') {
      e.appendChild(document.createTextNode(child.toString()));
    } else {
      e.appendChild(child);
    }
  }

  return e;
}

/**
 * Fjarlægir öll börn `element`.
 * @param {HTMLElement} element Element sem á að tæma
 */
export function empty(element) {
  if (!element || !element.firstChild) {
    return;
  }

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
