import { Box } from "@mui/material";
import { styled } from "@mui/system";

//A css component for reuse in code
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
