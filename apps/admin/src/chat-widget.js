/*<![CDATA[*/

// for more customization settings, see https://developer.zendesk.com/embeddables/docs/widget/zesettings
window.zESettings = {
  webWidget: {
    chat: {
      suppress: false,
    },
    launcher: {
      chatLabel: {
        '*': 'IDEO',
      },
    },
    offset: {
      horizontal: '100px',
    },
  },
};

window.zE ||
  (function(e, t, s) {
    var n = (window.zE = window.zEmbed = function() {
        n._.push(arguments);
      }),
      a = (n.s = e.createElement(t)),
      r = e.getElementsByTagName(t)[0];
    (n.set = function(e) {
      n.set._.push(e);
    }),
      (n._ = []),
      (n.set._ = []),
      (a.async = true),
      a.setAttribute('charset', 'utf-8'),
      (a.src = 'https://static.zdassets.com/ekr/asset_composer.js?key=' + s),
      (n.t = +new Date()),
      (a.type = 'text/javascript'),
      r.parentNode.insertBefore(a, r);
  })(document, 'script', '69fb9127-1d49-4976-8ab9-3b07ec992f6e'); /*]]>*/
