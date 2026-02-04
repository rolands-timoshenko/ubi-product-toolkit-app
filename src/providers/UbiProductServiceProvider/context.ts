import { createContext } from 'react';
import type { IUbiProductService } from '@/domain/interfaces';

const UbiProductServiceContext = createContext<IUbiProductService | null>(null);
export default UbiProductServiceContext;
