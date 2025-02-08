import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAllCategories(): Promise<{
        name: string;
        id: string;
    }[]>;
    createCategorie(name: string): Promise<{
        name: string;
        id: string;
    }>;
    delCategorie(id: string): Promise<{
        name: string;
        id: string;
    }>;
}
