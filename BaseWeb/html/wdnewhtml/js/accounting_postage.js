$(function () {

    // all select 
    $(".tbl-option-select input:checkbox:eq(0)").click(function () {

        $(this).next().next().prop("checked", false);
        $(".tbl input:checkbox").prop("checked", $(this).prop("checked"))
    });

    $(".tbl-option-select input:checkbox:eq(1)").click(function () {

        $(this).prev().prev().prop("checked", false);
        $(".tbl input:checkbox").each(function (index, item) {
            $(this).prop("checked", !$(this).prop("checked"));
        });
    });

    $("#submitBtn").on("click", function() {
        submit();
    })

    $(".waper a").on("click", function(){
        if ($(this).attr("status") != $("#status").val()) {
            $("#status").val($(this).attr("status"));
            submit();
        }
    })

    $(".settle_btn").on("click", function() {
        if (confirm("是否提交结算请求？")) {
            var packageId = $(this).attr("packageid");
            settle(packageId);
        }
    })

    $("#bat_settle_btn").on("click", function() {
        if ($("#status").val() == "0") {
            var ids = [];
            $("input[type=checkbox]:checked").each(function(index, cb){
                var packageId = $(cb).attr("packageid");
                if (packageId && packageId != "") {
                    ids.push(packageId);
                }
            })
            if (ids.length > 0) {
                if (confirm("是否提交结算请求？")) {
                    settle(ids.join(","));
                }
            } else {
                alert("请选择要结算的条目");
            }
        }
    })

    function settle(ids) {
        $.ajax({
            url : "postageSettle.json",
            type : "post",
            dataType : "json",
            async : false,
            cache : false,
            data : {
                ids : ids
            },
            success : function(res) {
                if (res.flag) {
                    alert("结算完成");
                    submit();
                }
            },
            error : function() {
                alert("结算失败");
            }
        })
    }

    function submit() {
        $("#settleForm").submit();
    }
});

function gotoPage(page){
    $("#page").val(page);

    $("#submitBtn").click();
}