import React, { PureComponent } from 'react';
import dynamic from 'next/dynamic';

const Page = dynamic(import('../src/components/Page'));
const PagePreview = dynamic(import('../src/components/PagePreview'));
import CONFIG from '../content/index.json';
import { formatDate } from '../src/utils/date';
import { makeUrl, filterPosts } from '../src/utils/content';
import { withRouter } from 'next/router';
import './index.scss';
import { observer, inject } from 'mobx-react';
import { showTags } from '../src/utils/util';
import SUMMARY_JSON from '../content/summary.json';

showTags();

@inject('tagsPageData')
@observer
class Index extends PureComponent {
    componentDidMount() {
        const { tagsPageData } = this.props;
        console.log(tagsPageData.tagsMap);
    }
    render() {
        return (
            <div>
                <Page
                    siteTitle={`${CONFIG.siteTitle} - Index`}
                    heroTitle={CONFIG.siteTitle}
                    description={CONFIG.description}
                    stylesheets={CONFIG.stylesheets}
                    topLinks={CONFIG.topLinks}
                    backgroundClass={CONFIG.backgroundClass}
                    body={this.parseBody({ summaryJson: SUMMARY_JSON })}
                    copyright={CONFIG.copyright}
                    siteId={CONFIG.siteId}
                />
            </div>
        );
    }
    parseBody = (props) => {
        const postList = filterPosts(props.summaryJson);
        return (
            <div className="center">
                {postList.map((article, i) => {
                    const href = makeUrl(article);
                    const date = formatDate(article.date);
                    return (
                        <PagePreview
                            title={article.title}
                            preview={article.preview}
                            date={date}
                            href={href}
                            key={i}
                        />
                    );
                })}
            </div>
        );
    };
}

export default withRouter(Index);
