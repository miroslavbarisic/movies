import type { FC } from 'react';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import "./App.css";


const queryClient = new QueryClient()


const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <div className="App"/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
