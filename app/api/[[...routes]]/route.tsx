/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { base } from 'viem/chains'
import { pinata } from 'frog/hubs'

import { abi
} from './abi.js'


const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  hub: pinata(),
  title: 'Onchain Puppies Mint Frame',
})


app.frame('/', (c) => {

  return c.res({
    action: '/choose',
    image: `https://gold-effective-barnacle-308.mypinata.cloud/ipfs/QmR9TGpAAtBZgbabj141QJeW73Le5yS4rv5GyoXaEDjemZ`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="start">Start</Button>,
    ],
  })
})



app.frame('/choose', (c) => {

  return c.res({
  //action: '/choose',
  image: `https://azure-ready-parakeet-471.mypinata.cloud/ipfs/QmaKc5myG5QYZ9dchhUJD43Y7BGkw8jUJFQsEkSz5BXB4T`,
  imageAspectRatio: '1:1',
  intents: [
    <Button.Transaction target="/freeMint">Free Mint</Button.Transaction>,
    <Button.Transaction target="/publicMint1">Mint 1</Button.Transaction>,
    <Button.Transaction target="/publicMint2">Mint 2</Button.Transaction>,
    <Button.Transaction target="/publicMint4">Mint 4</Button.Transaction>,
    //status === 'response' && <Button.Reset>Reset</Button.Reset>,
  ],
})
})
  


app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div
 style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})


app.transaction('/freeMint', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'free_mint',
    args: [],
    chainId: `eip155:${base.id}`,
    to: '0x502e611f2950CD93a1712e50F3F2309deD07c32A',
  })
})

app.transaction('/publicMint1', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'mint',
    args: [1],
    chainId: `eip155:${base.id}`,
    to: '0x502e611f2950CD93a1712e50F3F2309deD07c32A',
    value: parseEther('0.003')
  })
})

app.transaction('/publicMint2', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'mint',
    args: [2],
    chainId: `eip155:${base.id}`,
    to: '0x502e611f2950CD93a1712e50F3F2309deD07c32A',
    value: parseEther('0.006')
  })
})

app.transaction('/publicMint4', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'mint',
    args: [4],
    chainId: `eip155:${base.id}`,
    to: '0x502e611f2950CD93a1712e50F3F2309deD07c32A',
    value: parseEther('0.012')
  })
})



devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

