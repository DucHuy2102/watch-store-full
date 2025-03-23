import { Carousel_Section, Footer, Navbar, ShopNow_Section } from '@/components/layouts';

export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow'>
                <Carousel_Section />
                <ShopNow_Section />
            </main>
            <Footer />
        </div>
    );
}
