import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { resizeFun, debounce } from '../utils/Api.js';
import autobind from 'autobind';
import { withRouter } from 'next/router';
import { observer, inject } from 'mobx-react';

@withRouter
@observer
class Hero extends PureComponent {
    static defaultProps = {
        backgroundClass: 'bg-mid-gray',
        topLinks: [],
        heroTitle: '',
        subtitle: '',
    };

    @autobind
    @debounce(500)
    resizeFontSize() {
        resizeFun();
    }

    componentDidMount() {
        this.resizeFontSize();
        const { router } = this.props;
        // router.prefetch('/dynamic');
        window.addEventListener('resize', this.resizeFontSize, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeFontSize);
    }

    render() {
        const { props } = this;
        return (
            <div className={`${props.backgroundClass}`}>
                <div className="pv4">
                    <div className="pv4">
                        <h1 className="normal pa0">
                            <Link prefetch href="/">
                                <a className="" href="/">
                                    {props.heroTitle}
                                </a>
                            </Link>
                        </h1>
                        <h4 className="normal ph1">{props.subtitle}</h4>
                        <div>
                            {props.topLinks &&
                                props.topLinks.length > 0 &&
                                props.topLinks.map((link, i) => {
                                    return (
                                        <Link href={link.href} key={i}>
                                            <a
                                                className="header_href_section"
                                                key={i}
                                                target="_blank"
                                            >
                                                {link.text}
                                            </a>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Hero.propTypes = {
    backgroundClass: PropTypes.string,
    topLinks: PropTypes.array,
    heroTitle: PropTypes.string,
    subtitle: PropTypes.string,
};

export default Hero;
