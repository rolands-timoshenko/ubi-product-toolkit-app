import Main from '@/layouts/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UbiProductService from '@/services/UbiProductService';
import DayEventsServiceProvider from '@/providers/UbiProductServiceProvider';
import ProductList from '@/pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import { queryClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

const ubiProductService = new UbiProductService();

function App() {
    return (
        <DayEventsServiceProvider value={ubiProductService}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Main />}>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/:id" element={<ProductDetails />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </DayEventsServiceProvider>
    );
}

export default App;
