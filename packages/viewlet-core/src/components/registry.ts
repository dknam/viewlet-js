import { Registry } from '../base/registry';

export const IComponentRegistry = "IComponentRegistry";
export interface IComponentRegistry {
    set(id: string, component: any): void;
    has(id: string): boolean;
    get(id: string): any;
}

Registry.add(IComponentRegistry, new class {
	private readonly repo = new Map<string, any>();
	private set(key:string, component: any): void {
		this.repo.set(key, component);
	}
	has (id: string): boolean {
		return this.repo.has(id);
	}
    get(id: string): any {
		return this.repo.get(id);
	}
});

export const componentRegistry = Registry.as<IComponentRegistry>(IComponentRegistry);
