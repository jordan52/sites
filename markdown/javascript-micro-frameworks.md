---
{
    "title": "Javascript Micro-Frameworks",
    "shortTitle": "micro-frameworks",
    "summary": "fun for the DIYers",
    "created": "2015-01-29",
    "modified": "2015-01-99",
    "type":"general",
    "categories": [
        "tech"
    ],
    "tags": [
        "javascript","angular","microframeworks","code"
    ]
}
---
A month ago a friend showed me a toy he was building. Basically, he was trying to do angular without having to 
install all of angular. (This was just after angular announced 2.0 which he said "is going to be... weird.") He 
built it using microframeworks. That is, tiny javascript libraries and frameworks that do one thing really 
well in a small footprint. He told me to go look at [microjs.com](http://microjs.com/#mic) which is a catalog of 
these types of libraries. I did and I liked it.

I took a look at his code again today and thought I might try using one of these libraries to DIY routing in a 
simple app. I wanted to build a single page app that acted as a questionnaire/wizard. Almost a Choose-Your-Own-Adventure
 type application that, when finished going through the questions, provides some sort of insight or guidance to the 
 user. My friend used [RLite](https://github.com/chrisdavies/rlite) so I thought I'd do the same.
 
The idea is to store the questions as an object (so we can easily create a service that returns these questionnaires 
as JSON) and have the app guide the user through them. Start with a simple index.html:

<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #557799">&lt;!doctype html&gt;</span>
<span style="color: #007700">&lt;html&gt;</span>
<span style="color: #007700">&lt;head&gt;</span>
    <span style="color: #007700">&lt;link</span> <span style="color: #0000CC">rel=</span><span style="background-color: #fff0f0">&quot;stylesheet&quot;</span> <span style="color: #0000CC">href=</span><span style="background-color: #fff0f0">&quot;/css/apptest.css&quot;</span><span style="color: #007700">&gt;</span>
    <span style="color: #007700">&lt;title&gt;</span>JS Webapp Playground<span style="color: #007700">&lt;/title&gt;</span>
<span style="color: #007700">&lt;/head&gt;</span>

<span style="color: #007700">&lt;body</span> <span style="color: #0000CC">bc-cloak</span><span style="color: #007700">&gt;</span>
<span style="color: #007700">&lt;header&gt;</span>
    <span style="color: #007700">&lt;nav&gt;</span>
        <span style="color: #007700">&lt;ul&gt;</span>
            <span style="color: #007700">&lt;li&gt;&lt;a</span> <span style="color: #0000CC">href=</span><span style="background-color: #fff0f0">&quot;#/&quot;</span><span style="color: #007700">&gt;</span>Home<span style="color: #007700">&lt;/a&gt;&lt;/li&gt;</span>
<span style="color: #007700">&lt;li&gt;&lt;a</span> <span style="color: #0000CC">href=</span><span style="background-color: #fff0f0">&quot;#/first_visit_type&quot;</span><span style="color: #007700">&gt;</span>first_visit_type<span style="color: #007700">&lt;/a&gt;&lt;/li&gt;</span>
<span style="color: #007700">&lt;/ul&gt;</span>
    <span style="color: #007700">&lt;/nav&gt;</span>
<span style="color: #007700">&lt;/header&gt;</span>

<span style="color: #007700">&lt;main</span> <span style="color: #0000CC">id=</span><span style="background-color: #fff0f0">&quot;main&quot;</span><span style="color: #007700">&gt;</span>Loading...<span style="color: #007700">&lt;/main&gt;</span>

<span style="color: #007700">&lt;footer&gt;</span>
    <span style="color: #007700">&lt;p&gt;</span>Special thanks to <span style="color: #007700">&lt;a</span> <span style="color: #0000CC">href=</span><span style="background-color: #fff0f0">&quot;https://github.com/bchociej/apptest/&quot;</span><span style="color: #007700">&gt;</span>Ben<span style="color: #007700">&lt;/a&gt;&lt;/p&gt;</span>
<span style="color: #007700">&lt;/footer&gt;</span>
<span style="color: #007700">&lt;script </span><span style="color: #0000CC">src=</span><span style="background-color: #fff0f0">&quot;/js/lib/lodash.min.js&quot;</span><span style="color: #007700">&gt;&lt;/script&gt;</span>
<span style="color: #007700">&lt;script </span><span style="color: #0000CC">src=</span><span style="background-color: #fff0f0">&quot;/js/rlite.js&quot;</span><span style="color: #007700">&gt;&lt;/script&gt;</span>
<span style="color: #007700">&lt;script </span><span style="color: #0000CC">src=</span><span style="background-color: #fff0f0">&quot;/js/apptest.js&quot;</span><span style="color: #007700">&gt;&lt;/script&gt;</span>
<span style="color: #007700">&lt;/body&gt;</span>
<span style="color: #007700">&lt;/html&gt;</span>
</pre></div>

Notice all that does is set up the structure of the page and include rlite, lodash, 
and a custom js file called apptest.js. 
Apptest.js simply sets up the rlite router based on the questions object which is called lower_back:

<!-- HTML generated using hilite.me -->
<div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;">
<pre style="margin: 0; line-height: 125%">;
(<span style="color: #008800; font-weight: bold">function</span> () {
    <span style="background-color: #fff0f0">&quot;use strict&quot;</span>;

    <span style="color: #008800; font-weight: bold">var</span> question <span style="color: #333333">=</span> _.template(<span style="background-color: #fff0f0">&#39;&lt;b&gt;name:&lt;/b&gt; &lt;%= name %&gt; &lt;b&gt;type:&lt;/b&gt; &lt;%= type %&gt; &lt;b&gt;exits:&lt;/b&gt; &lt;% _.forEach(exits, function(exit) { %&gt;&lt;a href=&quot;#/&lt;%- exit %&gt;&quot;&gt;&lt;%- exit %&gt;&lt;/a&gt;&lt;% }); %&gt;&#39;</span>);

    <span style="color: #008800; font-weight: bold">var</span> lower_back <span style="color: #333333">=</span> {
        _id<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;lower_back&#39;</span>,
        type<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;doineedthis&#39;</span>,
        title<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;lower back&#39;</span>,
        description<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;total description here&#39;</span>,
        reference<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;http://www.guideline.gov/content.aspx?id=47586&amp;search=odg&#39;</span>,
        questions<span style="color: #333333">:</span> [
            {
                name<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;first_visit_type&#39;</span>,
                type<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;router&#39;</span>,
                description<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;select specialist type and initial result &#39;</span>,
                specialist_type<span style="color: #333333">:</span> [<span style="background-color: #fff0f0">&#39;MD/DO&#39;</span>, <span style="background-color: #fff0f0">&#39;ORTHO&#39;</span>, <span style="background-color: #fff0f0">&#39;CHIRO&#39;</span>, <span style="background-color: #fff0f0">&#39;PAIN&#39;</span>],
                exits<span style="color: #333333">:</span> [<span style="background-color: #fff0f0">&#39;first_without_radioplathy&#39;</span>, <span style="background-color: #fff0f0">&#39;first_with_radioplathy&#39;</span>]
            },
            {
                name<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;first_without_radioplathy&#39;</span>,
                type<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;router&#39;</span>,
                description<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;firstwithout &#39;</span>,
                specialist_type<span style="color: #333333">:</span> [<span style="background-color: #fff0f0">&#39;MD/DO&#39;</span>, <span style="background-color: #fff0f0">&#39;ORTHO&#39;</span>, <span style="background-color: #fff0f0">&#39;CHIRO&#39;</span>, <span style="background-color: #fff0f0">&#39;PAIN&#39;</span>],
                exits<span style="color: #333333">:</span> [<span style="background-color: #fff0f0">&#39;end&#39;</span>]
            },
            {
                name<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;first_with_radioplathy&#39;</span>,
                type<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;router&#39;</span>,
                description<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;first with &#39;</span>,
                specialist_type<span style="color: #333333">:</span> [<span style="background-color: #fff0f0">&#39;MD/DO&#39;</span>, <span style="background-color: #fff0f0">&#39;ORTHO&#39;</span>, <span style="background-color: #fff0f0">&#39;CHIRO&#39;</span>, <span style="background-color: #fff0f0">&#39;PAIN&#39;</span>],
                exits<span style="color: #333333">:</span> [<span style="background-color: #fff0f0">&#39;end&#39;</span>]
            },
            {
                name<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;end&#39;</span>,
                type<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;exit&#39;</span>,
                description<span style="color: #333333">:</span> <span style="background-color: #fff0f0">&#39;Thank you &#39;</span>,
                exits<span style="color: #333333">:</span> []
            }
        ]
    };

    <span style="color: #008800; font-weight: bold">var</span> main <span style="color: #333333">=</span> <span style="color: #007020">document</span>.getElementById(<span style="background-color: #fff0f0">&#39;main&#39;</span>);
    <span style="color: #008800; font-weight: bold">var</span> views <span style="color: #333333">=</span> {};

    <span style="color: #008800; font-weight: bold">var</span> decloak <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">function</span> decloak() {
        <span style="color: #007020">document</span>.body.removeAttribute(<span style="background-color: #fff0f0">&#39;bc-cloak&#39;</span>);
        decloak <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">function</span> decloak() {
        };
    };

    <span style="color: #008800; font-weight: bold">var</span> loadQuestion <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">function</span> loadQuestion(n) {
        <span style="color: #008800; font-weight: bold">return</span> <span style="color: #008800; font-weight: bold">function</span> () {
            main.innerHTML <span style="color: #333333">=</span> question(n);
            decloak();
        };
    };

    (<span style="color: #008800; font-weight: bold">function</span> (r) {
        _.forEach(lower_back.questions, <span style="color: #008800; font-weight: bold">function</span> (n) {
            r.add(n.name, loadQuestion(n));
        });

        <span style="color: #008800; font-weight: bold">var</span> update <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">function</span> update() {
            <span style="color: #008800; font-weight: bold">var</span> hash <span style="color: #333333">=</span> location.hash <span style="color: #333333">||</span> <span style="background-color: #fff0f0">&#39;#&#39;</span>;
            r.run(hash.substr(<span style="color: #0000DD; font-weight: bold">1</span>));
        };

        <span style="color: #007020">window</span>.addEventListener(<span style="background-color: #fff0f0">&#39;hashchange&#39;</span>, update);
        update();
    })(<span style="color: #008800; font-weight: bold">new</span> Rlite);

})();
</pre></div>

The router will replace the contents of the #main div with html created by the lodash template using lower_back for 
data. The "exits" array tell the template which links to create at the end of the question (that way your questions 
can branch based on user input.)

The code doesn't do much, but it taught me that microframeworks give you a nice, low-level approach to building a 
javascript app. This functionality is exactly what I wanted and it only took a few lines of code. For simple projects
 like this, it might not make sense to lug angular or backbone along for the ride. It just makes more sense to use 
 HTML5 and modern browsers to get the job done.

