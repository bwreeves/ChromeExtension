let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.querySelector('#input-btn');
const leadList = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocal = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocal) {
	myLeads = leadsFromLocal;
	display(myLeads);
}

inputBtn.addEventListener("click", function() {
	myLeads.push(inputEl.value);
	inputEl.value = "";
	localStorage.setItem('myLeads', JSON.stringify(myLeads));
	display(myLeads);
})

deleteBtn.addEventListener("dblclick", function() {
	myLeads = [];
	localStorage.clear();
	display(myLeads);
})

tabBtn.addEventListener("click", function () {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		let a = "url:";
		let b = tabs[0].url;
		let c = a + b;
		myLeads.push(c);
		localStorage.setItem('myLeads', JSON.stringify(myLeads));
		display(myLeads);
	})

})

function display(theseLeads) {
	let listItems = "";
	for (let i = 0; i < theseLeads.length; i++) {
		if (theseLeads[i].includes("url:")) {
			let url = theseLeads[i].slice(4);
			listItems += `
				<li>
					<a href='${url}' target='_blank'>
						${url}
					</a>
				</li>
				`
		}
		else {
			listItems += `
			<li>
					${theseLeads[i]}
			</li>
			`
			}
	}
	leadList.innerHTML = listItems;

}