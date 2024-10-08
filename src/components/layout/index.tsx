import styled from '@emotion/styled';

export const Layout = styled.div<{
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  $padding?: string;
}>`
  max-width: 420px;
  background-color: #fff;
  min-height: 100svh;
  margin: 0 auto;
  padding: ${(props) => props.$padding || '24px'};

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems || 'flex-start'};
`;
