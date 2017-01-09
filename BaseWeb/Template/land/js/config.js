
seajs.config({
    base: '/Template/land/js', 
    alias: {
        'avalon': 'vendor/avalon.shim',
        'react': 'vendor/plug/react.min',
        'pjax': 'vendor/plug/jquery.pjax',
        'jq': 'vendor/jquery-1.9.1.min',
        'music': 'module/music/music',
        'rain':'vendor/plug/rainyday'
    },
    plugins: ['shim'],
    map:[
        //防止js文件夹下的文件被缓存
        [/(.*js\/[^\/\.]*\.(?:js))(?:.*)/, '$1?_=' + new Date().getTime()]
    ],
    preload: [
        this.avalon ? '' : 'avalon',
        this.jQuery ? '' : 'jq'
    ]
})  

 