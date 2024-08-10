import { resetCSS } from './constants/styled';
import Routers from './router';
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={resetCSS} />
      <Routers />
    </QueryClientProvider>
  );
}

export default App;
