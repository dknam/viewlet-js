import { ApplicationContext } from "../context";

let application_context: ApplicationContext;

export const REGISTER_APPLICATION_CONTEXT = (application: ApplicationContext) => {
	application_context = application;
};

export const GET_APPLICATION_CONTEXT = () => {
    return application_context;
}