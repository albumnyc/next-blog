import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let $el;
if (process.browser) {
    $el = document.createElement('div');
    $el.setAttribute('id', 'tips');
    document.body.appendChild($el);
}

class Tip extends Component {
    static defaultProps = {
        children: 'sda',
        tip: 'sdas',
    };
    state = {
        show: false,
    };

    componentDidMount() {
        // this.setState({
        //     show: true,
        // });
    }

    onMouseEnter = (e) => {
        console.log(e.target.getBoundingClientRect());
    };

    render() {
        const { show } = this.state;
        if (!process.browser || !show) {
            return null;
        }
        const { children, el } = this.props;

        return ReactDOM.createPortal(
            <div onMouseEnter={this.onMouseEnter}>
                {children}
                <style jsx global>{`
                    #tips {
                        position: absolute;
                        top: 0;
                    }
                `}</style>
            </div>,
            $el
        );
    }
}

const paintRed = (Component) =>
    React.forwardRef((props, ref) => {
        return <Component color="red" forwardedRef={ref} {...props} />;
    });

export default paintRed(Tip);
