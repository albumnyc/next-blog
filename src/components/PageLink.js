import React, { Component } from 'react';
import Link from 'next/link';
import Tooltip from './Tooltip';
export class PageLink extends Component {
    render() {
        const { href, className, children } = this.props;
        if (!href) {
            return <>{children}</>;
        }
        return (
            <Link href={`post?fullUrl=${href}`} as={href} prefetch>
                <a className={`${className || ''}`}>{children}</a>
            </Link>
        );
    }
}
