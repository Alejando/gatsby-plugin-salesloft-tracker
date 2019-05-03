export function sendPageView(page) {
  if (supportsGa()) {
    window.ga('send', 'pageview', page);
  }
}

export function sendEvent(event) {
  if (supportsGa()) {
    window.ga('send', 'event', event);
  }
}

function supportsGa() {
  return window.ga && typeof window.ga === 'function'
}
