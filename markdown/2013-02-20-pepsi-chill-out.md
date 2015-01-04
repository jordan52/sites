---
{
    "title": "The Pepsi Chill-out",
    "shortTitle": "pepsi",
    "summary": "do you?",
    "created": "2013-02-20",
    "modified": "2013-02-20",
    "type":"blog",
    "categories": [
    ],
    "tags": [
    ]
}
---
Remember the Pepsi Chill-Out?

I learned about [Haim](http://en.wikipedia.org/wiki/Haim_(band)) today from audioindie: <https://www.youtube.com/watch?v=0ovrplcNwXo>

I'm pleased with my Warby Parker experience. I bought the Crane frames in Sugar Maple. On one hand they feel like inexpensive frames. On the other hand, they're nice looking, you can't beat the price, I got them in less than a week, and I can see. The only downside is I'll have to adjust them myself so they fit my face. I wonder what people who do not have a heat gun do.

My app had a log4j.properties file in the classpath which had environment specific stuff hard coded into it (and therefore committed to mecurial.) Remember back when I pulled all the passwords and environment specific config out of the config files that lived in the webapp? I couldn't figure out how to do a similar thing with log4j.properties. So, I left it in my classpath (the WAR file.) Today I realized I can tell web.xml to look in /etc/\<appname\>/log4j.properties for the file. Yes, that path is hard coded, but, the /etc/\<appname\>/\<appname\>.properties file is also hard coded in applicationContext.xml. I feel relatively comfortable having just those two places that call out a directory that _has_ to exist before the app can start up. At this point, I can't think of any place in my app that has things that shouldn't be hard-coded in the source, database, or in some arbitrary place. Everything is in /etc/\<appname\>/ * . Feels good, man. Added bonus is I can set up my graylog2 logger with appropriate originHost based on the machine that is running. That means I can filter by machine. Now I'll be able to easily tell what's coming from development, test, production, etc. 

NEATWHEELIES.COM IS AVAILABLE!!! If only I had a reason to buy it.
