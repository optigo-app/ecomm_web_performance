export const UseLabelGap = (options = [], range = 100) => {
  if (!Array?.isArray(options) || options?.length === 0) {
    console.error("Invalid options array provided.");
    return [];
  }
  const numberOfLabels = options?.length;
  // const gapSize = range / (numberOfLabels - 1);
  const gapSize = numberOfLabels / 1;

  const spacedLabels = options?.map((option, index) => {
    const value = (index * gapSize).toFixed(2);
    return {
      label: option?.label,
      value: parseFloat(Math?.floor(value)),
      name: option?.label,
    };
  });

  return spacedLabels?.reverse();
};
