import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { ALCHEMY_API_KEY } from '$env/static/private';

const REGISTRY_RPC_URL = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export const registryClient = createPublicClient({
  chain: mainnet,
  transport: http(REGISTRY_RPC_URL),
});
