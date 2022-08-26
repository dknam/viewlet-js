export const initState = {
    viewers: [] as any[],
    alerts: [] as any[],
    confirms: [] as any[],
    layers: [] as any[],
};

export const reducer = function (state = initState, action: any) {
    switch(action.type) {
        case "ADD_VIEWER":
            return Object.assign({}, state, {
                viewers: [
                    ...state.viewers,
                    {
                       id: "viewer_" + Date.now(), 
                        ...action.viewer
                    }
                ]
            });
        case "REMOVE_VIEWERS":
            return Object.assign({}, state, {
                viewers: []
            });            

        default:
            return state;
    }
}
