import { Registry } from '../../src/base/registry'

interface ISimpleRegistry {
    set(id: string, data: any): any;
    has(id: string): boolean;
    get(id: string): any;
}

Registry.add("simple_registry", new class {
	private readonly repo = new Map<string, any>();
	private set(key:string, data: any): void{
		this.repo.set(key, data);
	}
	has (id: string): boolean {
		return this.repo.has(id);
	}
    get(id: string): any {
		return this.repo.get(id);
	}
});

const simpleRegistry = Registry.as<ISimpleRegistry>("simple_registry");


test("test", () => {
	simpleRegistry.set("a", {a: 12});
	expect(simpleRegistry.has("a")).toBe(true);
	expect(simpleRegistry.get("a")).toEqual({a: 12})
})


