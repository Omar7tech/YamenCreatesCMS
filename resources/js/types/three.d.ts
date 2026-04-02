declare module 'three' {
    export class Object3D {
        position: {
            set: (x: number, y: number, z: number) => void;
        };
        scale: {
            set: (x: number, y: number, z: number) => void;
        };
        matrix: unknown;
        lookAt: (x: number, y: number, z: number) => void;
        rotateX: (angle: number) => void;
        updateMatrix: () => void;
    }

    export class InstancedMesh {
        instanceMatrix: {
            needsUpdate: boolean;
        };
        setMatrixAt: (index: number, matrix: unknown) => void;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            capsuleGeometry: any;
            sphereGeometry: any;
            boxGeometry: any;
            tetrahedronGeometry: any;
            meshBasicMaterial: any;
        }
    }
}
