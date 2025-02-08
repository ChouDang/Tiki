import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    createCategorie(name: string): Promise<{
        name: string;
        id: string;
    }>;
    findAllCategories(): Promise<{
        name: string;
        id: string;
    }[]>;
    delCategorie(id: string): Promise<{
        name: string;
        id: string;
    }>;
}
