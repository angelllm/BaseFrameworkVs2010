require.config({
    paths: {
        jquery: 'jquery.min',
        bootstrap: 'bootstrap',
        app: 'app',
        slimscroll: 'slimscroll/jquery.slimscroll.min',
        plugin: 'app.plugin' 
    },
    map: {
        '*': {
            'css': '/Template/Html/css'
        }
    },
    shim:{
        'bootstrap':["jquery"],
        'app':["jquery"],
        'slimscroll':["jquery"],
        'plugin':["jquery"]
    }
});

require(['jquery', 'bootstrap', 'app', 'slimscroll', 'plugin'],function($,s,m){});


