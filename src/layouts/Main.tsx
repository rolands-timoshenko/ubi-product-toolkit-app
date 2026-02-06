import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col w-full max-w-[1200px] mx-auto relative overflow-hidden">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Main;
