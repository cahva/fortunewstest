const fortuneWS = require('fortune-ws')
const WebSocket = require('ws')
const client = new WebSocket('ws://localhost:8080')

async function init() {

  const req = await fortuneWS.request(client, {
    method: 'find',
    ids: null,
    type: 'user',
    include: [['followers'],['following'], ['following', 'posts'], ['following', 'followers'], ['posts']]
  })
  console.log('req.response %o', req.response)
  //console.log('req.response records %o', req.response.payload.records)
  //console.log('req.response include %o', req.response.payload.include)

  // const updateReq = await fortuneWS.request(client, {
  //   method: 'update',
  //   type: 'user',
  //   payload: [{
  //     id: '9ESZnONkuNyopTG',
  //     replace: { name: 'Joopajoo ' + Math.ceil(Math.random() * 10) },
  //     push: { following: 'XcBGrj3imtqReWt' },
  //     //pull: { following: 'XcBGrj3imtqReWt' }
  //   }],
  //   include: [['following']]
  // }).catch((error) => console.log(error))

  // console.log('updateReq %o', updateReq.response)

  // const createReq = await fortuneWS.request(client, {
  //   method: 'create',
  //   type: 'user',
  //   payload: [{
  //     name: 'User ' + (req.response.payload.count + 1),
  //     following: ['XcBGrj3imtqReWt']
  //   }],
  //   include: [['following']]
  // })

  // console.log('createReq %o', createReq.response)
  process.exit()
}

init()
