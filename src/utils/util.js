import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind';
import { tagsMap, tagNameSet } from '../store/packageTags';
import { PageLink } from '../components/PageLink';
import Tooltip from '../components/Tooltip';

let $el;
if (process.browser) {
    $el = document.createElement('div');
    $el.setAttribute('id', 'tags-root');
    document.querySelector('__next');
    document.body.appendChild($el);
}

class InnerTag extends Component {
    $elList = [];

    componentDidMount() {
        // setTimeout(this.forceUpdate, 300);
    }

    @autobind
    createSectionHref(tagName) {
        return encodeURIComponent(`catogary/${tagName}`);
    }

    render() {
        const tagNameArray = Array.from(tagNameSet);
        tagNameArray.unshift('分类');
        this.$elList = Array.from({ length: tagNameArray.length }).fill(React.createRef());
        return (
            <ul>
                {tagNameArray.map((item, index) => (
                    <PageLink key={item} hreftodo={this.createSectionHref(item)}>
                        <li
                            ref={($el) => (this.$elList[index] = $el)}
                            onClick={() => (location.href = this.createSectionHref(item))}
                        >
                            <span className="articel_section">{item}</span>
                            <Tooltip el={this.$elList[index]} ref={this.$elList[index]}>
                                {'dasdsa'}
                            </Tooltip>
                        </li>
                    </PageLink>
                ))}
                <style jsx global>{`
                    #tags-root {
                        position: fixed;
                        top: 15rem;
                    }
                `}</style>
                <style jsx>{`
                    ul {
                        position: sticky;
                        top: 0;
                        padding: 0.4rem 0.5rem;
                        border: 0.05rem dashed #f40;
                        margin-left: 0.5rem;
                    }
                    li {
                        list-style: none;
                    }
                    .articel_section {
                        cursor: pointer;
                    }
                    .articel_section:hover {
                        color: #f40;
                    }
                `}</style>
            </ul>
        );
    }
}

export const showTags = () => {
    process.browser ? ReactDOM.render(<InnerTag />, $el) : null;
};

const createTagPortal = () => {
    if (process.browser) {
        if (document.querySelector('#__next')) {
            return <Tags />;
        }
        var MutationObserver =
            global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
        var list = document.body;

        var Observer = new MutationObserver(function (mutations, instance) {
            mutations.forEach(function (mutation) {
                console.log({ mutation });
            });
        });

        Observer.observe(list, {
            childList: true,
            attributeOldValue: true,
            characterDataOldValue: true,
            // attributesFilter: ['id'],
            //  childList：子元素的变动
            // attributes：属性的变动 , style啥的
            // characterData：节点内容或节点文本的变动
            // subtree：所有下属节点（包括子节点和子节点的子节点）的变动
            // attributeOldValue：值为true或者为false。如果为true，则表示需要记录变动前的属性值。
            // characterDataOldValue：值为true或者为false。如果为true，则表示需要记录变动前的数据值。
            // attributesFilter：值为一个数组，表示需要观察的特定属性（比如['class', 'str']）。
        });
    }
};
export default {
    showTags,
};
