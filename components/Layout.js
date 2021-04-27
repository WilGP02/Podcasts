import Link from "next/link";
import React from "react";
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start() );
Router.events.on('routeChangeComplete', () => NProgress.done() );
Router.events.on('routeChangeError', () => NProgress.done() ); 

export default class Layout extends React.Component {
    render() {
        const { children, title } = this.props;
        return <div>
            <Head>
                <title>{title}</title>
            </Head>
            <header><Link href="/"><a>Podcats</a></Link></header>
            { children }
            <style jsx>{`
                    header {
                        color: #fff;
                        background: #8756ca;
                        padding: 15px;
                        text-align: center;
                    }
                    header a {
                        color: #fff;
                        text-decoration: none
                    }
            `}</style>
            <style jsx global>{`
                body {
                    margin: 0;
                    font-family: system-ui;
                    background: white;
                }

                #nprogress {
                    pointer-event: none;
                }
            `}</style>
        </div>
    }
}