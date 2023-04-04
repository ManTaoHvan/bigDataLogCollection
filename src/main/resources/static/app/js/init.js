
(function ($, window) {

"use strict";
 // 注释加密 
$("*[data-tiggle='ajax']").click(function(){
	
	var dataUrl = $(this).attr("data-submit-url");
	var dataConfirm = $(this).attr("data-confirm");
	
	$.confirm({
		type: 'red',
		closeIcon: true,
	    title: '警告',
	    content: dataConfirm ? dataConfirm : '确认操作?',
	    buttons: {
	        '确认': {
	            btnClass: 'btn-blue',
	            action: function(){
	            	$.post(dataUrl,{},function(json){
						if(json.code==200){
							window.location.reload();
						}else{
							$.alert({
							    title: '提示',
							    content: json.msg,
							    buttons:{"好的":{ btnClass: 'btn-blue'}}
							});
						}
					});
	            }
	        },
	        '取消':{}
	    }
	});
	
});
 // 注释加密 

$("*[delete-batch-url]").click(function(){
	var deleteBatchUrl = $(this).attr('delete-batch-url');
	var ids = [];
	$.each($("input:checked"),function(n,i){
		if($(this).val()!='root'){
		   ids.push($(this).val());
		}
	});
	
	if(ids.length==0){
		$.alert({
		    title: '提示',
		    backgroundDismiss:true,
		    content: "请选择要删除的记录!",
		    buttons:{"好的":{ btnClass: 'btn-blue'}}
		});
	}else{
		$.confirm({
			type: 'red',
			closeIcon: true,
		    title: '警告',
		    content: "确认删除选中的【"+ids.length+"】条记录?",
		    buttons: {
		        '确认': {
		            btnClass: 'btn-blue',
		            action: function(){
		            	$.post(deleteBatchUrl,{id:ids},function(json){
							if(json.code==200){
								window.location.reload();
							}else{
								$.alert({
								    title: '提示',
								    content: json.msg,
								    buttons:{"好的":{ btnClass: 'btn-blue'}}
								});
							}
						});
		            }
		        },
		        '取消':{}
		    }
		});		
	}
});


    $("*[confirm-batch-url]").click(function(){
        var confirmBatchUrl = $(this).attr('confirm-batch-url');
        var ids = [];
        $.each($("input:checked"),function(n,i){
            if($(this).val()!='root'){
                ids.push($(this).val());
            }
        });

        if(ids.length==0){
            $.alert({
                title: '提示',
                backgroundDismiss:true,
                content: "请选择要确认的记录!",
                buttons:{"好的":{ btnClass: 'btn-blue'}}
            });
        }else{
            $.confirm({
                type: 'red',
                closeIcon: true,
                title: '提示',
                content: "确认选中的【"+ids.length+"】条记录?",
                buttons: {
                    '确认': {
                        btnClass: 'btn-blue',
                        action: function(){
                            $.post(confirmBatchUrl,{id:ids},function(json){
                                if(json.code==200){
                                    window.location.reload();
                                }else{
                                    $.alert({
                                        title: '提示',
                                        content: json.msg,
                                        buttons:{"好的":{ btnClass: 'btn-blue'}}
                                    });
                                }
                            });
                        }
                    },
                    '取消':{}
                }
            });
        }
    });

 // 注释加密 
$("*[data-tiggle='ajaxmodel']").click(function(){
	var dataUrl = $(this).attr("data-url");
	var dataMax = eval($(this).attr("data-max"));
	var dataTitle = $(this).attr("data-title");
	$.confirm({
	    title: dataTitle ? dataTitle : "标题",
	    columnClass: dataMax ? 'col-md-9 col-md-offset-1' : 'col-md-6 col-md-offset-3',
	    content: 'url:'+dataUrl,
		closeIcon: true,
		backgroundDismiss:true,
	    buttons:{'关闭':{}}
	});
});
 // 注释加密 
var checkedBgColor = "#f5f5f5",
		unCheckedBgColor = "#fff";
 // 注释加密 
	$(".checkbox-item").on('ifChecked',function(){
		$(this).parents('tr').css('background',checkedBgColor);
	}).on('ifUnchecked',function(){
		$(this).parents("tr").css('background',unCheckedBgColor);
	});
 // 注释加密 
	$(".checkbox-toolbar").on('ifChecked',function(){
		$(".checkbox-item").iCheck('check');
		$(".checkbox-item").parents("tr").css('background',checkedBgColor);
	}).on('ifUnchecked',function(){
		$(".checkbox-item").iCheck('uncheck');
		$(".checkbox-item").parents("tr").css('background',unCheckedBgColor);
	});

	$(function(){
	 // 注释加密 
	 // 注释加密 
		var syscDoms = $("*[sysc]");
		syscDoms.html('<i class="fa fa-refresh fa-spin"></i> loading...');
		$.each(syscDoms,function(i,n){
			var syscUrl = $(n).attr("sysc-url");
			var format  = $(n).attr("format");
			if(syscUrl){
				$.post(syscUrl,{},function(data){
					$(n).text(format?format.replace("%s",data) : data);
				},"text")
			}
		});
	});
	
	/**
	 * 导出报表
	 */
    window.exportTo = function(fileName) {
    	var date = new Date();
		$(".table").table2excel({
			exclude: ".noExl",
			name: "Excel Document Name",
			filename: fileName,
			exclude_img: true,
			exclude_links: true,
			exclude_inputs: true
		});
	}
})(jQuery, window);
