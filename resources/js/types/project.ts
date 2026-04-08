export interface WorkProject {
    id: string;
    title: string;
    mediaType: 'image' | 'video';
    mediaSrc: string | null;
}

export interface WorkCategory {
    id: number;
    name: string;
}
