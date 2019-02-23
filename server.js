const http = require('http')
const fortuneHTTP = require('fortune-http')
const fortuneWS = require('fortune-ws')

const store = require('./store')

function change (state, changes) {
  return new Promise((resolve, reject) => {
    if (!changes) {
      // Accept only changes to the `isListening` key.
      return resolve({ isListening: Boolean(state.isListening) })
    }
    // Determine what changes should be relayed to the client,
    // based on the current state.
    return resolve(state.isListening ? changes : null)
  })
}

// The `fortuneHTTP` function returns a listener function which does
// content negotiation, and maps the internal response to a HTTP response.
const listener = fortuneHTTP(store)
const httpServer = http.createServer((request, response) =>
  listener(request, response)
  .catch(error => { /* error logging */ }))

const wsOptions = { port: 8080 };

store.connect().then(() => {
  httpServer.listen(1337)
  fortuneWS(store, change,  wsOptions /* callback */)

})