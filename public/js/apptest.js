;(function() {
    "use strict";

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
                main.innerHTML = views[which] = html;
                decloak();
            });
        };
    };

    (function(r) {
        r.add('',      loadView('main'));
        r.add('page1', loadView('page1'));
        r.add('page2', loadView('page2'));
        r.add('page3', loadView('page3'));

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