/*
 * Copyright (c) wd1998.com, All Rights Reserved
 */

/**
 * @fileoverview 修改产品JS
 *
 * @author liuxey
 */
$(function(){

    window.onbeforeunload = function () {
        return "如果离开此页，所有已设置的数据将全部丢弃?";
    }

    var editor = UE.getEditor('desc');

    // 属性选择控件
    for (var index in cateParamList) {
        var cateParamId = cateParamList[index];
        $("#cateParam" + cateParamId ).on("click", function(){
            var obj = $(this);
            var _cateParamId = obj.attr("id").replace('cateParam','');
            WD.ui.inputSelect({
                data: paramDefaultMap[_cateParamId + ""],
                showId: obj.attr("id"),
                hiddenId: obj.attr("id"),
                onSelect: function(_id, _value){
                    obj.val(_value);
                }
            })
        })
    }

    // 标签选择控件
    $("#tag").on("click", function(){
        WD.ui.inputSelect({
            data: tagList,
            showId: "tag",
            hiddenId: "tag",
            onSelect: function(_id, _value) {
                var currValue = $("#tag").val();
                // 如果已有
                if (currValue.indexOf(_value) != -1) {
                    return false;

                    // 没有则添加
                } else {
                    if ($.trim(currValue) == "") {
                        $("#tag").val(_value);

                    } else {
                        $("#tag").val(currValue + "，" + _value);
                    }

                    return false;
                }
            }
        })
    });

    // 添加阶梯价
    $("#ladderPriceAddBtn").on("click", function(){
        if ($("#priceMode1 ul").length >= 3) {
            alert("最多只能添加3个阶梯价");
            return;
        }
        var _count = ++ladderPriceCount;
        var _template = '';
        _template += '<ul id="ladderPriceList'+_count+'">';
        _template += '<li class="show">';
        _template += '<input type="text" name="ladderPriceStartCount'+_count+'" size="10" />';
        _template += '<span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>';
        _template += '<input type="text" name="ladderPriceEndCount'+_count+'" size="10"/>';
        _template += '<span>&nbsp;&nbsp;件&nbsp;&nbsp;</span>';
        _template += '<input type="text" name="ladderPrice'+_count+'" size="10"/>';
        _template += '<span>&nbsp;&nbsp;元&nbsp;&nbsp;</span>';
        _template += '<span class="product_price_old"';
        if (!$("input[type='checkbox'][name='specialFlag']").prop("checked")) {
            _template += ' style="display:none;"';
        }
        _template += '>原价：<input type="text" name="ladderPriceOld'+_count+'" size="10"/>元</span>';
        _template += '<img class="img-add" src="'+imgPath+'/minus.png" style="cursor:pointer;" onclick="$(\'#ladderPriceList'+_count+'\').remove();"/>';
        _template += '</li>';
        _template += '</ul>';

        $("#priceMode1").append(_template);
    });

    // 特价选定
    $("input[type='checkbox'][name='specialFlag']").on("click", function(){
        if ($("input[type='checkbox'][name='specialFlag']").prop("checked")) {
            $(".product_price_old").show();
        }else {
            $(".product_price_old").hide();
        }
    });

    // 选择价格类型
    $(":input[type='radio'][name='priceMode']").on("click", function() {
        var priceMode = $(":input[type='radio'][name='priceMode']:checked").val();
        if (priceMode == "1") {
            $("#priceMode1").hide();
            $("#priceMode2").show();
        } else {
            $("#priceMode2").hide();
            $("#priceMode1").show();
        }
    })

    // 收费方式
    $("input[name=chargeMode]").on("change", function(){
        doChargeMode();
    });
    function doChargeMode() {
        var chargeMode = $("input[name=chargeMode]:checked").val();
        $("#chargeMode_label_2").hide();
        $("#chargeMode_label_3").hide();
        if (parseInt(chargeMode) > 1) {
            $("#chargeMode_label_" + chargeMode).show();
        }
    }


    // 加载地区Func
    function loadLocation(parentId, callBack) {
        $.ajax({
            url: "location.json",
            dataType:"json",
            type:"post",
            data :{
                "parentId" : parentId
            },
            success: callBack
        });
    }

    // 加载城市Func
    function loadCity() {
        var provinceId = $("#province").val();
        loadLocation(provinceId, function(res){
            $("#city option").remove();

            for(var index in res) {
                var location = res[index];
                if (city == location.id) {
                    $("#city").append('<option value="'+location.id+'" selected="selected" >'+location.name+'</option>');
                } else {
                    $("#city").append('<option value="'+location.id+'">'+location.name+'</option>');
                }
            }
        })
    };

    // 载入省
    loadLocation("0", function(res) {
        for(var index in res) {
            var location = res[index];
            if (province == location.id) {
                $("#province").append('<option value="'+location.id+'" selected="selected" >'+location.name+'</option>');
            } else {
                $("#province").append('<option value="'+location.id+'">'+location.name+'</option>');
            }
        }
        loadCity();
    });

    // 设置省的change事件
    $("#province").on("change", loadCity);



    // 图片空间 上传控件
    var pictureMode = 1; // 图片模式，1：选择主图，2：设定颜色SKU图片，3：插入描述图片
    var fileList = [];
    $("#upload_file").uploadify({
        "id" : "upload_file",
        "swf" : js_path + "/uploadify/uploadify.swf",
        "uploader" : "../file/upload.json",
        "buttonText" : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文件上传",
        "buttonClass" : "uplodBut",
        "height" : 25,
        "width" : 80,
        "fileTypeExts" : "*.jpg;*.png;*.gif",
        "fileObjName" : "upload_file",
        "fileSizeLimit" : "8192KB",
        // "auto" : false,
        // 上传成功
        onSelect : function(file) {
            // 如果是第三种模式，就要加一个队列，进行排序插入
            if (pictureMode == 3) {
                fileList.push({
                    "name" : file.name,
                    "status" : false
                })
            }
        },
        onUploadSuccess : function(file, data, flag) {
            if (lastPictureSpaceFlag) {
                var files = $.parseJSON(data).fileList;
                // 上传成功，处理图片
                handlerImg(files);
            } else {
                alert("无图片剩余空间");
                return false;
            }
        }
    });


    // 图片空间 列表控件
    $("#wd_picture_panel_switch li").on("click", function(){
        var type = $(this).attr("type");
        if (type == "2" && !pictureLoadFlag) {

            $("#wd_picture_folder_list li[folderid=0]").click();
            pictureLoadFlag = true;
        }
    })

    var lastPictureSpaceFlag = true;
    // 载入用户的文件夹
    $.ajax({
        url: "../file/folder.json",
        dataType: "json",
        type: "get",
        cache: false,
        data : {
            userId : userId
        },
        success: function(data) {
            var folderList = data.folderList;
            var maxSize = data.maxSize;
            var currSize = 0; // 当前大小
            var last = maxSize; // 剩余大小

            $("#wd_picture_folder_list").html("");
            $("#wd_picture_folder_list").append('<li folderid="0">· 所有图片</li>');
            for (var index in folderList) {
                var folder = folderList[index];
                $("#wd_picture_folder_list").append('<li folderid="'+folder.id+'" foldername="'+folder.name+'">· '+folder.name+'</li>');

                if (/^\d+$/.test(folder.size)) {
                    currSize += +folder.size;
                }
            }
            last = maxSize - currSize;
            if (last <= 0) {
                lastPictureSpaceFlag = false;
                last = 0;
            }
            $("#curr_size").html(WD.prod.calcSize(currSize));
            $("#last_size").html(WD.prod.calcSize(maxSize - currSize));

            $("#wd_picture_folder_list li").css("cursor", "pointer");

            $("#wd_picture_folder_list li").on("click", function(){
                $("#wd_picture_folder_list li").removeClass("clickPicNav");
                $(this).addClass("clickPicNav");

                currentFolderId = $(this).attr("folderid");
                currentFolderName = $(this).attr("foldername");

                currentPage = 1;
                loadFolderPicture(currentFolderId);
            });
        }
    })

    var pictureLoadFlag = false;
    var currentFolderId;
    var currentFolderName;
    var currentPage = 1;
    var pageSize = 12;
    var currentPagePictureList;
    var totalCount;
    var totalPage;

    // 载入分类下的图片
    function loadFolderPicture(folderId) {
        currentFolderId = folderId;
        $.ajax({
            url: "../file/pictures.json",
            dataType : "json",
            type: "get",
            cache: false,
            data : {
                folderId: folderId,
                page: currentPage,
                pageSize: pageSize,
                userId : userId
            },
            success : function(res) {
                var data = res.pictureList;
                currentPagePictureList = data;
                $("#wd_picture_folder_imgs1").html("");
                $("#wd_picture_folder_imgs2").html("");

                var imgs1Length = data.length <= 6 ? data.length : 6;

                for (var i = 0; i< imgs1Length; i++) {
                    var file = data[i];
                    $("#wd_picture_folder_imgs1").append('<li fileid="'+file.file_id+'" ><img src="'+upload_path + file.path +'" style="cursor: pointer;" title="'+file.file_name+'" /></li>');
                }

                if (data.length > 6) {
                    for (var i = 6; i< data.length; i++) {
                        var file = data[i];
                        $("#wd_picture_folder_imgs2").append('<li fileid="'+file.file_id+'" ><img src="'+upload_path + file.path +'" style="cursor: pointer;" title="'+file.file_name+'" /></li>');
                    }
                }

                // 绑定图片空间图片的点击事件
                $("#wd_picture_folder_imgs1 li").on("click", function(){
                    var fileId = $(this).attr("fileid");
                    for (var index in currentPagePictureList) {
                        var _file = currentPagePictureList[index];
                        if (_file.file_id == fileId) {

                            handlerImg([{
                                id: _file.file_id,
                                name: _file.file_name,
                                path: _file.path
                            }]);
                            break;
                        }
                    }
                });
                // 不忘了还有一行
                $("#wd_picture_folder_imgs2 li").on("click", function(){
                    var fileId = $(this).attr("fileid");
                    for (var index in currentPagePictureList) {
                        var _file = currentPagePictureList[index];
                        if (_file.file_id == fileId) {

                            handlerImg([{
                                id: _file.file_id,
                                name: _file.file_name,
                                path: _file.path
                            }]);
                            break;
                        }
                    }
                });

                // 分页功能
                $("#wd_picture_folder_paging").html("");
                totalCount = res.totalCount;
                totalPage = parseInt((totalCount + pageSize - 1) / pageSize);
                if (totalPage == 0) {
                    totalPage = 1;
                }

                var _paging = '';
                _paging += '<span class="PageNumSpan">'+currentPage+'/'+totalPage+'</span>';
                _paging += '<div class="up_page" id="wd_picture_folder_page_upbtn">上一页</div>';
                _paging += '<div class="down_page" id="wd_picture_folder_page_downbtn">下一页</div>';
                _paging += '&nbsp;&nbsp;到第&nbsp;&nbsp;<input type="text" class="customPage" id="wd_picture_folder_page_text" value="'+currentPage+'"/>&nbsp;&nbsp;页';
                _paging += '<input type="button" class="pageSub" value="确定" id="wd_picture_folder_page_btn" />';

                $("#wd_picture_folder_paging").html(_paging);

                $("#wd_picture_folder_page_upbtn").on("click", function(){
                    goPicturePage(currentFolderId, currentPage - 1) ;
                })
                $("#wd_picture_folder_page_downbtn").on("click", function(){
                    goPicturePage(currentFolderId, currentPage + 1) ;
                })
                $("#wd_picture_folder_page_btn").on("click", function(){
                    var _page = $("#wd_picture_folder_page_text").val();
                    if (!/^\d+$/.test(_page)) {
                        alert("请输入正确的页数");
                        return;
                    }
                    if (+_page > totalPage || +_page <=0) {
                        alert("页数超出范围");
                        return;
                    }
                    goPicturePage(currentFolderId, _page) ;
                })
            }
        })
    }

    // 图片空间分页
    function goPicturePage(folderId, page) {
        // 判断page
        if (page == currentPage){
            //return;
        } else if (page > totalPage) {
            return;
        } else if (page <= 0) {
            return ;
        }

        currentPage = page;
        loadFolderPicture(folderId);
    }

    // 切换图片控件模式
    switchPicturePanelMode = function (_mode, option){

        if (_mode == 1) {
            $("#wd_picture_panel").css("position", "static");
            $("#wd_picture_mainimg").show();
            $("#wd_picture_panel_tip2").show();
            $("#wd_picture_panel_shadow").hide();
            $("#switchto1btn").hide();
            $("#mode3_modal").hide();
            pictureMode = _mode;
            fileList = [];

        } else if (_mode == 2) {
            $("#wd_picture_panel").css("position", "absolute").css("left", option.left).css("top", option.top);
            $("#wd_picture_mainimg").hide();
            $("#wd_picture_panel_tip2").hide();
            $("#wd_picture_panel_shadow").show();
            $("#switchto1btn").show();
            $("#mode3_modal").hide();
            pictureMode = _mode;
            fileList = [];

        } else if (_mode == 3) {
            // 如果已经是3， 则恢复
            if (pictureMode == 3) {
                switchPicturePanelMode(1);

                // 否则切换为3
            }else {
                $("#wd_picture_panel").css("position", "absolute");
                $("#wd_picture_panel_shadow").show();
                var offset = $("#wd_prod_desc").offset();
                $("#wd_picture_panel").css("left", offset.left).css("top", offset.top + $("#wd_prod_desc").outerHeight() + 25);
                $("#wd_picture_mainimg").hide();
                $("#wd_picture_panel_tip2").hide();
                $("#switchto1btn").show();
                $("#mode3_modal").show();
                pictureMode = _mode;
            }
        }
    };

    // 关闭图片控件按钮
    $("#switchto1btn").on("click", function(){
        switchPicturePanelMode(1);
    })
    $("#switchto1btn").on("mouseover", function(){
        $(this).css("color", "red");
    }).on("mouseout", function(){
        $(this).css("color", "#000000");
    })

    // 根据当前的模式，选择图片的处理方式
    function handlerImg(files) {

        // 插入主图
        if (pictureMode == 1) {
            insertImg(files);

            // 设置颜色SKU图片
        } else if (pictureMode == 2) {
            setColorSkuPicture(files);

            // 编辑器插入图片
        } else if (pictureMode == 3) {
            editorInsert(files);
        }

    }
    $("#upload_file-queue").hide();

    // 主图列表
    var imgList = [];

    // 清除图片
    $(".product_img_clear").on("click", function(){
        var imgId = $(this).attr("imgid");
        imgList[(+imgId) - 1] = {flag : false};
        if (imgId == "1") {
            $("#product_img_" + imgId + " img").attr('src',imgPath + '/add_product_05.jpg');
        }else {
            $("#product_img_" + imgId + " img").attr('src',imgPath + '/add_product_11.jpg');
        }
    }).on("mouseover", function(){
        $(this).css("font-weight", "bold");
    }).on("mouseout", function(){
        $(this).css("font-weight", "normal");
    });

    //插入图片
    function insertImg(files) {
        for (var i=0;i<files.length;i++) {
            var file = files[i];
            var setFlag = false;
            for (var j=0;j<6;j++) {
                var img = imgList[j];
                if (!img) {
                    img = {};
                }
                imgList[j] = img;

                // 未选择
                if (!img.flag || img.flag == false) {
                    img.flag = true;

                    img.data = {
                        id : file.id,
                        name : file.name,
                        path : file.path
                    }
                    $("#product_img_" + (j+1) + " img").attr('src',upload_path + img.data.path);
                    break;
                }
            }

            // 没坑了
            if (!setFlag) {
                break;
            }
        }
    }

    $("#product_img_list li").on("mouseover", function() {
        $(this).addClass("clickPicOload");
    }).on("mouseout", function(){
        $(this).removeClass("clickPicOload");
    })


    // SKU
    // 颜色全选
    $("#selectAllProductColorSku").on("click", function(){
        if($(this).prop("checked")) {
            $("input[name=productColorSku]").prop("checked", true);
        }else {
            $("input[name=productColorSku]").prop("checked", false);
        }

        // 更新SKU列表
        updateProductSkuList();
        // 更新颜色列表
        updateColorList();
    })
    // 颜色点击编辑
//    $(".productColorSkuSpan").on("click", function(){
//        var cateSkuId = $(this).attr("skuId");
//        $("#productColorSkuName" + cateSkuId).show();
//
//        $("#productColorSkuName" + cateSkuId).on("blur", function(){
//            // 更新SKU列表
//            updateProductSkuList();
//            // 更新颜色列表
//            updateColorList();
//        })
//    })
    // 尺码点击编辑
//    $(".productSizeSkuSpan").on("click", function(){
//        var cateSkuId = $(this).attr("skuId");
//        $("#productSizeSkuName" + cateSkuId).show();
//
//        $("#productSizeSkuName" + cateSkuId).on("blur", function(){
//            // 更新SKU列表
//            updateProductSkuList();
//        })
//    })

    // 更新产品SKU列表项 三连Func
    // 获取所有已选颜色SKU
    function getColorSku() {
        var cateColorSkuList = []
        for (var index in colorSkuIdList) {
            var skuId = colorSkuIdList[index];
            var value = $("#productColorSkuName" + skuId).val();
            var colorClass = $("#productColorSkuName" + skuId).attr("colorClass");

            if ($.trim(value) == "") {
                value = $(".productColorSkuSpan[skuId="+skuId+"]").html();
            }

            // 如果选择了
            if ($("input[name=productColorSku][skuId="+skuId+"]").prop("checked")) {
                cateColorSkuList.push({
                    skuId:skuId,
                    value:value,
                    colorClass:colorClass
                });
            }
        }

        return cateColorSkuList;
    }
    // 获取所有已选分类SKU
    function getSizeSku() {
        var cateSizeSkuList = []
        for (var index in sizeSkuIdList) {
            var skuId = sizeSkuIdList[index];
            var value = $("#productSizeSkuName" + skuId).val();

            if ($.trim(value) == "") {
                value = $(".productSizeSkuSpan[skuId="+skuId+"]").html();
            }

            // 如果选择了
            if ($("input[name=productSizeSku][skuId="+skuId+"]").prop("checked")) {
                cateSizeSkuList.push({
                    skuId:skuId,
                    value:value
                });
            }
        }

        return cateSizeSkuList;
    }
    // 更新颜色图片列表
    function updateColorList() {
        if (!updateColorFlag) {
            updateColorFlag = true;

            // 延迟触发
            setTimeout(function(){

                // 缓存切换之前的状态；
                $(".wd_color_sku_picture").each(function(){
                    colorTableCache[$(this).attr("id")] = {
                        name : $(this).html(),
                        id : $(this).attr("fileid"),
                        path : $(this).attr("filepath")
                    };
                })

                var cateColorSkuList = getColorSku();
                var cateSizeSkuList = getSizeSku();

                // 更新颜色 表
                var colorSkuList = getColorSku();
                var _tbody = "";
                for (var index in colorSkuList) {
                    var colorSku = colorSkuList[index];
                    _tbody += '<tr skuId="'+colorSku.skuId+'">';
                    _tbody += '<td><span class="'+colorSku.colorClass+'">'+colorSku.value+'</span></td>';
                    _tbody += '<td><input type="button" class="uplodBut" value="设定图片" id="colurSkuPictureBtn_'+colorSku.skuId+'" skuId="' + colorSku.skuId + '"/>';
                    var _id = !!colorTableCache["colurSkuPictureDesc_" + colorSku.skuId] ? colorTableCache["colurSkuPictureDesc_" + colorSku.skuId].id : "";
                    var _path = !!colorTableCache["colurSkuPictureDesc_" + colorSku.skuId] ? colorTableCache["colurSkuPictureDesc_" + colorSku.skuId].path : "";
                    var _name = !!colorTableCache["colurSkuPictureDesc_" + colorSku.skuId] ? colorTableCache["colurSkuPictureDesc_" + colorSku.skuId].name : "";
                    _tbody += '<font style="color: green;" id="colurSkuPictureDesc_'+colorSku.skuId+'" class="wd_color_sku_picture" fileid="'+_id+'" filepath="'+_path+'">'+_name+'</font>';
                    _tbody += '</td>';
                    _tbody += '</tr>';
                }
                $("#productColorTable").html(_tbody);

                for (var index in colorSkuList) {
                    var colorSku = colorSkuList[index];
                    $("#colurSkuPictureBtn_" + colorSku.skuId).on("click", function(){
                        var skuId = $(this).attr("skuId");
                        currentColorSku = skuId;
                        var line = $("#productColorTable tr[skuid="+skuId+"]");
                        var offset = line.offset();

                        // 切换控件到选择SKU图片模式
                        switchPicturePanelMode(2, {
                            left: offset.left,
                            top: offset.top + line.outerHeight()
                        });

                        $(document).on("click", function(e) {
                            e = e || event;
                            var target = $(e.target);
                            if (target.closest("#colurSkuPictureBtn_" + currentColorSku).length == 0 && target.closest("#wd_picture_panel").length == 0) {

                                // 重置控件
                                // switchPicturePanelMode(1);

                                $(document).off("click");
                            }
                        });

                    });
                }
                calcProductCount(); // 更新总数
                updateColorFlag = false;
            }, 777)

            // 正在更新中，不需要操作
        }else {
            return;
        }
    }

    // 当前设定SKU
    var currentColorSku = 0;
    // 处理上传的图片
    function setColorSkuPicture(files) {
        $("#colurSkuPictureDesc_" + currentColorSku).html(files[0].name);
        $("#colurSkuPictureDesc_" + currentColorSku).attr("fileid",files[0].id);
        $("#colurSkuPictureDesc_" + currentColorSku).attr("filepath",files[0].path);

        // 重置控件
        switchPicturePanelMode(1);
    }

    // 更新SKU列表
    function updateProductSkuList() {
        if (!updateSkuFlag) {
            updateSkuFlag = true;

            setTimeout(function(){

                // 缓存切换之前的状态；
                $(".wd_sku_table_text").each(function(){
                    skuTableCache[$(this).attr("name")] = $(this).val();
                })

                var cateColorSkuList = getColorSku();
                var cateSizeSkuList = getSizeSku();

                // 更新SKU 表
                var colorSkuList = getColorSku();
                var sizeSkuList = getSizeSku();

                // 如果有一种类型没选，则直接清空退出
                if (colorSkuList.length == 0 || sizeSkuList.length == 0) {
                    $("#productSkuTable").html("");

                } else {
                    var _tbody = "";
                    for (var index1 in colorSkuList) {
                        var colorSku = colorSkuList[index1];

                        _tbody += '<tr>';
                        _tbody += '<td rowspan="'+sizeSkuList.length+'"><span>'+colorSku.value+'</span></td>';

                        for (var index2 in sizeSkuList) {
                            var sizeSku = sizeSkuList[index2];

                            _tbody += '<td>'+sizeSku.value+'</td>';
                            var _name = "sku_" + colorSku.skuId +"_" + sizeSku.skuId + "_count";
                            _tbody += '<td><input type="text" class="NumText wd_sku_table_text" name="'+_name+'" value="'+(!!skuTableCache[_name] ? skuTableCache[_name] : "")+'" maxlength="7"/></td>';
                            _name = "sku_" + colorSku.skuId +"_" + sizeSku.skuId + "_code";
                            _tbody += '<td><input type="text" class="CodingText wd_sku_table_text" name="'+_name+'" value="'+(!!skuTableCache[_name] ?skuTableCache[_name] :"")+'"/></td>';
                            _tbody += '<td> \
                                            <div class="rel"> \
                                                <i class="sku-batch" colorskuid="'+colorSku.skuId+'" sizeskuid="'+sizeSku.skuId+'" ></i> \
                                                <div class="sku-set-wapper"> \
                                                    <div class="w-cont"> \
                                                        <a href="javascript:void(0)" class="close-control"></a> \
                                                        <h3>批量操作</h3> \
                                                        <div class="price-control"> \
                                                            <p>数量:</p> \
                                                            <label><input type="radio" name="bat_count" t="1" v="1"  />同颜色分类数量相同</label> \
                                                            <label><input type="radio" name="bat_count" t="2" v="1"/>同尺码数量相同</label> \
                                                        </div> \
                                                        <div class="count-control"> \
                                                            <p>编码:</p> \
                                                            <label><input type="radio" name="bat_code" t="1" v="2" />同颜色分类编码相同</label> \
                                                            <label><input type="radio" name="bat_code" t="2" v="2" />同尺码编码相同</label> \
                                                        </div> \
                                                        <div class="clear"></div> \
                                                        <div class="sku-control"> \
                                                            <input type="button" value=" 确 定 " class="bat_confirm_button" colorskuid="'+colorSku.skuId+'" sizeskuid="'+sizeSku.skuId+'" /> \
                                                            <a href="javascript:void(0)" class="bat_close_button"> 取 消 </a> \
                                                        </div> \
                                                    </div> \
                                                </div> \
                                            </div> \
                                        </td>'
                            _tbody += '</tr>';

                            // 还没结束，则加下一行开始
                            if (index2 != sizeSkuList.length - 1) {
                                _tbody += '<tr>';
                            }

                        }
                        $("#productSkuTable").html(_tbody);

                        // 绑定批量操作
                        $(".sku-batch").on("click", function () {
                            $(".z99").removeClass("z99");
                            $(".sku-set-wapper").hide();
                            $(this).next().toggle().parent().addClass("z99");


                            // 判断能否选择
                            var colorSkuId = $(this).attr("colorskuid");
                            var sizeSkuId = $(this).attr("sizeskuid");
                            var count = $(".wd_sku_table_text[name=sku_"+colorSkuId+"_"+sizeSkuId+"_count]").val();
                            var code = $(".wd_sku_table_text[name=sku_"+colorSkuId+"_"+sizeSkuId+"_code]").val();

                            var $counts = $(this).next(".sku-set-wapper").find("input[type=radio][name=bat_count]");
                            if (!count || isNaN(count)) {
                                $counts.prop("disabled", true);
                            } else {
                                $counts.prop("disabled", false);
                            }
                            var $codes = $(this).next(".sku-set-wapper").find("input[type=radio][name=bat_code]");
                            if (!code || $.trim(code) == "") {
                                $codes.prop("disabled", true);
                            } else {
                                $codes.prop("disabled", false);
                            }
                        });
                        // 确定修改
                        $(".bat_confirm_button").on("click", function(){
                            var colorSkuId = $(this).attr("colorskuid");
                            var sizeSkuId = $(this).attr("sizeskuid");
                            var count = $(".wd_sku_table_text[name=sku_"+colorSkuId+"_"+sizeSkuId+"_count]").val();
                            var code = $(".wd_sku_table_text[name=sku_"+colorSkuId+"_"+sizeSkuId+"_code]").val();

                            $(this).parent().parent().find("input[type=radio]:checked").each(function(index, obj){
                                var _t = $(obj).attr("t");
                                var _v = $(obj).attr("v");

                                if (_v == "1") {
                                    $(".NumText").each(function(index, obj2){
                                        var name = $(obj2).attr("name");
                                        if (_t == "1" && name.split("_")[1] == colorSkuId) {
                                            $(obj2).val(count);
                                        } else if (_t == "2" && name.split("_")[2] == sizeSkuId) {
                                            $(obj2).val(count);
                                        }
                                    })
                                } else if (_v == "2") {
                                    $(".CodingText").each(function(index, obj2){
                                        var name = $(obj2).attr("name");
                                        if (_t == "1" && name.split("_")[1] == colorSkuId) {
                                            $(obj2).val(code);
                                        } else if (_t == "2" && name.split("_")[2] == sizeSkuId) {
                                            $(obj2).val(code);
                                        }
                                    })
                                }
                            })

                            $(this).parent().parent().parent().hide();
                            calcProductCount(); // 更新总数
                        })
                        $(".bat_close_button").on("click", function(){
                            $(this).parent().parent().parent().hide();
                        })
                        $(".close-control").click(function () {

                            $(this).parent().parent().toggle();

                        });

                        // 绑定计算宝贝数量事件
                        $(".NumText").on("blur", function(){
                            calcProductCount();
                        });
                    }
                    calcProductCount();
                }

                updateSkuFlag = false;
            }, 777)

            // 正在更新中，不需要操作
        }else {
            return;
        }
    }

    // 绑定更新 - 颜色选择
    $("input[name=productColorSku]").on("change", function(){
        updateProductSkuList();
        updateColorList();

        var cateSkuId = $(this).attr("skuid");
        var checked = $(this).prop("checked");

        // 修改颜色名称
        if (checked) {
            $("#productColorSkuName" + cateSkuId).show();

            $("#productColorSkuName" + cateSkuId).on("blur", function(){
                // 更新SKU列表
                updateProductSkuList();
                // 更新颜色列表
                updateColorList();
            })

        } else {
            $("#productColorSkuName" + cateSkuId).hide();
            $("#productColorSkuName" + cateSkuId).off("blur");
        }
    });
    // 绑定更新 - 尺寸选择
    $("input[name=productSizeSku]").on("change", function(){
        updateProductSkuList();

        var cateSkuId = $(this).attr("skuid");
        var checked = $(this).prop("checked");

        if (checked) {
            $("#productSizeSkuName" + cateSkuId).show();
            $("#productSizeSkuName" + cateSkuId).on("blur", function(){
                // 更新SKU列表
                updateProductSkuList();
            })
        } else {
            $("#productSizeSkuName" + cateSkuId).hide();
            $("#productSizeSkuName" + cateSkuId).off("blur");
        }
    });

    // 页面载入时就需要计算；
    // 更新SKU列表
    updateProductSkuList();
    // 更新颜色列表
    updateColorList();

    // 更新宝贝数量
    function calcProductCount() {
        var productNum = 0;
        $(".NumText").each(function(index, num){
            if (/^\d+$/.test($(num).val())) {
                productNum += (+$(num).val());
            }
        })
        $("#product_num").val(productNum);
    }

    // 编辑器插入图片
    function editorInsert(imgs) {
        var content = '';
        for (var index in imgs) {
            var img = imgs[index];
            content += '<img src="'+upload_path + img.path + '" />';
        }
        editor.execCommand('insertHtml', content)
//        var allFinishFlag = true;
//
//        for (var index =0; index < imgs.length; index++) {
//            var img = imgs[index];
//            for (var index2 = 0; index2 < fileList.length; index2++) {
//                var _file = fileList[index2];
//                if (img.name == _file.name) {
//                    _file.status = true;
//                    _file.img = img;
//                }
//                if (_file.status == false) {
//                    allFinishFlag = false;
//                }
//            }
//        }
//        if (allFinishFlag) {
//            var content = '';
//            // 先排序，后插入
//            fileList.sort(function(_file1, _file2){
//                return _file1.name > _file2.name ? 1 : -1;
//            });
//
//            for (var i = 0; i < fileList.length; i++) {
//                var img = fileList[i].img;
//                if (img && img.path) {
//                    content += '<img src="'+upload_path + img.path + '" data-name="'+img.name+'" />';
//                }
//            }
//            editor.execCommand('insertHtml', content);
//            fileList = [];
//        }
    }

    // 页面逻辑END

    $("#productAddBtn").css("cursor", "pointer");
    // Finally 提交表单
    $("#productAddBtn").on("click", function(){

        // 开始做数据验证

        // 宝贝属性
        var parameter = "";
        for(var index in cateParamList) {
            var cateParamId = cateParamList[index];
            var cateParamName = $("#cateParam" + cateParamId).attr("paramname");
            var cateParamValue = $("#cateParam" + cateParamId).val();

            cateParamValue = cateParamValue.replace(/[,]+/g,"，").replace(/[|]+/g,"-");

            // 暂时不做空判断 2014-04-09
//            if (WD.regular.isEmpty(cateParamValue)) {
//                alert("请填入宝贝属性");
//                $("#cateParam" + cateParamId).focus();
//                return;
//            }

            parameter += cateParamId + "," + cateParamName + "," + cateParamValue + "|";
        }

        // 货号
        var sn = $("#sn").val();
        if (WD.regular.isEmpty(sn)) {
            alert("请填入货号");
            $("#sn").focus();
            return;
        };



        // 价格
        var specialFlag = $("input[name=specialFlag]").prop("checked");
        var priceMode = $("input[name=priceMode]:checked").val();

        var productPrice = "";

        // 统一价
        if (priceMode == "1" ) {
            var unifiedPrice = $("#unifiedPrice").val();
            if (isNaN(+unifiedPrice) || $.trim(unifiedPrice) == "") {
                alert("请填入正确的价格");
                $("#unifiedPrice").focus();
                return;
            }

            var unifiedPriceOld = $("#unifiedPriceOld").val();
            if (specialFlag) {
                if (isNaN(+unifiedPriceOld) || $.trim(unifiedPriceOld) == "") {
                    alert("请填入原价");
                    $("#unifiedPriceOld").focus();
                    return;
                }
            }
            productPrice += unifiedPrice + "," + unifiedPriceOld;

            // 阶梯价
        }else if (priceMode == "2") {
            var ladderPriceKeep = [];
            for (var i=1;i<=ladderPriceCount;i++) {

                if ($("input[name=ladderPriceStartCount"+i+"]")[0]) {
                    var ladderPriceStartCount = $("input[name=ladderPriceStartCount"+i+"]").val();
                    var ladderPriceEndCount =  $("input[name=ladderPriceEndCount"+i+"]").val();
                    var ladderPrice = $("input[name=ladderPrice"+i+"]").val();

                    if (!/^\d+$/.test(ladderPriceStartCount)) {
                        alert("请填入正确的数量");
                        $("input[name=ladderPriceStartCount"+i+"]").focus();
                        return;
                    }
                    if (!/^\d+$/.test(ladderPriceEndCount)) {
                        alert("请填入正确的数量");
                        $("input[name=ladderPriceEndCount"+i+"]").focus();
                        return;
                    }
                    if (isNaN(+ladderPrice) || $.trim(ladderPrice) == "") {
                        alert("请填入正确的价格");
                        $("input[name=ladderPrice"+i+"]").focus();
                        return;
                    }

                    // 特价
                    var ladderPriceOld = $("input[name=ladderPriceOld"+i+"]").val();
                    if (specialFlag) {
                        if (isNaN(+ladderPriceOld) || $.trim(ladderPriceOld) == "") {
                            alert("请填入原价");
                            $("input[name=ladderPriceOld"+i+"]").focus();
                            return;
                        }
                    }

                    if (parseInt(ladderPriceStartCount) >= parseInt(ladderPriceEndCount)) {
                        alert("阶梯价批发数目错误");
                        $("input[name=ladderPriceEndCount"+i+"]").focus();
                        return;
                    }

                    productPrice += ladderPriceStartCount + "," + ladderPriceEndCount + "," + ladderPrice + "," + ladderPriceOld + "|";

                    for (var j=0;j<ladderPriceKeep.length;j++) {
                        if (parseInt(ladderPriceStartCount) >= parseInt(ladderPriceKeep[j].startCount) && parseInt(ladderPriceStartCount) <= parseInt(ladderPriceKeep[j].endCount)) {
                            alert("阶梯价批发数目错误");
                            $("input[name=ladderPriceStartCount"+i+"]").focus();
                            return;
                        }
                        if (parseInt(ladderPriceEndCount) >= parseInt(ladderPriceKeep[j].startCount) && parseInt(ladderPriceEndCount) <= parseInt(ladderPriceKeep[j].endCount)) {
                            alert("阶梯价批发数目错误");
                            $("input[name=ladderPriceEndCount"+i+"]").focus();
                            return;
                        }
                    }

                    ladderPriceKeep.push({"startCount":ladderPriceStartCount, "endCount": ladderPriceEndCount, "price" : ladderPrice});
                }
            }

            // 找找看有没有漏掉的数目
            if (ladderPriceKeep.length > 1) {
                for (var i = 0; i < ladderPriceKeep.length; i++) {
                    var countConnFlag = false;
                    for (var j = 0; j < ladderPriceKeep.length; j++) {
                        if (parseInt(ladderPriceKeep[i].startCount) == parseInt(ladderPriceKeep[j].endCount) + 1 || parseInt(ladderPriceKeep[i].endCount) == parseInt(ladderPriceKeep[j].startCount) - 1) {
                            countConnFlag = true;
                        }
                    }
                    if (!countConnFlag) {
                        alert("阶梯价中数目必须要连续，请修改.");
                        $("input[name=ladderPriceStartCount1]").focus();
                        return false;
                    }
                }
            }
        }


        // 验证SKU
        var productColorSkuList = $("input[type=checkbox][name=productColorSku]:checked");
        if (productColorSkuList.length == 0) {
            alert("请至少选择一个颜色分类");
            $("#selectAllProductColorSku").focus();
            return;
        }

        var productSizeSkuList = $("input[type=checkbox][name=productSizeSku]:checked");
        if (productSizeSkuList.length == 0) {
            alert("请至少选择一个大小");
            $("input[type=checkbox][name=productSizeSku]").focus();
            return;
        }

        var numValidFlag = true;
        $(".NumText").each(function(index, num){
            if (!/^\d+$/.test($(num).val())) {
                if (numValidFlag) {
                    alert("请输入正确的数量");
                    $(num).focus();
                    numValidFlag = false;
                }
                return;
            }
        })



        // 运费模式
        var chargeMode = $("input[name=chargeMode]:checked").val();
        if (chargeMode == "1") {

        } else if (chargeMode == "2") {
            var weight = $("#weight").val();
            if (isNaN(+weight) || (+weight) <= 0) {
                alert("请输入正确的重量");
                $("#weight").focus();
                return;
            }

        } else if (chargeMode == "3") {
            var volume = $("#volume").val();
            if (isNaN(+volume) || (+volume) <= 0) {
                alert("请输入正确的体积");
                $("#volume").focus();
                return;
            }
        }



        // 宝贝图片
        if (!imgList[0] || imgList[0].flag == false) {
            alert("请设置宝贝主图.");
            window.scrollTo(0, parseInt($("#wd_picture_panel_shadow").offset().top));
            return;
        }


        // 提交数据
        var brand = $("#brand").val();
        var brandType = brand.split("-")[1];
        brand = brand.split("-")[0];

        var fdType = $("input[name=fdType]:checked").val();
        var sn = $("#sn").val();
        var name = $("#name").val();
        var tag = $("#tag").val();

        if (name == "" || $.trim(name) == "") {
            alert("请输入宝贝名称.");
            $("#name").focus();
            return;
        }

        var priceMode = $("input[name=priceMode]:checked").val();
        var specialFlag = $("input[name=specialFlag]").prop("checked");

        var colors = "";
        var colorIds = [];
        $("input[name=productColorSku]:checked").each(function(index, o){
            var skuId = $(o).attr("skuid");
            var value = $("#productColorSkuName" + skuId).val();
            var desc = $("#colurSkuPictureDesc_" + skuId).attr("fileid");
            colors += skuId + "," + value + "," + desc + "|";
            colorIds.push(skuId);
        });
        var sizes = "";
        var sizeIds = [];
        $("input[name=productSizeSku]:checked").each(function(index, o){
            var skuId = $(o).attr("skuid");
            var value = $("#productSizeSkuName" + skuId).val();
            var desc = "无";
            sizes += skuId + "," + value + "," + desc + "|";
            sizeIds.push(skuId);
        });
        var prodSkus = "";
        for (var j in colorIds) {
            for (var k in sizeIds) {
                var count = $("input[name=sku_"+colorIds[j]+"_"+sizeIds[k]+"_count]").val();
                var code = $("input[name=sku_"+colorIds[j]+"_"+sizeIds[k]+"_code]").val();

                prodSkus += colorIds[j]+"_"+sizeIds[k] + "," + count + "," + code + "|";
            }
        }


        var chargeMode = $("input[name=chargeMode]:checked").val();
        var weight = $("#weight").val();
        var volume = $("#volume").val();
        var province = $("#province").val();
        var city = $("#city").val();
        var imgs = "";
        var imgdesc = "";
        for (var index in imgList) {
            if (imgList[index] && imgList[index].flag == true) {
                if (imgList[index].data.id) {
                    imgs += imgList[index].data.id + ",";
                    imgdesc += "1,"; // 新上传
                } else if (imgList[index].data.pid) {
                    imgs += imgList[index].data.pid + ",";
                    imgdesc += "2,"; // 老图片
                }

            }
        }
        var desc = editor.getContent();

        // ajax 提交
        $.ajax({
            url: "modifyProduct.htm",
            type : "post",
            dataType : "json",
            cache: false,
            async :false,
            data : {
                userId : userId,
                pid :productId,
                brand : brand,
                brandType : brandType,
                fdType : fdType,
                sn : sn,
                name : name,
                tag : tag,
                colors : colors,
                sizes : sizes,
                prodSkus : prodSkus,
                chargeMode : chargeMode,
                weight : weight,
                volume : volume,
                province : province,
                city : city,
                imgs : imgs,
                imgdesc : imgdesc, // 图片来源
                desc: desc,
                productPrice : productPrice,
                priceMode : priceMode,
                specialFlag : specialFlag,
                parameter : parameter,
                num : $("#product_num").val()
            },
            beforeSend : function() {
                $("#productAddBtn").val("正在提交");
                $("#productAddBtn").prop("disabled", true);
            },
            success : function(res) {

                if (res.flag == "true") {
                    alert("修改完成");
                    window.onbeforeunload = undefined;
                    location.href="../productManage/list.htm";

                }else if (res.msg == "sn") {
                    alert("货号已存在，请更换货号")
                    $("#sn").focus();

                } else {
                    alert(res.desc);
                }

            },
            error : function() {
                alert("修改失败");
            },
            complete : function() {
                $("#productAddBtn").val("修  改");
                $("#productAddBtn").prop("disabled", false);
            }
        })


    }); // 提交表单按钮END


    // 加载已有的主图
    for (var i = 0; i < currImageList.length; i++) {
        var image = currImageList[i];
        $("#product_img_" + (i+1) + " img").attr('src',upload_path + image.path);
        imgList.push({
            "flag" : true,
            "data" : {
                pid : image.id,
                path : image.path
            }
        });
    }
    // 选中特价
    if (specialFlag == 1) {
        $("input[name=specialFlag]").click();
    }
    // 添加阶梯价
    for (var i=1;i<priceList.length;i++) {
        var _price = priceList[i];
        var _count = ++ladderPriceCount;
        var _template = '';
        _template += '<ul id="ladderPriceList'+_count+'">';
        _template += '<li class="show">';
        _template += '<input type="text" name="ladderPriceStartCount'+_count+'" size="10" value="'+_price.startCount+'" />';
        _template += '<span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>';
        _template += '<input type="text" name="ladderPriceEndCount'+_count+'" size="10"  value="'+_price.endCount+'"/>';
        _template += '<span>&nbsp;&nbsp;件&nbsp;&nbsp;</span>';
        _template += '<input type="text" name="ladderPrice'+_count+'" size="10"  value="'+_price.price+'"/>';
        _template += '<span>&nbsp;&nbsp;元&nbsp;&nbsp;</span>';
        _template += '<span class="product_price_old"';
        if (!$("input[type='checkbox'][name='specialFlag']").prop("checked")) {
            _template += ' style="display:none;"';
        }
        _template += '>原价：<input type="text" name="ladderPriceOld'+_count+'" size="10"  value="'+_price.priceOld+'"/>元</span>';
        _template += '<img class="img-add" src="'+imgPath+'/minus.png" style="cursor:pointer;" onclick="$(\'#ladderPriceList'+_count+'\').remove();"/>';
        _template += '</li>';
        _template += '</ul>';

        $("#priceMode1").append(_template);
    }

    // 处理已有收费模式
    doChargeMode();

}); // $END