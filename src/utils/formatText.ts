const briefDocument = (doc: string, start: number, end: number) => {
  return `${doc.slice(0, start)}...${doc.slice(-end)}`;
};

const ipfsGateway = 'https://1b21fea1b71e52bc8b81e22b5a53a188.ipfscdn.io/ipfs/';
const formatLinkIPFS = (link: string) => {
  return link?.replace('ipfs://', ipfsGateway);
};
export { briefDocument, formatLinkIPFS };
