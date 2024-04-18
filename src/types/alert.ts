export default interface Alert {
    show: boolean;
    title: string;
    message: string;
    variant: 'success' | 'danger';
}