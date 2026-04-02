export interface ProgramImage {
    src: string;
    alt: string;
}

export interface WorkProgram {
    id: string;
    title: string;
    description: string;
    hasCta: boolean;
    buttonText: string;
    buttonUrl: string | null;
    bulletPoints: string[];
    tags: string[];
    images: ProgramImage[];
}

export interface WorkProgramsSectionData {
    sectionTitle: string;
    programs: WorkProgram[];
}
