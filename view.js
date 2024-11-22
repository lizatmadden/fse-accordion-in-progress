import { THEME_PREFIX } from "scripts/inc/constants";
import $ from "jquery";

$(window).on("load", () => {
	initFaqAccordion();
});

const accordionBlockSelector = `.wp-block-${THEME_PREFIX}-faq-accordion`;

const schema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [],
};

let schemaAdded = false;

const initFaqAccordion = () => {

	//loop through each block on page
	let accordionBlocks = document.querySelectorAll(accordionBlockSelector);
	accordionBlocks.forEach((block) => {

		//loop through each q&a in the block
		const accordions = block.querySelectorAll(".faq-wrapper");
		accordions.forEach((faq) => {
			//unique id
			let uid = faq.dataset.uid;

			//open on page load if needed
			if (faq.dataset.status === "open") {
				openAccordion(faq, uid);
			}

			//add toggle click listener
			let toggle = document.querySelector(
				'[data-uid="' + uid + '"] .faq-question'
			);
			toggle.addEventListener("click", () => {
				toggleAccordion(faq, uid);
			});

			//build schema
			if (block.dataset.schema) {
				let schemaPart = {
					"@type": "Question",
					name: toggle.innerText,
					acceptedAnswer: {
						"@type": "Answer",
						text: document.querySelector(
							'[data-uid="' + uid + '"] .faq-answer .inner-content p'
						).innerHTML,
					},
				};
				schema["mainEntity"].push(schemaPart);
			}
		});
	});

	//if any FAQ entities exist, we will append to page <head>
	if (schema["mainEntity"].length > 0 && !schemaAdded) {
		let jsonScript = document.createElement("script");
		jsonScript.type = "application/ld+json";
		jsonScript.innerText = JSON.stringify(schema);
		document.head.appendChild(jsonScript);
		schemaAdded = true;
	}

	function toggleAccordion(faq, uid) {
		let status = faq.dataset.status;
		if (status === "closed") {
			openAccordion(faq, uid);
		} else {
			closeAccordion(faq, uid);
		}
	}

	function openAccordion(faq, uid) {
		//close any opens accordions in this unique block
		let itemsInAccordion = faq
			.closest(accordionBlockSelector)
			.querySelectorAll(".faq-wrapper");
		itemsInAccordion.forEach((child) => {
			if (child.dataset.uid !== uid && child.dataset.status === "open") {
				closeAccordion(child, child.dataset.uid);
			}
		});

		//open the selected accordion
		let answer = document.querySelector('[data-uid="' + uid + '"] .faq-answer');
		answer.style.height = `${answer.scrollHeight}px`;
		//after the animation finishes, remove the fixed height to maintain responsiveness.
		//the transition time is set in css at 0.3s
		setTimeout(() => {
			answer.style.height = "auto";
			faq.dataset.status = "open";
		}, 300);
	}

	function closeAccordion(faq, uid) {
		let answer = document.querySelector('[data-uid="' + uid + '"] .faq-answer');
		answer.style.height = `${answer.scrollHeight}px`;
		//after the animation finishes, remove the fixed height to maintain responsiveness.
		//the transition time is set in css at 0.3s
		setTimeout(() => {
			answer.style.height = null;
			faq.dataset.status = "closed";
		}, 150);
	}
};

export default initFaqAccordion;
