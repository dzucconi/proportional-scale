type Required = { width: number; height: number };

type Scale = (
  | { maxHeight: number; maxWidth: number }
  | { maxHeight: number }
  | { maxWidth: number }
) &
  Required;

const factor = ({ width, height, ...dimensions }: Scale): number => {
  if ("maxHeight" in dimensions) return dimensions.maxHeight / height;

  if ("maxWidth" in dimensions) return dimensions.maxWidth / width;

  if ("maxHeight" in dimensions && "maxWidth" in dimensions) {
    const { maxHeight, maxWidth } = dimensions;
    const shortest = Math.min(maxWidth, maxHeight);
    return {
      [maxWidth]: maxWidth / width,
      [maxHeight]: maxHeight / height
    }[shortest];
  }

  throw new Error("Requires `maxWidth` or `maxHeight`");
};

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
  const paddingBottom = `${(height / width) * 100.0}%`;

  return { width: scaledWidth, height: scaledHeight, paddingBottom, scale };
};
