$(function (){
    /*点击全选按钮复选框*/
    $(".allCheck").change(function (){

        if ($(".allCheck").prop("checked")){
          $(".j-check").prop("checked",true);
        }else{
          $(".j-check").prop("checked",false);
        }

        allprice();
        allgoods();
    })
    //当取消一个复选框的选中，那就取消全选复选框的选中
    $(".j-check").change(function (){
      allprice();
      allgoods();
      $.each($(".j-check"),function (e,domE){
        if ($(domE).prop("checked")==false){
          $(".allCheck").prop("checked",false);
        }
      })
    })
    /*复选框发生改变*/
    $(".j-check").change(function (){
      allprice();
      allgoods();
      var num=0;
      $.each($(".j-check"),function (){
        if (!$(this).prop("checked")){
          num+=1;
        }
      })
      if (num==0){
        $(".allCheck").prop("checked",true);
      }
    })
    var num=1;
    //去除指定字符
    var reg=new RegExp("￥");
    /*数量增加*/
    $(".increment").click(function (){

      var nums=parseInt($(this).siblings(".num").val())+num;
      //添加数量
      $(this).siblings(".num").val(parseInt(nums));
      var price=parseFloat($(this).parent(".price-num").siblings(".price-g").html().replace(reg,"")).toFixed(2)
       $(this).parent(".price-num").siblings(".price-jiner").html("￥"+parseFloat(nums*price).toFixed(2));
      allprice();
      allgoods();
    })
    /*数量减少*/
    $(".decrement").click(function (){

      var nums=parseInt($(this).siblings(".num").val())-num;
      //获取当前货物的单价
      var price=parseFloat($(this).parent(".price-num").siblings(".price-g").html().replace(reg,"")).toFixed(2)
      if (parseInt($(this).siblings(".num").val())>1){
        $(this).siblings(".num").val(nums);
        $(this).parent(".price-num").siblings(".price-jiner").html("￥"+parseFloat(nums*price).toFixed(2));
      }else{
       confirm("数量不可减少！！");
      }
      allprice();
      allgoods();
    })
    /**/
    /*删除一个货物*/
    $(".del-d").click(function (){
      if ($(this).parent(".price-caozuo").siblings(".cart-j").children(".j-check").prop("checked")){
        $(this).parent(".price-caozuo").parent(".cart-item").remove();
        allprice();
        allgoods();
      }else{
        confirm("请勾选要删除宝贝！！");
      }

    })
    /*批量删除宝贝*/
    $(".clearAll").click(function (){
      var i=0;
      $(".j-check").each(function (e,domE){
        if ($(domE).prop("checked")){
          i++;
          $(domE).parent(".cart-j").parent(".cart-item").remove();
        }
      })
      allprice();
      allgoods();
      /*判断是否选中删除的货物*/
      if (i==0){
        confirm("请选中要删除的货物！！！")
      }

    })

    /*总价格*/
    function allprice(){
      var all=0;
      $(".j-check").each(function (){
        if ($(this).prop("checked")){
          var price=parseFloat($(this).parent(".cart-j").siblings(".price-jiner").html().replace(reg,"")).toFixed(2);
          all=parseFloat(all)+parseFloat(price);
        }

      })
      if (all==0){
        $(".priceAll").children("span").html('0.00 元')
      }else{
        $(".priceAll").children("span").html(parseFloat(all).toFixed(2)+" 元")
      }

    }
    /*结算，清除购物车要结算的商品*/
    $(".js-btn").click(function () {
      var i=0;
      $(".j-check").each(function (e,domE){
        if ($(domE).prop("checked")){
          i++;
        }
      })
      /*判断是否选中删除的货物*/
      if (i==0){
        confirm("请选中要购买的商品！！！")
      }else{
        if(confirm("请确认是否要支付")==true){

          $(".j-check").each(function (e,domE){
            if ($(domE).prop("checked")){
              i++;
              $(domE).parent(".cart-j").parent(".cart-item").remove();
              /*此处应有一个ajax将数据传入后台并跳转界面*/
            }
          })
          confirm("您已下单，宝贝正在运送的途中，请耐心等待");
        }
      }
      allprice();
      allgoods();
    })
  })
  /*商品总件数*/
  function allgoods(){
    var allgoods=0;
    $(".j-check").each(function (){
      if ($(this).prop("checked")){
        var goods=parseInt($(this).parent(".cart-j").siblings(".price-num").children(".num").val());
        allgoods=parseInt(allgoods)+parseInt(goods);
        console.log(parseInt(allgoods));
      }
    })
    if (allgoods==0){
      $(".spnum").children("em").html('0');
    }else {
      $(".spnum").children("em").html(parseInt(allgoods));
    }
  }






