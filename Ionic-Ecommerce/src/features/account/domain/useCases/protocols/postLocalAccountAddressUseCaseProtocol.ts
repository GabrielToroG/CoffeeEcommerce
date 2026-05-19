export type PostLocalAccountAddressUseCaseProtocol = (
  label: string,
  fullAddress: string,
  setAsDefault: boolean,
) => Promise<boolean>;
