export interface Document {
    id: string;
    title: string;
    content: string;
    owner: string;
    sharedWith: string[];
    createdAt: Date;
}
