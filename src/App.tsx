import Main from '@/layouts/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UbiProductService from '@/services/UbiProductService';
import DayEventsServiceProvider from '@/providers/UbiProductServiceProvider';
import ProductsList from '@/pages/ProductsList';
import { queryClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from '@/pages/ProductDetails';
import ErrorHandler from './components/ErrorHandler';
import config from './config';
const ubiProductService = new UbiProductService(config.productApiUrl, config.imageProxyUrl);

function App() {
    return (
        <DayEventsServiceProvider value={ubiProductService}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Main />}>
                            <Route path="/" element={<ProductsList />} />
                            <Route path="/:productId" element={<ProductDetails />} />
                        </Route>
                    </Routes>
                    <ErrorHandler />
                </BrowserRouter>
            </QueryClientProvider>
        </DayEventsServiceProvider>
    );
}

export default App;
