type AuthDataSource = 'local';
type CheckoutDataSource = 'local';
type StorefrontDataSource = 'remote';
type AdminCatalogDataSource = 'remote';

function readStringEnv(value: string | undefined, fallbackValue: string) {
  return value?.trim() || fallbackValue;
}

function readEnumEnv<Value extends string>(
  value: string | undefined,
  allowedValues: readonly Value[],
  fallbackValue: Value,
): Value {
  const normalizedValue = readStringEnv(value, fallbackValue);

  if (allowedValues.includes(normalizedValue as Value)) {
    return normalizedValue as Value;
  }

  return fallbackValue;
}

export const runtimeConfig = {
  authDataSource: readEnumEnv<AuthDataSource>(
    import.meta.env.VITE_AUTH_DATA_SOURCE,
    ['local'],
    'local',
  ),
  checkoutDataSource: readEnumEnv<CheckoutDataSource>(
    import.meta.env.VITE_CHECKOUT_DATA_SOURCE,
    ['local'],
    'local',
  ),
  storefrontDataSource: readEnumEnv<StorefrontDataSource>(
    import.meta.env.VITE_STOREFRONT_DATA_SOURCE,
    ['remote'],
    'remote',
  ),
  adminCatalogDataSource: readEnumEnv<AdminCatalogDataSource>(
    import.meta.env.VITE_ADMIN_CATALOG_DATA_SOURCE,
    ['remote'],
    'remote',
  ),
} as const;
