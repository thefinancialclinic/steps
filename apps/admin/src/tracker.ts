import React from 'react';
import Keen from 'keen-tracking';
import MobileDetect from 'mobile-detect';
import GoogleAnalytics from 'react-ga';

const {
  GA_PROPERTY_ID,
  KEEN_PROJECT_ID,
  KEEN_WRITE_KEY,
  NODE_ENV,
} = process.env;
const debug = NODE_ENV === 'development';

GoogleAnalytics.initialize(GA_PROPERTY_ID, { debug });

function initKeen() {
  const md = new MobileDetect(window.navigator.userAgent);
  if (md.is('bot')) {
    return false;
  }

  const helpers = Keen.helpers;
  const utils = Keen.utils;

  const sessionCookie = utils.cookie('session-cookie');
  if (!sessionCookie.get('guest_id')) {
    sessionCookie.set('guest_id', helpers.getUniqueId());
  }

  const keenClient = new Keen({
    projectId: KEEN_PROJECT_ID,
    writeKey: KEEN_WRITE_KEY,
    host: 'api.keen.io',
    protocol: 'https',
    requestType: 'jsonp',
  });

  // // Optionally prevent recording in dev mode
  // Keen.enabled = true;

  // Display events in the browser console
  if (debug) {
    Keen.debug = true;
    keenClient.on('recordEvent', Keen.log);
    keenClient.on('recordEvents', Keen.log);
  }

  // Add custom properties to all events
  keenClient.extendEvents(() => {
    return {
      geo: {
        info: {
          /* Enriched */
        },
        ip_address: '${keen.ip}',
      },
      page: {
        info: {
          /* Enriched */
        },
        title: document.title,
        url: document.location.href,
      },
      referrer: {
        info: {
          /* Enriched */
        },
        url: document.referrer,
      },
      tech: {
        browser: helpers.getBrowserProfile(),
        info: {
          /* Enriched */
        },
        user_agent: '${keen.user_agent}',
        device_type: md.tablet()
          ? 'tablet'
          : md.mobile()
            ? 'mobile'
            : 'desktop',
      },
      time: helpers.getDatetimeIndex(),
      visitor: {
        guest_id: sessionCookie.get('guest_id'),
        /* Include additional visitor info here */
      },
      keen: {
        addons: [
          {
            name: 'keen:ip_to_geo',
            input: {
              ip: 'geo.ip_address',
            },
            output: 'geo.info',
          },
          {
            name: 'keen:ua_parser',
            input: {
              ua_string: 'tech.user_agent',
            },
            output: 'tech.info',
          },
          {
            name: 'keen:url_parser',
            input: {
              url: 'page.url',
            },
            output: 'page.info',
          },
          {
            name: 'keen:date_time_parser',
            input: {
              date_time: 'keen.timestamp',
            },
            output: 'timestamp_info',
          },
        ],
      },
    };
  });

  /*
    There are two ways to record an event. You can do it here with DOM selectors (see below),
    or you can do it inside the code where you have access to stuff like state and props.
    */

  // Keen.listenTo({
  //   'click .action_button, .action_button *': function(e){
  //     console.log('currentTarget: ', e.currentTarget); // returns #document. If you need currentTarget, see my implementation below
  //   }
  // });

  /* DOM Event Capturing - preserves event.currentTarget */
  // window.onload = ()=> {
  //   const resourceButtons = document.querySelectorAll('.action_button');
  //   resourceButtons.forEach( (button) => {
  //     button.addEventListener('click', (e) => {
  //       console.log(e.currentTarget); // will return the node the listener is attached to, even if you click a child
  //     });
  //   });
  // };
  return keenClient;
}
export const keenClient = initKeen();

/* HOC for tracking page views with React Router */

export const withTracker = (Component, options = {}) => {
  return class extends React.Component<any, any> {
    private trackPage = page => {
      keenClient.recordEvent('pageviews', { ...options });
      GoogleAnalytics.set({
        page,
        ...options,
      });
      GoogleAnalytics.pageview(page);
    };

    componentDidMount() {
      const page = this.props.location.pathname;
      this.trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        this.trackPage(nextPage);
      }
    }

    render() {
      const { location, ...props } = this.props;

      return React.createElement(Component, props);
    }
  };
};

export default withTracker;
