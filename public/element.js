(function($){
  // **ListView class**: Our main app view.
  var ListView = Backbone.View.extend({
    el: $('body'), // attaches `this.el` to an existing element.
    events: {
       'focus  #parametervalue': 'addItem',//blur
       'click button#testport': 'getResult',
       'click button#BDocument':'saveDocument'
    },
    // `initialize()`: Automatically called upon instantiation. Where you make all types of bindings, _excluding_ UI events, such as clicks, etc.
    initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

       this.render(); // not all views are self-rendering. This one is.
    },
    // `render()`: Function in charge of rendering the entire view in `this.el`. Needs to be manually called by the user.
    render: function(){
      $(this.el).append("<h1 align=center>单元测试及接口文档生成页</h1>");
      $(this.el).append("<ul> <li>调用方式</li><select id = 'portway'> <option value ='post'> POST </option> <option value ='get'> GET </option> </select> </ul>");
      $(this.el).append("<ul> <li>接口地址</li><input type='text' id = 'porturl' name='porturl' size='75'></ul>")
      $(this.el).append("<ul> <li>输入参数</li></ul>")
      $(this.el).append("<div class = 'varDIV'><div class = 'variantDIV'><p>参数名称 ：参数值 &nbsp &nbsp <input class = 'parametername' type='text' id='parametername'> ：<input class ='parametervalue' type='text' id='parametervalue'></p></div></div>")
      $(this.el).append(" &nbsp &nbsp<button id='testport'>调用接口测试</button> &nbsp &nbsp");
      $(this.el).append("<button id='BDocument'>存入数据库</button>");
      $(this.el).append("<ul> <li>返回数据</li></ul>")
      $(this.el).append(" &nbsp &nbsp<pre id='myDiv' style='width:560px; height:320px;'></pre>");
    },

    addItem: function(){
      var variantname = $("#portvariant")
      $("#portvariant").val()
      $('.varDIV', this.el).append("<div class = 'variantDIV'><p>参数名称 ：参数值 &nbsp &nbsp <input class = 'parametername' type='text' id='parametername'> ：<input class ='parametervalue' type='text' id='parametervalue'></p></div>");
    },

    getResult: function(){
      $(document).ready(function(){
      $("#testport").click(function(){
        var porturl = $("#porturl").val();
        var portway = $("#portway").val();
        var portpariants = {};
        $(".variantDIV").each(function() {
          var parameternames = $(this).find(".parametername").val();
          console.log(parameternames)
          var parametervalues = $(this).find(".parametervalue").val();
          console.log(parametervalues)
          portpariants[parameternames] =parametervalues;
        });

    $.ajax({
      url: porturl,//"http://localhost:8129/yiyatong/StationSearch.ashx",
      type: portway,
      dataType: 'json',
      data: portpariants,//{Method:'GetServiceOrderListByOpenId',openId:'1'}
    })
    .done(function(res){
      if(res.status == 200){
        if(res.data.length == 0){
          $("#myDiv").html("没有数据");
        }
        else{
          var last = JSON.stringify(res,undefined, 2);
          last = syntaxHighlight(last);
          console.log(last);
          $("#myDiv").html(last);
          console.log($("#myDIV"));
      }

    }
    else{
        swal("呀",res.msg,"error");
      }
    })

    .fail(function(jaXHR, textStatus, errorThrown){
      swal("呀",textStatus,"error");
    })

      });
  });
 },

   saveDocument: function(){
    var message = {};//参数
    var methodname;
    $(".variantDIV").each(function() {

      var parameternames = $(this).find(".parametername").val();
      var parametervalues = $(this).find(".parametervalue").val();

       if(parameternames =="Method"){
        methodname = parametervalues;
       }
       else{
        message["portmethod"] = methodname;
        message[parameternames] =parametervalues;
       }
    });
    console.log(message);
    callAjax("/insert1",message);//保存参数列表

    var portinfo = {};//接口参数
    var porturl = $("#porturl").val();
    var portway = $("#portway").val();
    var portreturn = $("#myDiv").html();
    portinfo["portname"] = methodname;
    portinfo["porturl"] = porturl;
    portinfo["portway"] = portway;
    portinfo["portreturn"] = portreturn;
    portinfo["projectname"]='yiyatong';
    callAjax("/insert2",portinfo);//保存接口信息
   }

});
  // **listView instance**: Instantiate main app view.
  var listView = new ListView();
})(jQuery);

// function savePortinfo(){
//   var porturl = $("#porturl").val();
//   var portway = $("#portway").val();
// }

// function saveParamentlist(){
//   var message = {};
//   var methodname;
//   $(".variantDIV").each(function() {

//     var parameternames = $(this).find(".parametername").val();
//     var parametervalues = $(this).find(".parametervalue").val();

//      if(parameternames =="Method"){
//       methodname = parametervalues;
//      }
//      else{
//       message["portmethod"] = methodname;
//       message[parameternames] =parametervalues;
//      }
//   });
//   console.log(message);
//   callAjax("/insert1",message);//存储参数列表
// }

//AJAX请求
function callAjax(url,data){
  $.ajax({
  url: url,
  type: "POST",
  dataType: 'json',
  data: data,
  success:function(res){
    if(res.status == 200){
        if(res.data.length == 0){
          console.log("no data");
        }
        else{
          var last = JSON.stringify(res);
          console.log(last);
        }
      }
    },
    error:function(err){
      console.log(err);
    }
  });
}

//存入数据库按钮隐藏显示函数
$(document).ready(function(){
  $("#myDiv").change(function(){
    if($(this).val() == ""){
      $("#BDocument").hide();
    }
    else{
      $("#BDocument").show();
    }
  });
});

//json高亮显示
function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}