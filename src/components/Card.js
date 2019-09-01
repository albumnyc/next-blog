import { Component, Children } from 'react';
import { Collapse, Icon } from 'antd';
import Router from 'next/router';
import autobind from 'autobind';
import { withRouter } from 'next/router';
import './Card.scss';

const { Panel } = Collapse;

export default withRouter(
    class Card extends Component {
        static async getInitialProps(props, Component) { }

        @autobind
        viewArticle(articleInfo) {
            const href = articleInfo.fileName.slice(7);
            const { router } = this.props;
            let route = href.split('.')[0];
            // route = '/' + encodeURIComponent(route.substr(1));
            // console.log({ route });
            Router.push(route);
        }

        render() {
            const { children, title } = this.props;
            return (
                <div className="card-item">
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={title} key={title}>
                            {children.map((item) => {
                                return (
                                    <div key={item.fileName} className="article_section">
                                        <span
                                            className="article_link"
                                            onClick={() => this.viewArticle(item)}
                                        >
                                            {item.fileName.split('content/posts/2017/')[1]}
                                        </span>
                                    </div>
                                );
                            })}
                        </Panel>
                    </Collapse>
                </div>
            );
        }
    }
);
