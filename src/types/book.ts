export default interface Book {
    id: number;
    title: string;
    author: string;
    thumbnailUrl: string;
    status: 'Available' | 'Borrowed';
    shortDescription: string;
}