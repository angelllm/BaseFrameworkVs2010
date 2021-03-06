﻿define(function (require, exports, module) {
    //require("wid")
    require("knob")
    require("trans")
    require("deffl")
    
    
    

    var vm = avalon.define({
        $id: 'box',
        init: function () {
            //头部菜单高亮
            $(".classic-menu-dropdown:eq(2)").addClass("active").find("a[href='/admin/webupload/']").parent().addClass("active")
            avalon.ready(function () {

                var ul = $('#upload ul')

                $('#upload').fileupload({
                    dropZone: $('#drop'),
                    always: function (e, data) {
                        //vm.filepath = data.result
                        //vm.isupload = true
                    }
                    ,
                    add: function (e, data) {

                        var tpl = $('<li class="working"><input type="text" value="0" data-width="48" data-height="48"' +
                            ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span></span></li>');

                        // Append the file name and file size
                        tpl.find('p').text(data.files[0].name)
                                     .append('<i>' + formatFileSize(data.files[0].size) + '</i>');

                        // Add the HTML to the UL element
                        data.context = tpl.appendTo(ul);

                        // Initialize the knob plugin
                        tpl.find('input').knob();

                        // Listen for clicks on the cancel icon
                        tpl.find('span').click(function () {

                            if (tpl.hasClass('working')) {
                                jqXHR.abort();
                            }

                            tpl.fadeOut(function () {
                                tpl.remove();
                            });

                        });

                        // Automatically upload the file once it is added to the queue
                        var jqXHR = data.submit();
                    },

                    progress: function (e, data) {

                        // Calculate the completion percentage of the upload
                        var progress = parseInt(data.loaded / data.total * 100, 10);

                        // Update the hidden input field and trigger a change
                        // so that the jQuery knob plugin knows to update the dial
                        data.context.find('input').val(progress).change();

                        if (progress == 100) {
                            data.context.removeClass('working');
                            //console.log(data);
                            //$.each(data, function (idx, itss) {
                                //console.log(itss);
                            //});
                            //window.location.reload();
                        }
                    },

                    fail: function (e, data) {
                        // Something has gone wrong!
                        data.context.addClass('error');
                    }
        
                })
                $('#drop a').click(function () {
                    $(this).parent().find('input').click();
                });
            })
        }
    })

    vm.init()

    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });

    function formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }

        return (bytes / 1000).toFixed(2) + ' KB';
    }
})