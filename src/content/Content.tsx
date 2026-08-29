import { Route, Routes } from 'react-router-dom'
import DashHome from '../pages/dashboard/DashHome'
import DashNotifications from '../pages/dashboard/DashNotifications'
import DashOverview from '../pages/dashboard/DashOverview'
import DashSavedProperties from '../pages/dashboard/DashSavedProperties'
import DashSingleProperty from '../pages/dashboard/DashSingleProperty'

const Content = () => {
    return (
        <>
            <Routes>
                <Route path="/dashboard/home" element={<DashHome />} />
                <Route path="/dashboard/overview" element={<DashOverview />} />
                <Route path="/dashboard/property/:id" element={<DashSingleProperty />} />
                <Route path="/dashboard/saved" element={<DashSavedProperties />} />
                <Route path="/dashboard/notifications" element={<DashNotifications />} />
            </Routes>
        </>
    )
}

export default Content