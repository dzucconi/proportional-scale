export type AspectDimensions = { width: number; height: number };

export type MaxDimensions =
  | { maxHeight: number; maxWidth: number }
  | { maxHeight: number }
  | { maxWidth: number };

export type Scale = AspectDimensions & MaxDimensions;

export const factor = ({ width, height, ...dimensions }: Scale): number => {
  if ("maxHeight" in dimensions && !("maxWidth" in dimensions))
    return dimensions.maxHeight / height;

  if ("maxWidth" in dimensions && !("maxHeight" in dimensions))
    return dimensions.maxWidth / width;

  return Math.min(dimensions.maxWidth / width, dimensions.maxHeight / height);
};

export const paddingBottom = ({ width, height }: AspectDimensions) =>
  `${(height / width) * 100.0}%`;

export const scale = ({
  width,
  height,
  ...dimensions
}: Scale): {
  width: number;
  height: number;
  paddingBottom: string;
  scale: number;
} => {
  const scale = factor({ width, height, ...dimensions });
  const scaledWidth = Math.floor(width * scale);
  const scaledHeight = Math.floor(height * scale);

  return {
    width: scaledWidth,
    height: scaledHeight,
    paddingBottom: paddingBottom({ width, height }),
    scale,
  };
};
