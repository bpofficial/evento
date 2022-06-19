import { PageOptions } from './pages';

export interface ExtensiblePage {
    pages: {
        index: number;
        allPages: PageOptions[];
    };
}
