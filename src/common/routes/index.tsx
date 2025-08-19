import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './AppRouter';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}

export { AppRoutes }