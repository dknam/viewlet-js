import { Registry } from '../registry';
import { IExecutable } from './executable';


export const IExecutableRegistry = "IExecutableRegistry";
export interface IExecutableRegistry {
    set(id: string, executable: IExecutable): void;
    has(id: string): boolean;
    get(id: string): IExecutable;
}

Registry.add(IExecutableRegistry, new class {
	private readonly repo = new Map<string, IExecutable>();
	private set(key:string, executable: IExecutable): void {
		this.repo.set(key, executable);
	}
	has (id: string): boolean {
		return this.repo.has(id);
	}
    get(id: string): IExecutable {
		return this.repo.get(id);
	}
});

export const executableRegistry = Registry.as<IExecutableRegistry>(IExecutableRegistry);

