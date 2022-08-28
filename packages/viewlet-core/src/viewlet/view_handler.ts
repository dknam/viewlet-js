export interface IViewHandler {
    alert(message: string): Promise<void>;
    confirm(message: string): Promise<void>;
}