'use strict';
const fse = require('fs-extra');
module.exports = {
  files: function () {
    let imgs = '';
    fse.readdirSync('uploads/').forEach(file => {
      imgs += `<img src="http://10.114.32.145/node/uploads/${file}" />`
    });

    const page = `<style type="text/css">
		    body {
	   background-color: #349d8b;;
	    text-align: center;
	}
		.container {
			background-color:#fafafa;
			width: 80%;
			margin:0 auto;
			display: flex;
		}
		.container > img {
			width:200px;
			height: 200px;
		}
		</style>
		<div class="container"> ${imgs} </div>`;
    return page;
  }
}