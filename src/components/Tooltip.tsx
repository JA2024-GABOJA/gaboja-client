import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import CloseIcon from '../assets/icons/CloseIcon';

export type TooltipProps = {
  content: string;
  children: React.ReactNode;
  defaultVisible?: boolean;
};

const Tooltip = ({
  content,
  children,
  defaultVisible = false,
}: TooltipProps) => {
  const [visible, setVisible] = useState(defaultVisible);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <TooltipContainer onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <AnimatePresence>
        {visible && (
          <TooltipContent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FloatingButton>
              <CloseIcon onClick={hideTooltip} />
            </FloatingButton>
            <p>{content}</p>
          </TooltipContent>
        )}
      </AnimatePresence>
    </TooltipContainer>
  );
};

export default Tooltip;

const FloatingButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;

  padding: 4px;
`;

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  background-color: rgba(49, 118, 177, 0.8);
  border-radius: 10px;
  width: 220px;
  flex-wrap: nowrap;
  display: flex;
  flex-wrap: nowrap;
  text-align: center;

  color: var(--Backgrounds-Primary, #fff);

  font-size: 18px;
  font-style: normal;
  font-weight: 700;

  &::after {
    border-bottom: 8px solid rgba(49, 118, 177, 0.8);
    border-left: 7px solid white;
    border-right: 7px solid white;
    content: '';

    height: 0;
    left: 50%;
    transform: translateX(50%);

    rotate: 180deg;
    position: absolute;
    bottom: -8px;
    width: 0;
  }
`;
