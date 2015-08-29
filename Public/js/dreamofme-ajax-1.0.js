
//explode函数
function explode(inputstring, separators, includeEmpties) {
  inputstring = new String(inputstring);
  separators = new String(separators);

  if(separators == "undefined") {
    separators = " :;";
  }

  fixedExplode = new Array(1);
  currentElement = "";
  count = 0;

  for(x=0; x < inputstring.length; x++) {
    str = inputstring.charAt(x);
    if(separators.indexOf(str) != -1) {
        if ( ( (includeEmpties <= 0) || (includeEmpties == false)) && (currentElement == "")) {
        }
        else {
            fixedExplode[count] = currentElement;
            count++;
            currentElement = "";
        }
    }
    else {
        currentElement += str;
    }
  }

  if (( ! (includeEmpties <= 0) && (includeEmpties != false)) || (currentElement != "")) {
      fixedExplode[count] = currentElement;
  }
  return fixedExplode;
}

/*
 *	copyright by tianming technology TM
 *	auth  dreamofme <345340585@qq.com>
 */

modelBox = function(pRoleName){				
	this.Dom = {};
	this.roleName = pRoleName;
		this.Dom.panel = $("[role='"+this.roleName+"']");
		if(this.Dom.panel.length <= 0 ){
			if(_.log) console.log('panel未找到');
			//return;
		}
		this.Dom.title = this.Dom.panel.find("[data-group='title']");
		this.Dom.text = this.Dom.panel.find("[data-group='text']");
		this.Dom.submit = this.Dom.panel.find("[btn-group='submit']");
		this.Dom.query = this.Dom.panel.find("[btn-group='query']");
		this.Dom.cancel = this.Dom.panel.find("[btn-group='cancel']");
		this.Dom.panel.hide();					
		modelBox.prototype.show = function(fn){
			if(typeof this.Dom.panel !== 'undefined')
			this.Dom.panel.fadeIn('slow');	
		};
		
		modelBox.prototype.set = function(obj){
			
			if(typeof obj.click == 'object' && typeof obj.click.cancel == 'function')
				this.Dom.cancel.click(obj.click.cancel);
			if(typeof obj.click == 'object' && typeof obj.click.submit == 'function')
				this.Dom.submit.click(obj.click.submit);
			if(typeof obj.click == 'object' && typeof obj.click.query == 'function')
				this.Dom.query.click(obj.click.query);
		};
		modelBox.prototype.setbtn=function(pBtn){
			if(typeof pBtn !== 'string')  pBtn ='';
			this.Dom.submit.hide();
			this.Dom.query.hide();
			this.Dom.cancel.hide();
			(pBtn.indexOf('submit') >=0 ) && this.Dom.submit.show();
			(pBtn.indexOf('query') >=0 ) && this.Dom.query.show();
			(pBtn.indexOf('cancel') >=0 ) && this.Dom.cancel.show();
			
		}
	
};
modelList = function(pRoleName){
	this.Dom = {
		panel:'',
		rows:{},		
		error:{},
	};
	var Dom = {};
	//获取列表对象
	if(typeof this.Dom.panel !== 'object')
	{
		var listbox =this.Dom;
		this.Dom.panel = $("[role='list-box']");
		this.Dom.panel.lists = this.Dom.panel.find("[role='lists']");
		this.Dom.panel.pager = this.Dom.panel.find("[role='pager']");
		this.Dom.rows = this.Dom.panel.find("[items='rowspan']");
		this.Dom.rows.cols = {};
		this.Dom.rows.cols.titles = this.Dom.panel.find("[items='colspan-title']");		
		this.Dom.rows.cols.elements = this.Dom.panel.find("[items='colspan-element']");
		this.Dom.rows.removeall=function(){		
			listbox.rows.cols.titles.remove();
			listbox.rows.cols.elements.remove();
			listbox.rows.remove();
		};
		this.Dom.rows.removeall();
		this.Dom.error = this.Dom.panel.find("[items='error']");
		this.Dom.error.text = this.Dom.error.find("[items='text']");
		this.Dom.error.remove();
					
		this.Dom.error.show=function(data){
			listbox.error.text.html(data);	
			listbox.panel.lists.append(listbox.error[0].outerHTML);			
		};
		Dom  = this.Dom ;
	}else{
		Dom  = this.Dom ;
	}
	modelList.prototype.addLists = function(keyArray,valArray){
		//console.log('Dom.length:'+this.Dom.panel.length);
		//console.log('Dom.html:'+this.Dom.panel[0].outerHTML);
		//Dom.error.show('没有数据');	
		var cols =  listbox.rows.cols.titles;
		$(keyArray).each(function(){
			if(this[0] !=='prikey'){				
				cols.html(this[1]);
				listbox.rows.append(cols[0].outerHTML);
			}else{
				cols.html('操作');
				listbox.rows.append(cols[0].outerHTML);
			}
		});
		if(typeof valArray == 'undefined'  || typeof valArray.length == 'undefined' || valArray.length <=0) listbox.error.show('没有数据');
		var cols =  listbox.rows.cols.elements;
		listbox.panel.lists.append(listbox.rows[0].outerHTML);
		$(valArray).each(function(){			
			var valItem = this;
			var temp = $(document.createElement("div"));
			listbox.rows.html('');
			temp.append(listbox.rows[0].outerHTML);
			var Row = temp.find("[items='rowspan']");
			temp = null;
			
			$(keyArray).each(function(){
				var value = valItem[this[0]];
				if(this[0] !=='prikey'){					
					cols.html(valItem[this[0]]);
					Row.append(cols[0].outerHTML);
				}else{
					
					cols.html('');
					var temp = $(document.createElement("div"));
					listbox.rows.html('');
					temp.append(cols[0].outerHTML);
					var Col = temp.find("[items='colspan-element']");
					temp = null;
				
					$(this[1]).each(function(){
						var tempUrl = this[0];
						var tempName = this[1];
						var tempMethod = this[2];
						var tempCallback = this[3];
						var comfirm = this[4];
						var itemBtn = $(document.createElement('button'));
						tempUrl = tempUrl.replace('__id__',value);
						itemBtn.attr('role','list-btn');
						itemBtn.attr('class','float-left btn opgroup-item');
						itemBtn.html(tempName);
						
						itemBtn.click(function(){	
							
							var itemcode = 'DreamAjax.loadstart();'+tempMethod+'("'+tempUrl+'",function(data){DreamAjax.loadend();'+tempCallback+'(data);});';
							if(comfirm)
								var jscode = comfirm + "('您确认执行"+tempName+"操作吗？','提示','query,cancel',function(){"+itemcode+"});";
								else
								var jscode = itemcode;
							eval(jscode);
							
						});
					
					Col.append(itemBtn);					
					});
					Row.append(Col);					
				}
			});
			listbox.panel.lists.append(Row);
		});
		listbox.panel.slideDown();	
	};
	modelList.prototype.clear=function(){
		listbox.panel.lists.html('');
		listbox.panel.slideUp();	
	};
	modelList.prototype.getJson = function(){
		
	};
};
DreamOfMe = function (){
	
	var _ = this;	
	//允许运行
	_.runAllow = true;
	//基础模型，盒子模型
	
	
	_.mConfirm = function(){
		var box=null,obj=null;
		if(typeof this.box == 'undefined')
		box = this.box = new modelBox('alert-box');
		else
		box = this.box;
		
		this.show = function(pText,pTitle,pBtn,pFn){	
			obj = {
			click:{
				query:function(){
					if(typeof pFn == 'function') 
						pFn();
					else
						if(_.log) console.log('confirm未设置回调函数');
				},
				cancel:function(){box.Dom.panel.fadeOut('slow');},
				
				}
			};
			box.Dom.title.html(pTitle);
			box.Dom.text.html(pText);
			box.setbtn(pBtn);
			box.set(obj);
			
			box.show();
		};
		
	};
	_.mAlert = function(){	
		var box=null,obj=null;
		if(typeof this.box == 'undefined')
		box = this.box = new modelBox('alert-box');
		else
		box = this.box;		
		this.show = function(pText,pTitle,pBtn){	
			obj = {
			click:{
				submit:function(){box.Dom.panel.fadeOut('slow');},
				cancel:function(){box.Dom.panel.fadeOut('slow');},
				query:function(){box.Dom.panel.fadeOut('slow');},
				}
			};
			if(typeof pBtn == 'undefined') pBtn = 'cancel';
			box.Dom.panel.hide();
			box.Dom.title.html(pTitle);
			box.Dom.text.html(pText);
			box.setbtn(pBtn);
			box.set(obj);
			
			box.show();
		};
		
	};
	_.mLoad = function(){	
		var box=null,obj=null;
		if(typeof this.box == 'undefined')
		box = this.box = new modelBox('load-box');
		else
		box = this.box;	
		if(box.Dom.panel.length <=0) if(_.log) console.log('load模块未成功设置');
		this.start = function(){	
			box.Dom.panel.fadeIn('slow');
		};
		this.end = function(){	
			box.Dom.panel.fadeOut('slow');
		};
		this.error = function(data){			
			box.Dom.panel.fadeOut('slow',function(){_.alert(data,'提示');});
		};
		
	};
	_.mPanelForm = function(pRoleName,pFn){	
		var box=null,obj=null;
		if(typeof this.box == 'undefined')
		box = this.box = new modelBox(pRoleName);
		else
		box = this.box;		
		
		if(box.Dom.panel.length <= 0){
			if(_.log) console.log("panelform未找到,程序无法继续执行");
			return null;
		}
		box.Dom.form = box.Dom.panel.find('form');
		if(box.Dom.form.length <= 0){
			if(_.log) console.log("panelform不具备表单,程序无法继续执行");
			return null;
		}
		box.Dom.form.submit(function(){return false;});
		this.show = function(){	
			obj = {
			click:{
				submit:function(){
						_.loadstart();
						box.Dom.form.ajaxSubmit(function(data){
							if(typeof pFn == 'function') 
								pFn(data);
							else{
								if(_.log) {
									console.log('panelform未设置回调，返回数据如下');
									console.log(data);
								}
							}
							_.loadend();
						});
						return false;
					},
				cancel:function(){box.Dom.panel.fadeOut('slow');}
				}
			};
			pBtn = 'cancel,submit';
			box.setbtn(pBtn);
			box.set(obj);
			box.show();
		};
		
	};
	_.mAjaxForm = function(pRoleName,pFn){	
		var box=null,obj=null;
		if(typeof this.box == 'undefined')
		box = this.box = new modelBox(pRoleName);
		else
		box = this.box;		
		
		if(box.Dom.panel.length <= 0){
			if(_.log) console.log("panelform未找到,程序无法继续执行");
			return null;
		}
		box.Dom.form = box.Dom.panel.find('form');
		if(box.Dom.form.length <= 0){
			if(_.log) console.log("panelform不具备表单,程序无法继续执行");
			return null;
		}
		box.Dom.panel.show();
		box.Dom.form.submit(function(){
								_.loadstart();
								box.Dom.form.ajaxSubmit(function(data){
									if(typeof pFn == 'function') 
										pFn(data);
									else{
										if(_.log) {
											console.log('panelform未设置回调，返回数据如下');
											console.log(data);
										}
									}
									_.loadend();
								});
								return false;
							});
		
		
	};
	
	//方法
	_.listbox=function(pRoleName){
		var listbox = new modelList(pRoleName);		
		return listbox;
	};
	_.panelform = function(roleName,fn){
		var panelform = new _.mPanelForm(roleName,fn);
		panelform.show();
		return panelform;
	};
	_.ajaxform = function(roleName,fn){
		var ajaxform = new _.mAjaxForm(roleName,fn);
		//ajaxform.show();
		return ajaxform;
	}
	_.confirm = function(pText,pTitle,pBtn,pFn){_.modelConfirm.show(pText,pTitle,pBtn,pFn)	}
	_.alert = function(pText,pTitle,pBtn){_.modelAlert.show(pText,pTitle,pBtn)}
	_.loadstart = function(){_.modelLoad.start();};
	_.loadend = function(){_.modelLoad.end();};
	_.loaderror = function(data){_.modelLoad.error(data);};
	//初始化元素
	_.init = function(){		
		
		if(!_.testObj()) return;		//检测为通过，则退出运行
		if(typeof _.modelLoad !== 'object') {
			_.modelLoad = new _.mLoad();
			 if(_.log) console.log('正在加载界面模型初始化成功');			
		}
		if(typeof _.modelAlert !== 'object') {
			_.modelAlert = new _.mAlert();
			 if(_.log) console.log('提示框模型初始化成功');			
		}
		if(typeof _.modelConfirm !== 'object') {
			_.modelConfirm = new _.mConfirm();
			 if(_.log) console.log('回调型提示框模型初始化成功');			
		}
	};
	//检测是否存在jQuery
	_.testObj = function(){		
		_.runAllow = true;	
		if (typeof jQuery == 'undefined') { 
			// jQuery 未加载
			 if(_.log) console.log('请先加载jQuery');
			//禁止运行
			_.runAllow = false;
		} else {
			// jQuery 已加载 
			if(jQuery !== $){
				 if(_.log) console.log('$对象不是jQuery，对象无法调用');
				//禁止运行
				_.runAllow = false;
			}
		} 
		if(typeof $(document).ajaxForm !== 'function' ){
			 if(_.log) console.log('ajaxForm组件无法使用，程序退出');
			_.runAllow = false;
		}
		//必须存在loadform和alertform才可以继续
		return _.runAllow;
	};
	
}


var DreamAjax = null;
$(document).ready(function(){
		DreamAjax = new DreamOfMe;
		DreamAjax.log=true;
		DreamAjax.init();
});	