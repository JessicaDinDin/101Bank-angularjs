"use strict";angular.module("app",["ui.router","ngCookies","validation"]),angular.module("app").value("dict",{}).run(["dict","$http",function(t,e){e.get("data/city.json").success(function(e){t.city=e}),e.get("data/salary.json").success(function(e){t.salary=e}),e.get("data/scale.json").success(function(e){t.scale=e})}]),angular.module("app").config(["$provide",function(e){e.decorator("$http",["$delegate","$q",function(i,r){return i.post=function(e,t,o){var n=r.defer();return i.get(e).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),{success:function(e){n.promise.then(e)},error:function(e){n.promise.then(null,e)}}},i}])}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}),t.otherwise("main")}]),angular.module("app").config(["$validationProvider",function(e){e.setExpression({phone:/^0[\d]{9}$/,password:function(e){return 5<(e+"").length},required:function(e){return!!e}}).setDefaultMsg({phone:{success:"",error:"需10位數字"},password:{success:"",error:"長度6位"},required:{success:"",error:"不能空"}})}]),angular.module("app").controller("companyCtrl",["$http","$state","$scope",function(e,o,n){e.get("/data/company.json").success(function(e){console.log("res",e);for(var t=0;t<e.length;t++)e[t].id==o.params.id&&(n.company=e[t]);console.log("$scope.company",n.company)}).error(function(e){alert("出錯了!"),def.reject(e)})}]),angular.module("app").controller("favoriteCtrl",["$http","$scope",function(e,t){t.isShowPositionReport=!0,t.isShowfavorite=!0,e.get("data/myFavorite.json").success(function(e){t.list=e})}]),angular.module("app").controller("loginCtrl",["$state","$cookies","$http","$scope",function(t,o,e,n){console.log("AA"),n.submit=function(){console.log("login"),e.post("data/login.json",n.user).success(function(e){o.put("id",e.id),o.put("name",e.name),o.put("image",e.image),t.go("main")})}}]),angular.module("app").controller("mainCtrl",["$state","$cookies","$http","$scope",function(e,t,o,n){n.isShowReport=!0,o.get("/data/positionList.json").success(function(e){n.list=e}).error(function(e){alert("出錯了!")})}]),angular.module("app").controller("meCtrl",["$state","$cookies","$http","$scope",function(e,t,o,n){t.get("name")&&(n.name=t.get("name"),n.image=t.get("image")),n.logout=function(){t.remove("id"),t.remove("name"),t.remove("image"),e.go("main")}}]),angular.module("app").controller("positionCtrl",["$cookies","$q","$http","$state","$scope",function(e,t,n,o,i){var r;console.log("$state.params",o.params),i.isLogin=!1,(r=t.defer(),n.get("/data/position.json").success(function(e){console.log("res",e);for(var t=0;t<e.length;t++)e[t].id==o.params.id&&(i.position=e[t]);r.resolve(e)}).error(function(e){alert("出錯了!"),r.reject(e)}),r.promise).then(function(e){var o;o=i.position.companyId,console.log("companyId",o),n.get("/data/company.json").success(function(e){console.log("---res---",e);for(var t=0;t<e.length;t++)e[t].id==o&&(i.company=e[t]);console.log("$scope.company",i.company)}).error(function(e){alert("出錯了!")})},function(e){})}]),angular.module("app").controller("postCtrl",["$http","$scope",function(e,t){t.isShowPositionReport=!0,t.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面試邀請"},{id:"fail",name:"不適合"}],e.get("data/myPost.json").success(function(e){console.log("res",e),t.list=e}),t.filterObj={},t.click=function(e){switch(console.log(e),console.log("item.id",e.id),console.log("item.name",e.name),t.selsectId=e.id,e.id){case"all":delete t.filterObj.state;break;case"pass":t.filterObj.state="1";break;case"fail":t.filterObj.state="-1"}}}]),angular.module("app").controller("registerCtrl",["$interval","$http","$scope","$state",function(e,t,o,n){o.submit=function(){t.post("data/regist.json",o.user).success(function(e){console.log("resp",e),alert("注冊成功"),n.go("login")})}}]),angular.module("app").controller("searchCtrl",["dict","$state","$http","$scope",function(t,e,o,i){console.log("dict",t),i.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司規模"}],i.name="",i.search=function(){""==i.name?o.get("/data/positionList.json").success(function(e){i.list=e}).error(function(e){alert("出錯了!")}):(i.list="",o.get("/data/positionList.json").success(function(e){console.log("res",e),console.log("有文字",i.name);for(var t=[],o=0;o<e.length;o++)for(var n in e[o])-1<e[o][n].indexOf(i.name)&&t.push(e[o]);i.list=t,i.name=""}).error(function(e){alert("出錯了!")}))},i.search(),i.sheet={};var n="";i.click=function(e){console.log("item",e),n=e.id,i.selsectId=e.id,i.sheet.list=t[e.id],i.sheet.visible=!0,console.log("$scope.sheet",i.sheet)},i.filterObj={},i.sClick=function(e,t){console.log("id",e),console.log("name",t),e?(angular.forEach(i.tabList,function(e){e.id===n&&(e.name=t)}),i.filterObj[n+"Id"]=e):(delete i.filterObj[n+"Id"],angular.forEach(i.tabList,function(e){if(e.id===n)switch(e.id){case"city":e.name="城市";break;case"salary":e.name="薪水";break;case"scale":e.name="公司規模"}}))}}]),angular.module("app").directive("appAd",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/ad.html"}}]),angular.module("app").directive("appCompany",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/company.html",scope:{com:"="}}}]),angular.module("app").directive("appFooter",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appHead",["$cookies",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html",scope:{name:"="},link:function(e){e.isShowLoginBtn=!0,t.get("name")&&(e.isShowLoginBtn=!1),e.username=t.get("name")}}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{text:"@"},link:function(e,t,o){e.back=function(){window.history.back()}}}}]),angular.module("app").directive("appPositionClass",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionClass.html",scope:{com:"="},link:function(t){t.showPositionList=function(e){console.log("idx",e),t.positionList=t.com.positionClass[e].positionList,t.isActive=e},t.$watch("com",function(e){console.log("newVal",e),e&&t.showPositionList(0)})}}}]),angular.module("app").directive("appPositionInfo",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionInfo.html",scope:{isActive:"=",isLogin:"=",pos:"="},link:function(e,t,o){}}}]),angular.module("app").directive("appPositionList",["$cookies",function(e){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"=",filterObj:"=",showbtn:"=",report:"="},controller:function(o){o.name=e.get("name")||"",o.select=function(e,t){o.data.splice(t,1)}}}}]),angular.module("app").directive("appSheet",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/sheet.html",scope:{list:"=",visible:"=",select:"&"}}}]),angular.module("app").directive("appTab",[function(){return{restrict:"A",replace:!0,scope:{list:"=",tabClick:"&"},templateUrl:"view/template/tab.html",link:function(t){t.click=function(e){t.selectId=e.id,t.tabClick(e)}}}}]),angular.module("app").filter("filterByObj",[function(){return function(e,n){console.log("---list---",e),console.log("--obj--",n);var i=[];return angular.forEach(e,function(e){var t=!0;for(var o in n)e[o]!==n[o]&&(t=!1);t&&i.push(e)}),i}}]);