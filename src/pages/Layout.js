import * as React from "react";

import { RouteProvider } from "src/shared/hooks/useRouteData";

import { Routes , Route } from "react-router-dom";

import { connect } from 'react-redux' ;

import Header from "src/components/Layouts/Header";
import Footer from "src/components/Layouts/Footer";
import Content from "src/components/Layouts/Content";

import Dashboard from "./Dashboard";

import { 
    BackdropOverlay,
    LayoutMain
} from "./styles/Layout.styles";

import { WalletProvider } from "src/shared/hooks/useWalletData";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Layout = (props) => {

    const initialOptions = {
        "client-id": process.env.REACT_APP_PAYPAL_,
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider
            options={initialOptions}
        >
            <WalletProvider>
                <LayoutMain>
                    <BackdropOverlay>
                        <RouteProvider>
                            <Header />
                            <Content>
                                <Routes>
                                    <Route path="/" element={< Dashboard />} />
                                    <Route path="/dashboard" element={< Dashboard />} />
                                </Routes>
                            </Content>
                            {/* <Footer /> */}
                        </RouteProvider>
                    </BackdropOverlay>
                </LayoutMain>
            </WalletProvider>
        </PayPalScriptProvider>
    );
}
const mapStateToProps = state => ({
 
}) ;
const mapDispatchToProps = {

} ;
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
