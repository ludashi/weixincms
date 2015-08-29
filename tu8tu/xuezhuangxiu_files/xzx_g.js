jq(function(){
    jq('.xzx_secb a').each(function(index,ele){
        switch(index){
            case 0:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_4');
                });
                break;
            case 1:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_5');
                });
                break;
        }
    });
    jq('.bdl_item_xa a').each(function(index,ele){
        switch(index){
            case 0:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_21');
                });
                break;
            case 1:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_22');
                });
                break;
        }
    });
    jq('.bdl_item_xc').each(function(index,ele){
        switch(index){
            case 0:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_23');
                });
                break;
            case 1:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_24');
                });
                break;
            case 2:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_25');
                });
                break;
        }
    });

    jq('.bdl_item_fa a').each(function(index,ele){
        switch(index){
            case 0:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_26');
                });
                break;
            case 1:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_27');
                });
                break;
        }
    });
    jq('.bdl_item_fc').each(function(index,ele){
        switch(index){
            case 0:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_28');
                });
                break;
            case 1:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_29');
                });
                break;
            case 2:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_30');
                });
                break;
        }
    });

    jq('.item_video_s').each(function(index,ele){
        switch(index){
            case 0:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_31');
                });
                break;
            case 1:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_32');
                });
                break;
        }
    });
    jq('.item_video_x').each(function(index,ele){
        switch(index){
            case 0:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_33');
                });
                break;
            case 1:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_34');
                });
                break;
        }
    });

    jq('.sec_item_z').each(function(index,ele){
        switch(index){
            case 0:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_35');
                });
                break;
            case 1:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_36');
                });
                break;
            case 2:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_37');
                });
                break;
        }
    });
    jq('.img-ul li').each(function(index,ele){
        switch(index){
            case 0:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_38');
                });
                break;
            case 1:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_39');
                });
                break;
            case 2:
                jq(this).on('click',function(){
                    clickStream.getCvParams('1_3_5_40');
                });
                break;
        }
    });
    jq('.clickstream_tag').click(function() {
       var _tag = jq(this).attr('data-ptag');
        if (_tag) {
            try {
                clickStream.getCvParams(_tag);
            } catch (e) {

            }
        }
    });

})