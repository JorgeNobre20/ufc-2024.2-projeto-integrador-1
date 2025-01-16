import styled from "@emotion/styled";
import { theme } from "../../global/styles/theme";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 8rem;

  border-radius: 6px;
  background: ${theme.colors.inputBackground};

  padding: 0.4rem;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;

export const StarIcon = styled.img`
  height: 1rem;
  width: auto;

  cursor: pointer;
`;

export const Title = styled.h3`
  text-align: center;
  font-size: 0.9rem;
`;

export const LaunchYear = styled.p`
  font-size: 0.9rem;
`;
