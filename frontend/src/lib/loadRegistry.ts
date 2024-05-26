import type { PublicClient, Address, Abi } from 'viem';
import registryAbi from './registryAbi.json';
import { PUBLIC_REGISTRY_ADDRESS } from '$env/static/public';

export class Contract {
  public id: number;
  public metadataHash: string;

  constructor(id: number, metadataHash: string) {
    this.id = id;
    this.metadataHash = metadataHash;
  }
}

export class Frontend {
  public id: number;
  public contractID: number;
  public ipfsHash: string;

  constructor(id: number, contractID: number, ipfsHash: string) {
    this.id = id;
    this.contractID = contractID;
    this.ipfsHash = ipfsHash;
  }
}

export class Deployment {
  public id: number;
  public contractID: number;
  public chainID: number;
  public address: string;

  constructor(id: number, contractID: number, chainID: number, address: string) {
    this.id = id;
    this.contractID = contractID;
    this.chainID = chainID;
    this.address = address;
  }
}

export class ContractCertificate {
  public id: number;
  public contractID: number;
  public certifier: string;

  constructor(id: number, contractID: number, certifier: string) {
    this.id = id;
    this.contractID = contractID;
    this.certifier = certifier;
  }
}

export class FrontendCertificate {
  public id: number;
  public frontendID: number;
  public certifier: string;

  constructor(id: number, frontendID: number, certifier: string) {
    this.id = id;
    this.frontendID = frontendID;
    this.certifier = certifier;
  }
}

export class Registry {
  public contracts: Contract[];
  public frontends: Frontend[];
  public deployments: Deployment[];
  public contractCertificates: ContractCertificate[];
  public frontendCertificates: FrontendCertificate[];

  constructor(
    contracts: Contract[],
    frontends: Frontend[],
    deployments: Deployment[],
    contractCertificates: ContractCertificate[],
    frontendCertificates: FrontendCertificate[],
  ) {
    this.contracts = contracts;
    this.frontends = frontends;
    this.contractCertificates = contractCertificates;
    this.frontendCertificates = frontendCertificates;
    this.deployments = deployments;
  }

  toPojo() {
    return JSON.parse(JSON.stringify(this));
  }
}

export async function loadRegistry(client: PublicClient): Promise<Registry> {
  const contracts = await loadContracts(client);
  const frontends = await loadFrontends(client);
  const deployments = await loadDeployments(client);
  const contractCertificates = await loadContractCertificates(client);
  const frontendCertificates = await loadFrontendCertificates(client);

  return new Registry(
    contracts,
    frontends,
    deployments,
    contractCertificates,
    frontendCertificates,
  );
}

async function loadContracts(client: PublicClient): Promise<Contract[]> {
  const n = (await client.readContract({
    abi: registryAbi as Abi,
    address: PUBLIC_REGISTRY_ADDRESS as Address,
    functionName: 'getNumContracts',
  })) as bigint;
  let contracts = [];
  for (let i = 0; i < n; i++) {
    const c = (await client.readContract({
      abi: registryAbi as Abi,
      address: PUBLIC_REGISTRY_ADDRESS as Address,
      functionName: 'getContract',
      args: [i],
    })) as any;
    contracts.push(new Contract(i, c.metadataHash));
  }
  return contracts;
}

async function loadFrontends(client: PublicClient): Promise<Frontend[]> {
  const n = (await client.readContract({
    abi: registryAbi as Abi,
    address: PUBLIC_REGISTRY_ADDRESS as Address,
    functionName: 'getNumFrontends',
  })) as bigint;
  let frontends = [];
  for (let i = 0; i < n; i++) {
    const c = (await client.readContract({
      abi: registryAbi as Abi,
      address: PUBLIC_REGISTRY_ADDRESS as Address,
      functionName: 'getFrontend',
      args: [i],
    })) as any;
    frontends.push(new Frontend(i, Number(c.contractID), c.ipfsHash));
  }
  return frontends;
}

async function loadDeployments(client: PublicClient): Promise<Deployment[]> {
  const n = (await client.readContract({
    abi: registryAbi as Abi,
    address: PUBLIC_REGISTRY_ADDRESS as Address,
    functionName: 'getNumDeployments',
  })) as bigint;
  let deployments = [];
  for (let i = 0; i < n; i++) {
    const c = (await client.readContract({
      abi: registryAbi as Abi,
      address: PUBLIC_REGISTRY_ADDRESS as Address,
      functionName: 'getDeployment',
      args: [i],
    })) as any;
    deployments.push(new Deployment(i, Number(c.contractID), Number(c.chainID), c.contractAddress));
  }
  // TODO: verify that deployments match metadata hashes of corresponding contracts
  return deployments;
}

async function loadContractCertificates(client: PublicClient): Promise<ContractCertificate[]> {
  const n = (await client.readContract({
    abi: registryAbi as Abi,
    address: PUBLIC_REGISTRY_ADDRESS as Address,
    functionName: 'getNumContractCertificates',
  })) as bigint;
  let contractCertificates = [];
  for (let i = 0; i < n; i++) {
    const c = (await client.readContract({
      abi: registryAbi as Abi,
      address: PUBLIC_REGISTRY_ADDRESS as Address,
      functionName: 'getContractCertificate',
      args: [i],
    })) as any;
    contractCertificates.push(new ContractCertificate(i, Number(c.contractID), c.certifier));
  }
  return contractCertificates;
}

async function loadFrontendCertificates(client: PublicClient): Promise<FrontendCertificate[]> {
  const n = (await client.readContract({
    abi: registryAbi as Abi,
    address: PUBLIC_REGISTRY_ADDRESS as Address,
    functionName: 'getNumFrontendCertificates',
  })) as bigint;
  let frontendCertificates = [];
  for (let i = 0; i < n; i++) {
    const c = (await client.readContract({
      abi: registryAbi as Abi,
      address: PUBLIC_REGISTRY_ADDRESS as Address,
      functionName: 'getFrontendCertificate',
      args: [i],
    })) as any;
    frontendCertificates.push(new FrontendCertificate(i, Number(c.frontendID), c.certifier));
  }
  return frontendCertificates;
}
