---
{
    "title": "Kelly Criterion",
    "shortTitle": "kelly criterion",
    "summary": "a quote!",
    "created": "2012-05-12",
    "modified": "2012-05-12",
    "type":"blog",
    "categories": [
    ],
    "tags": [
    ]
}
---
Let's talk about the **kelly criterion**. **The Kelly Ratio** is how
much of your bank roll you should bet given a probability of winning,
losing, and your edge over the house. This type of strategy can be
applied in many different domains, obviously for gaming, sort of for
investing but why can't it be applied when estimating other finite
resources? Could your "bankroll" represent the "amount of time you can
spend" (the finite resource)? Not sure that works because I haven't
thought it through, just thinking as i type. I digress. to use the kelly
criterion, we have to calculate the player's edge. Say you're playing a
game with a dealer where odds are 6/5 and payout is 7/6, or, rather,
odds of losing are 1.2 and payout is 1.167. Let's break that down. Say
you play the game 11 times. you'll win 5 times and lose 6. Bet \$12 each
time. You'll wind up with \$12x(7/6)=\$14 each time you win and \$0 when
you lose. When you play 11 times, you'll win 5 times giving you
5x\$14=\$70. you spent a total of \$12x11=\$132. you lost 6 times which
is 6x\$12=\$72. In other words, in 11 plays you lost \$2. edge is
loss/total so that's \$2/\$132 = 0.015 which means the dealer's edge is
1.5%. Your edge is -1.5%. Don't make the bet. Instead, try being on the
other side of the bet (become the dealer.)

We're trying to figure out the optimal fraction of our total wealth
(bankroll) to bet on each game that will maximize our long term
winnings, ignoring volatility but assuring we always have enough \$ to
bet on the next game (don't allow ruin). The fraction is ((odds received
on win)\*probability of winning - probability of losing)/(odds received
on a win). lets bet on a coin toss where the dealer pays us 100/99
(1.01) on each win. In english, that means for every dollar you bet,
they'll give you your dollar back plus one penny if you win. pWin = 0.5,
pLose = 0.5 so (1.01\*0.5-0.5)/1.01=0.005 = 0.5% That means we should
bet 0.5% of our bankroll on each toss. Given those odds and payouts,
that makes sense because we get so little for winning. What if we played
the same game but the dealer payed us 2/1 for a win? In english, they'd
pay you \$2 for every dollar you bet. Bet \$1, you keep your \$1 and
they hand you \$2 for a total of \$3. Common sense says you'd probably
want to bet a lot more of your bankroll at that point. Let's do the
math. 2\*0.5-0.5/2 = 0.25 which means we'd want to bet 25% of our
bankroll on each play of the game. Doing so minimizes the chance of ruin
and maximizes our total winnings in the long run.

**Let's talk about roulette.** put \$1 on red which pays even money, or
1/1 or 100%. there are 18 red numbers and 20 non red. So, probability of
winning is 18/(18+20) = 0.474. plug that into our formula to get
1\*0.474-0.526/0.474 = -0.1097... what's that negative number? That
means you should take the other side of the bet, or rather, bet AGAINST
red using 10.97% of your bankroll. But, there's no betting against red,
so you're better off moving along. The casino will always win. (this
paragraph is copied from the wikipedia article on the kelly criterion.
Go there for more fun information.)

Thinking about the best way to structure my **Selenium 2** tests. Need
to retrieve the base url from a properties file, of course. probably
should have some support inside the application that lets the test avoid
certain, untestable-by-selenium features such as email confirmation
codes. Maybe the test could log in as admin for a second to grab a copy
of the confirm URL so it can be used in subsequent tests. In other
words, the app has to support certain features to make automated testing
possible. no big deal, but yet another thing I didn't foresee.

Watching shark tank I couldn't off the top of my head how the sharks
were **valuing a company** based on the founder's cash request and the
equity offered... I was over thinking it, of course, but here's some
things I learned. Typically, a VC wants a 5-10x return on the
investment. If I'm a VC and I invest \$25k for 25% of a company and
expect a 10% return then I want to see a check for \$250k when the
company exits... That can only happen if the company sells for \$1M. If
the company sells for \$500k then I get a 5x's return so, as a VC, i
should still be happy. (rule of thumb, a company's valuation is
sometimes 2x's revenue) (Fred Wilson says 1/3 sell for 5-10x's return.
1/3 sell for 1-2x's return and 1/3 fail (0x's return). Since VC's get
any leftover cash first, the founders sort of have about a 1/3rd shot of
making money, see the paragraph after the next for some discussion.)

But, that doesn't jive with the numbers they throw around on shark
tank.. That's because they're not thinking of their return at that time.
They're just valuing the current price of the company based on what the
founder says. So, if the founder says I want 100k for 25%, the shark
tank guys call it a \$400k company.

Back to the "founders have a 1/3rd shot to make any money at all" idea.
This may or may not be a copy/paste from Fred Wilson's blog. if it is,
well, then it is, if it is my words, then great: "A VC is negotiating
how much of the upside they'll be in the 1/3 of deals that produce
gains. Their deals provide as much downside protection as possible. A VC
deal is sort of a loan plus an option where the option part is in the
money fully 1/3 of the time and partially about 1/2. loan is repaid
fully 2/3 of the time and partially 1/3 of the time."

With that said, I had an idea a few weeks ago. **I propose a monte carlo
approach to predict project viability and using the results of that
calculation as inputs to a binomial pricing model that will let a
founder choose among many projects (ideas) to maximize the likelihood of
a positive exit.** Here's the beginning of an abstract I wrote that day:

> "This paper introduces a system for managing uncertain data when
> predicting market results using a binomial options pricing model to
> predict exit valuation across multiple projects. This system lets one
> choose the best projects based on predicted returns using a monte
> carlo approach to predict project viability."