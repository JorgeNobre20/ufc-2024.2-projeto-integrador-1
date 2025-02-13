import { CircularProgress } from "@mui/material";
import { Container } from "./CenteredLoading.styles";

export function CenteredLoading() {
  return <Container>
    <CircularProgress color="primary" size={42} />
  </Container>
}