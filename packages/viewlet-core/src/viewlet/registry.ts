import { Registry } from '../base/registry';

export const IViewletRegistry = "IViewletRegistry";
export interface IViewletRegistry {
    set(id: string, viewlet: any): void;
    has(id: string): boolean;
    get(id: string): any;
}

Registry.add(IViewletRegistry, new class {
	private readonly repo = new Map<string, any>();
	private set(key:string, viewlet: any): void {
		this.repo.set(key, viewlet);
	}
	has (id: string): boolean {
		return this.repo.has(id);
	}
    get(id: string): any {
		return this.repo.get(id);
	}
});

export const viewletRegistry = Registry.as<IViewletRegistry>(IViewletRegistry);
