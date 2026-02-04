import type { IUbiProductService } from '@/domain/interfaces';
import UbiProductServiceContext from './context';

const DayEventsServiceProvider = ({
    value,
    children,
}: {
    value: IUbiProductService;
    children: React.ReactNode;
}) => {
    return (
        <UbiProductServiceContext.Provider value={value}>
            {children}
        </UbiProductServiceContext.Provider>
    );
};

export default DayEventsServiceProvider;
