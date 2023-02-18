import { useEffect, useRef, useCallback, createRef } from "react";

export default function CPart({ title, slug })
{

    let ref = useRef(<div></div>);
    // Wait until after client-side hydration to show
    const insertScript = (id, parentElement) =>
    {
        const script = window.document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.id = id
        script.innerHTML = `
    var remark_config = {

      components: ["embed"],
    host: 'https://remark42.cyp.sh',
    site_id: 'cyp.sh',
    //url: 'PAGE_URL', // optional param; if it isn't defined
                     // 'window.location.origin + window.location.pathname' will be used
                     //
                     // Note that if you use query parameters as significant part of URL
                     // (the one that actually changes content on page)
                     // you will have to configure URL manually to keep query params, as
                     // 'window.location.origin + window.location.pathname' doesn't contain query params and
                     // hash. For example, default URL for 'https://example/com/example-post?id=1#hash'
                     // would be 'https://example/com/example-post'
                     //
                     // The problem with query params is that they often contain useless params added by
                     // various trackers (utm params) and doesn't have defined order, so Remark42 treats differently
                     // all this examples:
                     // https://example.com/?postid=1&date=2007-02-11
                     // https://example.com/?date=2007-02-11&postid=1
                     // https://example.com/?date=2007-02-11&postid=1&utm_source=google
                     //
                     // If you deal with query parameters make sure you pass only significant part of it
                     // in well defined order
    max_shown_comments: 15, // optional param; if it isn't defined default value (15) will be used
    theme: 'light', // optional param; if it isn't defined default value ('light') will be used
    // page_title: 'Moving to Remark42', // optional param; if it isn't defined 'document.title' will be used
    no_footer: true,
    locale: 'en', // set up locale and language, if it isn't defined default value ('en') will be used
    show_email_subscription: false, // optional param; by default it is 'true' and you can see email subscription feature
                                    // in interface when enable it from backend side
                                    // if you set this param in 'false' you will get notifications email notifications as admin
                                    // but your users won't have interface for subscription
    //simple_view: true, // optional param; overrides the parameter from the backend
                        // minimized UI with basic info only
  };
  !function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);
  `
        parentElement.appendChild(script)
        return script;
    };

    // Helper to remove scripts from our page
    const removeScript = (id, parentElement) =>
    {
        const script = window.document.getElementById(id)
        if (script)
        {
            parentElement.removeChild(script)
        }
    }

    useEffect(() =>
    {
        if (!window)
        {
            return
        }
        const document = window.document
        if (document.getElementById('remark42'))
        {
            insertScript('comments-script', document.body)
        }

        return () => removeScript('comments-script', document.body)
    }, [title]);
    useEffect(() =>
    {
        if (!window)
        {
            return;
        }
        const remark42 = window.REMARK42;
        if (remark42)
        {
            remark42.destroy();
            remark42.createInstance(window.remark_config);
        }
    }, [title]);

    return (
        <>
            <h2 className="btitle mt-8 text-2xl font-black">Comments</h2>
            <div ref={ref} id="remark42"></div>
        </>
    )
}


