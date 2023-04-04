/*电站详情*/
$("#dataType").change(function () {
    // 注释加密 
    var type = $('#dataType option:selected').val();
    var option = getOption(type);
    var now = new Date();
    $('#datetimepicker').datepicker('remove');
    $('#datetimepicker').datepicker(option);
    $('#datetimepicker').datepicker('update',new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    // 注释加密 
});

$("#dataType2").change(function () {
    // 注释加密 
    var type = $('#dataType2 option:selected').val();
    var option = getOption(type);
    var now = new Date();
    $('#datetimepicker2').datepicker('remove');
    $('#datetimepicker2').datepicker(option);
    $('#datetimepicker2').datepicker('update',new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    // 注释加密 
});

function getOption(type) {
    var option={};
    if (type == "day") {
        option = {
            language: "zh-CN",
            endDate:  new Date(),
            todayHighlight: true,
            forceParse:false,
            autoclose: true,//选中之后自动隐藏日期选择框
            format: "yyyy-mm-dd"//日期格式yyyy-mm-dd
        };
    }else if (type == "month") {
        option = {
            language: "zh-CN",
            endDate: new Date(),
            todayHighlight: true,
            forceParse:false,
            autoclose: true,//选中之后自动隐藏日期选择框
            startView: 1,
            maxViewMode: 1,
            minViewMode: 1,
            format: "yyyy-mm"//日期格式yyyy-mm-dd
        };
    }else if (type == "year") {
        option = {
            language: "zh-CN",
            endDate: new Date(),
            todayHighlight: true,
            forceParse:false,
            autoclose: true,//选中之后自动隐藏日期选择框
            startView: 2,
            maxViewMode: 2,
            minViewMode: 2,
            format: "yyyy"//日期格式yyyy-mm-dd
        };
    }
    return option;
}

/*form表单提交前的确认*/
function checkForm() {
    $('#time').val($("#datetimepicker").find("input").val());
    $('#time2').val($("#datetimepicker2").find("input").val());
    return true;
}


