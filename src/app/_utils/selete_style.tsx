import { Theme } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

export function getStyles(
  symbol: string,
  symbols: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      symbols.indexOf(symbol) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
