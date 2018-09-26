function convertToCSV(args) {
	console.log("test", args);

	var result, lineDelimiter, data, i;

	data = args.data || null;
	if (data == null || !data.length) {
		return null;
	}

	lineDelimiter = '\n';
	result = '';
	console.log("length ", data.length);

	for (i = 0; i < data.length; i++) {
		result += data[i];
		result += lineDelimiter;
	}
	console.log(result);
	return result;
}

function downloadCSV(args) {
	var data, filename, link;

	var csv = convertToCSV({ data: args });
	data = args.data;
	if (csv == null) return;

	filename = 'export.csv';

	if (!csv.match(/^data:text\/csv/i)) {
		csv = 'data:text/csv;charset=utf-8,' + csv;
	}
	data = encodeURI(csv);

	link = document.createElement('a');
	link.setAttribute('href', data);
	link.setAttribute('download', filename);
	link.click();
}

window.onload = function(){

	document.getElementById('chenyu').addEventListener('click', function () {
		window.open("https://www.linkedin.com/in/chenyu-xue-b192a9161/");
	});

	document.getElementById('jiang').addEventListener('click', function () {
		window.open("https://www.linkedin.com/in/jiang-chang-a02098135/");
	});

	document.getElementById('imlc').addEventListener('click', function () {
		window.open("https://www.imlc.io");
	});

	document.getElementById('POPUP').addEventListener('click', function () {
		var popup = document.getElementById("myPopup");
		popup.classList.toggle("show");
	});

	chrome.storage.local.get(['log'], function(result) {
		console.log(result['log']);
		var i;
		var length = result['log'].length;
		var start = Math.max(0, length - 25);
		for (i = start; i < length; i++) {
			document.getElementById('log').innerHTML += "<p>"
			document.getElementById('log').innerHTML += result['log'][i];
			document.getElementById('log').innerHTML += "</p>"
		}

		document.getElementById('export_button').addEventListener('click', function () {
			console.log("test", result['log']);
			downloadCSV(result['log']);
		})
	});
};
