import { fromJS } from 'immutable';

const rules = fromJS([
  // Set up rules that you would like to test. For each event/condition/action:
  //  - modulePath is the name of your extension (as defined in your extension.json) plus the
  //    path to the library module file.
  //  - settings is an object containing user input saved from your extension view.

  {
    name: 'Example Rule',
    events: [
      {
        // This is a simple event type provided by the sandbox which triggers the rule when
        // you click anywhere on the document. Another option is sandbox/pageTop.js which is
        // an event type which triggers the rule as soon as the DTM library is loaded.
        // This event type is provided as a convenience in case your extension does not have
        // event types of its own.
        modulePath: 'sandbox/pageTop.js',
        settings: {}
      }
    ],
    // conditions: [
    //   {
    //     modulePath: 'example-extension/src/lib/conditions/operatingSystem.js',
    //     settings: {}
    //   }
    // ],
    actions: [
      {
        modulePath: 'twitter-uwt/src/lib/actions/sendDownload.js',
        settings: {
          value: '1',
          currency: 'USD',
          content_name: 'ala',
          content_ids: ['1', '2', '3', '4']
        }
      }
    ]
  }
]);

export default {
  state: rules, // initial state
  reducers: {
    addRule(state, payload) {
      return state.push(payload.rule);
    },
    saveRule(state, payload) {
      return state.update(payload.id, item => payload.rule);
    },
    deleteRule(state, payload) {
      return state.delete(payload);
    }
  }
};
