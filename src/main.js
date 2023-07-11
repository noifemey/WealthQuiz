import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/matrix1.css';
import { createApp } from 'vue'
import router from './router' 
import 'bootstrap'
import App from './App.vue'

import {
    Dataset,
    DatasetItem,
    DatasetInfo,
    DatasetPager,
    DatasetSearch,
    DatasetShow
} from 'vue-dataset'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

library.add(fas);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('Dataset', Dataset)
app.component('DatasetInfo', DatasetInfo)
app.component('DatasetItem', DatasetItem)
app.component('DatasetPager', DatasetPager)
app.component('DatasetSearch', DatasetSearch)
app.component('DatasetShow', DatasetShow)

app.use(router)
app.mount('#app')