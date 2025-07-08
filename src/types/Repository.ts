
export type Repository<T = unknown> = {
    create(arg: T): Promise<T>
    update(id: string, data: Partial<T>): Promise<T | null>
    delete(id: string): Promise<boolean | null>
    getAll(): Promise<T[]>
    getById(id: string): Promise<T | null>
}