
seajs.config({
    base: '/Admins/Template/metronic.3.3.6/js/',
    alias: {
        'avalon': 'vendor/avalon.shim',
        'btm': 'vendor/plug/bootstrap.min',
        'dropdown': 'vendor/plug/bootstrap-hover-dropdown.min',
        'slimscroll': 'vendor/plug/jquery.slimscroll.min',
        'toastr': 'vendor/plug/toastr.min',
        'blockui': 'vendor/plug/jquery.blockui.min',
        'uniform': 'vendor/plug/jquery.uniform.min',
        'switch': 'vendor/plug/bootstrap-switch.min',
        'full': 'vendor/plug/select2.full.min',
        'validate': 'vendor/plug/jquery.validate.min',
        'methods': 'vendor/plug/additional-methods.min',
        'wysihtml5': 'vendor/plug/wysihtml5-0.3.0',
        'bwysihtml5': 'vendor/plug/bootstrap-wysihtml5',
        'markdown': 'vendor/plug/markdown',
        'bmarkdown': 'vendor/plug/bootstrap-markdown',
        'app': 'vendor/plug/app.min',
        'date-picker': 'vendor/plug/bootstrap-datepicker.min',
        'layout': 'vendor/plug/layout.min',
        'sidebar': 'vendor/plug/quick-sidebar.min',
        'bootbox': 'vendor/plug/bootbox.min',
        'counterup': 'vendor/plug/jquery.counterup.min',
        'waypoints': 'vendor/plug/jquery.waypoints.min',
        'fileinput': 'vendor/plug/bootstrap-fileinput',
        'jq': 'vendor/jquery-1.9.1.min',
        'deffl': 'vendor/plug/ajax_upload/assets/js/jquery.fileupload',
        'fl3': 'vendor/plug/ajax_upload/assets/js/jquery.fileupload3',
        'sc': 'vendor/plug/ajax_upload/assets/js/script',
        'trans': 'vendor/plug/ajax_upload/assets/js/jquery.iframe-transport',
        'wid': 'vendor/plug/ajax_upload/assets/js/jquery.ui.widget',
        'knob': 'vendor/plug/ajax_upload/assets/js/jquery.knob',
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

 