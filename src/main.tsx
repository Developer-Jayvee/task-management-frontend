import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import MainRoutes from './routes/main.routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toast';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={MainRoutes}/>
    </QueryClientProvider>
     <Toaster />
    <ToastContainer />
  </StrictMode>,
)
