export interface WorkProject {
    id: string;
    title: string;
    slug: string;
    mediaType: 'image' | 'video';
    mediaSrc: string | null;
    isInternal: boolean;
    externalUrl: string | null;
}

export interface ProjectSection {
    id: string;
    title: string | null;
    type: 'text_only' | 'left_image_text' | 'right_image_text' | 'image_gallery';
    content: string | null;
    image?: string;
    images?: string[];
}

export interface ProjectDetail {
    id: string;
    title: string;
    slug: string;
    category: {
        name: string;
        slug: string;
    };
    featuredImage: string | null;
    sections: ProjectSection[];
}

export interface WorkCategory {
    slug: string;
    name: string;
}
