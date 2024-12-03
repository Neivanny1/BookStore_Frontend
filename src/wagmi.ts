import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, sepolia, base, baseSepolia, celo, celoAlfajores, liskSepolia, lisk } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const projectId =  'b6e9ca97b798e5284bbacec3b3f96911'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia, celoAlfajores, baseSepolia],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({projectId: projectId}),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [celoAlfajores.id]: http(),
      [baseSepolia.id]:http(), 
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
