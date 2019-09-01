import { observable, action } from 'mobx';
import tagsPageData from './packageTags';

class Store {
    @observable number = 0;
    @action add = () => {
        this.number++;
    };
}

const store = new Store();

export default {
    store,
    tagsPageData,
};
