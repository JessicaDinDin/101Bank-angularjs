1.安裝bower

$ npm install -g bower


==================================

1.建立一個資料匣webapp

2.安裝bower 
   	$ npm install -g bower


3.在CMD webapp資料匣下輸入 bower init
  
   	ps. 如果是在 bash 中下指令會報錯，須在 windows cmd 中下才行 



4.安裝ANGULARJS，在CMD webapp資料匣下輸入 

  	$ bower install --save angular

  	ps. pc端 要1.2版本  

      	移動端1.5版本  要遷換版本用#



5. 建立 .bowerrc 文件，來配置路徑，在CMD webapp資料匣下輸入 

	null>.bowerrc   , 雖然會報錯，但會創建文件!!

 
==================================

6. 全局安裝 gulp

	$ npm install --global gulp

7. 設定package.json 文件

	$ npm init

8. 把 gulp 保存於 package.json 文件中

	$ npm install --save-dev gulp

9. 把已下插件安裝一下

	$ npm i --save-dev gulp-clean gulp-concat gulp-connect gulp-cssmin gulp-imagemin gulp-less gulp-load-plugins gulp-uglify open




10 .配置 gulpfile 文件


11.bower install --save ui-router

===========================================
let cssmin  = require('gulp-clean-css');使用這個取代 壓縮CSS






