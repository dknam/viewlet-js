import { Observable } from '../../src/base/observable';

interface IContextLifecle {
    id: string;
    name: string;
}

test('simple observer', () => {
    const observer = new Observable<IContextLifecle>();
    observer.subscribe((e) => {
        expect(e.name).toBe("test");
    });

    observer.notify({name: "test", id: "id"});
});




