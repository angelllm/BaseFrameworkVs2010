$('#ajax-form').ajaxForm
  (
      {
          type: 'post',
          beforeSubmit: function () {
              console.log("loading...");
             dia =  art.dialog({
                  title: '\u64cd\u4f5c\u63d0\u793a', 
                  content: "<img src='/Template/html/images/loading.gif' /><span style='padding-left:5px;font-size:12px;'>\u6b63\u5728\u64cd\u4f5c,\u8bf7\u7a0d\u5019...</span>",
                  resize: false,
                  lock: true

              });
          },
          success: function (data) {
              //window.location.href = "/Admin/ProductManage/";
              //console.log(data);
              dia.close();
              art.dialog({
                  title: '\u64cd\u4f5c\u6210\u529f',
                  content: "\u63d0\u4ea4\u6210\u529f\uff0c\u8bf7\u7b49\u5f85\u5ba1\u6838\uff01",
                  resize: false,
                  time:3,
                  lock: true

              });
              $("#ajax-form").resetForm();
              return false;
              //$("#product-add-form").resetForm();
          },
          error: function (XmlHttpRequest, textStatus, errorThrown) {
              //console.log(errorThrown);
          }
      }
  );