import Main from '@/layouts/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UbiProductService from '@/services/UbiProductService';
import DayEventsServiceProvider from '@/providers/UbiProductServiceProvider';
import ProductList from '@/pages/ProductList';
import { queryClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import ProductDetailsPage from '@/pages/ProductDetails';
import ErrorHandler from './features/ErrorHandler';

const ubiProductService = new UbiProductService();

function App() {
    return (
        <DayEventsServiceProvider value={ubiProductService}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Main />}>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/:id" element={<ProductDetailsPage />} />
                        </Route>
                    </Routes>
                    <ErrorHandler />
                </BrowserRouter>
            </QueryClientProvider>
        </DayEventsServiceProvider>
    );
}

export default App;
