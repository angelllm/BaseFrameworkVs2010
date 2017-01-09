
seajs.config({
    base: './js',
    alias: {
        'avalon': 'vendor/avalon.shim',
        'share': 'vendor/jquery.wshare',
        'jq': 'vendor/jquery-1.4.4.min',
        'full': 'vendor/Fullscreen',
        'classie': 'vendor/classie',
        'mode': 'vendor/modernizr.custom',
        'notify': 'vendor/notificationFx',
        'spark': 'vendor/sparkleh',
        'listcontrl': 'vendor/music/jplayer.playlist.min',
        'jplayer': 'vendor/music/jquery.jplayer.min',
        'playlist': 'vendor/music/playlist',
        'textillate': 'vendor/jquery.textillate',
        'lettering': 'vendor/jquery.lettering',
        'dangao': 'vendor/dangao',
        'dg-css': '/dangao.css',
        'ns-css': '/css/ns-style-growl.css',
        'animate': '/css/animate.css'
        
    },
    paths: {
        'bdmap': 'http://api.map.baidu.com/api?v=1.2'
    },
    map:[
        //防止js文件夹下的文件被缓存
         [ /^(.*\.(?:css|js))(.*)$/i, '$1?'+ new Date().getTime()] 
    ],
    preload: [
        this.avalon ? '' : 'avalon',
        "jq"
        //"dangao"
        
    ]
})  

 