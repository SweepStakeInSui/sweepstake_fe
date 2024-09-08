function isValidSuiAddress(address: string): boolean {
  const SUI_ADDRESS_LENGTH = 64;
  let localAddress = address;

  if (localAddress.startsWith('0x')) {
    localAddress = localAddress.slice(2);
  }

  const hexRegex = /^[0-9a-fA-F]+$/;
  return (
    localAddress.length === SUI_ADDRESS_LENGTH && hexRegex.test(localAddress)
  );
}

export const validation = {
  isValidSuiAddress,
};
