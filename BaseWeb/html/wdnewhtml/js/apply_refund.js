
        $(function () {

            $("#btnFile").click(function () {
                $("input[type=file]:eq(0)").click();
            });


            $(".prev").click(function () {

                var count = $(this).next();
                if (parseInt(count.val()) <= 0) {

                    count.val(0);
                } else {
                    count.val(parseInt(count.val()) - 1);
                }

            });

            $(".next").click(function () {

                var count = $(this).prev();
                //可加入库存判断
                count.val(parseInt(count.val()) + 1);

            });



            $(".select-count").change(function () {

                checkCount(this);

            }).blur(function () {

                checkCount(this);
            });



        });



        function checkCount(obj) {

            var count = $(obj);
            if (isNaN(count.val())) {
                count.val(0);
            }
            else if (parseInt(count.val()) <= 0) {

                count.val(0);
            } else {

                count.val(parseInt(count.val()));
            }

        }

