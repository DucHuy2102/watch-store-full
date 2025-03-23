import { Footer, Navbar } from '@/components/layouts';

export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow'>Home</main>
            <Footer />
        </div>
    );
}
