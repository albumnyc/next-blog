const SUMMARY_JSON = require('../../content/summary.json');
const tagsMap = new Map();
const tagNameSet = new Set();
const entryPaths = ['content/custom-post.json', 'content/index.json'];

const compose = (func) => {
    return (arg) => func.reduce((composed, fn) => fn(composed), arg);
};

const getKeys = (files) => Object.keys(files);

const getDataArray = (fileMapKeys) => {
    const fileMap = SUMMARY_JSON.fileMap;
    return fileMapKeys.map((item) => {
        const fileName = item;
        const fileTags = fileMap[item].tags;
        const fileData = fileMap[item];
        return {
            fileName,
            fileTags,
            fileData,
        };
    });
};

const filterEntryPath = (fileInfo) =>
    fileInfo.filter((item) => !entryPaths.includes(item.fileName));

const combineData = (fileInfo) => {
    fileInfo.forEach(({ fileName, fileTags, fileData }) => {
        fileTags.forEach((tag) => {
            if (!tagNameSet.has(tag)) {
                tagNameSet.add(tag);
                tagsMap.set(tag, [{ fileName, fileTags, fileData }]);
            } else {
                const tagData = tagsMap.get(tag);
                const newTagData = tagData.concat({ fileName, fileTags, fileData });
                tagsMap.set(tag, newTagData);
            }
        });
    });
    return { tagsMap, tagNameSet };
};

// const MapTofile = ({ tagsMap, tagNameSet }) => {
//     const tagsEntries = tagsMap.entries();
//     let nextState = tagsEntries.next();
//     while (!nextState.done) {
//         const key = nextState.value[0];
//         const data = tagsMap.get(key).map(({ fileName }) => fileName);
//         tagsMap.set(key, data);
//         nextState = tagsEntries.next();
//     }
//     return { tagsMap, tagNameSet };
// };

const selectTagFuncList = [getKeys, getDataArray, filterEntryPath, combineData];

const tagsPageData = compose(selectTagFuncList)(SUMMARY_JSON.fileMap);
module.exports = tagsPageData;
