import { BarInfo } from '../../entities/bar';
import moscow from './moscow.json';
import tbilisi from './tbilisi.json';


export const bars: Record<string, BarInfo[]> = {
    moscow: moscow as BarInfo[],
    tbilisi: tbilisi as BarInfo[],
};