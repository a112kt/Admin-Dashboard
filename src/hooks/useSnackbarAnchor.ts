import { useContext } from "react";
import { CustomizerContext } from "@/context/customizerContext";

type AnchorVertical = "top" | "bottom";
type AnchorHorizontal = "left" | "right";

export const useSnackbarAnchor = (vertical: AnchorVertical = "top"): { vertical: AnchorVertical; horizontal: AnchorHorizontal } => {
  const { activeDir } = useContext(CustomizerContext);
  return {
    vertical,
    horizontal: activeDir === "rtl" ? "left" : "right",
  };
};
