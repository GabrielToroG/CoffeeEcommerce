export type AdminCatalogOptionsModel = {
  categories: Array<{
    id: string;
    label: string;
  }>;
  collections: Array<{
    id: string;
    title: string;
  }>;
};
