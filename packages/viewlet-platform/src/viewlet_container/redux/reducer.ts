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
        case "ADD_CONFIRM":
            return Object.assign({}, state, {
                confirms: [
                    ...state.confirms,
                    {
                        ...action.confirm
                    }
                ]
            });
        default:
            return state;
    }
}
