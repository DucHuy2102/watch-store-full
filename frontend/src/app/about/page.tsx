import {
    Analog_Section,
    History_Section,
    Finest_Section,
    Consciously_Section,
    Promise_Section,
} from './components';

export default function AboutUs() {
    return (
        <div className='min-h-screen mx-auto space-y-20 bg-gradient-to-b from-background to-background/80'>
            <Analog_Section />
            <History_Section />
            <Finest_Section />
            <Consciously_Section />
            <Promise_Section />
        </div>
    );
}
