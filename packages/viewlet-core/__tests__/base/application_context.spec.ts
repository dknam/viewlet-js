import { ApplicationContext } from '../../src/context/application_context';


let appContext: ApplicationContext = null;
let destroyed: string[] = null;

describe('application context destroy', () => {
    
    beforeEach(() => {
        destroyed = [];
        appContext = new ApplicationContext();
        appContext.onDestroyViewletContext((e) => {
            destroyed.push(e.uuid);
        });
    });

    test("destroy all", () => {
        appContext.createViewletContext("c1");
        appContext.createViewletContext("c2");
        appContext.createViewletContext("c3");
        appContext.createViewletContext("c4");
        expect(appContext.getAllViewletContext().length).toBe(4);
        
        appContext.destroy();

        expect(appContext.getAllViewletContext()).toBe(null);
        expect(destroyed.length).toBe(4);
        expect(destroyed).toEqual(["c1", "c2", "c3", "c4"]);
    })

    test("destroy context", () => {
        appContext.createViewletContext("c5");
        appContext.createViewletContext("c6").destroy();
        appContext.createViewletContext("c7").destroy();
        appContext.createViewletContext("c8").destroy();
        expect(appContext.getAllViewletContext().length).toBe(1);
        expect(destroyed.length).toBe(3);
        expect(destroyed).toEqual(["c6", "c7", "c8"]);
    })

});