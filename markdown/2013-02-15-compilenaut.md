---
{
    "title": "Compilenaut",
    "shortTitle": "Compilenaut",
    "summary": "is that a word?",
    "created": "2013-02-15",
    "modified": "2013-02-15",
    "type":"blog",
    "categories": [
    ],
    "tags": [
    ]
}
---
If your csv file starts with the string, "ID," Excel thinks it should be a SYLK file and barfs a bunch of warning dialogs <http://support.microsoft.com/kb/323626>

I'm setting aside my hatred for funk and fusion so I can learn about [The Meters](http://en.wikipedia.org/wiki/The_Meters) today. They're a 70's funk band from New Orleans. I get it, I think. There was a 5 minute bass solo which included a minute of wha wha and a few moments where he ignored the rest of the band (it is a polyrhythm! applaud goddammit!) I guess they aren't fusion at all, certainly funky, though.

**locking down my workflow for editing this site** 

Last week, (2/8/2013) I was complaining a bit about maintaining this site in markdown. Specifically, dealing with line breaks while writing and not having a good way to spellcheck. Thanks to a friend's tweet, I learned that VIM can deal with soft wrapped lines pretty well. Check it <http://alols.github.com/2012/11/07/writing-prose-with-vim/>. The first thing I did is convert this page's source (markdown) to soft wrapped lines. Then I realized I don't use VI. I happen to be using eclipse as a text editor because it is always open and I like organizing the files in a "project." Today I switched from the default editor to WikiTextEditor. Not having to manually manage line breaks makes typing and editing a breeze. In fact, it makes me want to type more. Ruh-Oh! 

I converted the line breaks by hand. I might (eventually) have to run a script on all the pages if editing in this mode turns out to be better. So far, it is WAY better. I love it. If you're into emacs, i just found this <http://blog.avarthrel.org/blog/2011/05/lets-just-use-emacs.html>. That brings up some interesting ideas, like splitting your editor to work on 2 sections of the same doc at once (eclipse does this) and having multiple files open at once (also, available in eclipse). I'm still missing a decent spell check, though. Let me try to fix that.

Fixed it!. First, download one of Kevin's word lists from here <http://wordlist.sourceforge.net/>. Install it in eclipse as a user dictionary (Preferences-\>editors-\>text editors-\>spelling). I used Kevin's scowl list by concatenating all english and american words into a single text file. I saved it to /jordan/notes/allWordsForSpelling.txt and pointed the eclipse user specified spelling list there..

There are a ton of words in there and it has helped tremendously. I didn't think I could get the spellcheck to suggest correct spellings until I noticed wikiText editor has the "quick fix" option. Hover over the word and hit cmd-1. It gives suggestions. Rad!  A few other ideas if you're using eclipse. Want a word count? Do a file search, select the file, enable regex and search for \w+ Sure, it's clunky, but it works.

I spent a few minutes looking at org-mode, but I don't have the energy to learn it. Immabe happy with a smattering of markdown files and my new, soft-break editor.

Have I mentioned how awesome pandocs and make are for generating the html and shipping the contents off to S3? If not, have a look at the [github repo](https://github.com/jordan52/trickykegstands) where all this BS lives and check out that make file. It isn't anything fancy, but it saves me a lot of time. I can publish with one command.

Finally, I set the font in the text editor to be something a little more readable. Now I'm writing comfortably inside a IDE. I have like no excuses left for not writing armp.it.

**done**

Google returns zero results for Compilenaut. Let's hope from now on it will return at least one.

Remind me to go here when they open this spring - <http://www.strangedonuts.com/>
