import Filters from './components/Filters';
import ListViewOptions from './components/ListViewOptions';
import Search from './components/Search';

const ProductsFilter = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Search />
            <div className="flex items-center justify-end gap-2">
                <ListViewOptions />
                <Filters />
            </div>
        </div>
    );
};

export default ProductsFilter;
