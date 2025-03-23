import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';

const ToastWrapper = () => {
    return (
        <ToastContainer
            position='bottom-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
        />
    );
};

if (typeof document !== 'undefined') {
    const toastRoot = document.createElement('div');
    toastRoot.id = 'toast-root';
    document.body.appendChild(toastRoot);

    const root = ReactDOM.createRoot(toastRoot);
    root.render(<ToastWrapper />);
}

export default toast;
