export const SelectSanatizer = ({ value }: { value: any }) => {
  if (!value) return [];

  if (typeof value === 'string') {
    return value.split(',').map((field: string) => field.trim());
  }

  if (Array.isArray(value)) {
    return value.map((field: string) => field.trim());
  }
};
