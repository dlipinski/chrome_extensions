
const hideElements = () => {
	let elements =
	[...document.querySelectorAll('article[data-item="true"]')]
	.map(e => ({
		e,
		title: 	e.querySelector('h2 a[title]').innerHTML,
		price: 	[...e.getElementsByTagName('i')]
						.find(i => i.innerHTML.includes('z dostawą'))
						.previousSibling.innerHTML
		})
	);

	let ell = elements.length;

	for (let i=ell-1; i>=0;i--) {
		let e = elements[i];
		let isDuplicate = elements.filter((ee) => (e.title === ee.title && e.price === ee.price)).length > 1;
		if (isDuplicate) {
			e.e.style.display = 'none';
			elements.splice(i,1);
		}
	}
}

const addClassNameListener = (elem, callback) => {
  let lastClassName = elem.className;
	let changeCount = 0;
	
	window.setInterval(() => {   
		let className = elem.className;
		if (className !== lastClassName) {
				if (changeCount % 2 !== 0) {
					callback();
				}
				changeCount++;
				lastClassName = className;
		}
	}, 10);
}

hideElements();
addClassNameListener(document.querySelector('#opbox-listing--base').firstChild, hideElements);