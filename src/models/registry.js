import { fromJS } from 'immutable';
import environment from './environment';

const registry = fromJS({
  environment: environment,
  components: {
    events: {
      'sandbox/pageTop.js': {
        extensionDisplayName: 'Sandbox',
        extensionName: 'sandbox',
        displayName: 'Page Top',
        libPath: 'pageTop.js'
      }
    },
    actions: {
      'twitter-uwt/src/lib/actions/sendPageView.js': {
        extensionDisplayName: 'Twitter Universal Website Tag',
        extensionName: 'twitter-uwt',
        displayName: 'Page View',
        libPath: 'src/lib/actions/sendPageView.js',
        viewPath: 'extensionViews/actions/sendPageView.html'
      },
      'twitter-uwt/src/lib/actions/sendPurchase.js': {
        extensionDisplayName: 'Twitter Universal Website Tag',
        extensionName: 'twitter-uwt',
        displayName: 'Purchase',
        libPath: 'src/lib/actions/sendPurchase.js',
        viewPath: 'extensionViews/actions/sendPurchase.html'
      },
      'twitter-uwt/src/lib/actions/sendDownload.js': {
        extensionDisplayName: 'Twitter Universal Website Tag',
        extensionName: 'twitter-uwt',
        displayName: 'Download',
        libPath: 'src/lib/actions/sendDownload.js',
        viewPath: 'extensionViews/actions/sendDownload.html'
      }
    }
  }
});

export default {
  state: registry, // initial state
  reducers: {}
};
