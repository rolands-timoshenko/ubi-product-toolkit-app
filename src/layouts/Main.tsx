import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <p>Header</p>
            <main>
                <Outlet />
            </main>
            <p>Footer</p>
        </div>
    );
};

export default Main;
