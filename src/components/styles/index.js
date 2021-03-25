import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  * {
    box-sizing: border-box;
  }
 
	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box !important;
	}

	*::before, *::after {
		-webkit-box-sizing: inherit;
		box-sizing: inherit;
	}

  body {
    margin: 0;
    font: 400 14px/24px Roboto;
    font-family: "Public Sans", "Open Sans", Roboto, sans-serif;
    font-size: .9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: #a6b0cf;
		text-align: left;
		height: 100vh;
		background-color: #303841;
		

		::-webkit-scrollbar{
			width: 12px;
			cursor: pointer;
		}

		::-webkit-scrollbar-trace,
		::-webkit-scrollbar-thumb {
			border-radius: 8px;
			background-color: #264653;
		}
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  :root {
		--chat-bg: #262e35;
		--blue: #7269ef;
		--blue-bold: #073b4c;
    --indigo: #564ab1;
    --purple: #8e4aec;
    --red: #ef476f;
    --orange: #fc814a;
    --yellow: #ffd166;
    --green: #06d6a0;
    --teal: #050505;
    --cyan: #50a5f1;
    --white: #fff;
    --gray: #abb4d2;
    --gray-dark: #eff2f7;
    --primary: #7269ef;
    --secondary: #abb4d2;
    --success: #06d6a0;
    --info: #50a5f1;
    --warning: #ffd166;
    --danger: #ef476f;
    --light: #36404a;
    --dark: #eff2f7;
    --pink: #e83e8c;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --bg: #eff5f5;
		--text: #505763;
		--text-light: #eff2f7;
		--message-incoming-bg: #36404a;
		--orange-link: rgb(255, 166, 0);
		--white: #fff;
		--white-100: #fafafa;
		--black: #0c0d0e;
		--orange: #f48024;
		--yellow: #fbf2d4;
		--green: #5eba7d;
		--blue: #0077cc;
		--facebook: #3b5998;
		--google: #ff0066;
		--twitter: #1a1aff;
		--bs-sm: 0 1px 2px rgba(0,0,0,0.05),0 1px 4px rgba(0,0,0,0.05),0 2px 8px rgba(0,0,0,0.05);
		--bs-md: 0 1px 3px rgba(0,0,0,0.06),0 2px 6px rgba(0,0,0,0.06),0 3px 8px rgba(0,0,0,0.09);
		--bs-lg: 0 1px 4px rgba(0,0,0,0.09),0 3px 8px rgba(0,0,0,0.09),0 4px 13px rgba(0,0,0,0.13);
		--bs-xl: 0 1px 6px rgba(0,0,0,0.09),0 3px 12px rgba(0,0,0,0.09),0 4px 17px rgba(0,0,0,0.13);
		--bs-gl: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
		--bs-inset: inset 0 4px 6px 0 rgba(255, 255, 255, .3), inset 0 5px 8px 0 rgba(255, 255, 255, .4);
		--bs-post: 0 1px 3px 0 rgba(60, 64, 67, 0.05), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
		--bs-ud: 0 0 1px 1px rgba(20,23,28,.1), 0 3px 1px 0 rgba(20,23,28,.1);
    --font-family-sans-serif: "Public Sans", "Open Sans", Roboto, sans-serif;
    --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
  }

	html, body, #root {
		-webkit-text-size-adjust: 100%;
		text-size-adjust: 100%;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased !important;
		-moz-osx-font-smoothing: grayscale !important;
	}

	ul {
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	p {
		padding: 0;
	}

	svg {
		font-size: calc(14px + (19 - 14) * ((100vw - 200px) / (1600 - 200))) ;
		min-height: calc(14px + (19 - 14) * ((100vw - 200px) / (1600 - 200)));
		font-weight: normal;
	}

	svg:not(:root) {
		overflow: hidden;
	}

		/*! normalize.css v3.0.2 | MIT License | git.io/normalize */

	/**
	 * 1. Set default font family to sans-serif.
	 * 2. Prevent iOS text size adjust after orientation change, without disabling
	 *    user zoom.
	 */

	html {
	  font-family: sans-serif; /* 1 */
	  -ms-text-size-adjust: 100%; /* 2 */
	  -webkit-text-size-adjust: 100%; /* 2 */
	}

	/**
	 * Remove default margin.
	 */

	/* HTML5 display definitions
	   ========================================================================== */

	/**
	 * Correct 'block' display not defined for any HTML5 element in IE 8/9.
	 * Correct 'block' display not defined for 'details' or 'summary' in IE 10/11
	 * and Firefox.
	 * Correct 'block' display not defined for 'main' in IE 11.
	 */

	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	main,
	menu,
	nav,
	section,
	summary {
	  display: block;
	}

	/**
	 * 1. Correct 'inline-block' display not defined in IE 8/9.
	 * 2. Normalize vertical alignment of 'progress' in Chrome, Firefox, and Opera.
	 */

	audio,
	canvas,
	progress,
	video {
	  display: inline-block; /* 1 */
	  vertical-align: baseline; /* 2 */
	}

	/**
	 * Prevent modern browsers from displaying 'audio' without controls.
	 * Remove excess height in iOS 5 devices.
	 */

	audio:not([controls]) {
	  display: none;
	  height: 0;
	}

	/**
	 * Address '[hidden]' styling not present in IE 8/9/10.
	 * Hide the 'template' element in IE 8/9/11, Safari, and Firefox < 22.
	 */

	[hidden],
	template {
	  display: none;
	}

	/* Links
	   ========================================================================== */

	/**
	 * Remove the gray background color from active links in IE 10.
	 */

	a {
	  background-color: transparent;
	}

	/**
	 * Improve readability when focused and also mouse hovered in all browsers.
	 */

	a:active,
	a:hover {
	  outline: 0;
	}

	/* Text-level semantics
	   ========================================================================== */

	/**
	 * Address styling not present in IE 8/9/10/11, Safari, and Chrome.
	 */

	abbr[title] {
	  border-bottom: 1px dotted;
	}

	/**
	 * Address style set to 'bolder' in Firefox 4+, Safari, and Chrome.
	 */

	b,
	strong {
	  font-weight: bold;
	}

	/**
	 * Address styling not present in Safari and Chrome.
	 */

	dfn {
	  font-style: italic;
	}

	/**
	 * Address variable 'h1' font-size and margin within 'section' and 'article'
	 * contexts in Firefox 4+, Safari, and Chrome.
	 */

	h1 {
	  font-size: 2em;
	  margin: 0.67em 0;
	}

	/**
	 * Address styling not present in IE 8/9.
	 */

	mark {
	  background: #ff0;
	  color: #000;
	}

	/**
	 * Address inconsistent and variable font size in all browsers.
	 */

	small {
	  font-size: 80%;
	}

	/**
	 * Prevent 'sub' and 'sup' affecting 'line-height' in all browsers.
	 */

	sub,
	sup {
	  font-size: 75%;
	  line-height: 0;
	  position: relative;
	  vertical-align: baseline;
	}

	sup {
	  top: -0.5em;
	}

	sub {
	  bottom: -0.25em;
	}

	/* Embedded content
	   ========================================================================== */

	/**
	 * Remove border when inside 'a' element in IE 8/9/10.
	 */

	img {
	  border: 0;
	}

	/**
	 * Correct overflow not hidden in IE 9/10/11.
	 */

	svg:not(:root) {
	  overflow: hidden;
	}

	/* Grouping content
	   ========================================================================== */

	/**
	 * Address margin not present in IE 8/9 and Safari.
	 */

	figure {
	  margin: 1em 40px;
	}

	/**
	 * Address differences between Firefox and other browsers.
	 */

	hr {
	  box-sizing: content-box;
	  height: 0;
	}

	/**
	 * Contain overflow in all browsers.
	 */

	pre {
	  overflow: auto;
	}

	/**
	 * Address odd 'em'-unit font size rendering in all browsers.
	 */

	code,
	kbd,
	pre,
	samp {
	  font-family: monospace, monospace;
	  font-size: 1em;
	}

	/* Forms
	   ========================================================================== */

	/**
	 * Known limitation: by default, Chrome and Safari on OS X allow very limited
	 * styling of 'select', unless a 'border' property is set.
	 */

	/**
	 * 1. Correct color not being inherited.
	 *    Known issue: affects color of disabled elements.
	 * 2. Correct font properties not being inherited.
	 * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.
	 */

	button,
	input,
	optgroup,
	select,
	textarea {
	  color: inherit; /* 1 */
	  font: inherit; /* 2 */
	  margin: 0; /* 3 */
	}

	/**
	 * Address 'overflow' set to 'hidden' in IE 8/9/10/11.
	 */

	button {
	  overflow: visible;
	}

	/**
	 * Address inconsistent 'text-transform' inheritance for 'button' and 'select'.
	 * All other form control elements do not inherit 'text-transform' values.
	 * Correct 'button' style inheritance in Firefox, IE 8/9/10/11, and Opera.
	 * Correct 'select' style inheritance in Firefox.
	 */

	button,
	select {
	  text-transform: none;
	}

	/**
	 * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native 'audio'
	 *    and 'video' controls.
	 * 2. Correct inability to style clickable 'input' types in iOS.
	 * 3. Improve usability and consistency of cursor style between image-type
	 *    'input' and others.
	 */

	button,
	html input[type="button"], /* 1 */
	input[type="reset"],
	input[type="submit"] {
	  -webkit-appearance: button; /* 2 */
	  cursor: pointer; /* 3 */
	}

	/**
	 * Re-set default cursor for disabled elements.
	 */

	button[disabled],
	html input[disabled] {
	  cursor: default;
	}

	/**
	 * Remove inner padding and border in Firefox 4+.
	 */

	button::-moz-focus-inner,
	input::-moz-focus-inner {
	  border: 0;
	  padding: 0;
	}

	/**
	 * Address Firefox 4+ setting 'line-height' on 'input' using '!important' in
	 * the UA stylesheet.
	 */

	input {
	  line-height: normal;
	}

	/**
	 * It's recommended that you don't attempt to style these elements.
	 * Firefox's implementation doesn't respect box-sizing, padding, or width.
	 *
	 * 1. Address box sizing set to 'content-box' in IE 8/9/10.
	 * 2. Remove excess padding in IE 8/9/10.
	 */

	input[type="checkbox"],
	input[type="radio"] {
	  box-sizing: border-box; /* 1 */
	  padding: 0; /* 2 */
	}

	/**
	 * Fix the cursor style for Chrome's increment/decrement buttons. For certain
	 * 'font-size' values of the 'input', it causes the cursor style of the
	 * decrement button to change from 'default' to 'text'.
	 */

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
	  height: auto;
	}

	/**
	 * 1. Address 'appearance' set to 'searchfield' in Safari and Chrome.
	 * 2. Address 'box-sizing' set to 'border-box' in Safari and Chrome
	 *    (include '-moz' to future-proof).
	 */

	input[type="search"] {
	  -webkit-appearance: textfield; /* 1 */ /* 2 */
	  box-sizing: content-box;
	}

	/**
	 * Remove inner padding and search cancel button in Safari and Chrome on OS X.
	 * Safari (but not Chrome) clips the cancel button when the search input has
	 * padding (and 'textfield' appearance).
	 */

	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-decoration {
	  -webkit-appearance: none;
	}

	/**
	 * Define consistent border, margin, and padding.
	 */

	fieldset {
	  border: 1px solid #c0c0c0;
	  margin: 0 2px;
	  padding: 0.35em 0.625em 0.75em;
	}

	/**
	 * 1. Correct 'color' not being inherited in IE 8/9/10/11.
	 * 2. Remove padding so people aren't caught out if they zero out fieldsets.
	 */

	legend {
	  border: 0; /* 1 */
	  padding: 0; /* 2 */
	}

	/**
	 * Remove default vertical scrollbar in IE 8/9/10/11.
	 */

	textarea {
	  overflow: auto;
	}

	/**
	 * Don't inherit the 'font-weight' (applied by a rule above).
	 * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.
	 */

	optgroup {
	  font-weight: bold;
	}

	/* Tables
	   ========================================================================== */

	/**
	 * Remove most spacing between table cells.
	 */

	table {
	  border-collapse: collapse;
	  border-spacing: 0;
	}

	td,
	th {
	  padding: 0;
	}
`;
