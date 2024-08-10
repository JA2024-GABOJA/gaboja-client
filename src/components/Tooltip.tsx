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
  background-color: #3176b1;
  border-radius: 10px;
  min-width: 200px;
  flex-wrap: nowrap;
  display: flex;
  flex-wrap: nowrap;
  text-align: center;

  color: var(--Backgrounds-Primary, #fff);

  font-family: 'San Francisco';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 111.111% */

  &::after {
    border-bottom: 8px solid #3176b1;
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
