import Hash from 'ipfs-only-hash';

export async function loadMetadata(fetch) {
  let all: any = {};
  const allMetadataResponse = await fetch('/allMetadata.json');
  const allMetadataNames = await allMetadataResponse.json();
  for (let metadataName of allMetadataNames) {
    const metadata = await fetch(`/metadata/${metadataName}`);
    const clonedMetadata = metadata.clone();
    const text = new Uint8Array(await metadata.arrayBuffer());
    const data = await clonedMetadata.json();
    const hash = await Hash.of(text);
    console.log(metadataName, hash);
    all[hash] = {
      name: metadataName,
      data: data,
      hash: hash,
    };
  }
  return all;
}
