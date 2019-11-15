type Required = { aspectWidth: number; aspectHeight: number };

type Scale = (
  | { maxHeight: number; maxWidth: number }
  | { maxHeight: number }
  | { maxWidth: number }
) &
  Required;

const factor = ({
  aspectWidth,
  aspectHeight,
  ...dimensions
}: Scale): number => {
  if ("maxHeight" in dimensions) return dimensions.maxHeight / aspectHeight;
  if ("maxWidth" in dimensions) return dimensions.maxWidth / aspectWidth;
  if ("maxHeight" in dimensions && "maxWidth" in dimensions) {
    const { maxHeight, maxWidth } = dimensions;
    const shortest = Math.min(maxWidth, maxHeight);
    return {
      [maxWidth]: maxWidth / aspectWidth,
      [maxHeight]: maxHeight / aspectHeight
    }[shortest];
  }
  throw new Error("Requires `maxWidth` or `maxHeight`");
};

export const scale = ({
  aspectWidth,
  aspectHeight,
  ...dimensions
}: Scale): {
  width: number;
  height: number;
  paddingBottom: string;
  scale: number;
} => {
  const scale = factor({ aspectWidth, aspectHeight, ...dimensions });
  const width = Math.floor(aspectWidth * scale);
  const height = Math.floor(aspectHeight * scale);
  const paddingBottom = `${(aspectHeight / aspectWidth) * 100.0}%`;
  return { width, height, paddingBottom, scale };
};
