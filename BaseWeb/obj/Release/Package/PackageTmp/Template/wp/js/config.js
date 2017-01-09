
seajs.config({
    base: '/template/wp/js',
    alias: {
        'avalon': 'vendor/avalon.shim',
        'jq': 'vendor/jquery',
        'nav': 'module/nav',
        'right': 'module/right',
        'common': 'module/common'
    },
    map: [
          
        [/(.*js\/[^\/\.]*\.(?:js))(?:.*)/, '$1?_=' + new Date().getTime()]
    ],
    preload: [
        this.avalon ? '' : 'avalon',
        'common'
    ]
})

 