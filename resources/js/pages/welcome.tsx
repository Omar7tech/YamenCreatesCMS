import Layout from '@/components/Layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />

           <Layout>
                   <div>
                     Welcome
                   </div>
                 </Layout>
        </>
    );
}
