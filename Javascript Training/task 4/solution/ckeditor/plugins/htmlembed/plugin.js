(function(){

	var pluginName = 'HtmlEmbed';

	CKEDITOR.plugins.add(pluginName, {
		
		init: function(editor){
			
			CKEDITOR.dialog.add(pluginName, function(){
				
				return {
					title : 'Embed a video',
					minWidth : 400,
					minHeight : 100,
					buttons : [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton],
					onOk : function(){
						var html = CKEDITOR.dialog.getCurrent().getContentElement("embedHtml","html").getValue();
						CKEDITOR.dialog.getCurrent().getParentEditor().insertHtml(html);
					},
					contents: [{
						id: 'embedHtml',
						label: 'Page1',
						accessKey: 'P',
						elements:[{ 
							type: 'textarea',
							id: 'html',
							label: 'Paste embed code here',
							labelLayout: 'vertical',
							validate : CKEDITOR.dialog.validate.notEmpty("Paste html into the provided text area")
						}]
					}]
				}
				
			});
			
			editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName)); 
			editor.ui.addButton(pluginName, {
				label: 'Insert a video',
				command: pluginName,
				icon: this.path + 'images/add.png'
			});
		}
	
	});

})();