//折叠面板  版本号测试哈哈
(function(jq,that){
    var accordion = function(settings){
        this.config = jq.extend({}, accordion.config, settings);
        this.init();
    }

    accordion.config = {
        target: null,
        items: [],
        curClass: "current",
        type: "hover",
        duration: 1000,
        delay: 150,
        orientation: "horizontal",
        autoPlay: false,
        interval: 2000,
        defaultTo: 0,
        autoFold: false,
        oninit: function() {},
        onchange: function(c) {},
        boxFoldSize: "" /*全部折叠时Box的高度*/
    };

    accordion.prototype  = {
        init: function() {
            var con = this.config,
                items = con.items,
                target = con.target;

            //初始时，全部折叠
            this.resetBoxSize(con.boxFoldSize);

            var len = this.length = items.length;
            var itemFoldSize = con.boxFoldSize / len;

            var matrix = {
                horizontal: ["left", "right"],
                vertical: ["top", "bottom"]
            };
            var orientation_fixed_style = con.dir = matrix[con.orientation][0];
            var orientation_auto_style = matrix[con.orientation][1];

            var itemIndex,
                n;
            for (var i = 0; i < len; i++) {
                itemIndex =  i + 1;
                n =  itemFoldSize * i;
                this.fixItem(items[i],itemIndex,n,orientation_fixed_style,orientation_auto_style);
            }

            this.current = -1;
            con.oninit && con.oninit.call(this);
            this.bind();

            var defaultItem = con.defaultTo == -1 ? 0 : con.defaultTo;
            if (con.autoPlay) {
                this.playTo(defaultItem);
                this.play()
            } else {
                if (con.defaultTo != -1) {
                    this.playTo(defaultItem);
                }
            }
            if (con.autoFold) {
                this.foldAll();
            }
        },
        getSize:function(obj){
             return  this.config.orientation == "horizontal" ?  jq(obj).outerWidth() : jq(obj).outerHeight();
        },
        resetBoxSize: function(size){
            var con = this.config;
            var target = con.target;
            var styleName = con.orientation == "horizontal" ? "width" : "height";
            var styleObj = {};
            styleObj[styleName] = size;
            jq(target).stop().animate(styleObj, con.duration, function() {});
            jq(target).css("overflow","hidden");
        },
        fixItem :function(item,idx,location,fixed_style,auto_style){
            var con = this.config;
            var itemStyle = {};
            itemStyle.zIndex = idx;
            itemStyle[fixed_style] = location + "px";
            itemStyle[auto_style] = "auto";
            jq(item).css(itemStyle);
        },
        bind: function() {
            var that = this;
                con = that.config,
                items = con.items;

            if (con.type == "hover") {
                jq(items).hover(function() {
                    if (that.delayTimer) {
                        clearTimeout(that.delayTimer);
                    }
                    var index = jq(this).index()
                    that.delayTimer = setTimeout(function() {
                                        that.playTo(index)
                                    }, con.delay);
                }, function() {
                    if (that.delayTimer) {
                        clearTimeout(that.delayTimer)
                    }
                });
            } else {
                 jq(items).bind( "click", function() {
                    var index = jq(this).index()
                    that.playTo(index)
                })
            }
        },
        playTo: function(g) {
            var len = this.length,
                con = this.config,
                e = con.dir,
                items = con.items,
                curClass = con.curClass;

            if (g < 0 || g >= len) {
                return
            }
            this.current = g;
            var itemFoldSize = con.boxFoldSize / len,
            chooseItemSize = this.getSize(items[g]),
            curBoxSize = itemFoldSize * (items.length -1) + chooseItemSize ;
            jq.each(items,function(index, item){
                var val, styleObj = {};
                if(index <= g){
                    val = index * itemFoldSize;
                }else{
                    val = index * itemFoldSize + chooseItemSize - itemFoldSize;
                }

                styleObj[e] = val;
                //if(parseFloat(jq(item).css(e),10) != val){
                    jq(item).stop().animate(styleObj, con.duration, function() {});
                //}
                if (g == index) {
                    jq(item).addClass(curClass);
                } else {
                    jq(item).removeClass(curClass);
                }
            });
            //重新计算
            this.resetBoxSize(curBoxSize);
            con.onchange && con.onchange.call(this, items[g])
        },
        play: function() {
            var that = this;
            that.config.autoPlay = true;
            if (that.autoTimer) {
                clearInterval(that.autoTimer)
            }
            that.autoTimer = setInterval(function() {
                that.playTo((that.current + 1 + that.length) % that.length);
                that.play()
            }, that.config.interval + that.config.duration)
        },
        pause: function() {
            var c = this;
            if (c.autoTimer) {
                clearInterval(c.autoTimer);
                c.autoTimer = null
            }
        },
        stop: function() {
            this.config.autoPlay = false;
            this.pause()
        },
        restart: function() {
            this.config.autoPlay = true;
            this.play()
        },
        foldAll: function() {
            var that = this,
                len = that.length,
                con = that.config,
                g = con.dir,
                items = con.items,
                curSize,
                totalSize = 0;

            //计算全部展开的大小
            var orientationStyle = con.orientation == "horizontal" ? "width" : "height";
            var boxUnfoldSize = 0;
            jq.each(items,function(idx, item){
                if(orientationStyle ==="height"){
                    boxUnfoldSize = boxUnfoldSize + jq(item).outerHeight();
                }else{
                    boxUnfoldSize = boxUnfoldSize + jq(item).outerWidth();
                }
            });
            
            //全部展开
            that.resetBoxSize(boxUnfoldSize);
            that.current = -1;
            jq.each(items,function(index, item){
                var styleObj = {},
                    val;
                curSize = that.getSize(item);
                if(index > 0){
                    val = totalSize;
                    styleObj[g] = val;
                    jq(item).stop().animate(styleObj, con.duration, function() {});
                }
                totalSize = totalSize + curSize;
            });
        }
    };

    that.accordion = accordion;
})(jQuery,this);


//还剩可输入字数提示
function numCharLeft(that, pos, maxNum, lablTag) {
    var maxLen = maxNum,
        len = jq(that).val().length,
        obj = pos;
    var labl = lablTag || "em";
    if(len >= maxLen) {
        obj.html('已达到最大字数限制');
        jq(that).val(jq(that).val().substr(0,maxLen));
    } else {
        obj.html('还可以输入 <'+ labl +'>'+(maxLen - len)+'</'+ labl +'> 字')  ;
    }
}

//问吧首页-- index.html
(function(jq,that){
        var askIndex = {
            init:function(){
                initEvent();
            }
        };
        function initEvent(){
            //本处失去焦点后颜色与全站不同，特殊处理如下
            jq("div.search_input > input").unbind('blur').bind("blur",function(e){
                jq(this).css("border-color","#01af63");    
            });
            //占位处理
            jq("div.search_input > input").placeholder({oLabel: 'label'});
            jq("input#your_name").placeholder();
            jq("input#your_phone").placeholder();

            //左侧分类导航滑动效果
            new accordion({
                target: jq('.ask_type'),
                items: jq('.ask_type_item'),
                orientation: 'vertical',
                boxFoldSize: 650 //全部折叠，只展示两行的高度值
            });

            jq("input.btn_org").bind('click', function(e) {
                var res = initValidate();
                if(res){
                    //TODO 提交数据
                    var chenghu=jq('#your_name').val();
                    var phone=jq('#your_phone').val();
                    var rsastr='1';
                    askUpLoadData('1_3_4_10',chenghu,phone,'','',rsastr);
                }
            });
            var fixObj = jq('#zxbjFrame'),
                rightWrap = jq('.col3_3'),
                fixObjPh = rightWrap.offset().top + rightWrap.height(),
                origWidth = rightWrap.width(),
                bwer = checkBrowser(),
                ie6 = false; 
            if(bwer.name == "msie" && bwer.version == 6) {
                ie6 = true; 
            };
            jq(window).bind('scroll', function() {
                var sh = document.documentElement.scrollTop || document.body.scrollTop;
        
                if(fixObjPh <= sh && !ie6) {
                    fixObj.addClass('fm_locate').css('width', origWidth+'px');
                } else {
                    fixObj.removeClass('fm_locate');
                }
            }); 
        }

        function initValidate(){
            var obj = jq('div.form_line');
            jq('#your_name').checkForm({className:"add_wrong",content:["称呼不可为空"],type:[1],checkFormType:obj, displayNum:true,labl:'i', lablClass: 'ico_error'})
            jq('#your_phone').checkForm({className:"add_wrong",content:["请填写手机号码","请正确填写手机号码"],type:[1,2], reg:0,checkFormType:obj, displayNum:true,labl:'i', lablClass: 'ico_error'});
            if(obj.find("div.add_wrong").length === 0){
                return true;
            }else{
                return false;
            }
        }

        that.askIndex = askIndex;

    })(jQuery,this);


//快速提问公共模块
(function(jq,that){
    var qicAsk ={
            init:function(){
                initEvent();
            }
    };
    //提交前合法性检测
    function initValidate() {
        var obj = jq('div.path_area');
        jq('#askTxt').checkForm({className:"form_error",content:["提问不可为空"],type:[1],checkFormType:obj, displayNum:true,labl:'i', lablClass: 'ico_error'})

        if(obj.find("div.form_error").length == 0) {
            return true;
        } else {
            return false;
        }
    }
    //初始化
    function initEvent(){
        //占位
        jq("#askTxt").placeholder({oLabel: 'label'});
        jq('#askTxt').bind('keyup',function() {
                var pos = jq('span.path_limit');
                numCharLeft(this, pos, 50);
            });

        //提交问题
         jq("a.path_btn").bind('click', function(e) {
            var res = initValidate();
            if(res){
                //TODO 提交数据
                var subject=jq('#askTxt').val();
                jq.ajax({
                    type:'post',
                    url:'ask_post.php',
                    data:{action:'fastask',subject:subject},
                    dataType:"json",
                    success: function (data) {
                        if(data.status=='ok') window.location.href='k'+data.str+'.html';
                        else if(data.status=='error') alert(data.str);
                        else if(data.status=='nocheck') askAlert();
                        else alert('快速提问失败，请稍后再试');
                    }
                })
            }
        })
    }
    that.qicAsk = qicAsk;
})(jQuery,this);


//免费申请公共模块
(function(jq,that){

    var freeApply ={
            init:function(){
                initEvent();
            }
    };
    //提交前合法性检测
    function initValidate() {
            var obj = jq('div.form_line'),
                a;
            jq('#your_name').checkForm({className:"form_error",content:["称呼不可为空"],type:[1],checkFormType:obj, displayNum:true,labl:'i', lablClass: 'ico_error'})
            jq('#your_phone').checkForm({className:"form_error",content:["请填写手机号码","请正确填写手机号码"],type:[1,2], reg:0,checkFormType:obj, displayNum:true,labl:'i', lablClass: 'ico_error'});

            a = jq("#User_Shen").checkForm({className:"form_error",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:obj, displayNum:true,checkType:"select",parCls:".element",labl:'i', lablClass: 'ico_error'});
            if( a === 0 ) {
                jq('#User_City').checkForm({className:"form_error",content:["请选择您的所在地"],type:[1], reg:1,checkFormType:obj, displayNum:true,checkType:"select",parCls:".element",labl:'i', lablClass: 'ico_error'});
            }

            if(obj.find("div.form_error").length == 0) {
                return true;
            } else {
                return false;
            }
    }
    //初始化
    function initEvent(){
        //占位
        jq("div.text_wrap > input").placeholder();

        //省市
        jq("#User_Shen").bind('change',function(e){
            changeProvince('User_Shen','User_City','User_Town');
        });
        jq("#User_City").bind('change',function(e){
            changeTown('User_Shen','User_City','User_Town');
        });

        //免费申请submit
         jq("input.btn_org").bind('click', function(e) {
            var res = initValidate();
            if(res){
                //TODO 提交数据
                var chenghu=jq('#your_name').val();
                var phone=jq('#your_phone').val();
                var shen=jq('#User_Shen').find("option:selected").val();
                var city=jq('#User_City').find("option:selected").val();
                if(jq('#ptag').val()=='show') var ptag='1_3_4_1';
                else var ptag='1_3_4_11';

                askUpLoadData(ptag,chenghu,phone,shen,city);
            }
        })
    }
    that.freeApply = freeApply;
})(jQuery,this);



//问吧分类页面 -- ask_class.html
(function(jq,that){
        var askClass ={
            init:function(){
                initEvent();
            }
        };

        function initEvent(){
            jq(".sort_state").hover(
              function(){
                jq(this).addClass("sort_state_hover");
              },function(){
                jq(this).removeClass("sort_state_hover");
              }
            );

            //Tab切换
            jq('div.mod_tab_hd > ul').tabToggle({toggleDiv:true, togDivObj: 'div.mod_tab_bd > div'});
            //底部Tab切换
            jq('div.tagtab_hd > ul').tabToggle({toggleDiv:true, togDivObj: 'div.tagtab_bd.clear'});
            //快速提问
            qicAsk.init();
            //免费申请
            freeApply.init();
        }
        that.askClass = askClass;
     })(jQuery,this);


//问吧搜索结果页面 -- ask_search.html
(function(jq,that){
        var askSearch ={
            init:function(){
                initEvent();
            }
        };
        function initEvent(){
            //底部Tab切换
            jq('div.tagtab_hd > ul').tabToggle({toggleDiv:true, togDivObj: 'div.tagtab_bd.clear'});
            //快速提问
            //qicAsk.init();
            //免费申请
            freeApply.init();
        }

        that.askSearch = askSearch;
})(jQuery,this);

 //问吧已解决页面 -- ask_solved.html
(function(jq,that){
        var askSolved1 ={
            init:function(){
            	initEvent();
            }
        };
        function initEvent(){
            //快速提问
            //qicAsk.init();
            //免费申请
            //freeApply.init();
        	
        	jq('#answer_question').on('submit', function() {		
				jq.ajax({
					type: 'post',
					url: 'ask_post.php',
					data: jq('#answer_question').serialize(),
					dataType: 'json',
					success: function(res) {
						jinBiNum(res.num);	
					}
				});
				
				return false;	
			});
        }
		
		//成功赚取金币弹窗
		function jinBiNum(num) {
			var successStr = '<div class="box_mobileverify_suc zxgxbg_coin_tips">\
								<div class="mod_pagetip">\
									<span class="mod_pagetip_ico"><em class="ico_tip_ok"></em></span>\
									<div class="mod_pagetip_bd">\
										<div class="mod_pagetip_title">恭喜您成功赚取<span>'+num+'</span>金币！</div>\
										<div class="mod_pagetip_btn">\
											<a href="javascript:askSolvedCloseFn();" class="btn_cancel">关闭</a>\
										</div>\
									</div>\
								</div>\
							</div>';
		
			jq('.window_box').windowBox({
			  width:454,
			  title:"",
			  closeFn: 'askSolvedCloseFn',
			  wbcStr:successStr
			});
		}

        that.askSolved1 = askSolved1;
})(jQuery,this);

function askSolvedCloseFn() {
	window_box_close();
	window.location.reload();	
}

// 问吧提问页面 -- ask_fill.html
(function(jq,that){
        var askFill ={
            init:function(){
                initEvent();
            }
        };

        function initEvent(){
            //占位
            jq("#title").placeholder()
            jq("#content").placeholder();

            jq("div.text_wrap")
                .on('keyup','#title',function(){
                    var pos = jq(this).parents("div.element").find('span.limit_num');
                    numCharLeft(this, pos, 50);
                })
                .on('keyup','#content',function(){
                    var pos = jq(this).parents("div.element").find('span.col_r');
                    numCharLeft(this, pos, 1500);
                });

            //省市
            jq("#User_Shen").bind('change',function(e){
                changeProvince('User_Shen','User_City','User_Town');
            });
            jq("#User_City").bind('change',function(e){
                changeTown('User_Shen','User_City','User_Town');
            });

            //插入图片
            jq('div.insert_img').on('change','input.input_file',function(){
                jq(this).hide();
                showFileName(jq(this).val(),jq(this).next('div.insert_img_modle'));
            })
            //删除图片
            jq('div.insert_img').on('click','a.btn_green_a',function(){
                jq(this).parents('div.insert_img').find('input.input_file').show();
                hideFileName(jq(this).parents('div.insert_img_modle'));
            })

            //提交问题submit
             jq("input.fill_btn").bind('click', function(e) {
                var res = initValidate();
                if(res){
                    //TODO 提交数据
                }
            });

        }

         //提交前合法性检测
        function initValidate() {
            var obj = jq('div.form_line');

            jq('#title').checkForm({className:"form_error",content:["问题标题不可为空"],type:[1],checkFormType:obj, displayNum:true,labl:'i', lablClass: 'ico_error'});
            jq("#procedure").checkForm({className:"form_error",content:["问题分类不可为空"],type:[1], reg:1,checkFormType:obj, displayNum:true,checkType:"select",parCls:".element",labl:'i', lablClass: 'ico_error'});
            jq("#check").checkForm({className:"form_error",content:["问题分类不可为空"],type:[1], reg:1,checkFormType:obj, displayNum:true,checkType:"select",parCls:".element",labl:'i', lablClass: 'ico_error'});

            if(obj.find("div.form_error").length == 0) {
                var uid=getCookie('to8to_uid',0);
                if(!uid){
                    showPopWin('../pop_login.php',376,263,null,false);
                    return false;
                }else{
                    jq("#ask_question").submit();
                }
            } else {
                return false;
            }
        }

        //插入图片
        function showFileName(filename,showDivObj){
            filename = filename.replace(/^.*[\\\/]/, '');
            if(filename.length>9){
                var ext  =/\.[^\.]+/.exec(filename);
                filename =filename.substr(0,5)+'... '+ext;
            }
            showDivObj.find('span:eq(1) > em').text(filename);
            showDivObj.find('span:eq(1)').show();
            showDivObj.find('span:eq(0)').hide()
        }
        //删除图片
        function hideFileName(showDivObj){
            showDivObj.find('span:eq(1)').hide();
            showDivObj.find('span:eq(0)').show()
        }

        that.askFill = askFill;

     })(jQuery,this);


    //问吧已解决页面 -- ask_solved.html
    (function(jq,that){
            var askSolved ={
                init:function(){
                    initEvent();
                },
                askHelpBox:function(name,id){
                    askHelpBox(name,id);
                },
                setBestAnswer:function(anid,ask_id,uid){
                    setBestAnswer(anid,ask_id,uid);
                }
            };
            function initEvent(){
                //快速提问
                //qicAsk.init();
                //免费申请
                //freeApply.init();

                //提交答案
                //占位
                jq("div.bg_f8f8f8 > textarea.ask_textarea_h100").one('keydown',function(){
                    if(jq(this).val()=='详细说明问题的情况，可获得更准确的回答'||jq(this).val()=='为问友提供尽可能准确、详细和有效的回答，被采纳后将获得5积分哦~') jq(this).val("");
                });
                jq("div.bg_f8f8f8 > textarea.ask_textarea_h100").one('focus',function(){
                    if(jq(this).val()=='详细说明问题的情况，可获得更准确的回答'||jq(this).val()=='为问友提供尽可能准确、详细和有效的回答，被采纳后将获得5积分哦~') jq(this).val("");
                });
                jq("div.bg_f8f8f8 > textarea.ask_textarea_h100").on('change',function(){
                    var str=jq(this).val();
                    str=str.replace(/为问友提供尽可能准确、详细和有效的回答，被采纳后将获得5积分哦~/, "");
                    jq(this).val(str);
                });
                jq("div.bg_f8f8f8").on('keyup',' textarea.ask_textarea_h100',function() {
                    var pos = jq(this).parent().find('span.col_r > span');
                    numCharLeft(this, pos, 1500,"label");
                })

                //补充问题(主人态)
                jq('div.bg_f8f8f8').on('click','a.ask_arrow_two',function(){
                    var tag = jq(this).find("i");
                    var isUp = tag.attr("class") === "ask_arrow_green_up"? true : false;
                    if(isUp){
                        jq(this).parent().siblings().slideDown();
                        tag.attr("class","ask_arrow_green_down");
                    }else{
                        jq(this).parent().siblings().slideUp();
                        tag.attr("class","ask_arrow_green_up");
                    }
                });


                //点击评论
                // jq('div.ask_btn_reply').on('click','a:eq(0)',function(){
                //     commentBox(this);
                // });
                //评论字符数提示
                // jq("div.ask_btn_reply").on('keyup','textarea.ask_textarea_h60',function(){
                //     //隐藏占位
                //     jq(this).siblings('em').hide();
                //     var pos = jq(this).parent().find('span.col_r > span');
                //     numCharLeft(this, pos, 200,"label");
                // });

                //绑定提交评论事件
                // jq('div.ask_btn_reply').on('click','input.btn_green',function(){
                //     commentSubmit(this);
                // });

                //插入图片
                jq('div.insert_img').on('change','input.input_file',function(){
                    jq(this).hide();
                    showFileName(jq(this).val(),jq(this).next('div.insert_img_modle'));
                })
                //删除图片
                jq('div.insert_img').on('click','a.ask_btn_green',function(){
                    //jq(this).parents('div.insert_img').find('input.input_file').show();
                    jq(this).parents('div.insert_img').find('input.input_file').remove();
                    var newInput = jq('<input type="file" class="input_file" name="插入图片" style="display: block;">')
                    jq(this).parents('div.insert_img').prepend(newInput);
                    hideFileName(jq(this).parents('div.insert_img_modle'));
                })

                //点击回复事件
                // jq('div.ask_btn_reply').on('click','dl.ask_answer_dl a',function(){
                //     var replayDl = jq(this).parents("dl.ask_answer_dl");
                //     var name = replayDl.find("dt > span.name").text();

                //     var textarea = jq(this).parents("dl.ask_answer_dl").siblings('textarea');
                //     textarea.val("");
                //     /*textarea.val("回复 "+name+"：");*/
                //     var pos = jq(this).parents("div.bg_f8f8f8").find('span.col_r > span');
                //     alert(textarea);
                //     numCharLeft(textarea, pos, 200,"label");
                //     //展示 回复头
                //     var rePlayHead = jq(this).parents("dl.ask_answer_dl").siblings('em');
                //     rePlayHead.find('span').html(name);
                //     rePlayHead.show();
                // });

                //设置为最佳答案
                //jq('input.btn_border_green:visible').on('click',function(){
                //    setBestAnswer();
                //});

                //显示求助
                var timer = null;
                jq('a.company_img').hover(function() {
                    jq(this).parent().find('div.tip_triangle_left').show();
                }, function() {
                    var tipDiv = jq(this).parent().find('div.tip_triangle_left');
                    timer = setTimeout(function() {
                       tipDiv.hide();
                    }, 500);
                });
                jq('div.tip_triangle_left').hover(function() {
                    clearTimeout(timer);
                }, function() {
                    jq(this).hide();
                });
                //点击求助
                //jq('div.company_case > input.btn_green').on('click',function(){
                //    askHelpBox();
                //});

                var fixObj = jq('#zxbjFrame'),
                    rightWrap = jq('.col2_2'),
                    fixObjPh = rightWrap.offset().top + rightWrap.height(),
                    origWidth = rightWrap.width(),
                    bwer = checkBrowser(),
                    ie6 = false; 
                if(bwer.name == "msie" && bwer.version == 6) {
                    ie6 = true; 
                };
                jq(window).bind('scroll', function() {
                    var sh = document.documentElement.scrollTop || document.body.scrollTop;
            
                    if(fixObjPh <= sh && !ie6) {
                        fixObj.addClass('fm_locate').css('width', origWidth+'px');
                    } else {
                        fixObj.removeClass('fm_locate');
                    }
                }); 
            }

            //向他求助
            function askHelpBox(name,id) {
                var username = getCookie('username', true);
                if (!username) {
                    setCookie('ask_help',1,24*60*60*1000);
                    setCookie('ask_name',encodeURIComponent(name),24*60*60*1000);
                    setCookie('ask_id',id,24*60*60*1000);
                    showPopWin('http://www.meijialz.com/pop_login.php', 376, 263, null, false);
                    return false;
                }else{
                    var exp = new Date();
                    exp.setTime(exp.getTime()-86400000);
                    document.cookie="ask_help="+getCookie('ask_help')+";expires="+exp.toGMTString()+";path=/;domain=.meijialz.com";
                    document.cookie="ask_name="+getCookie('ask_name')+";expires="+exp.toGMTString()+";path=/;domain=.meijialz.com";
                    document.cookie="ask_id="+getCookie('ask_id')+";expires="+exp.toGMTString()+";path=/;domain=.meijialz.com";
                }
                var str='<div class="free_apply clear free_apply_tip">'+
                                    '<div class="apply_line">'+
                                    '<label for="" class="app_lbl">收件人</label>'+
                                    '<div class="app_ele_w360">'+
                                    '<input type="hidden" id="helperid" value="'+id+'">'+
                                    '<input class="ap_text" readonly type="text" value="'+name+'" >'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="apply_line pt10">'+
                                       '<label for="" class="app_lbl">内容</label>'+
                                        '<div class="app_ele_w360">'+
                                           '<textarea id="subject" class="ap_textarea"></textarea>'+
                                       '</div>'+
                                    '</div>'+
                                    '<div class="apply_line apply_line_btn">'+
                                       '<div class="app_ele_w360">'+
                                          '<p class="ap_texts">字数限制<span>50</span>字</p>'+
                                       '</div>'+
                                   '</div>'+
                                   '<div class="apply_line ">'+
                                       '<div class="app_ele_w360">'+
                                          '<input type="button" class="btn_org" value="提交"/>'+
                                       '</div>'+
                                   '</div>'+
                            '</div>';
                    jq('.window_box').windowBox({
                      width:446,    //弹框宽度
                      title:"向他求助", //标题
                      wbcStr:str,  //可编辑内容
                      cancleBtn:false,    //是否显示取消按钮
                      confirmBtn:false,  // 是否显示确认按钮
                      callback:""
                    });
                    //字符数提示
                     jq('div.apply_line').on('keyup','textarea.ap_textarea',function() {
                        var pos = jq('p.ap_texts');
                        numCharLeft(this, pos, 50,"span");
                    });
                    //绑定提交事件
                    jq('.window_box').on('click','input.btn_org',function(){
                        askHelpSubmit();
                    });
                }
            //提交求助
            function askHelpSubmit() {
                //TODO 提交数据
                var helperid=jq("#helperid").val();
                var subject=jq("#subject").val();
                if(!subject){
                    alert('请输入求助内容');
                    return false;
                }
                jq.ajax({
                    type:'post',
                    url:'ask_post.php',
                    data:{action:'help',helperid:helperid,subject:subject},
                    dataType:"json",
                    success: function (data) {
                        if(data.status=='ok') askHelpSuccessBox();
						else if(data.status=='error') alert(data.str);
                        else if(data.status=='nocheck'){jq('.window_box').remove();jq('.translucence_layer').remove();askAlert();}
                        else alert('求助失败，请稍后再试');
                    }
                })
            }
            //求助成功弹窗
            function askHelpSuccessBox(){
                jq('.window_box').remove();

                var str='<div class="box_mobileverify_suc pb70">'+
                          '<div class="mod_pagetip mod_pagetip ">'+
                              '<span class="mod_pagetip_ico"><em class="ico_tip_ok"></em></span>'+
                              '<div class="mod_pagetip_bd special">'+
                                  '<div class="mod_pagetip_title">求助成功!</div>'+
                                  '<p>对方回复您之后，可在<a href="http://www.meijialz.com/my/" class="f_c_01af63">个人中心</a>或问答查看回复内容。</p>'+
                              '</div>'+
                          '</div>'+
                         ' </div>';
                jq('.window_box').windowBox({
                      width:446,    //弹框宽度
                      title:"", //标题
                      wbcStr:str,  //可编辑内容
                      cancleBtn:false,    //是否显示取消按钮
                      confirmBtn:false,  // 是否显示确认按钮
                      callback:""
                });
            }

            //插入图片
            function showFileName(filename,showDivObj){
                filename = filename.replace(/^.*[\\\/]/, '');
                if(filename.length>9){
                    var ext  =/\.[^\.]+/.exec(filename);
                    filename =filename.substr(0,5)+'... '+ext;
                }
                showDivObj.find('span:eq(1) > i').text(filename);
                showDivObj.find('span:eq(1)').show();
                showDivObj.find('span:eq(0)').hide()
            }
            //删除图片
            function hideFileName(showDivObj){
                showDivObj.find('span:eq(1)').hide();
                showDivObj.find('span:eq(0)').show()
            }
            ////评论
            //function commentBox(obj) {
            //    var parentObj = jq(obj).parents('div.ask_btn_reply'),
            //        boxObj = parentObj.find('div.bg_f8f8f8'),
            //        str = '';
            //    var isBest = jq(obj).parents('div.ask_qustion.best_answer').length >0 ? true : false;
            //    var divCss = isBest ? 'bg_f8f8f8' :  'bg_f8f8f8 mtb10_ptl20';
            //    var divTip = isBest ? '<em style="display:none"> 回复&nbsp;<span></span>:</em>' : '<em class="reply" style="display:none"> 回复&nbsp;<span></span>:</em>';
            //    if(boxObj.length == 0) {
            //        str ='<div class="'+ divCss +'">'+
            //                '<textarea class="ask_textarea_h60"></textarea>' + divTip +
            //                '<div class="insert_img">'+
            //                    '<input type="file" class="input_file" name="插入图片"/>'+
            //                    '<div class="insert_img_modle pbr20 clear">'+
            //                        '<span class="col_r"><span>还可以输入<label>200</label>字</span><input type="button" class="btn_green ml10" value="提交答案" /></span>'+
            //                    '</div>'+
            //                '</div>'+
            //                '<dl class="ask_answer_dl">'+
            //                   ' <dt><span class="name">王大帅</span><i class="time">2014-03-21 23:56</i></dt>'+
            //                   ' <dd>亲，你造么，我只是为了主题！~亲，你造么，我只是为了主题！亲，你造么斯蒂多少芬森分辅导费我只是为了主题！亲，你造么，我只是为了主题！亲，你造么，我只是为了主题！<a href="javascript:void(0)">回复</a></dd>'+
            //                '</dl>'+
            //                ' <dl class="ask_answer_dl">'+
            //                   ' <dt><span class="name">王大帅</span><i class="time">2014-03-21 23:56</i></dt>'+
            //                    '<dd>亲，你造么，我只是为了主题！~亲，你造么，我只是为了主题！亲，你造么斯蒂多少芬森分辅导费我只是为了主题！亲，你造么，我只是为了主题！亲，你造么，我只是为了主题！<a href="javascript:void(0)">回复</a></dd>'+
            //                '</dl>'+
            //               ' <b class="ask_arrow_down left"></b>'+
            //            '</div>'
            //         parentObj.append(str);
            //    }
            //
            //    parentObj.find('div.bg_f8f8f8').slideDown();
            //}
            ////提交评论
            //function commentSubmit(obj) {
            //    var a = jq(obj).parents('.bg_f8f8f8').find('textarea').checkForm({className:"add_wrong",content:["请填写评论内容"],type:[1], reg:0,checkFormType:obj, displayNum:true, labl:'i', lablClass: 'ico_error'});
            //
            //    if(a === 0) {
            //        //TODO 提交数据
            //    }
            //}
            /*//取消评论
            function  cancelcomment(obj) {
                jq(obj).parents('.rating_fill_comment').slideUp(function() {
                    jq(this).remove();
                });
            }*/

            //补充问题

            //设置最佳答案事件
            function setBestAnswer(anid,ask_id,uid){
                var successStr = '<div class="mod_pagetip mod_pagetip_noinfo"><span class="mod_pagetip_ico"><em class="ico_tip_warn"></em></span><div class="mod_pagetip_bd"><div class="mod_pagetip_title">您确定要将其设为最佳答案吗？</div><div class="mod_pagetip_btn"><a href="javascript:;" class="btn_yes">确定</a> <a href="javascript:;" class="btn_cancel">取消</a></div></div></div>';
                jq('.window_box').windowBox({
                  width:460,
                  title:"提示",
                  wbcStr:successStr
                });

                 //绑定事件
                jq('.window_box').on('click','a.btn_yes',function(){
                    if(anid){
                        jq.ajax({
                            type:'post',
                            url:'ask_post.php',
                            data:{action:'best',anid:anid,ask_id:ask_id,uid:uid},
                            dataType:"json",
                            success: function (data) {
                                if(data.status=='ok') setBestAnswerSuccess();
								else if(data.status=='error') alert(data.str);
                                else if(data.status=='nocheck'){jq('.window_box').remove();jq('.translucence_layer').remove();askAlert();}
                                else alert('设置最佳答案失败，请稍后再试');
                            }
                        })
                    }
                })
                .on('click','a.btn_cancel',function(){
                    window_box_close();
                });
            }
            //设置最佳答案成功
            function setBestAnswerSuccess(){
                //隐藏所有“设为最佳答案”的按钮
                jq('input.btn_border_green').hide();

                 //关闭确认框
                window_box_close();
                location.reload();
            }
            that.askSolved = askSolved;
    })(jQuery,this);

function askAlert(){
    document.domain='meijialz.com';
    var str='<div class="box_mobileverify_suc pb70">'+
            '<div class="window_box_check">'+
            '<p>尊敬的用户，您的账号未经验证。</p>'+
            '<p>需验证账号后才可提问和回答。</p>'+
            '<a class="f_c_01af63" href="http://www.meijialz.com/my/yz_administration_self.php?act=4">去验证账号&nbsp;&nbsp;&gt;&gt;</a>'+
            '</div>'+
            '</div>';
    jq('.window_box').windowBox({
        width:460,
        title:"提示",
        wbcStr:str
    });
    jq('.window_box').on('click','a.window_box_close',function(){
        window_box_close();
    });
}

//招标
function askUpLoadData(ptag, chenghu, phone, shen, city, rsastr) {
    var str = '';
    if (shen){
    	str += "&shen=" + shen;
    }
    if (city){
        str += "&city=" + city;
    } 
    
    var phones = phone;
    
    var yuyue_apply_agin;
    
    clickStream.getCvParams(ptag);
    var url = "/zb/index.php";
    //加密
      var encryptData = rsaEncryptNameAndPhone({phoneObj:jq('#your_phone'),chenhuObj:jq('#your_name')});


    var _data = "ptag=" + ptag + str+encryptData;
    /*******************************微信招标************************************/
    var weixin_code = '';
    var start_qrcode_id = '';
    jq.ajax({
        async: true,
        type: "GET",
        dataType: 'jsonp',
        url: "http://www.meijialz.com/api/weixin/run.php",
        data: {action: 'createQrcode', cookie_id: 'test', data: 'createWxCode', type: 1},
        success: function (res) {
            if (res.code == 0) {
                weixin_code = res.url;
                start_qrcode_id = res.qrcode_id;
                /*******************************微信招标************************************/
                jq.ajax({
                    type: "POST",
                    url: url,
                    data: _data,
                    beforeSend: function () {
                	//alert(phone);
                        var reg1 = /^((\(\d{2,3}\))|(\d{3}\-))?(13|15|17|18)\d{9}$/;
                        if (!reg1.test(phone)) {
                            return false;
                        }
       
                        if (!chenghu || chenghu == "请填写您的姓名") {
                            return false;
                        }
                        if (yuyue_apply_agin > 0) {
                            return false;
                        } else {
                            yuyue_apply_agin++;
                        }
                       
                    },
                    
                    success: function (result) {
                        if (typeof(JSON) == "undefined") {
                            var res = eval("(" + result + ")")
                        } else {
                            var res = JSON.parse(result)
                        }
                        if (res.status == 1) {
                            if (!res.tmpYid) {
                                overFive();
                            }
                            var successStr = zb_first_pop(weixin_code,res.tmpYid);
									jq('.window_box').windowBox({
									  width:560,
									  title:"提示",
									  wbcStr:successStr,
								  		closeFn:'stop_code_status'
									});
                            zb_getwxstatus(start_qrcode_id, res.tmpYid);
                            return false;
                        }
                        else if (res.status == 5) {
                            window_box_close();
                            indexYYFail(res.cityname);
                            return false;
                        }
                        else {
                            var cityname = encodeURI(res.cityname);
                            var tyid = encodeURI(res.tmpid);
                            showPopWin("http://www.meijialz.com/zb/frame_global.php?msg=" + cityname + "&tyid=" + tyid, 456, 254, null, true);
                        }
                        yuyue_apply_agin = 0
                    }
                    
                })
                /*******************************微信招标************************************/
            }
            else {
                alert(res.msg);
            }

        }
    });
    /*******************************微信招标************************************/
}
//完善招标资料
function indexSubZbStepOne() {
    var phone = jq("#stepOnePhone").val();
    var tmpYid = jq("#stepOneTmpYid").val();
	var encryptData = rsaEncryptNameAndPhone({phoneObj: jq('#stepOnePhone')});
    jq.ajax({
        type: "POST",
        url: "/zb/index.php",
        data: "step=1&tmpYid=" + tmpYid+encryptData,
        success: function (result) {
            var res = JSON.parse(result);
            jq('.window_box').remove();
            jq('.translucence_layer').remove();
            var successStr = '<div class="mod_fbbox">' +
                '<div class="fbbox_s2">' +
                '<div class="s2_line">' +
                '<label for="" class="label">建筑面积</label>' +
                '<div class="s2_element">' +
                '<div><input type="text" class="text" name="oarea" id="oarea"><em class="text_uni">㎡</em></div>' +
                '<div class="err_tip"  style="display:none"><span class="ico_error"></span>请填写合理的建筑面积</div>' +
                '</div>' +
                '</div>';
            if (res.zxys == '' || res.zxys == 0) {
                successStr += '<div class="s2_line">' +
                '<label for="" class="label">装修预算</label>' +
                '<div class="s2_element">' +
                '<div>' +
                '<select class="select" name="zxys" id="zxys">' +
                '<option value="3万以下">3万以下</option>' +
                '<option value="3-5万">3-5万</option>' +
                '<option value="5-8万">5-8万</option>' +
                '<option value="8-12万">8-12万</option>' +
                '<option value="12-18万">12-18万</option>' +
                '<option value="18-30万">18-30万</option>' +
                '<option value="30万以上">30万以上</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</div>';
            }
            ;
            if (res.demo_zxtype == '' || res.demo_zxtype == 0) {
                successStr += '<div class="s2_line">' +
                '<label for="" class="label">装修类型</label>' +
                '<div class="s2_element">' +
                '<div>' +
                '<select class="select" name="zxtype" id="txttype">' +
                '<option value="新房装修" selected="">新房装修</option>' +
                '<option value="旧房翻新">旧房翻新</option>' +
                '<option value="办公室装修">办公室装修</option>' +
                '<option value="店铺装修">店铺装修</option>' +
                '<option value="餐厅装修">餐厅装修</option>' +
                '<option value="酒店装修">酒店装修</option>' +
                '<option value="其他类型">其他类型</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</div>';
            }
            else {
                successStr += '<input type="hidden" id="txttype_1" value="' + res.demo + '" name="zxtype">';
            }
            ;
            successStr += '<div class="s2_line">' +
            '<label for="" class="label">装修时间</label>' +
            '<div class="s2_element">' +
            '<div>' +
            '<select class="select" name="zxtime" id="zxtime">' +
            '<option value="准备一个月内装修">准备一个月内装修</option>' +
            '<option value="准备一至三个月内装修">准备一至三个月内装修</option>' +
            '<option value="准备三至六个月内装修">准备三至六个月内装修</option>' +
            '<option value="暂时没有装修计划">暂时没有装修计划</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '</div>';
            if (res.shen == '' || res.shen == 0) {
                successStr += '<div class="s2_line">' +
                '<label for="" class="label">所在城市</label>' +
                '<div class="s2_element">' +
                '<div class="clear">' +
                '<select  class="select select_s" id="User_Shen"  name="User_Shen" onChange="changeProvince(' + "User_Shen" + ',' + "User_City" + ',' + "User_Town" + ');"></select>' +
                '<select  class="select select_s" id="User_City" name="User_City" ></select><div style="display:none"><select name="User_Town" id="User_Town" style="display:none"><option value="">' + '--</option></select></div>' +
                '</div>' +
                '<div class="err_tip"  style="display:none"><span class="ico_error"></span>请选择城市名称</div>' +
                '</div>' +
                '</div>';
            }
            else {
                successStr += '<input type="hidden" id="User_Shen_1" value="' + res.shen + '" name="User_Shen"><input type="hidden" id="User_City_1" value="' + res.city + '" name="User_City">';
            }
            ;
            successStr += '<div class="s2_line s2_line_btn">' +
            '<div class="s2_element">' +
            '<input type="hidden" value="' + res.yid + '" name="tyid" id="tyid">' +
            '<input type="hidden" value="' + res.shen + '" name="shen_zb" id="shen_zb">' +
            '<input type="button" value="确定" class="mod_fbbox_btn" onclick="selectConfirmZbOver();">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
            jq('.window_box').windowBox({
                width: 480,
                title: "请完善您的资料",
                wbcStr: successStr
            });
            if (res.shen == '' || res.shen == 0) {
                var gpm = new GlobalProvincesModule;               //城市类
                gpm.def_province = ["省/市", ""];
                gpm.def_city1 = ["市/地区", ""];
                gpm.initProvince($('User_Shen'));
                gpm.initCity1($('User_City'), gpm.getSelValue($('User_Shen')));
            }
            //showPopWin("http://www.meijialz.com/zb/frame_global_step_one.php?phone=" + res.phone + "&yid=" + res.yid, 480, 428, null, true);
        }
    });
};

var zb_wxstart_msg = '扫描二维码，实时获取装修进度';
var zb_wxinfo_msg = '去完善更多资料吧，我们将优先为您免费服务！';
//招标完善资料最后一步
function selectConfirmZbOver() {
    var zb_wxover_msg = '<p class="pb">想省心省钱不被坑 来装修学堂就够了。</p><a target="_blank" class="mod_fbbox_btn btn_01af63" href="http://www.meijialz.com/huodong/tuangou.php?id=126&ptag=5_6_1">免费学装修</a>';
	if (isNaN(jq("#oarea").val()) || jq("#oarea").val() == '' || jq("#oarea").val() == '0') {
        jq("#oarea").parent().parent().find(".err_tip").css('display', "block");
        jq("#oarea").focus();
        setTimeout(function () {
            jq("#oarea").parent().parent().find(".err_tip").css("display", "none");
        }, 2500);
        return;
    }
    ;
    if (!jq("#shen_zb").val() && (!jq("#User_Shen").val() || !jq("#User_City").val())) {
        jq("#User_Shen").parent().parent().find(".err_tip").css('display', "block");
        setTimeout(function () {
            jq("#User_Shen").parent().parent().find(".err_tip").css("display", "none");
        }, 2500);
        jq("#User_Shen").focus();
        return;
    }
    ;
    var User_Shen = jq("#User_Shen").val();
    var User_City = jq("#User_City").val();
    if (jq("#User_Shen_1").val()) {
        User_Shen = jq("#User_Shen_1").val();
    }
    ;
    if (jq("#User_City_1").val()) {
        User_City = jq("#User_City_1").val();
    }
    ;
    var oarea = jq("#oarea").val();
    var zxys = jq("#zxys").val();
    var zxtype = jq("#txttype").val();
    if (jq("#txttype_1").val()) {
        zxtype = jq("#txttype_1").val();
    }
    ;
    var zxtime = jq("#zxtime").val();
    var tyid = jq("#tyid").val();
    /*******************************微信招标************************************/
    status_request.abort();
    var weixin_code = '';
    var over_qrcode_id = '';
    jq.ajax({
        async: true,
        type: "GET",
        dataType: 'jsonp',
        url: "http://www.meijialz.com/api/weixin/run.php",
        data: {action: 'createQrcode', cookie_id: 'test', data: 'createWxCode', type: 1},
        success: function (res) {
            if (res.code == 0) {
                weixin_code = res.url;
                over_qrcode_id = res.qrcode_id;
                /*******************************微信招标************************************/
                jq.ajax({
                    type: "POST",
                    url: "/zb/index.php",
                    data: {
                        invite: 2,
                        User_City: User_City,
                        tyid: tyid,
                        User_Shen: User_Shen,
                        oarea: oarea,
                        zxys: zxys,
                        zxtype: zxtype,
                        zxtime: zxtime
                    },
                    success: function (result) {
                        jq('.window_box').remove();
                        jq('.translucence_layer').remove();
                        if (typeof(JSON) == "undefined") {
                            var res = eval("(" + result + ")")
                        } else {
                            var res = JSON.parse(result)
                        }
                        ;
                        if (res.status == 4) {
                            window_box_close();
                            indexYYFail(res.cityname);
                            return false;
                            //backFirstFrame();
                            //jq("#tmpCity").html(res.cityname);
                        }
                        else {
                            jq('.window_box').remove();
							if(res.cityname != "深圳" && res.cityname != "南京" && res.cityname != "广州") {
								  zb_wxover_msg = "您的申请正在加速处理中...";
							}
                            var successStr = '<div class="mod_fbbox">' +
                                '<div class="fbbox_s3">' +
                                '<div class="mod_pagetip">' +
                                '<span class="mod_pagetip_ico"><em class="ico_tip_ok"></em></span>' +
                                '<div class="mod_pagetip_bd compatibility">' +
                                '<div class="mod_pagetip_title">恭喜您成功完善资料！</div>' +
                                '<div class="mod_pagetip_info">' + zb_wxover_msg + '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="mod_fbbox_code">' +//扫码状态
                                '<span class="logo"></span>' +
                                '<img src="' + weixin_code + '" id="weixin_img">' +
                                '<p id="code_message">' + zb_wxstart_msg + '</p>' +
                                '</div>' +
                                '<div class="mod_pagetip mod_pagetip_s mod_pagetips_noinfo" style="display:none" id="status_success">' +
                                '<span class="mod_pagetip_ico"><em class="ico_tip_ok_s"></em></span>' +
                                '<div class="mod_pagetip_bd">' +
                                '<div class="mod_pagetip_title">扫描成功</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="mod_pagetip mod_pagetip_s" id="status_fail" style="display:none">' +
                                '<span class="mod_pagetip_ico"><em class="ico_tip_warn_s"></em></span>' +
                                '<div class="mod_pagetip_bd">' +
                                '<div class="mod_pagetip_title">二维码失效</div>' +
                                '<div class="mod_pagetip_info">请点击<a href="javascript:;" onclick="getnewcode(' + res.tmpYid + ')">刷新二维码</a></div>' +
                                '</div>' +
                                '</div>' +//扫码状态
                                '</div>' +
                                '</div>';
                            jq('.window_box').windowBox({
                                width: 480,
                                title: "提示",
                                wbcStr: successStr
                            });
                            zb_getwxstatus(over_qrcode_id, tyid);
                        }
                        ;
                    }
                });
                /*******************************微信招标************************************/
            }
            else {
                alert(res.msg);
            }
        }
    });
    /*******************************微信招标************************************/
};
//未开通城市是失败
function indexYYFail(cityname) {
    var failStr = '<div class="apply_fail"><span class="as_fail"></span><strong>非常抱歉,您当前的城市' + cityname + '尚未开通<br />装修服务，敬请期待！</strong></div>';
    jq('.window_box').windowBox({
        width: 480,
        height: 200,
        title: "提示",
        wbcStr: failStr,
        closeTime: 6000
    });
};
//申请次数超过五次
function overFive() {
    var str = '<span style="float:left; width:100%; height:14px;line-height:14px;margin:20px 0;text-align:center;*padding-bottom:20px">申请次数超过五次</span>';
    jq('.window_box').remove();
    jq('.translucence_layer').remove();
    jq('.window_box').windowBox({
        width: 480,
        title: "提示",
        wbcStr: str
    });
}
//获取微信扫码状态
var status_num = 0;
var status_request;
function zb_getwxstatus(zb_qrcode_id, yid) {
    status_request = jq.ajax({
        async: true,
        type: "GET",
        dataType: 'jsonp',
        url: "http://www.meijialz.com/api/weixin/run.php",
        data: {action: 'getScanState', cookie_id: 'test', qrcode_id: zb_qrcode_id},
        timeout: 15000,     //ajax请求超时时间30秒
        success: function (res, textStatus) {
            if (res.code == "405") {
                if (status_num < 19)//一分钟
                {
                    status_num++;
                    zb_getwxstatus(zb_qrcode_id, yid);
                } else {
                    jq("#code_message").hide();
                    jq("#status_fail").show();
                }
            }
            if (res.code == "0") {
                jq("#code_message").hide();
                jq("#status_success").show();
                //zb_getwxuser(zb_qrcode_id,yid);
                jq.ajax({
                    async: true,
                    type: "GET",
                    dataType: 'jsonp',
                    url: "http://www.meijialz.com/zb/index.php",
                    data: {
                        weixin_act: 'weixin_banding',
                        yid: yid,
                        open_id: res.user.openid,
                        unionID: res.user.unionID,
                        header_url: res.user.pic_header_url,
                        user_name: res.user.nickname,
                        qrcode_id: zb_qrcode_id
                    },
                    success: function (data) {
                        if (data.code == "0") {
                            alert(data.msg);
                        }
                    }
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus == "timeout") {
                if (status_num < 19)//一分钟
                {
                    status_num++;
                    zb_getwxstatus(zb_qrcode_id, yid);
                } else {
                    jq("#code_message").hide();
                    jq("#status_fail").show();
                }
            }
        }
    });
}
function getnewcode(tmpYid) {
    var weixin_code = '';
    jq.ajax({
        async: true,
        type: "GET",
        dataType: 'jsonp',
        url: "http://www.meijialz.com/api/weixin/run.php",
        data: {action: 'createQrcode', cookie_id: 'test', data: 'createWxCode', type: 1},
        success: function (res) {
            if (res.code == 0) {
                jq("#status_fail").hide();
                jq("#code_message").show();
                jq("#weixin_img").attr('src', res.url);
                zb_getwxstatus(res.qrcode_id, tmpYid);
            }
            else {
                alert(res.msg);
            }

        }
    });
}


jq(function(){
    jq(".show_zxlhl").bind('click',function(){
    checkPhone();
      jq(':submit.btn_org').css({ background:'#e7691e',color:'#fff'});
   })
})

 //手机验证弹窗
function checkPhone() {
    var str = '<form id="checkPhoneForm">\
        <div class="box_mobileverify">\
            <div class="mod_form zxbj_phone_code">\
                <div class="form_hd">\
                    <i class="ico_info_s"></i>\
                    我们将把结果短信发送到您的手机上，请注意查收。\
                </div>\
                <div class="form_line">\
                    <label for="" class="label">手机号码</label>\
                    <div class="element">\
                        <input type="text" class="text_num" id="zxbj_phonenum">\
                    </div>\
                </div>\
                <div class="form_line">\
                    <label for="" class="label">验证码</label>\
                    <div class="element">\
                        <div class="text_wrap clear code_wrap">\
                            <input type="text" id="ck_phone_code" class="text text_code" name="id_code">\
                             <img src="http://www.meijialz.com/passport.php" id="passport1" class="passport img_yzm_a" width="124" height="34">\
                        </div>\
                    </div>\
                </div>\
                <div class="form_line">\
                    <div class="element">\
                        <input type="submit" class="btn_org" value="立即发送">\
                    </div>\
                </div>\
            </div>\
        </div>\
    </form>';

     jq('.window_box').windowBox({
            width: 500,
            title: "算算你哪天装修最吉利",
            wbcStr: str
        });

      jq(".img_yzm_a").click(function(event) {

        var idCode=jq("#passport1");
            str = window.location.href.toString().split('.')[0].replace('http://', "") || 'www',
            A = new Date().getTime();
            idCode.attr('src','http://'+str+'.meijialz.com/passport.php?t=' + A);
             
         });
        
        jq('#checkPhoneForm').on('submit', function() {
            var chkArr = [{id:'#zxbj_phonenum', info:[{reg:[0],tip:'请输入手机号码'}, {reg:[/^1[34578][0-9]{1}[0-9]{8}$/], tip: '请输入正确手机号码'}], parCls: '.element'}, {id: '#ck_phone_code', info: [{reg: [0], tip: '请输入验证码'}]}];

            var result = simplifyCheck2(chkArr);
            var phone = jq("#zxbj_phonenum").val();
            if(result) {
                        jq.ajax({
                            type: "GET",
                            url: "/my/get_moblie_yz.php",
                            dataType: 'json',
                            data: {ajax:1, rand_num: jq('#ck_phone_code').val()},
                            success:function(data){
                                if(data == 1) {//验证码正确
                                    window_box_close();
                                    SubmitZXR(phone);
                                }else{
                                    mitZXBJFlag = true;
                                    alert('验证码错误');
                                    jq('#ck_phone_code').focus();
                                }
                            }
                        });
                    }
            return false;
        });
        
}

function SubmitZXR(phone)
{
      jq.ajax({
            'type':'post',
            'url':'http://www.meijialz.com/zb/fzb_sem.php?',
            'data':{'type':'zxr','phone':phone,'s_sourceid':20,'sourceid':3,'ptag':'1_3_5_101'},
            success:function(responseText){
                   alert('已将信息发送至您的手机！');
            }
        })
}