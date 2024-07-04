import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const BigHoverButton = styled(Button)({
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
  },
  color: "black",
  display: "block",
  fontWeight: "bold",
  border: "1px solid black",
  padding: "6px 15px",
  textTransform: "none",
  ":hover": {
    backgroundColor: "black",
    color: "white",
  },
});

export const MiniHoverButton = styled(Button)({
  color: "black",
  display: "block",
  fontWeight: "bold",
  fontSize: "13px",
  border: "1px solid black",
  textTransform: "none",
  padding: "3px 5px",
  m: 1,
  ":hover": {
    backgroundColor: "black",
    color: "white",
  },
  width: "fit-content",
});

export const BigHoverFitContentButton = styled(Button)({
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
  },
  color: "black",
  display: "block",
  fontWeight: "bold",
  border: "1px solid black",
  padding: "6px 15px",
  textTransform: "none",
  ":hover": {
    backgroundColor: "black",
    color: "white",
  },
  width: "fit-content",
});

export const BigHoverTransformButton = styled(Button)({
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
  },
  color: "black",
  display: "block",
  width: "fit-content",
  fontWeight: "bold",
  border: "1px solid black",
  padding: "6px 15px",
  ":hover": {
    backgroundColor: "black",
    color: "white",
  },
});

export const MiniIconRoundButton = styled(Button)({
  width: "20px",
  height: "20px",
  minWidth: "20px",
  minHeight: "20px",
  borderRadius: "50%",
  marginLeft: "10px",
  color: "black",
});
