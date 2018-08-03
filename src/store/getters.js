const api = state => state.config.api
const user = state => state.auth.user
const outlet = state => state.config.outlet

export {
  api,
  user,
  outlet
}
