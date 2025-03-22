import { Footer, Navbar } from '@/components/layouts';

export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <h1>Home</h1>
            <Footer />
        </div>
    );
}
