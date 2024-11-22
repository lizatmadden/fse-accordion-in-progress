/*** IMPORTS ****************************************************************/
// WordPress dependencies
import { __ } from "@wordpress/i18n";
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { THEME_PREFIX } from 'scripts/inc/constants';
import { getCSSRules } from '@wordpress/style-engine';
import { useState, useEffect, useRef } from '@wordpress/element';
const { select } = wp.data;

// Local Dependencies
// Controls - add block/inspector controls here
import Controls from "./controls";
import Wizard from "./controls/wizard";

/*** FUNCTIONS **************************************************************/

const edit = (props) => {
	return (
		<>
			<Controls {...props} />
			<Wizard {...props} />
		</>
	);
};

/*** EXPORTS ****************************************************************/

export default edit;