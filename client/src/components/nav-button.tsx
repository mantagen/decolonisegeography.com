import React, { useCallback } from "react";
import styled from "styled-components";
import { BREAK_POINT_M_PX } from "./global-style";

import { NAV_COLOR } from "./nav";
import SrOnly from "./sr-only";
/* Right align */
/* transform: translate(calc(var(--z) - (var(--z)) / 1.41)); */
/* Left align */
/* transform: translate(calc(var(--y) / 1.41)); */
/* Center align */
const rnd = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;
const BUTTON_WIDTH = 28;
const LINE_LENGTH = 22;
const LINE_THICKNESS = 2;
const BURGER_HEIGHT = rnd(
  LINE_LENGTH / Math.sqrt(2) + LINE_THICKNESS / Math.sqrt(2)
);
const DURATION_MS = "300";
// const ALIGN_RIGHT = rnd(LINE_LENGTH - LINE_LENGTH / Math.sqrt(2));
const ALIGN_CENTER = rnd(
  LINE_THICKNESS / (Math.sqrt(2) * 2) +
    LINE_LENGTH / 2 -
    LINE_LENGTH / (Math.sqrt(2) * 2)
);
const TRANSLATE_WHEN_OPEN = ALIGN_CENTER;

const NavButtonLine = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: ${LINE_THICKNESS}px;
  background-color: ${props => (props.isOpen ? "#fff" : "rgba(0, 0, 0, 0.94)")};
  transform: rotate(${props => (props.isOpen ? `45deg` : 0)});
  transform-origin: top left;
  transition: transform ${DURATION_MS}ms ease-out,
    color ${DURATION_MS}ms ease-in;
  will-change: transform background-color;

  &:last-child {
    transform-origin: bottom left;
    transform: rotate(${props => (props.isOpen ? `-45deg` : 0)});
  }
`;
const NavButtonLines = styled.div<{ isOpen: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  transition: transform ${DURATION_MS}ms ease-out;
  outline: none;
  transform: translate(${props => (props.isOpen ? TRANSLATE_WHEN_OPEN : 0)}px);
`;
const NavButtonInnerWrapper = styled.div`
  width: ${LINE_LENGTH}px;
  height: ${BURGER_HEIGHT}px;
`;
const NavButtonOuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
`;
const NavButtonRoot = styled.button<{ isOpen: boolean }>`
  width: ${BUTTON_WIDTH}px;
  height: ${BUTTON_WIDTH}px;
  position: absolute;
  z-index: 1;
  border-radius: 0;
  background: none;
  border: none;
  padding: 0;
  overflow: hidden;
  right: 1rem;
  top: 1rem;
  margin-left: auto;

  &:focus ${NavButtonOuterWrapper} {
    outline: 5px auto -webkit-focus-ring-color;
  }

  &:hover ${NavButtonLine} {
    background-color: ${props => (props.isOpen ? "white" : NAV_COLOR)};
  }

  @media (min-width: ${BREAK_POINT_M_PX}px) {
    right: 0.9rem;
    top: 0.9rem;
  }
`;

interface NavButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ariaControls: string;
}
const NavButton: React.FC<NavButtonProps> = props => {
  const { isOpen, setIsOpen, ariaControls } = props;

  const onClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <NavButtonRoot
      isOpen={isOpen}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={ariaControls}
    >
      <SrOnly>{isOpen ? "Close" : "Open"} Nav</SrOnly>
      <NavButtonOuterWrapper tabIndex={-1} aria-hidden="true">
        <NavButtonInnerWrapper>
          <NavButtonLines isOpen={isOpen}>
            <NavButtonLine isOpen={isOpen} />
            <NavButtonLine isOpen={isOpen} />
          </NavButtonLines>
        </NavButtonInnerWrapper>
      </NavButtonOuterWrapper>
    </NavButtonRoot>
  );
};

export default NavButton;
