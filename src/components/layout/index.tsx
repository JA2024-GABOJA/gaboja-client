import styled from '@emotion/styled';

export const Layout = styled.div<{
  alignItems?: 'flex-start' | 'center' | 'flex-end';
}>`
  max-width: 420px;
  background-color: #fff;
  height: 100svh;
  margin: 0 auto;

  padding: 24px;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems || 'flex-start'};
`;
