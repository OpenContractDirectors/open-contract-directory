import { Registry } from './loadRegistry';

export function getCertifiers(registry: Registry): string[] {
  let certifiers = [];
  for (let cert of registry.contractCertificates) {
    certifiers.push(cert.certifier);
  }
  for (let cert of registry.frontendCertificates) {
    certifiers.push(cert.certifier);
  }
  certifiers = Array.from(new Set(certifiers)).sort();
  return certifiers;
}

export function getCertifiedContracts(registry: Registry, certifier: string): object[] {
  let contracts = [];
  for (let cert of registry.contractCertificates) {
    if (cert.certifier === certifier) {
      contracts.push(registry.contracts[cert.contractID]);
    }
  }
  return contracts;
}

export function getContractName(allMetadata: any, hash: string): string | null {
  const metadata = allMetadata[hash];
  if (!metadata) {
    return null;
  }
  return metadata.name.slice(0, -5);
}

export function getContractID(registry: Registry, hash: string): number | null {
  for (let contract of registry.contracts) {
    if (contract.metadataHash === hash) {
      return contract.id;
    }
  }
  return null;
}

export function getCertifiedFrontends(
  registry: Registry,
  contractID: number,
  certifier: string,
): object[] {
  let certifiedFrontends = [];
  for (let cert of registry.frontendCertificates) {
    if (cert.certifier === certifier) {
      certifiedFrontends.push(registry.frontends[cert.frontendID]);
    }
  }
  let frontends = [];
  for (let frontend of certifiedFrontends) {
    if (frontend.contractID === contractID) {
      frontends.push(frontend);
    }
  }
  return frontends;
}

export function getDeployments(registry: Registry, contractID: number): object[] {
  let deployments = [];
  for (let deployment of registry.deployments) {
    if (deployment.contractID === contractID) {
      deployments.push(deployment);
    }
  }
  return deployments;
}
