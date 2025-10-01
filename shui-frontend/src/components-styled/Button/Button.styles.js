import styled from "styled-components";

export const BasicButton = styled.button`
  border: none;
  cursor: pointer;
  transition: 0.5s all ease-out;
  background: none;
  align-items: center;
`;

export const CircleButton = styled(BasicButton)`
  background-color: var(--dark-purple);
  font-size: 1.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  color: var(--white);
`;

export const SquareButton = styled(BasicButton)`
  background-color: var(--dark-purple);
  font-size: 1.75rem;
  padding: 0.75rem;
  border: 1.5px solid var(--light-purple);
  border-radius: 12px;
  color: var(--white);
`;

export const LinkButton = styled(BasicButton)`
  color: var(--red);
`;

export const LinkButtonPurple = styled(BasicButton)`
  color: var(--dark-purple);
`;

export const PurpleButton = styled(BasicButton)`
  border: none;
  background-color: var(--dark-purple);
  color: var(--beige);
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: var(--fs-sm);
  line-height: 1.6;
  font-weight: var(--weight-semibold);

  &:hover {
    transform: translateY(4px);
  }
`;
