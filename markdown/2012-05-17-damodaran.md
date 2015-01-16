---
{
    "title": "Damodaran and Trunk Recording",
    "shortTitle": "damodaran",
    "summary": "ramblings of the day",
    "created": "2012-05-17",
    "modified": "2012-05-17",
    "type":"blog",
    "categories": [
    ],
    "tags": [
        "finance", "music", "tech","markov"
    ]
}
---
Per the [damodaran finance class](http://pages.stern.nyu.edu/~adamodar/)
i'm listening to, the **risk free rate** basically boils down to the
expected rate of inflation in the currency in which you are working.
(This is the sound of lightbulbs going off in my head.) Rule of thumb -
Use the 10 year zero coupon rate for the risk free rate if the bond is
rated AAA. If it is not rated AAA, then take the published rate and
subtract off any default risk. You do this because often you will add in
default risk at a different point in your analysis. You do not want to
double count.

For me, this is kind of huge. I always thought of the risk free rate as
the minimum return you could possibly expect with zero risk of default.
Which, sure, that's true, but understanding that the market essentially
drives that number to track expected inflation of the currency in which
you are investing helps me to better understand the fact that different
countries have wildly different risk free rates. I never knew why you
wouldn't just shift currencies around to get the best deal.. well, i
forgot to think about inflation.

**update 20120519** - Heh, in lecture 6 he said that the risk free rate
is really inflation + macro market growth. I guess that makes sense,
too. Still learning

The difference between html's **bold** and **strong** tags and *italic*
and *emphasis* tags eludes me.

Let's talk about **hidden markov models.** No, really, someone teach me
because I ran out of copy paper this week and wound up using all the
papers I printed out that I hoped would help me understand them as
printer paper. Dammit.

I love **John Steinbeck's** letter that is on [letters of
note](http://www.lettersofnote.com/2012/05/it-has-never-got-easier.html)
today:

> "If there is a magic in story writing, and I am convinced that there
> is, no one has ever been able to reduce it to a recipe that can be
> passed from one person to another. The formula seems to lie solely in
> the aching urge of the writer to convey something he feels important
> to the reader. If the writer has that urge, he may sometimes but by no
> means always find the way to do it."

I know I'm no writer, but everything on this site and armp.it is from me
getting this compulsive need (out of nowhere, typically) to put a
certain feeling into words and most of the time it doesn't work. Or,
rather, I Get It.

I'm putting together a **comment service** for the app i'm building. I
think my implementation is interesting. Here's how i'm doing it.
Everything in my system uses a UUID as its ID or primary key.
Everything, including each comment. Each comment stores the UUID of the
item to which it is attached, the comment text, timestamp, etc. All
comments are shoved into this service so that when something says, "I
want to display any comments associated with me." All it has to do is
pass its UUID to the service which returns a (JSON) list of comments.

Easy peeeezy

The challenge here is how do you go from Comment to the Item. Well,
since I don't store the Item's location we fall back to a searching
pattern. Every item is indexed anyway, so we just hit the search service
with the UUID and get the item back.

This is completely decoupled. It fails if you delete an Item (which, of
course, you NEVER delete anything. So, that's not a problem.) Or, if you
need to move the comments. Not sure why you would do that, though.

Finally, you can comment on comments. So, your comments can have
comments that comment about the comments.

![](media/trunkRecording.jpg)

I'm recording guitar parts in my car again while I wait for band
practice to start. YOU CAN RECORD DECENT SOUNDING ALBUMS WHILE SITTING
IN YOUR CAR. I love the present.