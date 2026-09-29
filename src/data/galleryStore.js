// shared between the 3D camera (inside <Canvas>) and the HTML caption overlay
let state = { index: 0, active: false }
const listeners = new Set()

export const galleryStore = {
  get: () => state,
  set(next) {
    if (next.index === state.index && next.active === state.active) return
    state = { ...state, ...next }
    listeners.forEach((fn) => fn())
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}
