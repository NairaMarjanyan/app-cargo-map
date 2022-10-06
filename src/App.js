import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Layout/Header";
import CookieBanner from "./components/CookieBanner";
import Modal from "./components/UI/Modal";
import BagSvg from "./components/icons/24/BagSvg";
import Demo from "./components/Demo";
import Account from "./pages/Account";
import Companies from "./pages/Companies";
import User from "./pages/User";
import LoadingPage from "./components/LoadingPage";
import { isMobile } from "react-device-detect";
import useWindowSize from "./hooks/useWindowSize";
import styles from "./App.module.scss";
import useCompanyStore from "./store/hooks/useCompanyStore";
import Security from "./pages/Security";
import Notification from "./pages/Notification";
import { ToastContainer } from "react-toastify";

const extension = isMobile ? "mobile" : "desktop";

// This component is loaded dynamically
const CreateCompanyLazy = lazy(() => import("./pages/CreateCompany"));
const FindTrackLazy = lazy(() =>
    import(`./pages/FindVehicle/index.${extension}`)
);
const FindCargoLazy = lazy(() =>
    import(`./pages/FindCargo/index.${extension}`)
);
const VehiclesLazy = lazy(() => import(`./pages/Vehicles`));
const AddVehicleContainerLazy = lazy(() =>
    import(`./containers/AddVehicleContainer`)
);
const CargoContainerLazy = lazy(() => import(`./containers/CargoContainer`));
const AddCargoContainerLazy = lazy(() =>
    import(`./containers/AddCargoContainer`)
);

function App() {
    const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);

    const {
        loading,
        companies,
        getCompanies,
        deleteCompany,
        createCompany,
        companiesInfo
    } = useCompanyStore();

    useEffect(() => {
        getCompanies();
    }, [getCompanies]);

    function toggleAddCompanyModal() {
        setIsAddCompanyModalOpen((prevState) => !prevState);
    }

    function handleAddCompanyModalOpen() {
        setIsAddCompanyModalOpen(true);
    }

    const { width: windowWidth } = useWindowSize();
    const isSmallView = isMobile || windowWidth <= 475;

    /** We need id on App in order to disable scroll */
    return (
        <div id="app" className={styles.App}>
            <Header companiesInfo={companiesInfo} />
            {loading ? (
                <LoadingPage />
            ) : (
                <Suspense fallback={<LoadingPage />}>
                    <Routes>
                        <Route
                            index
                            path="find-truck"
                            element={
                                <FindTrackLazy
                                    onAddCompany={handleAddCompanyModalOpen}
                                    companiesInfo={companiesInfo}
                                    isSmallView={isSmallView}
                                />
                            }
                        />

                        {companiesInfo.loadCompanies.length > 0 && (
                            <Route
                                path="add-cargo"
                                element={
                                    <AddCargoContainerLazy
                                        companies={companiesInfo.loadCompanies}
                                    />
                                }
                            />
                        )}
                        {companiesInfo.vehicleCompanies.length > 0 && (
                            <Route
                                path="add-vehicle"
                                element={<AddVehicleContainerLazy />}
                            />
                        )}
                        <Route
                            path="find-cargo"
                            element={
                                <FindCargoLazy
                                    onAddCompany={handleAddCompanyModalOpen}
                                    companiesInfo={companiesInfo}
                                    isSmallView={isSmallView}
                                />
                            }
                        />
                        {companiesInfo.vehicleCompanies.length > 0 && (
                            <Route
                                path="vehicles"
                                element={
                                    <VehiclesLazy
                                        companies={
                                            companiesInfo.vehicleCompanies
                                        }
                                    />
                                }
                            />
                        )}
                        <Route
                            path="cargos"
                            element={
                                <CargoContainerLazy
                                    companies={companiesInfo.loadCompanies}
                                />
                            }
                        />

                        <Route element={<User />} path="user">
                            <Route
                                index
                                path="companies"
                                element={
                                    <Companies
                                        companies={companies}
                                        onDelete={deleteCompany}
                                        toggleAddCompanyModal={
                                            toggleAddCompanyModal
                                        }
                                    />
                                }
                            />
                            <Route path="account" element={<Account />} />
                            <Route path="security" element={<Security />} />
                            <Route
                                path="notification"
                                element={<Notification />}
                            />
                        </Route>

                        <Route path="demo" element={<Demo />} />
                        <Route
                            path="*"
                            element={<Navigate replace to="/find-truck" />}
                        />
                    </Routes>
                    <CookieBanner />

                    <Modal
                        isOpen={isAddCompanyModalOpen}
                        title="Зарегистрировать Компанию"
                        iconComponent={BagSvg}
                        onClose={toggleAddCompanyModal}
                    >
                        <CreateCompanyLazy
                            onCancel={toggleAddCompanyModal}
                            onCompanyCreate={createCompany}
                        />
                    </Modal>
                    <ToastContainer autoClose={3000} />
                </Suspense>
            )}
        </div>
    );
}

export default App;
