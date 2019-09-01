import React, { Component } from 'react';
import { formatDate } from '../src/utils/date';
import dynamic from 'next/dynamic';

const Page = dynamic(import('../src/components/Page'));
const Card = dynamic(import('../src/components/Card'));
import Header from '../src/components/Header';
import { withRouter } from 'next/router';
import './index.scss';
import { observer, inject } from 'mobx-react';
import CONFIG from '../content/index.json';
import autobind from 'autobind';

@inject('tagsPageData')
@observer
class Catogary extends Component {
    static async getInitialProps() {
        return { CONFIG };
    }
    componentDidMount() {
        const { tagsPageData } = this.props;
        console.log(tagsPageData.tagsMap);
    }
    render() {
        const {
            CONFIG: { description, siteTitle, stylesheets },
        } = this.props;
        return (
            <>
                <Page
                    {...CONFIG}
                    stylesheets={['https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.7/antd.css']}
                    body={this.renderBody()}
                />
            </>
        );
    }

    @autobind
    renderBody() {
        const {
            tagsPageData: { tagNameSet, tagsMap },
        } = this.props;
        const Cards = Array.from(tagNameSet).map((item) => {
            return (
                <Card title={item} key={item}>
                    {tagsMap.get(item)}
                </Card>
            );
        });
        return (
            <div className="cards-wrapper">
                {Cards}
                <style jsx>{`
                    .cards-wrapper {
                        width: 90%;
                        margin: 2rem auto 0.5rem;
                    }
                    .cards-wrapper:before {
                        content: '';
                        overflow: hidden;
                    }
                `}</style>
            </div>
        );
    }
}

export default withRouter(Catogary);
