;(function() {
    "use strict";

    var question = _.template('<b>name:</b> <%= name %> <b>type:</b> <%= type %> <b>exits:</b> <% _.forEach(exits, function(exit) { %><a href="#/<%- exit %>"><%- exit %></a><% }); %>');

    var lower_back = {
        _id:'lower_back',
        type: 'doineedthis',
        title: 'lower back',
        description: 'total description here',
        reference: 'http://www.guideline.gov/content.aspx?id=47586&search=odg',
        questions: [
            {
                name:'first_visit_type',
                type:'router',
                description: 'select specialist type and initial result ',
                specialist_type:['MD/DO','ORTHO','CHIRO','PAIN'],
                exits: ['first_without_radioplathy','first_with_radioplathy']
            },
            {
                name:'first_without_radioplathy',
                type:'router',
                description: 'firstwithout ',
                specialist_type:['MD/DO','ORTHO','CHIRO','PAIN'],
                exits: ['end']
            },
            {
                name:'first_with_radioplathy',
                type:'router',
                description: 'first with ',
                specialist_type:['MD/DO','ORTHO','CHIRO','PAIN'],
                exits: ['end']
            },
            {
                name:'end',
                type:'exit',
                description: 'Thank you ',
                exits: []
            }
        ]
    };

    var main = document.getElementById('main');
    var views = {};

    var decloak = function decloak() {
        document.body.removeAttribute('bc-cloak');
        decloak = function decloak() {};
    };

    var loadView = function loadView(which) {
        var deferred = reqwest({url: '/view/partial/' + which + '.html'});

        return function() {
            deferred.then(function(html) {
                if(html){
                    views[which] = html;
                }
                main.innerHTML = views[which];
                decloak();
            });
        };
    };

    var loadQuestion = function loadQuestion(n){
        return function() {
            main.innerHTML = question(n);
            decloak();
        };
    };

    (function(r) {
        r.add('',      loadView('main'));
        r.add('page1', loadView('page1'));
        r.add('page2', loadView('page2'));
        r.add('page3', loadView('page3'));

        _.forEach(lower_back.questions, function(n) {
            console.log('hello '+ n.name);
            r.add(n.name, loadQuestion(n));
        });


        var update = function update() {
            var hash = location.hash || '#';
            r.run(hash.substr(1));
        };

        window.addEventListener('hashchange', update);

        update();
    })(new Rlite);

    directive('bc-directive', function(el) {
        el.innerHTML = '<div style="color: red;">Hello from a cornerjs directive!</div>';
    });

    directive('bc-thing', function(el, opts) {
        el.innerHTML = 'Thing Text, styled according to your model';

        if(opts.color)
            el.style.color = opts.color;

        if(opts.weight)
            el.style.fontWeight = opts.weight;
    });
})();