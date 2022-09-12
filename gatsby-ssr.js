"use strict";

var React = require("react");

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;

  if (process.env.NODE_ENV === 'production' && pluginOptions.salesloftTrackerId) {
    setHeadComponents([/*#__PURE__*/React.createElement("script", {
      key: "gatsby-plugin-salesloft-tracker",
      dangerouslySetInnerHTML: {
        __html: "(function(i,s,o,g,r,a,m){i['SLScoutObject']=r;i[r]=i[r]||function(){\n            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n            })(window,document,'script','https://scout-cdn.salesloft.com/sl.js','slscout');\n          slscout([\"init\", \"".concat(pluginOptions.salesloftTrackerId, "\"]);")
      }
    })]);
  }
};