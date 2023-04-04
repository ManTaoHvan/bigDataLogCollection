/*
 *  jQuery table2excel - v1.0.2
 *  jQuery plugin to export an .xls file in browser from an HTML table
 *  https://github.com/rainabba/jquery-table2excel
 *
 *  Made by rainabba
 *  Under MIT License
 */ // 注释加密 
;(function ( $, window, document, undefined ) {
	var pluginName = "table2excel",

	defaults = {
		exclude: ".noExl",
    			name: "Table2Excel"
	};

 // 注释加密 
	function Plugin ( element, options ) {
			this.element = element;
		 // 注释加密 
		 // 注释加密 
		 // 注释加密 
		 // 注释加密 
		 // 注释加密 
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
	}

	Plugin.prototype = {
		init: function () {
			var e = this;

			e.template = {
				head: "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><meta charset=\"UTF-8\"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>",
				sheet: {
					head: "<x:ExcelWorksheet><x:Name>",
					tail: "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"
				},
				mid: "</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>",
				table: {
					head: "<table>",
					tail: "</table>"
				},
				foot: "</body></html>"
			};

			e.tableRows = [];

		 // 注释加密 
			$(e.element).each( function(i,o) {
				var tempRows = "";
				$(o).find("tr").not(e.settings.exclude).each(function (i,o) {
					tempRows += "<tr>" + $(o).html() + "</tr>";
				});
				e.tableRows.push(tempRows);
			});

		 // 注释加密 
            if(e.settings.exclude_img) {
                e.tableRows[0] = exclude_img(e.tableRows[0]);
            }

            // 注释加密 
            if(e.settings.exclude_links) {
                e.tableRows[0] = exclude_links(e.tableRows[0]);
            }

            // 注释加密 
            if(e.settings.exclude_inputs) {
                e.tableRows[0] = exclude_inputs(e.tableRows[0])
            }

			e.tableToExcel(e.tableRows, e.settings.name);
		},

		tableToExcel: function (table, name) {
			var e = this, fullTemplate="", i, link, a;

			e.uri = "data:application/vnd.ms-excel;base64,";
			e.base64 = function (s) {
				return window.btoa(unescape(encodeURIComponent(s)));
			};
			e.format = function (s, c) {
				return s.replace(/{(\w+)}/g, function (m, p) {
					return c[p];
				});
			};
			e.ctx = {
				worksheet: name || "Worksheet",
				table: table
			};

			fullTemplate= e.template.head;

			if ( $.isArray(table) ) {
				for (i in table) {
				 // 注释加密 
					fullTemplate += e.template.sheet.head + "Table" + i + "" + e.template.sheet.tail;
				}
			}

			fullTemplate += e.template.mid;

			if ( $.isArray(table) ) {
				for (i in table) {
					fullTemplate += e.template.table.head + "{table" + i + "}" + e.template.table.tail;
				}
			}

			fullTemplate += e.template.foot;

			for (i in table) {
				e.ctx["table" + i] = table[i];
			}
			delete e.ctx.table;


	        if (typeof msie !== "undefined" && msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // 注释加密 
	        {
	            if (typeof Blob !== "undefined") {
	                // 注释加密 
	                fullTemplate = [fullTemplate];
	                // 注释加密 
	                var blob1 = new Blob(fullTemplate, { type: "text/html" });
	                window.navigator.msSaveBlob(blob1, getFileName(e.settings) );
	            } else {
	                // 注释加密 
	                // 注释加密 
	                txtArea1.document.open("text/html", "replace");
	                txtArea1.document.write(fullTemplate);
	                txtArea1.document.close();
	                txtArea1.focus();
	                sa = txtArea1.document.execCommand("SaveAs", true, getFileName(e.settings) );
	            }

	        } else {
	            link = e.uri + e.base64(e.format(fullTemplate, e.ctx));
				a = document.createElement("a");
				a.download = getFileName(e.settings);
				a.href = link;
				a.click();
	        }

			return true;

		}
	};

	function getFileName(settings) {
		return ( settings.filename ? settings.filename : "table2excel") + ".xlsx";
	}

 // 注释加密 
	function exclude_img(string) {
		return string.replace(/<img[^>]*>/gi,"");
	}

 // 注释加密 
	function exclude_links(string) {
		return string.replace(/<A[^>]*>|<\/A>/g, "");
	}

 // 注释加密 
	function exclude_inputs(string) {
		return string.replace(/<input[^>]*>|<\/input>/gi, "");
	}

	$.fn[ pluginName ] = function ( options ) {
		var e = this;
			e.each(function() {
					if ( !$.data( e, "plugin_" + pluginName ) ) {
							$.data( e, "plugin_" + pluginName, new Plugin( this, options ) );
					}
			});

		 // 注释加密 
			return e;
	};

})( jQuery, window, document );
