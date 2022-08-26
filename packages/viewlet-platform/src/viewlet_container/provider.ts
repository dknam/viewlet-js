import { IViewletContainerProvider } from '@viewlet-core';
import { ViewletContainer } from './viewlet_container';
import { store } from './redux/store';

export function viewlet_container_provider(): IViewletContainerProvider {
    return {
        mainContainer: ViewletContainer,
        store
    }
}