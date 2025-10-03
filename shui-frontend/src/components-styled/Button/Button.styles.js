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
  font-size: 1rem;
  // padding: 0.25rem;
  aspect-ratio: 1;
  max-width: 40px;
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

export const SquareButtonSmall = styled(SquareButton)`
  font-size: 0.75rem;
  padding: 0.25rem;
  border-radius: 8px;

  border: 1.5px solid var(--light-purple);
  color: var(--white);
`;

export const LinkButton = styled(BasicButton)`
  color: var(--dark-brown);
  position: relative;
  display: inline-block;
  
  &:after,
  &:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, var(--dark-brown));
  bottom: -5px;
  left: 0;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease-out;
  }

  &:before{
  top: -5px;
  transform-origin: left;
  }
  
  &:hover::after,
  &:hover::before {
   transform: scaleX(1);
    }
  }
}
`;

export const LinkButtonRed = styled(LinkButton)`
  color: var(--red);

  &:after,
  &:before {
    background: linear-gradient(to right, var(--red));
  }
`;

export const LinkButtonPurple = styled(LinkButton)`
  color: var(--dark-purple);

  &:after,
  &:before {
    background: linear-gradient(to right, var(--dark-purple));
  }
`;

export const PurpleButton = styled(BasicButton)`
  border: none;
  background-color: var(--dark-purple);
  color: var(--white);
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
