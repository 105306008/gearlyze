$(document).ready(function () {
    $("#article_ajax").click(function () {

        $.ajax({
            // type: 'GET',
            url: "/article_ajax/",
            data: {
                keyword: $('#keyword').val(),
				year: $('#year').val(),
				month: $('#month').val(),
				day: $('#day').val()
            },
            success: function(data) {

                // $('#test').append('test');
				if(data[0] == "noInput"){
					setNoInput();
				} else if (data[0] == "noArticle"){
					setNoArticle();
				}else {

					setData(data);
					setAriticle();
					setNowPage(1);

					$('html, body').animate({
						scrollTop: $("#article_ajax").offset().top
					}, 1);
				}
            },
			beforeSend: function(){
            	console.log('loading');
				document.getElementById('noData').innerHTML = '';
				$('#loading').show();
				$('#loading_br').show();
			},
			complete: function(){
            	console.log('OK!!');
            	$('#loading').hide();
				$('#loading_br').hide();
			}
		});
    });

});

var data;
var pageAmount;
var currentPage;
var onePageAmount = 10;
var aritcleAmount;

function setNoInput(){
	document.getElementById('noData').innerHTML = '<p>請輸入要查詢的關鍵字或起始日期！</p>';
}

function setNoArticle(){
	document.getElementById('noData').innerHTML = '<p>很抱歉，查無相關文章！</p>';
}

function setData(alldata){
	data = alldata;
	// console.log(data)
	currentPage = 1;
}

function setAriticle() {

	aritcleAmount = data.length;

	if (aritcleAmount % onePageAmount == 0) {
		pageAmount = parseInt(aritcleAmount / onePageAmount);
	} else {
		pageAmount = parseInt(aritcleAmount / onePageAmount) + 1;
	}

	console.log('setOK')
}

function setNowPage(nowPage) {
	if(nowPage >= 1 && nowPage <= pageAmount) {
		currentPage = nowPage
		var firstArticle = (currentPage - 1) * 10 + 1
		var totalArticle = []
		var html = '';


		if (currentPage != pageAmount) {
			for (i = 0; i < onePageAmount; i++) {
				totalArticle.push(data[firstArticle + i])
			}
		} else {
			for (i = 0; i < aritcleAmount - firstArticle; i++) {
				totalArticle.push(data[firstArticle + i])
			}
		}
		console.log(aritcleAmount, firstArticle)
		for (i = 0; i < totalArticle.length; i++) {
			html += '<p>' + totalArticle[i][1] + '　from　' + totalArticle[i][3] + '　<br><a href="' + totalArticle[i][2] + '" target="_blank">' + totalArticle[i][0] + '</a>　' + '</p>';

		}

		document.getElementById('article_page').innerHTML = html;
		setPagination(currentPage)
	}

}

function setPagination(nowPage){
	currentPage = parseInt(nowPage)
	var html;

	console.log(currentPage)

	if(pageAmount < 5){
		html = '<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage-1) + ')">«</a></li>\n';
		for(i=1;i<=pageAmount;i++){
			if(i == currentPage){
				html += '<li><a class="active">' + i +'</a></li>\n';

			}else{
				html += '<li><a href="#article_ajax" onclick="setNowPage(' + i + ')">' + i +'</a></li>\n';
			}
		}
		html += '<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 1) + ')">»</a></li>\n';
	}else {


		if (currentPage == 1) {
			html = '<li><a href="#">«</a></li>\n' +
				'<li><a class="active">' + currentPage + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 1) + ')">' + (currentPage + 1) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 2) + ')">' + (currentPage + 2) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 3) + ')">' + (currentPage + 3) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 4) + ')">' + (currentPage + 4) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 1) + ')">»</a></li>\n';
		} else if (currentPage == 2) {

			html = '<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 1) + ')">«</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 1) + ')">' + (currentPage - 1) + '</a></li>\n' +
				'<li><a class="active">' + currentPage + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 1) + ')">' + (currentPage + 1) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 2) + ')">' + (currentPage + 2) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 3) + ')">' + (currentPage + 3) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 1) + ')">»</a></li>\n';

		} else if (currentPage == pageAmount - 1) {

			html = '<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 1) + ')">«</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 4) + ')">' + (currentPage - 4) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 3) + ')">' + (currentPage - 3) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 2) + ')">' + (currentPage - 2) + '</a></li>\n' +
				'<li><a class="active">' + currentPage + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 1) + ')">' + (currentPage + 1) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 1) + ')">»</a></li>\n';

		} else if (currentPage == pageAmount) {

			html = '<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 1) + ')">«</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 4) + ')">' + (currentPage - 4) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 3) + ')">' + (currentPage - 3) + '</a></li>\n' +
				'<li><a href="#article_ajax "onclick="setNowPage(' + (currentPage - 2) + ')">' + (currentPage - 2) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 1) + ')">' + (currentPage - 1) + '</a></li>\n' +
				'<li><a class="active">' + currentPage + '</a></li>\n' +
				'<li><a  href="#article_ajax">»</a></li>\n';

		} else {

			html = '<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 1) + ')">«</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 2) + ')">' + (currentPage - 2) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage - 1) + ')">' + (currentPage - 1) + '</a></li>\n' +
				'<li><a class="active">' + currentPage + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 1) + ')">' + (currentPage + 1) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 2) + ')">' + (currentPage + 2) + '</a></li>\n' +
				'<li><a href="#article_ajax" onclick="setNowPage(' + (currentPage + 1) + ')">»</a></li>\n';

		}
	}

	document.getElementById('pagination').innerHTML = html

}
