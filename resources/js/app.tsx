import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

import Layout from '@/components/Layout';

const appName = import.meta.env.VITE_APP_NAME || 'Yamen Creates';
type InertiaPageComponent = ComponentType<any> & {
    layout?: ((page: ReactNode) => ReactNode) | ComponentType<any>;
};
type InertiaPageModule = {
    default: InertiaPageComponent;
};

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#9333ea',
    },
    resolve: async (name) => {
        const page = await resolvePageComponent<InertiaPageModule>(
            `./pages/${name}.tsx`,
            import.meta.glob<InertiaPageModule>('./pages/**/*.tsx'),
        );

        page.default.layout ??= (pageNode: ReactNode) => (
            <Layout>{pageNode}</Layout>
        );

        return page.default;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
