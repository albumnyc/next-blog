import App, { Container } from 'next/app';
import React from 'react';
import { observer, Provider, inject } from 'mobx-react';
import stores from '../src/store/index';

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Provider {...stores}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}
