import styled from "styled-components";

export const BasicButton = styled.button`
  border: none;
  cursor: pointer;
  transition: 0.5s all ease-out;
  color: var(--beige);
`;

export const LinkButton = styled(BasicButton)`
  color: var(--red);
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
