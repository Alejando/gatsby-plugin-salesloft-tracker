const React = require("react")

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  if (process.env.NODE_ENV === 'production' && pluginOptions.salesloftTrackerId) {
    setHeadComponents([
      <script
        key={`gatsby-plugin-salesloft-tracker`}
        dangerouslySetInnerHTML={{
          __html: `(function(i,s,o,g,r,a,m){i['SLScoutObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://scout-cdn.salesloft.com/sl.js','slscout');
          slscout(["init", "${pluginOptions.salesloftTrackerId}"]);`,
        }}
      />
    ]);
  }
};
