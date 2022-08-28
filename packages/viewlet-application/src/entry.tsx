declare const ViewletPlatform: any;
declare const ViewletCore: any;
declare const ReactDOM: any;

(async () => {
    const app = new ViewletCore.ViewletApp({
        provider: ViewletPlatform.viewlet_container_provider(),
        renderer: (provider: any) => {
            ReactDOM.render(<provider.mainContainer store={provider.store} />, document.querySelector(".view-container"))
        }
    });
    
    app.startUp();
    
    await app.route({
        viewletOptions: {
            type: "react",
            name: "SimpleComponent",
            url: "/packages/viewlet-application/dist/simple_component.js"
        }
    });
})();
